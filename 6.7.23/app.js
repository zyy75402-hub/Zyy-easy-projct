const personalityDims = [
  { key: 'emotionalSensitivity', label: '情绪敏感度' },
  { key: 'relationshipCare', label: '关系照护欲' },
  { key: 'riskPrediction', label: '风险预判值' },
  { key: 'imageControl', label: '体面控制感' },
  { key: 'ambition', label: '野心驱动力' },
  { key: 'freedomNeed', label: '自由逃逸值' },
  { key: 'expressiveDrama', label: '表达戏剧感' },
  { key: 'observerAnalysis', label: '旁观分析值' },
];

const environmentDims = [
  { key: 'resourceDensity', label: '资源密度' },
  { key: 'emotionalSupport', label: '情感支持' },
  { key: 'controlLevel', label: '控制程度' },
  { key: 'evaluationPressure', label: '评价压力' },
  { key: 'stability', label: '稳定程度' },
  { key: 'relationshipComplexity', label: '关系复杂度' },
  { key: 'expressionFreedom', label: '表达自由' },
  { key: 'failureTolerance', label: '失败容忍度' },
];

const mbtiPairs = [
  { key: 'EI', left: 'E', leftLabel: '外向', right: 'I', rightLabel: '内向' },
  { key: 'SN', left: 'S', leftLabel: '实感', right: 'N', rightLabel: '直觉' },
  { key: 'TF', left: 'T', leftLabel: '思考', right: 'F', rightLabel: '情感' },
  { key: 'JP', left: 'J', leftLabel: '判断', right: 'P', rightLabel: '知觉' },
];

const strengthPresets = [
  { key: 'slight', label: '稍微偏向', value: 55 },
  { key: 'clear', label: '明显偏向', value: 65 },
  { key: 'strong', label: '非常偏向', value: 80 },
  { key: 'custom', label: '自定义', value: null },
];

const state = {
  mbti: {
    EI: { selected: 'I', strength: 65, preset: 'clear' },
    SN: { selected: 'N', strength: 65, preset: 'clear' },
    TF: { selected: 'F', strength: 65, preset: 'clear' },
    JP: { selected: 'P', strength: 65, preset: 'clear' },
  },
  calibration: {},
  environment: {},
  script: 'richKid',
};

const scaleLabels = ['非常不同意', '不同意', '有点不同意', '不确定', '有点同意', '同意', '非常同意'];

const calibrationQuestions = [
  {
    id: 'c1',
    text: '我越在乎一件事，越会在开始之前先把失败版本想一遍。',
    weights: { riskPrediction: 2.8, imageControl: 1.4, emotionalSensitivity: 1.2 },
  },
  {
    id: 'c2',
    text: '我不一定说出口，但我其实很想证明自己不是随便混混。',
    weights: { ambition: 2.8, imageControl: 1.2, riskPrediction: 0.8 },
  },
  {
    id: 'c3',
    text: '气氛一冷下来，我会下意识想做点什么让场面恢复正常。',
    weights: { relationshipCare: 2.5, emotionalSensitivity: 1.8, expressiveDrama: 1.0 },
  },
  {
    id: 'c4',
    text: '我很讨厌被一种生活、关系或身份彻底固定住。',
    weights: { freedomNeed: 2.8, expressiveDrama: 1.2, imageControl: -0.8 },
  },
  {
    id: 'c5',
    text: '我有很多想表达的东西，但经常会先判断这样说会不会不合适。',
    weights: { expressiveDrama: 1.8, imageControl: 2.2, riskPrediction: 1.2 },
  },
  {
    id: 'c6',
    text: '在人群里，我经常像坐在旁边看戏一样观察大家。',
    weights: { observerAnalysis: 2.8, emotionalSensitivity: 0.8, relationshipCare: -0.4 },
  },
  {
    id: 'c7',
    text: '别人还没说自己难受，我有时已经能感觉到对方不太对劲。',
    weights: { emotionalSensitivity: 2.6, relationshipCare: 1.6, observerAnalysis: 0.9 },
  },
  {
    id: 'c8',
    text: '我表面上可以很稳定，但心里其实经常弹幕很多。',
    weights: { emotionalSensitivity: 2.1, imageControl: 1.9, riskPrediction: 1.2 },
  },
];

const environmentQuestions = [
  { id: 'e1', dim: 'resourceDensity', text: '成长过程中，我通常不太需要为现实资源发愁。' },
  { id: 'e2', dim: 'resourceDensity', text: '家里能给我提供见识、信息、机会或选择。' },
  { id: 'e3', dim: 'resourceDensity', text: '我想尝试新东西时，通常能获得一定支持。' },

  { id: 'e4', dim: 'emotionalSupport', text: '我的感受在家里通常会被认真对待。' },
  { id: 'e5', dim: 'emotionalSupport', text: '我难过或崩溃时，身边人更像是接住我，而不是先评价我。' },
  { id: 'e6', dim: 'emotionalSupport', text: '我可以向家里表达脆弱，而不会立刻觉得丢脸或麻烦。' },

  { id: 'e7', dim: 'controlLevel', text: '我的很多选择都需要先考虑家里是否满意。' },
  { id: 'e8', dim: 'controlLevel', text: '表达不同意见时，我常常会被认为“不懂事”或“不体谅”。' },
  { id: 'e9', dim: 'controlLevel', text: '有时候我需要让大人满意，关系才会变得安全。' },

  { id: 'e10', dim: 'evaluationPressure', text: '我从小就很习惯被比较。' },
  { id: 'e11', dim: 'evaluationPressure', text: '成绩、表现或成就经常和我的价值感绑在一起。' },
  { id: 'e12', dim: 'evaluationPressure', text: '我很早就知道“别让家里失望”是一种压力。' },

  { id: 'e13', dim: 'stability', text: '我的成长环境整体比较稳定、可预测。' },
  { id: 'e14', dim: 'stability', text: '家里的角色和规则大体清楚，不需要我反复猜。' },
  { id: 'e15', dim: 'stability', text: '小时候，我不太需要频繁适应新的照顾者或新规则。' },

  { id: 'e16', dim: 'relationshipComplexity', text: '我很早就学会看大人的脸色判断气氛。' },
  { id: 'e17', dim: 'relationshipComplexity', text: '我身边的关系经常有一些没说出口的规则。' },
  { id: 'e18', dim: 'relationshipComplexity', text: '我需要在不同人之间切换不同的相处方式。' },

  { id: 'e19', dim: 'expressionFreedom', text: '我可以直接表达不满，而不用太担心关系被破坏。' },
  { id: 'e20', dim: 'expressionFreedom', text: '我的喜欢、讨厌和欲望通常被允许存在。' },
  { id: 'e21', dim: 'expressionFreedom', text: '我小时候能比较自由地展示自己，而不是总要“懂事”。' },

  { id: 'e22', dim: 'failureTolerance', text: '我失败之后，身边人更关注我学到了什么，而不是先责怪我。' },
  { id: 'e23', dim: 'failureTolerance', text: '我被允许试错，而不是每一步都必须正确。' },
  { id: 'e24', dim: 'failureTolerance', text: '失败在我的成长环境里更像过程，而不是判决书。' },
];

const scripts = {
  richKid: {
    name: '首富的孩子',
    subtitle: '资源过剩与真实感饥饿。',
    params: { resourceDensity: 95, emotionalSupport: 55, controlLevel: 70, evaluationPressure: 85, stability: 75, relationshipComplexity: 75, expressionFreedom: 55, failureTolerance: 35 },
    events: ['继承期待', '公众审视', '选择过多', '失败不被允许'],
  },
  celebrityKid: {
    name: '顶流巨星家的小孩',
    subtitle: '一直被看见，但不一定被理解。',
    params: { resourceDensity: 82, emotionalSupport: 55, controlLevel: 66, evaluationPressure: 92, stability: 48, relationshipComplexity: 88, expressionFreedom: 45, failureTolerance: 38 },
    events: ['舆论凝视', '人设管理', '亲密关系被消费', '表达被误读'],
  },
  oldMoney: {
    name: '神秘老钱家族继承人',
    subtitle: '体面规训与自发性压抑。',
    params: { resourceDensity: 90, emotionalSupport: 50, controlLevel: 86, evaluationPressure: 80, stability: 82, relationshipComplexity: 82, expressionFreedom: 35, failureTolerance: 35 },
    events: ['家族规训', '隐形竞争', '礼仪训练', '不能失态'],
  },
  seaside: {
    name: '海边小镇野生长大的小孩',
    subtitle: '自由感很强，但结构感要自己慢慢长。',
    params: { resourceDensity: 45, emotionalSupport: 72, controlLevel: 25, evaluationPressure: 30, stability: 60, relationshipComplexity: 42, expressionFreedom: 88, failureTolerance: 78 },
    events: ['低控制生活', '自然探索', '资源有限', '靠自己摸索'],
  },
  grindFamily: {
    name: '全家都是卷王的天选打工圣体',
    subtitle: '高执行力与休息困难。',
    params: { resourceDensity: 62, emotionalSupport: 45, controlLevel: 76, evaluationPressure: 95, stability: 72, relationshipComplexity: 58, expressionFreedom: 38, failureTolerance: 28 },
    events: ['长期比较', '规划人生', '成绩压力', '休息羞耻'],
  },
  relatives: {
    name: '被亲戚轮流带大的江湖型小孩',
    subtitle: '高适应力与安全感不稳。',
    params: { resourceDensity: 45, emotionalSupport: 44, controlLevel: 55, evaluationPressure: 55, stability: 25, relationshipComplexity: 92, expressionFreedom: 50, failureTolerance: 48 },
    events: ['环境频繁切换', '看脸色', '人情规则', '早熟懂事'],
  },
};

const envImpactMatrix = {
  resourceDensity: { ambition: 6, freedomNeed: 4, riskPrediction: -3, imageControl: 2 },
  emotionalSupport: { emotionalSensitivity: -8, relationshipCare: 6, riskPrediction: -8, expressiveDrama: 8, freedomNeed: 4, observerAnalysis: -2, imageControl: -4 },
  controlLevel: { riskPrediction: 10, imageControl: 10, emotionalSensitivity: 5, freedomNeed: 6, expressiveDrama: -8, observerAnalysis: 5, relationshipCare: 3 },
  evaluationPressure: { ambition: 10, riskPrediction: 8, imageControl: 8, emotionalSensitivity: 3, expressiveDrama: -4 },
  stability: { riskPrediction: -10, emotionalSensitivity: -6, relationshipCare: 2, observerAnalysis: -3, freedomNeed: -2 },
  relationshipComplexity: { emotionalSensitivity: 8, relationshipCare: 9, observerAnalysis: 8, riskPrediction: 7, imageControl: 4, expressiveDrama: -3 },
  expressionFreedom: { expressiveDrama: 10, imageControl: -6, riskPrediction: -7, freedomNeed: 5, emotionalSensitivity: -2 },
  failureTolerance: { ambition: 5, freedomNeed: 5, riskPrediction: -8, imageControl: -6, observerAnalysis: -2 },
};

const eventSensitivityRules = [
  {
    condition: (base) => base.emotionalSensitivity > 62,
    effect: { riskPrediction: 4, emotionalSensitivity: 3, imageControl: 2 },
    note: '高情绪敏感者遇到评价/打击时，更容易进入预警和自我整理。',
  },
  {
    condition: (base) => base.ambition > 62,
    effect: { ambition: 5, imageControl: 2 },
    note: '高野心者遇到压力时，更可能把它转成证明欲。',
  },
  {
    condition: (base) => base.freedomNeed > 62,
    effect: { freedomNeed: 5, expressiveDrama: 2, imageControl: -1 },
    note: '高自由需求者遇到规训时，更容易长出逃离欲。',
  },
  {
    condition: (base) => base.relationshipCare > 62,
    effect: { relationshipCare: 4, emotionalSensitivity: 2, observerAnalysis: 2 },
    note: '高关系照护者遇到复杂关系时，更容易学会察言观色。',
  },
  {
    condition: (base) => base.riskPrediction > 62,
    effect: { riskPrediction: 4, imageControl: 2, expressiveDrama: -2 },
    note: '高风险预判者遇到不确定环境时，更可能收紧表达。',
  },
];

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function emptyPersonalityVector(value = 50) {
  return Object.fromEntries(personalityDims.map(d => [d.key, value]));
}

function renderMbtiForm() {
  const root = document.getElementById('mbtiForm');
  root.innerHTML = mbtiPairs.map(pair => {
    const data = state.mbti[pair.key];
    return `
      <div class="mbti-card" data-pair="${pair.key}">
        <h3>${pair.left}/${pair.right}：${pair.leftLabel} / ${pair.rightLabel}</h3>
        <div class="pair-row">
          <button class="choice-btn ${data.selected === pair.left ? 'active' : ''}" data-action="select-letter" data-pair="${pair.key}" data-letter="${pair.left}">${pair.left} ${pair.leftLabel}</button>
          <button class="choice-btn ${data.selected === pair.right ? 'active' : ''}" data-action="select-letter" data-pair="${pair.key}" data-letter="${pair.right}">${pair.right} ${pair.rightLabel}</button>
        </div>
        <div class="strength-row">
          ${strengthPresets.map(preset => `<button class="strength-btn ${data.preset === preset.key ? 'active' : ''}" data-action="select-strength" data-pair="${pair.key}" data-preset="${preset.key}">${preset.label}</button>`).join('')}
        </div>
        <div class="custom-row">
          <span>当前偏向强度：</span>
          <input type="number" min="50" max="100" value="${data.strength}" data-action="custom-strength" data-pair="${pair.key}" />
          <span>/ 100</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderScaleQuestion(q, group) {
  const current = state[group][q.id] ?? 4;
  return `
    <div class="question-card">
      <h3>${q.text}</h3>
      <div class="scale-row">
        ${scaleLabels.map((label, idx) => {
          const value = idx + 1;
          return `<button class="scale-btn ${current === value ? 'active' : ''}" data-action="scale" data-group="${group}" data-id="${q.id}" data-value="${value}">${label}</button>`;
        }).join('')}
      </div>
    </div>
  `;
}

function renderQuestions() {
  document.getElementById('calibrationForm').innerHTML = calibrationQuestions.map(q => renderScaleQuestion(q, 'calibration')).join('');
  document.getElementById('environmentForm').innerHTML = environmentQuestions.map(q => renderScaleQuestion(q, 'environment')).join('');
}

function renderScripts() {
  const root = document.getElementById('scriptChoices');
  root.innerHTML = Object.entries(scripts).map(([key, script]) => `
    <button class="script-card ${state.script === key ? 'active' : ''}" data-action="select-script" data-script="${key}">
      <h3>${script.name}</h3>
      <p>${script.subtitle}</p>
      <div class="tag-row">${script.events.slice(0, 3).map(e => `<span class="tag">${e}</span>`).join('')}</div>
    </button>
  `).join('');
}

function getMbtiAxis() {
  const val = {};
  const getStrength = (pairKey) => {
    const d = state.mbti[pairKey];
    return ((d.strength - 50) / 50); // 55 -> .1, 65 -> .3, 80 -> .6, 100 -> 1
  };
  val.EI = (state.mbti.EI.selected === 'E' ? 1 : -1) * getStrength('EI');
  val.SN = (state.mbti.SN.selected === 'N' ? 1 : -1) * getStrength('SN');
  val.TF = (state.mbti.TF.selected === 'F' ? 1 : -1) * getStrength('TF');
  val.JP = (state.mbti.JP.selected === 'J' ? 1 : -1) * getStrength('JP');
  return val;
}

function mbtiToPersonalityVector() {
  const { EI, SN, TF, JP } = getMbtiAxis();
  const raw = {
    emotionalSensitivity: 50 + 18 * TF + 8 * SN - 4 * EI + 4 * JP,
    relationshipCare: 50 + 16 * TF + 6 * EI + 4 * JP,
    riskPrediction: 50 + 10 * JP - 8 * EI + 5 * TF,
    imageControl: 50 + 16 * JP - 5 * SN - 3 * TF,
    ambition: 50 + 8 * JP - 5 * TF,
    freedomNeed: 50 - 16 * JP + 8 * SN - 4 * EI,
    expressiveDrama: 50 + 12 * SN + 8 * EI + 5 * TF - 3 * JP,
    observerAnalysis: 50 - 12 * EI + 8 * SN - 8 * TF + 4 * JP,
  };
  return mapValues(raw, v => clamp(Math.round(v)));
}

function applyCalibration(vector) {
  const next = { ...vector };
  calibrationQuestions.forEach(q => {
    const answer = state.calibration[q.id] ?? 4;
    const delta = answer - 4; // -3..3
    Object.entries(q.weights).forEach(([dim, weight]) => {
      next[dim] += delta * weight;
    });
  });
  return mapValues(next, v => clamp(Math.round(v)));
}

function getEnvironmentVector() {
  const grouped = Object.fromEntries(environmentDims.map(d => [d.key, []]));
  environmentQuestions.forEach(q => {
    const answer = state.environment[q.id] ?? 4;
    const score = ((answer - 1) / 6) * 100;
    grouped[q.dim].push(score);
  });
  return Object.fromEntries(environmentDims.map(d => {
    const arr = grouped[d.key];
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    return [d.key, Math.round(avg)];
  }));
}

function getEnvironmentImpact(envVector, intensity = 1) {
  const impact = emptyPersonalityVector(0);
  environmentDims.forEach(envDim => {
    const deviation = (envVector[envDim.key] - 50) / 50; // -1..1
    const rules = envImpactMatrix[envDim.key] || {};
    Object.entries(rules).forEach(([pDim, coefficient]) => {
      impact[pDim] += deviation * coefficient * intensity;
    });
  });
  return mapValues(impact, v => Math.round(v * 10) / 10);
}

function applyEventSensitivity(scriptImpact, baseVector) {
  const effect = { ...scriptImpact };
  const notes = [];
  eventSensitivityRules.forEach(rule => {
    if (rule.condition(baseVector)) {
      notes.push(rule.note);
      Object.entries(rule.effect).forEach(([dim, value]) => {
        effect[dim] = (effect[dim] || 0) + value;
      });
    }
  });
  return { effect: mapValues(effect, v => Math.round(v * 10) / 10), notes };
}

function calculateAll() {
  const mbtiVector = mbtiToPersonalityVector();
  const currentVector = applyCalibration(mbtiVector);
  const realEnv = getEnvironmentVector();
  const realImpact = getEnvironmentImpact(realEnv, 1);
  const baseVector = combineVectors(currentVector, realImpact, 1, -0.35);
  const script = scripts[state.script];
  const scriptImpactBase = getEnvironmentImpact(script.params, 1);
  const { effect: scriptImpact, notes } = applyEventSensitivity(scriptImpactBase, baseVector);
  const parallelVector = combineVectors(baseVector, scriptImpact, 1, 0.55);
  return { mbtiVector, currentVector, realEnv, realImpact, baseVector, script, scriptImpact, parallelVector, notes };
}

function combineVectors(a, b, aWeight = 1, bWeight = 1) {
  const result = {};
  personalityDims.forEach(dim => {
    result[dim.key] = clamp(Math.round((a[dim.key] || 0) * aWeight + (b[dim.key] || 0) * bWeight));
  });
  return result;
}

function mapValues(obj, mapper) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, mapper(v, k)]));
}

function topDims(vector, dims = personalityDims, count = 3, descending = true) {
  return [...dims].sort((a, b) => descending ? vector[b.key] - vector[a.key] : vector[a.key] - vector[b.key]).slice(0, count);
}

function vectorDiff(before, after) {
  return Object.fromEntries(personalityDims.map(d => [d.key, (after[d.key] || 0) - (before[d.key] || 0)]));
}

function selectBaseTag(baseVector) {
  const high = topDims(baseVector, personalityDims, 3).map(d => d.key);
  if (high.includes('relationshipCare') && high.includes('emotionalSensitivity')) return '关系雷达型底稿';
  if (high.includes('riskPrediction') && high.includes('observerAnalysis')) return '提前预演型底稿';
  if (high.includes('imageControl') && high.includes('emotionalSensitivity')) return '体面压缩型底稿';
  if (high.includes('ambition') && high.includes('imageControl')) return '隐形证明型底稿';
  if (high.includes('freedomNeed') && high.includes('expressiveDrama')) return '自由表达型底稿';
  if (high.includes('observerAnalysis')) return '清醒旁观型底稿';
  if (high.includes('expressiveDrama')) return '故事感生存型底稿';
  return '混合型底稿';
}

function environmentInterpretation(env) {
  const high = topDims(env, environmentDims, 3).map(d => d.label);
  const low = topDims(env, environmentDims, 2, false).map(d => d.label);
  return { high, low };
}

function generateNarrative(calc) {
  const { currentVector, realEnv, realImpact, baseVector, script, scriptImpact, parallelVector, notes } = calc;
  const currentHigh = topDims(currentVector).map(d => d.label);
  const baseHigh = topDims(baseVector).map(d => d.label);
  const parallelHigh = topDims(parallelVector).map(d => d.label);
  const diff = vectorDiff(baseVector, parallelVector);
  const rising = topDims(diff, personalityDims, 3).map(d => d.label);
  const falling = topDims(diff, personalityDims, 2, false).map(d => d.label);
  const envText = environmentInterpretation(realEnv);
  const baseTag = selectBaseTag(baseVector);

  const scriptParagraphs = {
    richKid: `如果你拿到的是“首富的孩子”这份剧本，最强的变量不是钱，而是选择过多之后的真实感饥饿。你可能坐在顶层公寓的落地窗前，看着整座城市像一张提前拿到答案的考卷。别人以为你最擅长享受，你却可能怀念一场必须靠自己拼尽全力的普通比赛。`,
    celebrityKid: `如果你是顶流巨星家的小孩，人生很早就会被放进镜头里。你会比别人更早理解“被看见”和“被理解”不是同一回事。你可能很会管理呈现，也可能在每一次表达前，先想象别人会怎样误读。`,
    oldMoney: `如果你是神秘老钱家族继承人，人生不会大声命令你，但会用礼仪、分寸和隐形标准慢慢训练你。你可能很早学会不失态、不抢话、不把真正的想法放在第一句。你看起来像没用力，实际每一步都在控制落点。`,
    seaside: `如果你是在海边小镇野生长大的小孩，你可能不会那么早把每句话都送去审核。风、潮湿空气、便利店灯光和突然想出发的下午，会比排名和评价更早教你理解自己。你可能还是敏感，但敏感更多指向生活，而不总是指向危险。`,
    grindFamily: `如果你出生在全家都是卷王的剧本里，人生会很早学会拆目标、算进度、看排名。你会很能扛事，也很难真正休息。支持如果是理解，会长出坚毅；支持如果是催促，就会长出焦虑。`,
    relatives: `如果你是被亲戚轮流带大的江湖型小孩，你会很早知道每个大人都有不同规则。你可能很会适应，很会看气氛，也很会在夹缝里找到自己的位置。问题是，太会生存的人，有时会忘记“放松”本来也可以是一种能力。`,
  };

  const trainingParts = [];
  if (realEnv.controlLevel > 65) trainingParts.push('高控制环境可能训练出更强的体面控制和风险预判。');
  if (realEnv.evaluationPressure > 65) trainingParts.push('高评价压力可能把一部分野心变成证明欲，也可能把一部分谨慎变成焦虑。');
  if (realEnv.emotionalSupport < 45) trainingParts.push('情感支持偏低时，人更容易把感受先压下去，再自己处理。');
  if (realEnv.relationshipComplexity > 65) trainingParts.push('复杂关系会提高察言观色能力，但也可能让人更难完全放松。');
  if (realEnv.failureTolerance < 45) trainingParts.push('失败容忍度偏低时，人容易把失败看成判决书，而不是过程。');
  if (trainingParts.length === 0) trainingParts.push('你的现实环境没有出现特别极端的塑形信号，所以系统只做轻度剥离。');

  return `
    <div class="result-section">
      <h3>现在呈现出来的你</h3>
      <p>你的当前表现更突出的是：<strong>${currentHigh.join('、')}</strong>。这不是结论，只是用 MBTI 输入和少量校准题得到的“当前表现向量”。</p>
      <div class="tag-row">${currentHigh.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>

    <div class="result-section">
      <h3>你的成长环境可能训练出的部分</h3>
      <p>你的成长环境中较突出的变量是：<strong>${envText.high.join('、')}</strong>；相对较弱的是：<strong>${envText.low.join('、')}</strong>。</p>
      <ul>${trainingParts.map(t => `<li>${t}</li>`).join('')}</ul>
    </div>

    <div class="result-section">
      <h3>剧本外的你</h3>
      <p>剥离一部分现实环境塑形后，你的“剧本外底色”暂时更接近：<strong>${baseTag}</strong>。</p>
      <p>它的核心不是“真实人格”，而是一个反事实推测：如果少一些现实环境的训练痕迹，你身上可能更明显的部分是 <strong>${baseHigh.join('、')}</strong>。</p>
    </div>

    <div class="result-section">
      <h3>如果你拿到《${script.name}》</h3>
      <p>${scriptParagraphs[state.script]}</p>
      <p>这个剧本最可能放大的部分是：<strong>${rising.join('、')}</strong>；相对会被压住或重新包装的部分是：<strong>${falling.join('、')}</strong>。</p>
    </div>

    <div class="result-section">
      <h3>关键成长事件</h3>
      <ul>${script.events.map(e => `<li>${e}</li>`).join('')}</ul>
      ${notes.length ? `<p>由于你的底色特点，同一事件会被重新加权：${notes.join(' ')}</p>` : ''}
    </div>

    <div class="result-section">
      <h3>离谱人生小传</h3>
      <p>${createMiniBiography(script, parallelHigh, baseTag)}</p>
    </div>

    <div class="result-section">
      <h3>温情收尾</h3>
      <p>你不是被某一个字母、某一种家庭、某一个剧本决定的人。你只是曾经为了适应某些环境，长出了一些很有用的外壳。换一个剧本，它们不会消失，只是会以另一种方式发光。</p>
    </div>
  `;
}

function createMiniBiography(script, parallelHigh, baseTag) {
  const name = script.name;
  if (state.script === 'richKid') return `很多年后，别人提起你，只会说你拥有过很多选择。但你真正记得的，是某个下午你没有使用任何资源，只是靠自己把一件事拼到底。那一刻，你才觉得人生不是继承来的，是亲手踢进球门里的。`;
  if (state.script === 'celebrityKid') return `你从小知道镜头会放大一切，也会误读一切。后来你学会把自己剪辑得很好看，但最珍贵的版本，反而是某个没人拍到的瞬间：你终于不用解释自己，只是安静地做了一次自己。`;
  if (state.script === 'oldMoney') return `你在很长一段时间里都像一封格式正确的信，克制、漂亮、没有错字。直到某一天，你开始在页边写下真正想说的话。那不是失礼，那是你终于从家族剧本里，取回一点自己的笔迹。`;
  if (state.script === 'seaside') return `你可能会成为那种走路带风的人：不一定最会规划，但很会活。别人忙着证明自己，你忙着把黄昏、海盐味的风和一场临时起意的出走，收进自己的人生证据里。`;
  if (state.script === 'grindFamily') return `你很早就学会把人生拆成计划，把休息拆成内疚。后来你终于发现，真正厉害的人不是永远不累，而是知道什么时候停下来，才能继续走得更远。`;
  if (state.script === 'relatives') return `你像一只很早学会换季的动物，在哪里都能活，和谁都能说上几句。可你人生最重要的成长，也许不是更会适应，而是终于找到一个地方，不用表演适应也能留下。`;
  return `在《${name}》里，你的${parallelHigh.join('、')}会被重新排列。你还是你，只是长成了另一个版本。`;
}

function renderVectorTable(title, vector, dims = personalityDims) {
  return `
    <h3>${title}</h3>
    <table class="vector-table">
      <thead><tr><th>维度</th><th>数值</th><th>可视化</th></tr></thead>
      <tbody>
        ${dims.map(d => {
          const value = clamp(Math.round(vector[d.key] ?? 0));
          return `<tr><td>${d.label}</td><td>${value}</td><td><div class="bar"><i style="width:${value}%"></i></div></td></tr>`;
        }).join('')}
      </tbody>
    </table>
  `;
}

function renderResult() {
  const calc = calculateAll();
  const resultWrap = document.getElementById('resultWrap');
  const resultTitle = document.getElementById('resultTitle');
  const resultContent = document.getElementById('resultContent');
  const debugPanel = document.getElementById('debugPanel');

  resultTitle.textContent = `你在《${calc.script.name}》里会长成什么样`;
  resultContent.innerHTML = generateNarrative(calc);
  debugPanel.innerHTML = [
    renderVectorTable('MBTI 初始人格表现向量', calc.mbtiVector),
    renderVectorTable('校准后的当前人格表现向量', calc.currentVector),
    renderVectorTable('现实成长环境向量', calc.realEnv, environmentDims),
    renderVectorTable('现实环境塑形影响向量', normalizeImpactForDisplay(calc.realImpact)),
    renderVectorTable('反推出厂底色向量', calc.baseVector),
    renderVectorTable('新剧本塑形影响向量', normalizeImpactForDisplay(calc.scriptImpact)),
    renderVectorTable('平行人生人格变化向量', calc.parallelVector),
  ].join('');

  resultWrap.hidden = false;
  resultWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function normalizeImpactForDisplay(impact) {
  // Debug display only: convert -20..20-ish delta into 0..100 center scale.
  return Object.fromEntries(personalityDims.map(d => [d.key, clamp(Math.round(50 + (impact[d.key] || 0) * 2))]));
}

function resetAll() {
  state.mbti = {
    EI: { selected: 'I', strength: 65, preset: 'clear' },
    SN: { selected: 'N', strength: 65, preset: 'clear' },
    TF: { selected: 'F', strength: 65, preset: 'clear' },
    JP: { selected: 'P', strength: 65, preset: 'clear' },
  };
  state.calibration = {};
  state.environment = {};
  state.script = 'richKid';
  renderAll();
  document.getElementById('resultWrap').hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleClick(event) {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;

  if (action === 'select-letter') {
    const { pair, letter } = target.dataset;
    state.mbti[pair].selected = letter;
    renderMbtiForm();
  }

  if (action === 'select-strength') {
    const { pair, preset } = target.dataset;
    const presetData = strengthPresets.find(p => p.key === preset);
    state.mbti[pair].preset = preset;
    if (presetData.value !== null) state.mbti[pair].strength = presetData.value;
    renderMbtiForm();
  }

  if (action === 'scale') {
    const group = target.dataset.group;
    const id = target.dataset.id;
    const value = Number(target.dataset.value);
    state[group][id] = value;
    renderQuestions();
  }

  if (action === 'select-script') {
    state.script = target.dataset.script;
    renderScripts();
  }
}

function handleInput(event) {
  const target = event.target;
  if (target.dataset.action !== 'custom-strength') return;
  const pair = target.dataset.pair;
  const value = clamp(Number(target.value || 65), 50, 100);
  state.mbti[pair].strength = value;
  state.mbti[pair].preset = 'custom';
  renderMbtiForm();
}

function renderAll() {
  renderMbtiForm();
  renderQuestions();
  renderScripts();
}

document.addEventListener('click', handleClick);
document.addEventListener('change', handleInput);
document.getElementById('generateBtn').addEventListener('click', renderResult);
document.getElementById('resetBtn').addEventListener('click', resetAll);
renderAll();
