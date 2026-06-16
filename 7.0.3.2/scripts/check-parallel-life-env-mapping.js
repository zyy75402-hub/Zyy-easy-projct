#!/usr/bin/env node
const envData = require('../parallel-life-env.js');
const eventData = require('../parallel-life-events.js');
const copyData = require('../parallel-life-copy.js');
const evaluationData = require('../parallel-life-evaluation.js');
const createParallelLifeEngine = require('../parallel-life-core.js');
const engine = createParallelLifeEngine(envData, eventData, copyData, evaluationData);

const prototypes = Object.keys(envData.personalityLifeReactionFallbacks);
const themeIds = envData.eventThemeRules.map((theme) => theme.id);
const questionOptionLists = envData.envQuestions.map((q) => q.options.map((option) => [q.id, option.id]));
const totalEnvCombos = questionOptionLists.reduce((total, options) => total * options.length, 1);
const expectedTotal = totalEnvCombos * prototypes.length;
const themeCounts = Object.fromEntries(themeIds.map((id) => [id, 0]));
const countDistribution = { 5: 0, 6: 0, 7: 0, 8: 0 };
const personalityThemeCounts = Object.fromEntries(prototypes.map((id) => [id, Object.fromEntries(themeIds.map((themeId) => [themeId, 0]))]));
let invalidCount = 0;
let total = 0;

function walk(index, answers, cb) {
  if (index >= questionOptionLists.length) {
    cb(answers);
    return;
  }
  for (const [qid, opt] of questionOptionLists[index]) {
    answers[qid] = opt;
    walk(index + 1, answers, cb);
  }
}

walk(0, {}, (answers) => {
  const envVector = engine.computeParallelLifeEnvVector(answers);
  for (const personalityCode of prototypes) {
    const lifeReactionVector = engine.deriveLifeReactionVector(personalityCode);
    const selectedThemes = engine.selectEventThemes(engine.scoreAllEventThemes(envVector, lifeReactionVector));
    total += 1;
    if (selectedThemes.length < 5 || selectedThemes.length > 8) invalidCount += 1;
    countDistribution[selectedThemes.length] = (countDistribution[selectedThemes.length] || 0) + 1;
    for (const theme of selectedThemes) {
      themeCounts[theme.themeId] += 1;
      personalityThemeCounts[personalityCode][theme.themeId] += 1;
    }
  }
});

function pct(value) { return value / total * 100; }
const themeRates = Object.fromEntries(themeIds.map((id) => [id, pct(themeCounts[id])]));
const failures = [];
if (total !== 16796160) failures.push(`total combinations expected 16796160, got ${total}`);
if (total !== expectedTotal) failures.push(`computed expected total mismatch ${expectedTotal}`);
for (const id of themeIds) {
  if (themeRates[id] <= 1) failures.push(`${id} frequency <= 1% (${themeRates[id].toFixed(2)}%)`);
  if (themeRates[id] >= 85) failures.push(`${id} frequency >= 85% (${themeRates[id].toFixed(2)}%)`);
}
if (invalidCount) failures.push(`selectedThemeCount outside 5-8: ${invalidCount}`);
if ((countDistribution[6] || 0) < (countDistribution[8] || 0)) failures.push('6-event outputs are not above 8-event outputs');
for (const personalityCode of prototypes) {
  const counts = Object.values(personalityThemeCounts[personalityCode]);
  const active = counts.filter((count) => count > 0).length;
  if (active < 10) failures.push(`${personalityCode} has severe theme collapse (${active}/16 active themes)`);
}

console.log(`Total combinations: ${total}`);
console.log('\nSelected theme count distribution:');
for (const count of [5, 6, 7, 8]) console.log(`${count}: ${((countDistribution[count] || 0) / total * 100).toFixed(2)}%`);
console.log('\nTheme selection frequency:');
for (const theme of envData.eventThemeRules) console.log(`${theme.id} ${theme.name}: ${themeRates[theme.id].toFixed(2)}%`);
console.log('\nValidation:');
console.log(`Total combinations = 16,796,160 ? ${total === 16796160 ? 'PASS' : 'FAIL'}`);
console.log(`Every theme > 1% ? ${themeIds.every((id) => themeRates[id] > 1) ? 'PASS' : 'FAIL'}`);
console.log(`Every theme < 85% ? ${themeIds.every((id) => themeRates[id] < 85) ? 'PASS' : 'FAIL'}`);
console.log(`Theme count always 5-8 ? ${invalidCount === 0 ? 'PASS' : 'FAIL'}`);
console.log(`6-event outputs above 8-event outputs ? ${(countDistribution[6] || 0) > (countDistribution[8] || 0) ? 'PASS' : 'FAIL'}`);
if (failures.length) {
  console.log('\nFailures:');
  failures.forEach((failure) => console.log(`- ${failure}`));
  process.exitCode = 1;
}
