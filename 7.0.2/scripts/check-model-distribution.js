#!/usr/bin/env node
const data = require('../model-data.js');
const createBBTIModel = require('../model-core.js');
const engine = createBBTIModel(data);
const sampleSize = Number(process.argv[2] || 50000);
const prototypes = data.prototypes.map((p) => p.id);
const dims = data.dimensions;
const derivedDims = data.derivedDimensions;
const matchDims = [...dims, ...derivedDims];
const feedbackKeys = ['SUP', 'EVAL', 'RESP', 'CTRL', 'COST'];
const distribution = Object.fromEntries(prototypes.map((id) => [id, 0]));
const gapBuckets = { '<3%': 0, '3-8%': 0, '8-15%': 0, '>15%': 0 };
const feedbackStats = Object.fromEntries(feedbackKeys.map((key) => [key, { sum: 0, max: -Infinity, nonzero: 0, rawNonzero: 0 }]));
const rawRanges = Object.fromEntries(matchDims.map((dim) => [dim, { min: Infinity, max: -Infinity }]));
const normRanges = Object.fromEntries(matchDims.map((dim) => [dim, { min: Infinity, max: -Infinity }]));
const levelDist = Object.fromEntries(matchDims.map((dim) => [dim, { '-2': 0, '-1': 0, '0': 0, '1': 0, '2': 0 }]));
let tieBreakers = 0;
let exactTieCount = 0;
const distanceDiffs = [];
let strongTagCount = 0;
let observationCount = 0;
const optionKeys = ['A', 'B', 'C', 'D'];
function randomAnswers() {
  const answers = {};
  for (const q of data.questions) answers[q.id] = optionKeys[Math.floor(Math.random() * optionKeys.length)];
  return answers;
}
function updateRange(item, value) {
  item.min = Math.min(item.min, value);
  item.max = Math.max(item.max, value);
}
for (let i = 0; i < sampleSize; i += 1) {
  const result = engine.calculate({ mbti: 'INFP', confidence: 'B', answers: randomAnswers() });
  distribution[result.main.id] += 1;
  if (result.gapPercent < 3) gapBuckets['<3%'] += 1;
  else if (result.gapPercent < 8) gapBuckets['3-8%'] += 1;
  else if (result.gapPercent < 15) gapBuckets['8-15%'] += 1;
  else gapBuckets['>15%'] += 1;
  if (result.tieTriggered) tieBreakers += 1;
  if (result.rank[1]) {
    const diff = result.rank[1].distance - result.rank[0].distance;
    distanceDiffs.push(diff);
    if (diff <= 0.01) exactTieCount += 1;
  }
  if (result.tags.length) strongTagCount += 1;
  if (result.observations.length) observationCount += 1;
  const rawCombined = { ...result.raw.R, ...result.raw.C, ...result.raw.F, COST: result.raw.E.COST, ...result.expanded };
  const normCombined = { ...result.B_final, ...result.expanded };
  for (const dim of matchDims) {
    updateRange(rawRanges[dim], rawCombined[dim] ?? result.expanded[dim] ?? 0);
    updateRange(normRanges[dim], normCombined[dim] ?? 0);
    levelDist[dim][String(result.levels[dim])] += 1;
  }
  const feedback = result.feedback.flat;
  const rawFeedback = { ...result.raw.F, COST: result.raw.E.COST };
  for (const key of feedbackKeys) {
    feedbackStats[key].sum += feedback[key];
    feedbackStats[key].max = Math.max(feedbackStats[key].max, feedback[key]);
    if (feedback[key] > 0) feedbackStats[key].nonzero += 1;
    if (rawFeedback[key] !== 0) feedbackStats[key].rawNonzero += 1;
  }
}
function pct(value) { return `${(value / sampleSize * 100).toFixed(2)}%`; }
function num(value) { return Number(value).toFixed(2); }
const distRates = Object.fromEntries(prototypes.map((id) => [id, distribution[id] / sampleSize * 100]));
const highest = Math.max(...Object.values(distRates));
const lowest = Math.min(...Object.values(distRates));
const p04p09 = (distribution.P04 + distribution.P09) / sampleSize * 100;
const tieRate = tieBreakers / sampleSize * 100;
const supNonzero = feedbackStats.SUP.nonzero / sampleSize * 100;
const respNonzero = feedbackStats.RESP.nonzero / sampleSize * 100;
console.log(`Sample size: ${sampleSize}`);
console.log('\nPrototype distribution:');
for (const id of prototypes) console.log(`${id}: ${distRates[id].toFixed(2)}% (${distribution[id]})`);
distanceDiffs.sort((a, b) => a - b);
function percentile(arr, p) {
  if (!arr.length) return 0;
  const idx = Math.min(arr.length - 1, Math.max(0, Math.floor((arr.length - 1) * p)));
  return arr[idx];
}
console.log('\nConfidence gap distribution:');
for (const [bucket, count] of Object.entries(gapBuckets)) console.log(`${bucket}: ${pct(count)}`);
console.log(`Tie-breaker trigger rate: ${tieRate.toFixed(2)}%`);
console.log(`Exact tie rate: ${pct(exactTieCount)}`);
console.log(`Distance diff percentiles: p50 ${num(percentile(distanceDiffs, 0.50))} / p75 ${num(percentile(distanceDiffs, 0.75))} / p95 ${num(percentile(distanceDiffs, 0.95))}`);
console.log('\nF feedback:');
for (const key of feedbackKeys) {
  const stat = feedbackStats[key];
  console.log(`${key}: avg ${num(stat.sum / sampleSize)} / max ${num(stat.max)} / nonzero ${pct(stat.nonzero)} / raw nonzero ${pct(stat.rawNonzero)}`);
}
console.log('\nDimension ranges:');
for (const dim of matchDims) {
  const levels = Object.entries(levelDist[dim]).map(([key, count]) => `${key}:${pct(count)}`).join(' ');
  console.log(`${dim}: raw ${num(rawRanges[dim].min)}..${num(rawRanges[dim].max)} / normalized ${num(normRanges[dim].min)}..${num(normRanges[dim].max)} / levels ${levels}`);
}
console.log('\nTags:');
console.log(`strong tag rate: ${pct(strongTagCount)}`);
console.log(`observation signal rate: ${pct(observationCount)}`);
console.log('\nValidation:');
const checks = [
  ['highest prototype <= 22%', highest <= 22, highest.toFixed(2) + '%'],
  ['lowest prototype >= 1%', lowest >= 1, lowest.toFixed(2) + '%'],
  ['P04 + P09 <= 35%', p04p09 <= 35, p04p09.toFixed(2) + '%'],
  ['tie-breaker < 10%', tieRate < 10, tieRate.toFixed(2) + '%'],
  ['SUP nonzero > 20%', supNonzero > 20, supNonzero.toFixed(2) + '%'],
  ['RESP nonzero > 20%', respNonzero > 20, respNonzero.toFixed(2) + '%']
];
for (const [label, pass, value] of checks) console.log(`${label} ? ${pass ? 'PASS' : 'FAIL'} (${value})`);
if (checks.some(([, pass]) => !pass)) process.exitCode = 1;
