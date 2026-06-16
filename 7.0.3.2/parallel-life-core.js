(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory;
  root.createParallelLifeEngine = factory;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createParallelLifeEngine(envData, eventData, copyData, evaluationData) {
  const envQuestions = envData.envQuestions;
  const envParamKeys = envData.envParamKeys;
  const envOptionDeltas = envData.envOptionDeltas;
  const fallbackReactions = envData.personalityLifeReactionFallbacks;
  const themeRules = envData.eventThemeRules;
  const events = eventData.events;
  const eventCopy = copyData.eventCopy;
  const themeSceneOpeners = copyData.themeSceneOpeners || {};
  const impactTagCopy = evaluationData.impactTagCopy;
  const evaluationLineCopy = evaluationData.evaluationLineCopy;
  const tagLines = evaluationData.tagLines;
  const personalityTemplates = evaluationData.personalityTemplates;
  const themeById = Object.fromEntries((eventData.themes || []).map((theme) => [theme.id, theme]));
  const eventsByTheme = events.reduce((acc, event) => {
    if (!acc[event.themeId]) acc[event.themeId] = [];
    acc[event.themeId].push(event);
    return acc;
  }, {});
  const LIFE_STAGE_ORDER = {
    EARLY_CHILDHOOD: 10,
    LOWER_PRIMARY: 20,
    UPPER_PRIMARY: 30,
    MIDDLE_SCHOOL: 40,
    HIGH_SCHOOL: 50,
    GAOKAO_CHOICE: 60,
    UNIVERSITY: 70,
    EARLY_ADULTHOOD: 80
  };

  function clamp(value, min = 0, max = 100) { return Math.max(min, Math.min(max, value)); }
  function round(value) { return Math.round(value * 10) / 10; }
  function scoreToPercent(value) { return clamp(Math.round(((value || 0) + 100) / 2), 0, 100); }
  function average(values) { return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 50; }
  function stableHash(input) {
    const text = typeof input === 'string' ? input : JSON.stringify(input);
    let h = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function random() {
      a += 0x6D2B79F5;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function createBaseEnvVector() {
    return Object.fromEntries(envParamKeys.map((key) => [key, 50]));
  }
  function computeParallelLifeEnvVector(answers) {
    const vector = createBaseEnvVector();
    Object.entries(answers || {}).forEach(([questionId, optionId]) => {
      const deltaMap = envOptionDeltas[questionId]?.[optionId] || {};
      Object.entries(deltaMap).forEach(([param, delta]) => {
        if (param in vector) vector[param] += delta;
      });
    });
    envParamKeys.forEach((key) => { vector[key] = clamp(vector[key], 0, 100); });
    return vector;
  }
  function deriveLifeReactionVector(personalityCode, rawDimensionVector) {
    const fallback = fallbackReactions[personalityCode] || fallbackReactions.P01;
    if (!rawDimensionVector) return { ...fallback };
    const expanded = rawDimensionVector.expanded || rawDimensionVector;
    const base = rawDimensionVector.B_final || rawDimensionVector.final8 || rawDimensionVector;
    return {
      emotionalAlert: scoreToPercent(base.ES),
      expressDrive: scoreToPercent(base.EXP),
      autonomyDrive: scoreToPercent(base.AUT),
      safetyNeed: scoreToPercent(base.SAFE),
      ruleFit: scoreToPercent(base.RULE),
      riskDrive: scoreToPercent(base.RISK),
      boundaryNeed: scoreToPercent(base.BOUND),
      careDrive: scoreToPercent(base.CARE),
      achievementBind: clamp(Math.round(scoreToPercent(base.RULE) * 0.45 + scoreToPercent(base.EXP) * 0.25 + scoreToPercent(base.AUT) * 0.30), 0, 100),
      meaningDrive: scoreToPercent(expanded.D02 ?? base.AUT)
    };
  }
  function weightedAverageFromTerms(terms, vector) {
    let total = 0;
    let weightSum = 0;
    terms.forEach((term) => {
      const rawValue = vector[term.key] ?? 50;
      const value = term.inverse ? 100 - rawValue : rawValue;
      total += value * term.weight;
      weightSum += term.weight;
    });
    return weightSum === 0 ? 50 : total / weightSum;
  }
  function pickFrom(list, key) {
    return list[stableHash(key) % list.length];
  }
  function parseAgeRange(ageRange) {
    const nums = String(ageRange || '').match(/\d+/g)?.map(Number) || [];
    return { start: nums[0] || 0, end: nums[1] || nums[0] || 0 };
  }
  function inferLifeStageOrder(event, ageStart) {
    const scene = event.sceneCore || '';
    if (event.themeId === 'T14_GAOKAO_STABLE_PATH' || /志愿|专业|高考|路线|城市/.test(scene)) return LIFE_STAGE_ORDER.GAOKAO_CHOICE;
    if (event.themeId === 'T15_LEAVING_FAMILIAR_PLACE' || /外地|陌生地方|新城市|离开熟悉环境/.test(scene)) return LIFE_STAGE_ORDER.UNIVERSITY;
    if (event.themeId === 'T16_DEVIATING_EXPECTATION' || /不走最稳|另一种人生|我的人生/.test(scene)) return LIFE_STAGE_ORDER.EARLY_ADULTHOOD;
    if (ageStart <= 5) return LIFE_STAGE_ORDER.EARLY_CHILDHOOD;
    if (ageStart <= 8) return LIFE_STAGE_ORDER.LOWER_PRIMARY;
    if (ageStart <= 12) return LIFE_STAGE_ORDER.UPPER_PRIMARY;
    if (ageStart <= 15) return LIFE_STAGE_ORDER.MIDDLE_SCHOOL;
    if (ageStart <= 18) return LIFE_STAGE_ORDER.HIGH_SCHOOL;
    if (ageStart <= 22) return LIFE_STAGE_ORDER.UNIVERSITY;
    return LIFE_STAGE_ORDER.EARLY_ADULTHOOD;
  }
  function timelineMetaForEvent(event, originalIndex = 0) {
    const { start, end } = parseAgeRange(event.ageRange);
    const ageStart = start || 999;
    const ageEnd = end || ageStart;
    return {
      ageStart,
      ageEnd,
      lifeStageOrder: inferLifeStageOrder(event, ageStart),
      originalIndex
    };
  }
  function compareTimelineItems(a, b) {
    const aStage = a.lifeStageOrder ?? timelineMetaForEvent(a.event || {}).lifeStageOrder ?? 999;
    const bStage = b.lifeStageOrder ?? timelineMetaForEvent(b.event || {}).lifeStageOrder ?? 999;
    if (aStage !== bStage) return aStage - bStage;
    const aAge = a.ageStart ?? timelineMetaForEvent(a.event || {}).ageStart ?? 999;
    const bAge = b.ageStart ?? timelineMetaForEvent(b.event || {}).ageStart ?? 999;
    if (aAge !== bAge) return aAge - bAge;
    const aEnd = a.ageEnd ?? timelineMetaForEvent(a.event || {}).ageEnd ?? 999;
    const bEnd = b.ageEnd ?? timelineMetaForEvent(b.event || {}).ageEnd ?? 999;
    if (aEnd !== bEnd) return aEnd - bEnd;
    return (a.originalIndex ?? 0) - (b.originalIndex ?? 0);
  }
  function withTimelineMeta(item, index) {
    const originalIndex = item.originalIndex ?? index;
    return { ...item, ...timelineMetaForEvent(item.event, originalIndex) };
  }
  function sortSelectedEventsByTimeline(selectedEvents) {
    return [...selectedEvents].map(withTimelineMeta).sort(compareTimelineItems);
  }
  function sortExperiencesByTimeline(experiences) {
    return [...experiences].sort(compareTimelineItems);
  }
  function stageLabel(event) {
    const { start, end } = parseAgeRange(event.ageRange);
    const scene = event.sceneCore || '';
    if (event.themeId === 'T14_GAOKAO_STABLE_PATH' || /志愿|专业|高考|路线|城市/.test(scene)) {
      return pickFrom(['高中后半段', '填志愿前后', '开始认真比较未来路线的时候'], event.eventId);
    }
    if (event.themeId === 'T15_LEAVING_FAMILIAR_PLACE' || /外地|陌生地方|新城市|离开熟悉环境/.test(scene)) {
      return pickFrom(['大学前后', '离开熟悉环境以后', '真正开始自己处理生活的时候'], event.eventId);
    }
    if (event.themeId === 'T16_DEVIATING_EXPECTATION' || /不走最稳|另一种人生|我的人生/.test(scene)) {
      return pickFrom(['大学前后', '真正开始自己做选择以后', '开始认真把人生方向拿回自己手里时'], event.eventId);
    }
    if (end <= 5 || start <= 5) return pickFrom(['很小的时候', '四五岁的时候', '还没完全懂事的时候'], event.eventId);
    if (start <= 8) return pickFrom(['刚上小学那几年', '七八岁的时候', '刚开始有自己小圈子的时候'], event.eventId);
    if (start <= 12) return pickFrom(['小学高年级时', '十岁前后', '快要升初中时'], event.eventId);
    if (start <= 15) return pickFrom(['初中那几年', '十三四岁的时候', '开始特别在意同伴目光的时候'], event.eventId);
    if (start <= 18) return pickFrom(['高中阶段', '高中后半段', '越来越接近独立选择的时候'], event.eventId);
    if (start <= 22) return pickFrom(['大学前后', '离开熟悉环境以后', '真正开始自己做选择以后'], event.eventId);
    return '成长过程中的某个具体阶段';
  }
  function fillSceneTemplate(template, event) {
    const scene = event.sceneCore || '某个具体时刻';
    return template
      .replaceAll('{stage}', stageLabel(event))
      .replaceAll('{scene}', scene);
  }
  function topEventImpactSentences(event) {
    return event.impactTags
      .filter((item) => item.weight > 0 && impactTagCopy[item.tag])
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 2)
      .map((item) => impactTagCopy[item.tag].text);
  }
  function variantBridge(variant, event) {
    const bridgeMap = {
      support: [
        '周围没有急着把这件事变成评价，而是给了你一点可以解释、尝试或放松的空间。',
        '那时的回应相对柔和，让你能把紧张放下来一点，也更敢把真实反应留在现场。',
        '有人用比较接纳的方式回应你，于是这件事没有只留下压力，也留下了一点可以继续靠近的可能。'
      ],
      repair: [
        '事情一开始并不轻松，但后面有人愿意解释、补救或重新靠近，让它没有只停在受伤的位置。',
        '后来出现过一次缓和的机会，让你知道关系和选择并不是错了以后就只能断掉。',
        '这件事留下过不舒服的部分，也被后来的理解慢慢修补了一点。'
      ],
      pressure: [
        '周围的回应更像是在提醒你后果，于是你会更快收紧自己，先把不安和退路都想清楚。',
        '那时你很快意识到，出错、表达或靠近都可能有代价，所以你会先把自己放到更安全的位置。',
        '外界没有给太多缓冲，你只能更早学会观察脸色、计算后果，再决定要不要继续往前。'
      ],
      mixed: [
        '它没有把你推向单一方向：一部分经验让你更谨慎，另一部分又让你知道自己仍然可以调整。',
        '这件事同时给了你一点打开和一点收紧，所以后来你不太会完全冲出去，也不会完全退回去。',
        '你从里面学到的不是简单的好或坏，而是要一边保留自己，一边判断现实能不能接住你。'
      ]
    };
    return pickFrom(bridgeMap[variant] || bridgeMap.mixed, `${event.eventId}:${variant}`);
  }
  function buildExperienceText(item) {
    const event = item.event;
    const template = themeSceneOpeners[event.themeId] || '{stage}，{scene}。这个具体时刻让你更早意识到，环境会改变一个人表达自己的方式。';
    const sceneText = fillSceneTemplate(template, event);
    const impactText = topEventImpactSentences(event).join('') || '这件事会慢慢改变你处理关系、选择和风险的方式。';
    return `${sceneText}${variantBridge(item.variant, event)}${impactText}`;
  }
  function scoreEventTheme(theme, envVector, lifeReactionVector) {
    const envFit = weightedAverageFromTerms(theme.envTerms, envVector);
    const personalityFit = weightedAverageFromTerms(theme.personalityTerms, lifeReactionVector);
    return { themeId: theme.id, name: theme.name, envFit: round(envFit), personalityFit: round(personalityFit), score: round(envFit * 0.7 + personalityFit * 0.3) };
  }
  function scoreAllEventThemes(envVector, lifeReactionVector) {
    return themeRules.map((theme) => scoreEventTheme(theme, envVector, lifeReactionVector)).sort((a, b) => b.score - a.score);
  }
  function selectEventThemes(scoredThemes) {
    const sorted = [...scoredThemes].sort((a, b) => b.score - a.score);
    const selected = sorted.slice(0, 5);
    if (sorted[5] && sorted[5].score >= 56) selected.push(sorted[5]);
    if (sorted[6] && sorted[6].score >= 66) selected.push(sorted[6]);
    if (sorted[7] && sorted[7].score >= 70) selected.push(sorted[7]);
    return selected.slice(0, 8);
  }
  function familyScores(envVector) {
    const supportScore = average([envVector.warmth, envVector.expressionSafety, envVector.peerSupport, envVector.teacherSupport, envVector.socialPermission, envVector.tolerance, envVector.belonging]);
    const pressureScore = average([envVector.pressure, envVector.control, envVector.comparison, envVector.schoolPressure, envVector.conflict, 100 - envVector.expressionSafety, envVector.pathSingularity]);
    const repairScore = average([envVector.repair, envVector.warmth, envVector.protection, envVector.teacherSupport, envVector.peerSupport, envVector.tolerance]);
    const resourceScore = average([envVector.resource, envVector.retrySpace, envVector.infoAccess, 100 - envVector.socialCost]);
    return { supportScore: round(supportScore), pressureScore: round(pressureScore), repairScore: round(repairScore), resourceScore: round(resourceScore) };
  }
  function eventTagScore(event, tagPattern) {
    return event.impactTags.reduce((sum, item) => sum + (tagPattern.test(item.tag) ? Math.abs(item.weight) : 0), 0);
  }
  function eventScore(event, themeScore, envVector, lifeReactionVector, scores, seedBump) {
    const impact = event.impactTags.map((item) => item.tag).join(' ');
    let fit = themeScore * 0.46 + 18;
    if (/BACKUP_TRUST|BELONGING_REPAIRED|BEING_SEEN|CONFIDENCE_TO_TRY|SOCIAL_PERMISSION|RETRY_SPACE|REPAIR_UNDERSTANDING/.test(impact)) {
      fit += scores.supportScore * 0.10 + scores.repairScore * 0.10;
    }
    if (/COST_AWARENESS|RESOURCE_REALISM|SOCIAL_WITHDRAW_COST|OPPORTUNITY_AWARE/.test(impact)) fit += (100 - scores.resourceScore) * 0.12;
    if (/ACHIEVEMENT_BIND|PROOF_DRIVE|COMPARISON_WOUND|FAILURE_FEAR|STABLE_PATH_DEPEND/.test(impact)) fit += scores.pressureScore * 0.10;
    if (/AUTONOMY_AWAKEN|BOUNDARY_HARDEN|CONTROL_SENSITIVITY|DECISION_OWNERSHIP|IDENTITY_DIFF/.test(impact)) fit += lifeReactionVector.autonomyDrive * 0.05 + lifeReactionVector.boundaryNeed * 0.05;
    fit += seedBump;
    return round(fit);
  }
  function weightedPick(items, random) {
    const minScore = Math.min(...items.map((item) => item.score));
    const weights = items.map((item) => Math.max(1, item.score - minScore + 8));
    const total = weights.reduce((sum, value) => sum + value, 0);
    let roll = random() * total;
    for (let i = 0; i < items.length; i += 1) {
      roll -= weights[i];
      if (roll <= 0) return items[i];
    }
    return items[items.length - 1];
  }
  function chooseVariant(event, envVector, scores) {
    const tags = event.impactTags.map((item) => item.tag).join(' ');
    if (scores.repairScore >= 62 && (scores.pressureScore >= 54 || /REPAIR|BACKUP|BELONGING/.test(tags))) return 'repair';
    if (scores.supportScore >= 64 && scores.pressureScore < 68) return 'support';
    if (scores.pressureScore >= 66 || scores.supportScore <= 38 || scores.repairScore <= 35) return 'pressure';
    return 'mixed';
  }
  function hasPositiveEvent(selectedEvents) {
    return selectedEvents.some((item) => item.event.positiveAllowed || item.event.impactTags.some((tag) => tag.weight < 0));
  }
  function selectSpecificEvents(selectedThemes, envVector, lifeReactionVector, seed) {
    const random = mulberry32(seed);
    const scores = familyScores(envVector);
    const chosen = [];
    for (const theme of selectedThemes) {
      const pool = eventsByTheme[theme.themeId] || [];
      const scored = pool.map((event, index) => ({ event, score: eventScore(event, theme.score, envVector, lifeReactionVector, scores, random() * 10 + index) }));
      const picked = weightedPick(scored, random);
      const variant = chooseVariant(picked.event, envVector, scores);
      chosen.push({ theme, event: picked.event, eventScore: picked.score, variant, copy: eventCopy[picked.event.eventId]?.variants?.[variant] || eventCopy[picked.event.eventId]?.variants?.mixed || '', originalIndex: chosen.length });
    }
    if (!hasPositiveEvent(chosen)) {
      const positiveThemes = ['T03_SOCIAL_PERMISSION', 'T04_FAMILY_BACKUP', 'T06_ACHIEVEMENT_RECOGNITION', 'T10_PEER_ACCEPTANCE'];
      const candidateThemes = scoreAllEventThemes(envVector, lifeReactionVector).filter((theme) => positiveThemes.includes(theme.themeId));
      for (const candidate of candidateThemes) {
        if (chosen.some((item) => item.theme.themeId === candidate.themeId)) continue;
        const pool = eventsByTheme[candidate.themeId] || [];
        const scored = pool.map((event, index) => ({ event, score: eventScore(event, candidate.score, envVector, lifeReactionVector, scores, random() * 10 + index) }));
        const picked = weightedPick(scored, random);
        const replaceIndex = chosen.reduce((minIndex, item, index, arr) => item.theme.score < arr[minIndex].theme.score ? index : minIndex, 0);
        chosen[replaceIndex] = { theme: candidate, event: picked.event, eventScore: picked.score, variant: 'repair', copy: eventCopy[picked.event.eventId]?.variants?.repair || eventCopy[picked.event.eventId]?.variants?.support || '', originalIndex: chosen[replaceIndex]?.originalIndex ?? replaceIndex };
        break;
      }
    }
    return sortSelectedEventsByTimeline(chosen);
  }
  function aggregateImpactTags(selectedEvents) {
    const scores = {};
    selectedEvents.forEach((item) => {
      item.event.impactTags.forEach((tag) => {
        scores[tag.tag] = (scores[tag.tag] || 0) + tag.weight;
      });
    });
    return scores;
  }
  function aggregateTagLines(tagScores) {
    const lineScores = {};
    Object.entries(tagLines).forEach(([line, tags]) => {
      lineScores[line] = tags.reduce((sum, tag) => sum + Math.max(0, tagScores[tag] || 0), 0);
    });
    return lineScores;
  }
  function pickDevelopmentMode(tagScores, envVector, scores) {
    const positive = ['BACKUP_TRUST', 'BELONGING_REPAIRED', 'REPAIR_UNDERSTANDING', 'CONFIDENCE_TO_TRY', 'BEING_SEEN', 'RETRY_SPACE', 'EXPRESSION_CONFIDENCE'].reduce((sum, tag) => sum + Math.max(0, tagScores[tag] || 0), 0);
    const pressure = ['FAILURE_FEAR', 'SELF_HIDE', 'BOUNDARY_HARDEN', 'ACHIEVEMENT_BIND', 'COMPARISON_WOUND', 'STABLE_PATH_DEPEND', 'COST_AWARENESS', 'RESOURCE_REALISM', 'CARE_BURDEN'].reduce((sum, tag) => sum + Math.max(0, tagScores[tag] || 0), 0);
    if (positive >= 7 && pressure >= 6) return 'repaired';
    if (positive >= pressure + 4 && scores.supportScore >= 58) return 'amplified';
    if (pressure >= positive + 5 && scores.pressureScore >= 56) return 'suppressed';
    if (scores.resourceScore >= 58 || scores.repairScore >= 58) return 'compensated';
    return 'adapted';
  }
  function topKnownImpactSentences(tagScores, mainLines) {
    const allowedTags = new Set(mainLines.flatMap((line) => tagLines[line] || []));
    return Object.entries(tagScores)
      .filter(([tag, value]) => value > 0 && impactTagCopy[tag] && (allowedTags.has(tag) || allowedTags.size === 0))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([tag]) => impactTagCopy[tag].text);
  }
  function originalBaselineText(lifeReactionVector) {
    const vector = lifeReactionVector || {};
    const signals = [];
    if ((vector.emotionalAlert || 0) >= 62) signals.push('原本就容易捕捉细微变化');
    if ((vector.expressDrive || 0) >= 62) signals.push('原本有向外表达和连接的冲动');
    if ((vector.autonomyDrive || 0) >= 62) signals.push('原本很在意选择权');
    if ((vector.safetyNeed || 0) >= 62) signals.push('原本需要可预测的安全感');
    if ((vector.careDrive || 0) >= 62) signals.push('原本会主动感知关系里的温度');
    if ((vector.meaningDrive || 0) >= 62) signals.push('原本就会追问一件事是否真正有意义');
    return signals.slice(0, 2).join('，') || '原本的底色并没有消失';
  }
  function buildEvaluationSections({ personalityCode, developmentMode, template, impactText, gainCostText, closing, mainLines, lineCopy, tagScores, lifeReactionVector }) {
    const primaryLine = mainLines[0] || '自我确认线';
    const secondaryLine = mainLines[1] || primaryLine;
    const baseline = originalBaselineText(lifeReactionVector);
    const pressure = ['FAILURE_FEAR', 'SELF_HIDE', 'BOUNDARY_HARDEN', 'ACHIEVEMENT_BIND', 'COMPARISON_WOUND', 'STABLE_PATH_DEPEND', 'COST_AWARENESS', 'RESOURCE_REALISM', 'CARE_BURDEN'].reduce((sum, tag) => sum + Math.max(0, tagScores[tag] || 0), 0);
    const repair = ['BACKUP_TRUST', 'BELONGING_REPAIRED', 'REPAIR_UNDERSTANDING', 'RETRY_SPACE', 'CONFIDENCE_TO_TRY', 'EXPRESSION_CONFIDENCE', 'BEING_SEEN'].reduce((sum, tag) => sum + Math.max(0, tagScores[tag] || 0), 0);
    const shellText = pressure > repair
      ? '这条人生里的你更可能长出一层提前预判的外壳。你会把很多选择先放进风险、成本和关系后果里过一遍，再决定自己要不要往前。'
      : '这条人生里的你更可能长出一层可进可退的外壳。你仍会谨慎，但不会只靠防备生活，也更敢把需要、兴趣和选择拿出来试一试。';
    const directionText = developmentMode === 'amplified'
      ? '这条人生更像是在放大你的底色，而不是把它压回去。你会更早把自己的敏感、表达或选择感发展成可以行动的能力。'
      : developmentMode === 'suppressed'
        ? '这条人生更像是在训练你先保护自己。你不一定失去原来的部分，但会更晚、更谨慎地把它交给外界。'
        : developmentMode === 'repaired'
          ? '这条人生的重要变化，是伤口没有停在原地。某些被接住、被解释、被看见的时刻，会让你重新相信关系和选择仍然可以修复。'
          : '这条人生会把你的底色带进现实条件里重新塑形。你不只按原来的方式反应，也会学着在成本、关系和自由之间找到新的走法。';
    return [
      { title: '和你的原本底色相比', body: `和你的原本底色相比，这条人生里的你${baseline}，但表达方式会被经历重新训练。你不是变成另一个人，而是更早学会判断哪些地方安全、哪些地方需要收住。` },
      { title: '被环境放大的部分', body: impactText },
      { title: '你长出的新外壳', body: shellText },
      { title: '你更可能走向哪里', body: directionText },
      { title: '这条人生的优势与代价', body: gainCostText || `${lineCopy.gain}${lineCopy.cost}` }
    ].filter((section) => section.body && section.body.trim());
  }
  function buildFinalEvaluation({ personalityCode, selectedEvents, envVector, lifeReactionVector }) {
    const tagScores = aggregateImpactTags(selectedEvents);
    const lineScores = aggregateTagLines(tagScores);
    const sortedLines = Object.entries(lineScores).sort((a, b) => b[1] - a[1]).filter(([, value]) => value > 0);
    const mainLines = sortedLines.slice(0, 2).map(([line]) => line);
    const supportLine = sortedLines[2]?.[0] || mainLines[0] || '自我确认线';
    const scores = familyScores(envVector);
    const developmentMode = pickDevelopmentMode(tagScores, envVector, scores);
    const template = personalityTemplates[personalityCode]?.[developmentMode] || personalityTemplates[personalityCode]?.adapted || '这条人生里的你，会在环境里发展出一套新的生存方式。你的底色没有消失，只是被经历训练出了不同的表达方式。';
    const impactSentences = topKnownImpactSentences(tagScores, mainLines);
    const repairScore = ['BACKUP_TRUST', 'BELONGING_REPAIRED', 'REPAIR_UNDERSTANDING', 'RETRY_SPACE', 'CONFIDENCE_TO_TRY'].reduce((sum, tag) => sum + Math.max(0, tagScores[tag] || 0), 0);
    const impactText = impactSentences.length ? impactSentences.join('') + (repairScore > 0 ? '这些经历让你没有只剩下防备，也保留了重新相信和重新尝试的空间。' : '') : '这些经历共同塑造了这条人生里的反应方式，但它们不是命运，只是一组更可能出现的路径。';
    const primaryLine = mainLines[0] || supportLine;
    const lineCopy = evaluationLineCopy[primaryLine] || evaluationLineCopy['自我确认线'];
    const gainCostText = `${lineCopy.gain}${lineCopy.cost}`;
    let closing = '所以这条人生里的你，不是变成了另一个完全陌生的人。你的底色还在，只是被环境训练出新的外壳、优势和代价。';
    if ((tagScores.MEANING_QUESTION || 0) + (tagScores.IDENTITY_DIFF || 0) > 3) closing = '所以这条人生里的你，会更早把“别人认为正确的路”和“真正属于自己的路”分开。你的底色没有消失，只是开始用更现实的方式确认方向。';
    else if (repairScore > 3) closing = '所以这条人生里的你，不会只用防备理解世界。被修复、被接住、被认真看见的经验，会让你的底色保留柔软，也更懂得把自己交给可靠的人。';
    else if ((tagScores.BOUNDARY_HARDEN || 0) + (tagScores.CONTROL_SENSITIVITY || 0) > 3) closing = '所以这条人生里的你，会更清楚边界和选择权的重要。你不是拒绝亲近，只是更需要在靠近之前确认自己仍然拥有自己。';
    const sections = buildEvaluationSections({ personalityCode, developmentMode, template, impactText, gainCostText, closing, mainLines, lineCopy, tagScores, lifeReactionVector });
    return { sections, paragraphs: sections.map((section) => section.body), tagScores, lineScores, mainLines, supportLine, developmentMode };
  }
  function summarizeEnvAnswers(envAnswers) {
    return envQuestions.map((question) => {
      const optionId = envAnswers[question.id];
      const option = question.options.find((item) => item.id === optionId);
      return { questionId: question.id, title: question.title, optionId, label: option?.label || '未选择' };
    });
  }
  function generateParallelLife({ personalityResult, personalityCode, rawDimensionVector, envAnswers, seed = 0 }) {
    const code = personalityCode || personalityResult?.main?.id || 'P01';
    const rawVector = rawDimensionVector || personalityResult;
    const envVector = computeParallelLifeEnvVector(envAnswers);
    const lifeReactionVector = deriveLifeReactionVector(code, rawVector);
    const scoredThemes = scoreAllEventThemes(envVector, lifeReactionVector);
    const selectedThemes = selectEventThemes(scoredThemes);
    const baseSeed = stableHash({ code, envAnswers, seed });
    const selectedEvents = selectSpecificEvents(selectedThemes, envVector, lifeReactionVector, baseSeed);
    const experiences = sortExperiencesByTimeline(selectedEvents.map((item) => ({
      text: buildExperienceText(item),
      ageRange: item.event.ageRange,
      ageStart: item.ageStart,
      ageEnd: item.ageEnd,
      lifeStageOrder: item.lifeStageOrder,
      originalIndex: item.originalIndex,
      sceneCore: item.event.sceneCore,
      eventId: item.event.eventId,
      themeId: item.theme.themeId,
      impactTags: item.event.impactTags,
      variant: item.variant,
      sourceText: item.copy
    })).filter((item) => item.text));
    const evaluation = buildFinalEvaluation({ personalityCode: code, selectedEvents, envVector, lifeReactionVector });
    return {
      personalityCode: code,
      envAnswers,
      envSummary: summarizeEnvAnswers(envAnswers),
      envVector,
      lifeReactionVector,
      scoredThemes,
      selectedThemes,
      selectedThemeIds: selectedThemes.map((theme) => theme.themeId),
      selectedThemeCount: selectedThemes.length,
      selectedEvents,
      experiences,
      impactTagScores: evaluation.tagScores,
      evaluation,
      seed: baseSeed
    };
  }
  return {
    computeParallelLifeEnvVector,
    deriveLifeReactionVector,
    weightedAverageFromTerms,
    scoreEventTheme,
    scoreAllEventThemes,
    selectEventThemes,
    generateParallelLife,
    aggregateImpactTags,
    buildFinalEvaluation,
    stableHash,
    __debug: {
      familyScores,
      eventScore,
      selectSpecificEvents,
      timelineMetaForEvent,
      sortSelectedEventsByTimeline,
      sortExperiencesByTimeline,
      LIFE_STAGE_ORDER
    }
  };
});
