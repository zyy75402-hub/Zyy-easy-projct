import { getDeployStore, getStore } from "@netlify/blobs";

declare const Netlify: any;
declare const process: { env?: Record<string, string | undefined> };

const STORE_NAME = "personality-submissions";
const FALLBACK_ADMIN_SECRET_SHA256 = "65f6c5acd386d0758ef79a74e49d8b6172972e36e29e89b2353704a09ffd9c74";

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(init.headers || {})
    }
  });
}

function getAdminSecret() {
  try {
    const netlifySecret = typeof Netlify !== "undefined" ? Netlify.env.get("ADMIN_SECRET") : "";
    if (netlifySecret) return netlifySecret;
  } catch {
    // Fall back to the standard Node environment below.
  }

  return process?.env?.ADMIN_SECRET || "";
}

async function sha256Hex(value: string) {
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(buffer)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function isAuthorizedAdmin(providedSecret: string) {
  const expectedSecret = getAdminSecret();
  if (expectedSecret) return providedSecret === expectedSecret;
  return (await sha256Hex(providedSecret)) === FALLBACK_ADMIN_SECRET_SHA256;
}

function getSubmissionStore(context: any) {
  if (context?.deploy?.context === "production") {
    return getStore(STORE_NAME, { consistency: "strong" });
  }
  return getDeployStore(STORE_NAME);
}

function addCount(map: Record<string, number>, key: unknown) {
  if (typeof key !== "string" || !key) return;
  map[key] = (map[key] || 0) + 1;
}

export default async (req: Request, context: any) => {
  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  const providedSecret = req.headers.get("x-admin-secret") || "";
  if (!(await isAuthorizedAdmin(providedSecret))) {
    return json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const store = getSubmissionStore(context);
    const listed = await store.list({ prefix: "submissions/" });
    const mbtiDistribution: Record<string, number> = {};
    const objectDistribution: Record<string, number> = {};
    const dailySubmissions: Record<string, number> = {};
    const latestSubmissions: Array<{
      createdAt: string;
      resultMbti: string;
      resultObject: string;
      confidence: string;
    }> = [];

    for (const blob of listed.blobs || []) {
      const record = await store.get(blob.key, { type: "json" });
      if (!record || typeof record !== "object") continue;

      addCount(mbtiDistribution, (record as any).resultMbti);
      addCount(objectDistribution, (record as any).resultObject);
      const day = typeof (record as any).createdAt === "string" ? (record as any).createdAt.slice(0, 10) : "";
      addCount(dailySubmissions, day);

      latestSubmissions.push({
        createdAt: String((record as any).createdAt || ""),
        resultMbti: String((record as any).resultMbti || ""),
        resultObject: String((record as any).resultObject || ""),
        confidence: String((record as any).confidence || "")
      });
    }

    latestSubmissions.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return json({
      ok: true,
      totalSubmissions: latestSubmissions.length,
      mbtiDistribution,
      objectDistribution,
      dailySubmissions,
      latestSubmissions: latestSubmissions.slice(0, 20)
    });
  } catch (error) {
    console.error("Failed to load admin stats", error);
    return json({ ok: false, error: "Failed to load stats" }, { status: 500 });
  }
};
