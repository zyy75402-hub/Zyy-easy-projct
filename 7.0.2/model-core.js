(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory;
  root.createBBTIModel = factory;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createBBTIModel(data) {
  const DIMS = data.dimensions;
  const DERIVED_DIMS = data.derivedDimensions;
  const MATCH_DIMS = DIMS.concat(DERIVED_DIMS);
  const FEEDBACK_DIMS = data.feedbackDimensions;
  const DIM_LABELS = data.dimensionLabels;
  const CORE_DIMS = data.coreDimensions;
  const TAG_META = data.tagMeta;
  const TAG_PRIORITY = data.tagPriority;
  const OBSERVE_META = data.observeMeta;
  const ALL_SCORE_DIMS = {
    R: DIMS,
    C: DIMS,
    F: FEEDBACK_DIMS,
    E: ['COST']
  };

  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function round(value) { return Math.round(value * 10) / 10; }
  function emptyVector(keys) { return Object.fromEntries(keys.map((key) => [key, 0])); }
  function addTo(vec, dim, value) { vec[dim] = (vec[dim] || 0) + value; }
  function confidenceItem(confidenceKey) { return data.confidence.find((item) => item.key === confidenceKey) || data.confidence[1]; }
  function moduleName(q) { return data.modules.find((m) => m.ids.includes(q.id))?.name || '题目'; }

  function optionDimSum(option, layer, dim) {
    return option.weights.filter((w) => w.layer === layer && w.dim === dim).reduce((sum, w) => sum + w.value, 0);
  }

  function theoreticalRanges() {
    const ranges = {};
    for (const [layer, dims] of Object.entries(ALL_SCORE_DIMS)) {
      ranges[layer] = {};
      for (const dim of dims) {
        let min = 0;
        let max = 0;
        for (const q of data.questions) {
          const values = q.options.map((opt) => optionDimSum(opt, layer, dim));
          min += Math.min(...values);
          max += Math.max(...values);
        }
        ranges[layer][dim] = { min, max };
      }
    }
    return ranges;
  }
  const ranges = theoreticalRanges();

  function normalizeSigned(raw, range) {
    if (!range || range.max === range.min) return 0;
    return clamp(round(((raw - range.min) / (range.max - range.min)) * 200 - 100), -100, 100);
  }
  function normalizePositive(raw, range) {
    if (!range || range.max === range.min) return 0;
    return clamp(round(((raw - range.min) / (range.max - range.min)) * 100), 0, 100);
  }

  function mbtiBaseVector(mbti, confidenceKey) {
    const vec = emptyVector(DIMS);
    const weight = confidenceItem(confidenceKey).weight;
    for (const letter of mbti) {
      const map = data.mbtiAxisMap[letter] || {};
      for (const [dim, value] of Object.entries(map)) addTo(vec, dim, value * weight);
    }
    for (const dim of DIMS) vec[dim] = clamp(round(vec[dim]), -100, 100);
    return vec;
  }

  function rawScores(answers) {
    const C = emptyVector(DIMS);
    const R = emptyVector(DIMS);
    const F = emptyVector(FEEDBACK_DIMS);
    const E = { COST: 0 };
    const clues = [];
    for (const q of data.questions) {
      const opt = q.options.find((item) => item.key === answers[q.id]);
      if (!opt) continue;
      for (const w of opt.weights) {
        if (w.layer === 'C' && DIMS.includes(w.dim)) addTo(C, w.dim, w.value);
        if (w.layer === 'R' && DIMS.includes(w.dim)) addTo(R, w.dim, w.value);
        if (w.layer === 'F' && FEEDBACK_DIMS.includes(w.dim)) addTo(F, w.dim, w.value);
        if (w.layer === 'E' && w.dim === 'COST') addTo(E, 'COST', w.value);
      }
      clues.push({ q, opt, weights: opt.weights, impact: opt.weights.reduce((acc, w) => acc + Math.abs(w.value), 0) });
    }
    for (const dim of DIMS) { C[dim] = round(C[dim]); R[dim] = round(R[dim]); }
    for (const dim of FEEDBACK_DIMS) F[dim] = round(F[dim]);
    E.COST = round(E.COST);
    return { C, R, F, E, clues };
  }

  function normalizedScores(raw) {
    const R = emptyVector(DIMS);
    const C = emptyVector(DIMS);
    const F = emptyVector(FEEDBACK_DIMS);
    for (const dim of DIMS) {
      R[dim] = normalizeSigned(raw.R[dim], ranges.R[dim]);
      C[dim] = normalizeSigned(raw.C[dim], ranges.C[dim]);
    }
    for (const dim of FEEDBACK_DIMS) F[dim] = normalizePositive(raw.F[dim], ranges.F[dim]);
    const E = { COST: normalizePositive(raw.E.COST, ranges.E.COST) };
    return { R, C, F, E };
  }

  function intensity(score, threshold = 60) { return clamp((score - threshold) / (100 - threshold), 0, 1); }
  function scaled(score, min, max, threshold = 60) { return round(min + (max - min) * intensity(score, threshold)); }
  function addCorrection(delta, details, dim, amount, rule) {
    if (!amount) return;
    const before = delta[dim] || 0;
    delta[dim] = clamp(round(before + amount), -25, 25);
    details.push({ dim, amount: round(amount), rule });
  }

  function reverseCorrections(C_norm, R_norm, B_raw, feedback) {
    const d = emptyVector(DIMS);
    const details = [];
    const { SUP, EVAL, RESP, CTRL } = feedback.F;
    const COST = feedback.E.COST;
    if (COST >= 60 && C_norm.RISK <= 10 && R_norm.RISK >= 20) {
      addCorrection(d, details, 'RISK', scaled(COST, 8, 18), '资源约束型风险压低：COST 高、当前风险承受低，但底色残留里仍有探索信号。');
      addCorrection(d, details, 'SAFE', -scaled(COST, 4, 10), '资源约束型风险压低：系统将一部分安全需求解释为环境成本训练出的外壳。');
    }
    if (COST >= 60 && SUP >= 60 && R_norm.EXP >= 25) addCorrection(d, details, 'EXP', scaled(Math.max(COST, SUP), 8, 18), '愿望压低型表达补偿：成本预演和表达回收同时较高，但低压力表达信号仍存在。');
    if (COST >= 60 && CTRL >= 60 && Math.max(C_norm.AUT, R_norm.AUT) >= 25) addCorrection(d, details, 'AUT', scaled(Math.max(COST, CTRL), 8, 18), '现实牵连型自主补偿：选择成本和控制反馈较高，但自主需求有明显信号。');
    if (COST >= 60 && RESP >= 60 && C_norm.CARE >= 40 && C_norm.BOUND <= 0) {
      addCorrection(d, details, 'CARE', -scaled(Math.max(COST, RESP), 4, 12), '过早懂事型关系修正：关系兜底可能有一部分来自责任内化。');
      addCorrection(d, details, 'BOUND', scaled(Math.max(COST, RESP), 4, 12), '过早懂事型关系修正：系统把一部分边界感向上回推。');
    }
    if (EVAL >= 60 && COST >= 50 && C_norm.SAFE >= 40 && Math.max(R_norm.RISK, R_norm.AUT) >= 20) {
      addCorrection(d, details, 'SAFE', -scaled(Math.max(EVAL, COST), 4, 10, 50), '表现价值绑定型安全修正：评价与成本信号较高，系统不把全部谨慎视为底色。');
      addCorrection(d, details, 'RISK', scaled(Math.max(EVAL, COST), 4, 10, 50), '表现价值绑定型安全修正：底色里仍可能保留探索倾向。');
      addCorrection(d, details, 'AUT', scaled(Math.max(EVAL, COST), 4, 8, 50), '表现价值绑定型安全修正：底色里仍可能保留自主需求。');
    }
    if (SUP >= 60 && R_norm.EXP >= 25) addCorrection(d, details, 'EXP', scaled(SUP, 8, 20), '表达压抑修正：表达回收高，且底色残留里有表达信号。');
    if (EVAL >= 60 && C_norm.RISK <= 10 && R_norm.RISK >= 20) {
      addCorrection(d, details, 'RISK', scaled(EVAL, 6, 16), '评价压力修正：当前风险承受低，但底色残留里仍有试错信号。');
      addCorrection(d, details, 'SAFE', -scaled(EVAL, 4, 8), '评价压力修正：系统下修一部分由评价压力放大的安全需求。');
    }
    if (CTRL >= 60 && Math.max(R_norm.AUT, C_norm.AUT) >= 25) addCorrection(d, details, 'AUT', scaled(CTRL, 8, 20), '选择控制修正：选择回声高，且自主需求有明显信号。');
    if (RESP >= 60 && C_norm.CARE >= 40 && C_norm.BOUND <= 0) {
      addCorrection(d, details, 'CARE', -scaled(RESP, 4, 12), '责任内化修正：关系兜底可能有一部分来自过早懂事。');
      addCorrection(d, details, 'BOUND', scaled(RESP, 4, 12), '责任内化修正：系统把一部分自我边界向上回推。');
    }
    for (const dim of DIMS) d[dim] = clamp(d[dim], -25, 25);
    return { delta: d, details };
  }

  function vectorAdd(a, b) {
    const out = emptyVector(DIMS);
    for (const dim of DIMS) out[dim] = clamp(round((a[dim] || 0) + (b[dim] || 0)), -100, 100);
    return out;
  }
  function baseFormula(R_norm, C_norm, mbtiBase) {
    const out = emptyVector(DIMS);
    for (const dim of DIMS) out[dim] = clamp(round((R_norm[dim] || 0) * 0.65 + (C_norm[dim] || 0) * 0.20 + (mbtiBase[dim] || 0) * 0.15), -100, 100);
    return out;
  }
  function derivedVector(v) {
    return {
      D01: round(v.EXP * 0.6 + v.ES * 0.3 + v.CARE * 0.1),
      D02: round(v.AUT * 0.5 + v.BOUND * 0.3 - v.RULE * 0.2),
      D03: round(v.CARE * 0.6 + v.ES * 0.2 - v.BOUND * 0.2),
      D04: round(v.SAFE * 0.45 + v.RULE * 0.45 - v.RISK * 0.1),
      D05: round(v.RISK * 0.5 + v.AUT * 0.3 + v.EXP * 0.2),
      D06: round(v.SAFE * 0.45 + v.ES * 0.3 - v.RISK * 0.25)
    };
  }
  function expandVector(v) { return { ...v, ...derivedVector(v) }; }
  function levelize(value) {
    if (value >= 60) return 2;
    if (value >= 25) return 1;
    if (value >= -24) return 0;
    if (value >= -59) return -1;
    return -2;
  }
  function levelVector(v) { return Object.fromEntries(MATCH_DIMS.map((dim) => [dim, levelize(v[dim] || 0)])); }
  function dimWeight(proto, dim) {
    const base = DERIVED_DIMS.includes(dim) ? 1.6 : 1.0;
    return base * ((CORE_DIMS[proto.id] || []).includes(dim) ? 2.0 : 1);
  }
  function corePenalty(userExpanded, prototypeExpanded, protoId) {
    let penalty = 0;
    const coreDims = CORE_DIMS[protoId] || [];
    for (const dim of coreDims) {
      const protoValue = prototypeExpanded[dim] || 0;
      const userValue = userExpanded[dim] || 0;
      if (protoValue >= 25 && userValue < 15) {
        penalty += 1.5;
      } else if (protoValue <= -25 && userValue > -15) {
        penalty += 1.5;
      } else if ((protoValue >= 25 && userValue >= 25) || (protoValue <= -25 && userValue <= -25)) {
        penalty -= 0.2;
      }
    }
    return penalty;
  }
  function rankPrototypes(vector) {
    const userExpanded = expandVector(vector);
    const userLevel = levelVector(userExpanded);
    return data.prototypes.map((p) => {
      const expanded = expandVector(p.vector);
      const levels = levelVector(expanded);
      let distance = 0;
      let maxDistance = 0;
      let coreHits = 0;
      for (const dim of MATCH_DIMS) {
        const w = dimWeight(p, dim);
        distance += w * Math.abs((userExpanded[dim] || 0) - (expanded[dim] || 0)) / 50;
        maxDistance += w * 4;
        if ((CORE_DIMS[p.id] || []).includes(dim) && userLevel[dim] === levels[dim]) coreHits += 1;
      }
      distance += corePenalty(userExpanded, expanded, p.id);
      distance = Math.max(0, distance);
      return {
        ...p,
        expanded,
        levels,
        distance: round(distance),
        maxDistance: round(maxDistance),
        rawSimilarity: Math.round(100 * (1 - Math.min(distance, maxDistance) / maxDistance)),
        coreHits
      };
    }).sort((a, b) => a.distance - b.distance || a.id.localeCompare(b.id));
  }
  function tieScore(id, v) {
    const map = {
      P01: v.ES + v.EXP + v.D01,
      P12: v.AUT + v.BOUND + v.D02,
      P07: v.RISK + v.EXP + v.D05,
      P09: v.RULE + v.AUT + v.EXP,
      P02: v.ES + v.SAFE - v.RISK,
      P08: v.D06 + v.SAFE + v.RULE,
      P05: v.CARE + v.ES + v.D03,
      P10: v.CARE + v.RULE + v.D04
    };
    return map[id] ?? 0;
  }
  function chooseMain(rank, expanded) {
    const first = rank[0];
    const second = rank[1];
    const distanceDiff = second.distance - first.distance;
    const gapPercent = first.maxDistance ? (distanceDiff / first.maxDistance) * 100 : 0;
    let chosen = first;
    let tieBreaker = 'distance';
    let tieTriggered = false;
    if (distanceDiff <= 0.01) {
      tieTriggered = true;
      const pair = [first.id, second.id].sort().join('-');
      const knownPairs = new Set(['P01-P12','P01-P07','P09-P12','P02-P08','P05-P10']);
      if (knownPairs.has(pair)) {
        chosen = tieScore(second.id, expanded) > tieScore(first.id, expanded) ? second : first;
        tieBreaker = 'named-pair';
      } else if (second.coreHits > first.coreHits) {
        chosen = second;
        tieBreaker = 'core-hit-count';
      } else {
        chosen = first;
        tieBreaker = 'distance-order';
      }
    }
    const displayRank = [chosen, ...rank.filter((p) => p.id !== chosen.id)];
    return { main: chosen, rank: displayRank, gapPercent: round(gapPercent), tieBreaker, tieTriggered };
  }
  function judgementStrength(gapPercent) {
    if (gapPercent > 15) return '较明确';
    if (gapPercent >= 8) return '中等';
    return '较弱';
  }
  function shellSignals(C_norm, feedback) {
    const signals = [];
    const used = new Set();
    if (C_norm.RISK >= 25 && C_norm.SAFE >= 25) { signals.push('探索—安全拉扯明显'); used.add('RISK'); used.add('SAFE'); }
    if (C_norm.EXP >= 25 && feedback.F.SUP >= 55) { signals.push('想表达，但表达出口偏谨慎'); used.add('EXP'); }
    if (C_norm.CARE >= 25 && C_norm.BOUND <= -10) { signals.push('关系中容易提前承担责任'); used.add('CARE'); used.add('BOUND'); }
    const rows = Object.entries(C_norm)
      .filter(([dim]) => !used.has(dim))
      .map(([dim, value]) => ({ dim, value, abs: Math.abs(value) }))
      .filter((row) => row.abs >= 25)
      .sort((a, b) => b.abs - a.abs);
    for (const { dim, value } of rows) {
      if (signals.length >= 3) break;
      signals.push(`${DIM_LABELS[dim]}${value >= 0 ? '偏高' : '偏低'}`);
    }
    return signals.slice(0, 3);
  }
  function selected(answers, key, optionKey) { return answers[key] === optionKey; }
  function triggeredTags(C_norm, R_norm, B_final, feedback, answers) {
    const { SUP, EVAL, RESP, CTRL } = feedback.F;
    const COST = feedback.E.COST;
    const raw = [];
    if (SUP >= 65) raw.push('T01');
    if (EVAL >= 65) raw.push('T02');
    if (RESP >= 65) raw.push('T03');
    if (CTRL >= 65) raw.push('T04');
    if (COST >= 65) raw.push('T05');
    if (SUP >= 60 && (R_norm.EXP >= 35 || B_final.EXP >= 40) && C_norm.EXP <= 25) raw.push('T06');
    if ((B_final.AUT >= 40 || R_norm.AUT >= 35) && (CTRL >= 60 || COST >= 65)) raw.push('T07');
    if ((R_norm.RISK >= 30 || B_final.RISK >= 35) && C_norm.RISK <= 10 && (EVAL >= 60 || COST >= 60)) raw.push('T08');
    if (C_norm.CARE >= 55 && C_norm.BOUND <= -20 && RESP >= 60) raw.push('T09');
    if ((C_norm.SAFE >= 55 || C_norm.RULE >= 55) && (R_norm.AUT >= 30 || R_norm.RISK >= 30) && (EVAL >= 55 || CTRL >= 55 || COST >= 55)) raw.push('T10');
    if (EVAL >= 60 && (C_norm.RULE >= 40 || C_norm.AUT >= 40) && (selected(answers, 'Q29','C') || selected(answers, 'Q30','D') || selected(answers, 'Q39','C'))) raw.push('T11');
    if (COST >= 60 && SUP >= 45 && (selected(answers, 'Q37','C') || selected(answers, 'Q37','D') || selected(answers, 'Q40','C') || selected(answers, 'Q40','D'))) raw.push('T12');
    let tags = [...new Set(raw)];
    if (tags.includes('T06')) tags = tags.filter((t) => t !== 'T01');
    if (tags.includes('T07') && CTRL < 75) tags = tags.filter((t) => t !== 'T04');
    if (tags.includes('T09') && RESP < 75) tags = tags.filter((t) => t !== 'T03');
    if (tags.includes('T12') && COST < 75) tags = tags.filter((t) => t !== 'T05');
    return tags.sort((a, b) => TAG_PRIORITY.indexOf(a) - TAG_PRIORITY.indexOf(b)).slice(0, 3).map((id) => ({ id, name: TAG_META[id][0], text: TAG_META[id][1] }));
  }
  function observationSignals(feedback, tags) {
    const strongKeys = new Set();
    for (const tag of tags) {
      if (tag.id === 'T01' || tag.id === 'T06') strongKeys.add('SUP');
      if (tag.id === 'T02' || tag.id === 'T11') strongKeys.add('EVAL');
      if (tag.id === 'T03' || tag.id === 'T09') strongKeys.add('RESP');
      if (tag.id === 'T04' || tag.id === 'T07') strongKeys.add('CTRL');
      if (tag.id === 'T05' || tag.id === 'T12') strongKeys.add('COST');
    }
    const values = { ...feedback.F, COST: feedback.E.COST };
    return Object.entries(values)
      .filter(([key, value]) => value >= 45 && value <= 59 && !strongKeys.has(key))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([key, value]) => ({ key, value, name: OBSERVE_META[key] || DIM_LABELS[key], text: `系统检测到 ${DIM_LABELS[key]} 处于中等偏高区间，它暂时不作为强副标签，只作为观察信号。` }));
  }
  function confidenceLabel(gapPercent, feedback, correctionSum, confidenceKey) {
    const feedbackMax = Math.max(feedback.F.SUP, feedback.F.EVAL, feedback.F.RESP, feedback.F.CTRL, feedback.E.COST);
    let score = 54 + gapPercent * 2.2 + (confidenceItem(confidenceKey).weight - 0.65) * 18 - correctionSum * 0.16 - Math.max(0, feedbackMax - 75) * 0.18;
    let cap = 88;
    if (gapPercent < 3) cap = 55;
    else if (gapPercent < 8) cap = 65;
    else if (gapPercent < 15) cap = 75;
    score = clamp(Math.round(score), 40, cap);
    const label = score >= 78 ? '高' : score >= 64 ? '中高' : '中';
    return { score, label };
  }
  function clueScore(clue, main, tags) {
    const core = CORE_DIMS[main.id] || [];
    let score = clue.impact;
    for (const w of clue.weights) {
      if (core.includes(w.dim)) score += Math.abs(w.value) * 3;
      if (tags.some((tag) => tag.id === 'T05' || tag.id === 'T12') && w.dim === 'COST') score += Math.abs(w.value) * 2;
      if (tags.some((tag) => tag.id === 'T01' || tag.id === 'T06') && (w.dim === 'SUP' || w.dim === 'EXP')) score += Math.abs(w.value) * 2;
      if (tags.some((tag) => tag.id === 'T02' || tag.id === 'T11') && w.dim === 'EVAL') score += Math.abs(w.value) * 2;
      if (tags.some((tag) => tag.id === 'T03' || tag.id === 'T09') && w.dim === 'RESP') score += Math.abs(w.value) * 2;
      if (tags.some((tag) => tag.id === 'T04' || tag.id === 'T07') && w.dim === 'CTRL') score += Math.abs(w.value) * 2;
    }
    return score;
  }
  function evidenceClues(clues, main, tags) {
    return clues
      .map((clue) => ({ ...clue, score: clueScore(clue, main, tags) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ q, opt }) => `${q.id} ${q.title}：你选择了“${opt.text}”，系统将其作为“${moduleName(q)}”中的一条主要线索。`);
  }
  function calculate(input) {
    const answers = input.answers || {};
    const mbti = input.mbti || 'INFP';
    const confidenceKey = input.confidence || 'B';
    const mbtiBase = mbtiBaseVector(mbti, confidenceKey);
    const raw = rawScores(answers);
    const norm = normalizedScores(raw);
    const C_final = vectorAdd(mbtiBase, norm.C);
    const B_raw = baseFormula(norm.R, norm.C, mbtiBase);
    const feedback = { F: norm.F, E: norm.E, flat: { ...norm.F, COST: norm.E.COST } };
    const correction = reverseCorrections(norm.C, norm.R, B_raw, feedback);
    const B_final = vectorAdd(B_raw, correction.delta);
    const expanded = expandVector(B_final);
    const levels = levelVector(expanded);
    const ranked = rankPrototypes(B_final);
    const decision = chooseMain(ranked, expanded);
    const correctionSum = DIMS.reduce((sum, dim) => sum + Math.abs(correction.delta[dim]), 0);
    const tags = triggeredTags(norm.C, norm.R, B_final, feedback, answers);
    return {
      inputMbti: mbti,
      confidenceInput: confidenceItem(confidenceKey),
      mbtiBase,
      raw,
      norm,
      C_final,
      B_raw,
      feedback,
      correction,
      B_final,
      expanded,
      levels,
      rank: decision.rank,
      main: decision.main,
      gapPercent: decision.gapPercent,
      tieBreaker: decision.tieBreaker,
      tieTriggered: decision.tieTriggered,
      strength: judgementStrength(decision.gapPercent),
      tags,
      observations: observationSignals(feedback, tags),
      shell: shellSignals(C_final, feedback),
      confidence: confidenceLabel(decision.gapPercent, feedback, correctionSum, confidenceKey),
      clues: evidenceClues(raw.clues, decision.main, tags)
    };
  }

  return {
    data,
    ranges,
    calculate,
    rawScores,
    normalizedScores,
    mbtiBaseVector,
    derivedVector,
    expandVector,
    levelize,
    levelVector,
    corePenalty,
    rankPrototypes
  };
});
