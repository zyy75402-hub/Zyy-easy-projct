#!/usr/bin/env node
const envData = require('../parallel-life-env.js');
const eventData = require('../parallel-life-events.js');
const copyData = require('../parallel-life-copy.js');
const evaluationData = require('../parallel-life-evaluation.js');
const createParallelLifeEngine = require('../parallel-life-core.js');
const engine = createParallelLifeEngine(envData, eventData, copyData, evaluationData);

const prototypes = Object.keys(envData.personalityLifeReactionFallbacks);
const events = eventData.events;
const eventsByTheme = events.reduce((acc, event) => {
  if (!acc[event.themeId]) acc[event.themeId] = [];
  acc[event.themeId].push(event);
  return acc;
}, {});
const eventCounts = Object.fromEntries(events.map((event) => [event.eventId, 0]));
const themeEventSets = Object.fromEntries(envData.eventThemeRules.map((theme) => [theme.id, new Set()]));
const optionLists = envData.envQuestions.map((q) => q.options.map((option) => [q.id, option.id]));
let total = 0;
let invalidExperienceCount = 0;
let invalidImpactCount = 0;
let emptyEvaluationCount = 0;
let representativeEvaluationChecks = 0;
let timelineChecked = 0;
let outOfOrderCases = 0;
let invalidTimelineValueCount = 0;
let invalidOutputTokenCount = 0;

function addWeightedEventCounts(theme, envVector, lifeReactionVector, selectedEventsForImpact) {
  const pool = eventsByTheme[theme.themeId] || [];
  const scores = engine.__debug.familyScores(envVector);
  const scored = pool.map((event, index) => ({
    event,
    score: engine.__debug.eventScore(event, theme.score, envVector, lifeReactionVector, scores, 5 + index)
  }));
  const minScore = Math.min(...scored.map((item) => item.score));
  const weighted = scored.map((item) => ({ ...item, weight: Math.max(1, item.score - minScore + 8) }));
  const totalWeight = weighted.reduce((sum, item) => sum + item.weight, 0);
  weighted.forEach((item) => {
    eventCounts[item.event.eventId] += item.weight / totalWeight;
    themeEventSets[item.event.themeId]?.add(item.event.eventId);
  });
  selectedEventsForImpact.push(weighted.sort((a, b) => b.weight - a.weight)[0]);
}

function walk(index, answers, cb) {
  if (index >= optionLists.length) {
    cb(answers);
    return;
  }
  for (const [qid, opt] of optionLists[index]) {
    answers[qid] = opt;
    walk(index + 1, answers, cb);
  }
}

function hasInvalidNumber(value) {
  return typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value);
}

function checkTimelineOrder(items) {
  for (let i = 0; i < items.length; i += 1) {
    if (hasInvalidNumber(items[i].lifeStageOrder) || hasInvalidNumber(items[i].ageStart)) {
      invalidTimelineValueCount += 1;
      return false;
    }
    if (i === 0) continue;
    const previous = items[i - 1];
    const current = items[i];
    if (previous.lifeStageOrder > current.lifeStageOrder) return false;
    if (previous.lifeStageOrder === current.lifeStageOrder && previous.ageStart > current.ageStart) return false;
  }
  return true;
}

function containsInvalidOutputToken(value) {
  return /\b(undefined|null|NaN)\b/.test(JSON.stringify(value));
}

walk(0, {}, (answers) => {
  const envVector = engine.computeParallelLifeEnvVector(answers);
  for (const personalityCode of prototypes) {
    const lifeReactionVector = engine.deriveLifeReactionVector(personalityCode);
    const scoredThemes = engine.scoreAllEventThemes(envVector, lifeReactionVector);
    const selectedThemes = engine.selectEventThemes(scoredThemes);
    const selectedEvents = [];
    total += 1;
    if (selectedThemes.length < 5 || selectedThemes.length > 8) invalidExperienceCount += 1;
    for (const theme of selectedThemes) addWeightedEventCounts(theme, envVector, lifeReactionVector, selectedEvents);
    const likelySelectedEvents = engine.__debug.sortSelectedEventsByTimeline(selectedEvents.map((item, index) => ({ event: item.event, theme: selectedThemes.find((theme) => theme.themeId === item.event.themeId), eventScore: item.score, variant: 'mixed', originalIndex: index })));
    timelineChecked += 1;
    if (!checkTimelineOrder(likelySelectedEvents)) outOfOrderCases += 1;
    const likelyImpactTagScores = engine.aggregateImpactTags(likelySelectedEvents);
    const impactTagCount = Object.values(likelyImpactTagScores).filter((value) => value !== 0).length;
    if (impactTagCount < 3) invalidImpactCount += 1;
    if (total % 50000 === 1) {
      const life = engine.generateParallelLife({ personalityCode, envAnswers: { ...answers }, seed: total });
      const evaluation = engine.buildFinalEvaluation({ personalityCode, selectedEvents: likelySelectedEvents, envVector });
      representativeEvaluationChecks += 1;
      if (!evaluation || !evaluation.paragraphs || !evaluation.paragraphs.join('').trim()) emptyEvaluationCount += 1;
      if (!life.experiences || life.experiences.length < 5 || life.experiences.length > 8) invalidExperienceCount += 1;
      if (!checkTimelineOrder(life.experiences || [])) outOfOrderCases += 1;
      if (containsInvalidOutputToken({ experiences: life.experiences, evaluation: life.evaluation?.sections || life.evaluation?.paragraphs })) invalidOutputTokenCount += 1;
    }
  }
});
function pct(value) { return value / total * 100; }
const failures = [];
for (const event of events) {
  const rate = pct(eventCounts[event.eventId]);
  if (rate <= 0.1) failures.push(`${event.eventId} frequency <= 0.1% (${rate.toFixed(3)}%)`);
  if (rate >= 50) failures.push(`${event.eventId} frequency >= 50% (${rate.toFixed(3)}%)`);
}
for (const [themeId, set] of Object.entries(themeEventSets)) {
  if (set.size < 2) failures.push(`${themeId} has fewer than 2 selectable concrete events (${set.size})`);
}
if (invalidExperienceCount) failures.push(`experience count outside 5-8: ${invalidExperienceCount}`);
if (invalidImpactCount) failures.push(`impact tag count < 3: ${invalidImpactCount}`);
if (emptyEvaluationCount) failures.push(`empty evaluation: ${emptyEvaluationCount}`);
if (outOfOrderCases) failures.push(`timeline out-of-order cases: ${outOfOrderCases}`);
if (invalidTimelineValueCount) failures.push(`invalid timeline values: ${invalidTimelineValueCount}`);
if (invalidOutputTokenCount) failures.push(`undefined/null/NaN output tokens: ${invalidOutputTokenCount}`);
console.log(`Total evaluated lives: ${total}`);
console.log(`Representative final evaluation checks: ${representativeEvaluationChecks}`);
console.log('\nEvent expected selection frequency:');
for (const event of events) console.log(`${event.eventId}: ${pct(eventCounts[event.eventId]).toFixed(3)}%`);
console.log('\nTheme concrete event coverage:');
for (const [themeId, set] of Object.entries(themeEventSets)) console.log(`${themeId}: ${set.size}/3 concrete events selected`);
console.log('\nValidation:');
console.log(`48 events reachable ? ${events.every((event) => eventCounts[event.eventId] > 0) ? 'PASS' : 'FAIL'}`);
console.log(`Every event > 0.1% ? ${events.every((event) => pct(eventCounts[event.eventId]) > 0.1) ? 'PASS' : 'FAIL'}`);
console.log(`Every event < 50% ? ${events.every((event) => pct(eventCounts[event.eventId]) < 50) ? 'PASS' : 'FAIL'}`);
console.log(`Every theme has multiple concrete events ? ${Object.values(themeEventSets).every((set) => set.size >= 2) ? 'PASS' : 'FAIL'}`);
console.log(`Experience count always 5-8 ? ${invalidExperienceCount === 0 ? 'PASS' : 'FAIL'}`);
console.log(`Impact tags >= 3 ? ${invalidImpactCount === 0 ? 'PASS' : 'FAIL'}`);
console.log(`Representative final evaluation non-empty ? ${emptyEvaluationCount === 0 ? 'PASS' : 'FAIL'}`);
console.log(`Timeline order validation: ${outOfOrderCases === 0 && invalidTimelineValueCount === 0 ? 'PASS' : 'FAIL'}`);
console.log(`Checked samples: ${timelineChecked}`);
console.log(`Out-of-order cases: ${outOfOrderCases}`);
console.log(`Undefined/null/NaN check ? ${invalidOutputTokenCount === 0 ? 'PASS' : 'FAIL'}`);
if (failures.length) {
  console.log('\nFailures:');
  failures.slice(0, 80).forEach((failure) => console.log(`- ${failure}`));
  process.exitCode = 1;
}
