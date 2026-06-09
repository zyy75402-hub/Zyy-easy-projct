import { getDeployStore, getStore } from "@netlify/blobs";

declare const Netlify: any;

const STORE_NAME = "personality-submissions";
const VERSION = "6.9.7-data";
const MBTI_RE = /^[EI][NS][TF][JP]$/;

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(init.headers || {})
    }
  });
}

function getSubmissionStore(context: any) {
  if (context?.deploy?.context === "production") {
    return getStore(STORE_NAME, { consistency: "strong" });
  }
  return getDeployStore(STORE_NAME);
}

function safeString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[<>]/g, "").trim().slice(0, maxLength);
}

function safeTitleList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 8).map((item) => safeString(item, 48)).filter(Boolean);
}

function safeAnswers(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const out: Record<string, number> = {};
  for (const [key, rawAnswer] of Object.entries(value as Record<string, unknown>)) {
    if (typeof key !== "string" || key.length > 80) return null;
    const answer = Number(rawAnswer);
    if (!Number.isInteger(answer) || answer < 1 || answer > 7) return null;
    out[key] = answer;
  }
  return out;
}

function sanitizeSubmission(input: any) {
  const inputMbti = safeString(input?.inputMbti, 4);
  const currentMbti = safeString(input?.currentMbti, 4);
  const resultMbti = safeString(input?.resultMbti, 4);
  if (!MBTI_RE.test(inputMbti) || !MBTI_RE.test(currentMbti) || !MBTI_RE.test(resultMbti)) {
    return null;
  }

  const resultObject = safeString(input?.resultObject, 20);
  if (!resultObject) return null;

  const currentAnswers = safeAnswers(input?.answers?.current);
  const refAnswers = safeAnswers(input?.answers?.ref);
  if (!currentAnswers || !refAnswers) return null;

  const client = input?.client && typeof input.client === "object" && !Array.isArray(input.client)
    ? {
        device: input.client.device === "mobile" ? "mobile" : "desktop",
        language: safeString(input.client.language, 20)
      }
    : undefined;

  return {
    source: "web",
    version: VERSION,
    inputMbti,
    currentMbti,
    resultMbti,
    resultObject,
    deletionTitles: safeTitleList(input?.deletionTitles),
    retainedTitles: safeTitleList(input?.retainedTitles),
    confidence: safeString(input?.confidence, 8),
    answers: {
      current: currentAnswers,
      ref: refAnswers
    },
    ...(client ? { client } : {})
  };
}

export default async (req: Request, context: any) => {
  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return json({ ok: false, error: "Invalid content type" }, { status: 415 });
  }

  const contentLength = Number(req.headers.get("content-length") || "0");
  if (contentLength > 24000) {
    return json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const sanitized = sanitizeSubmission(body);
  if (!sanitized) {
    return json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }

  const createdAt = new Date().toISOString();
  const randomId = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  const id = `${createdAt.replace(/[:.]/g, "-")}_${randomId}`;
  const record = { id, createdAt, ...sanitized };

  try {
    const store = getSubmissionStore(context);
    await store.setJSON(`submissions/${id}.json`, record);
    return json({ ok: true, id });
  } catch (error) {
    console.error("Failed to save anonymous submission", error);
    return json({ ok: false, error: "Save failed" }, { status: 500 });
  }
};
