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

const scaleLabels = ['非常不同意', '不同意', '有点不同意', '不确定', '有点同意', '同意', '非常同意'];

const state = {
  stage: 0,
  mbti: {
    EI: { selected: 'I', strength: 65, preset: 'clear' },
    SN: { selected: 'N', strength: 65, preset: 'clear' },
    TF: { selected: 'F', strength: 65, preset: 'clear' },
    JP: { selected: 'P', strength: 65, preset: 'clear' },
  },
  calibration: {},
  environment: {},
  script: 'richKid',
  lastCalc: null,
};

const calibrationQuestions = [
  { id: 'c1', text: '我越在乎一件事，越会在开始之前先把失败版本想一遍。', weights: { riskPrediction: 2.7, imageControl: 1.3, emotionalSensitivity: 1.2 } },
  { id: 'c2', text: '我不一定说出口，但我其实很想证明自己不是随便混混。', weights: { ambition: 2.8, imageControl: 1.2, riskPrediction: 0.8 } },
  { id: 'c3', text: '气氛一冷下来，我会下意识想做点什么让场面恢复正常。', weights: { relationshipCare: 2.5, emotionalSensitivity: 1.7, expressiveDrama: 0.9 } },
  { id: 'c4', text: '我很讨厌被一种生活、关系或身份彻底固定住。', weights: { freedomNeed: 2.8, expressiveDrama: 1.1, imageControl: -0.8 } },
  { id: 'c5', text: '我有很多想表达的东西，但经常会先判断这样说会不会不合适。', weights: { expressiveDrama: 1.8, imageControl: 2.2, riskPrediction: 1.2 } },
  { id: 'c6', text: '在人群里，我经常像坐在旁边看戏一样观察大家。', weights: { observerAnalysis: 2.8, emotionalSensitivity: 0.8, relationshipCare: -0.4 } },
  { id: 'c7', text: '别人还没说自己难受，我有时已经能感觉到对方不太对劲。', weights: { emotionalSensitivity: 2.6, relationshipCare: 1.6, observerAnalysis: 0.9 } },
  { id: 'c8', text: '我表面上可以很稳定，但心里其实经常弹幕很多。', weights: { emotionalSensitivity: 2.1, imageControl: 1.9, riskPrediction: 1.2 } },
];

const environmentStages = [
  {
    id: 's1',
    mood: '片段 01',
    questions: [
      { id: 'e1', dim: 'resourceDensity', text: '从小到大，我通常不太需要为现实资源发愁。' },
      { id: 'e2', dim: 'resourceDensity', text: '家里能给我提供见识、信息、机会或选择。' },
      { id: 'e3', dim: 'emotionalSupport', text: '我难过或崩溃时，家里人更像是接住我，而不是先评价我。' },
      { id: 'e4', dim: 'emotionalSupport', text: '我可以向家里表达脆弱，而不会立刻觉得丢脸或麻烦。' },
      { id: 'e5', dim: 'controlLevel', text: '很多选择，我会先考虑家里是否满意。' },
      { id: 'e6', dim: 'controlLevel', text: '表达不同意见时，我常常会被认为“不懂事”或“不体谅”。' },
      { id: 'e7', dim: 'stability', text: '我成长中的生活规则整体比较稳定，不需要经常重新适应。' },
      { id: 'e8', dim: 'relationshipComplexity', text: '我很早就学会通过语气和表情判断家里的气氛。' },
    ],
  },
  {
    id: 's2',
    mood: '片段 02',
    questions: [
      { id: 'e9', dim: 'evaluationPressure', text: '成绩、表现或成就经常和我的价值感绑在一起。' },
      { id: 'e10', dim: 'evaluationPressure', text: '我很早就知道“别让家里失望”是一种压力。' },
      { id: 'e11', dim: 'failureTolerance', text: '失败之后，家里更关注我学到了什么，而不是先责怪我。' },
      { id: 'e12', dim: 'failureTolerance', text: '我被允许试错，而不是每一步都必须正确。' },
      { id: 'e13', dim: 'expressionFreedom', text: '我可以直接表达不满，而不用太担心关系被破坏。' },
      { id: 'e14', dim: 'expressionFreedom', text: '我的喜欢、讨厌和欲望通常被允许存在。' },
      { id: 'e15', dim: 'resourceDensity', text: '想尝试新东西时，我通常能得到资源或行动上的支持。' },
      { id: 'e16', dim: 'emotionalSupport', text: '我被安慰的时候，更多感到被理解，而不是被要求赶紧变好。' },
    ],
  },
  {
    id: 's3',
    mood: '片段 03',
    questions: [
      { id: 'e17', dim: 'relationshipComplexity', text: '同学、朋友或集体关系里，我经常能感觉到没说出口的规则。' },
      { id: 'e18', dim: 'relationshipComplexity', text: '我需要在不同的人面前切换不同的相处方式。' },
      { id: 'e19', dim: 'stability', text: '家里的角色和边界大体清楚，不太需要我反复猜。' },
      { id: 'e20', dim: 'stability', text: '重要阶段里，我很少被突然改变生活安排或照顾方式。' },
      { id: 'e21', dim: 'controlLevel', text: '我有时需要让重要的大人满意，关系才会变得安全。' },
      { id: 'e22', dim: 'evaluationPressure', text: '我常常觉得自己需要表现得足够好，才有资格松一口气。' },
      { id: 'e23', dim: 'expressionFreedom', text: '在学校或家庭里，我可以比较自然地展示自己，而不总是要“懂事”。' },
      { id: 'e24', dim: 'failureTolerance', text: '在我过去的重要阶段里，失败更像过程，而不是判决书。' },
    ],
  },
  {
    id: 's4',
    mood: '片段 04',
    questions: [
      { id: 'e25', dim: 'resourceDensity', text: '我接触过的环境给过我足够多的可能性，而不是只有一条路。' },
      { id: 'e26', dim: 'emotionalSupport', text: '我在关系里可以求助，而不会觉得自己给别人添麻烦。' },
      { id: 'e27', dim: 'controlLevel', text: '我做决定时，经常要先过滤一遍“这样会不会让人不高兴”。' },
      { id: 'e28', dim: 'evaluationPressure', text: '被比较、被评价、被排名，对我的影响一直比较大。' },
      { id: 'e29', dim: 'stability', text: '我很少需要靠自己去判断一个环境今天到底安不安全。' },
      { id: 'e30', dim: 'relationshipComplexity', text: '很多时候，我不是不会说话，而是太会判断什么时候该说什么。' },
      { id: 'e31', dim: 'expressionFreedom', text: '我可以表达不一样的想法，而不担心因此被贴上“不合群”的标签。' },
      { id: 'e32', dim: 'failureTolerance', text: '我遇到挫折时，更容易被鼓励继续试，而不是先被提醒“别丢脸”。' },
    ],
  },
];

const environmentQuestions = environmentStages.flatMap(stage => stage.questions);

const envImpactMatrix = {
  resourceDensity: { ambition: 5, freedomNeed: 3, riskPrediction: -2, imageControl: 2, observerAnalysis: 1 },
  emotionalSupport: { emotionalSensitivity: -8, relationshipCare: 5, riskPrediction: -8, expressiveDrama: 7, freedomNeed: 4, observerAnalysis: -2, imageControl: -4 },
  controlLevel: { riskPrediction: 10, imageControl: 10, emotionalSensitivity: 5, freedomNeed: 6, expressiveDrama: -7, observerAnalysis: 5, relationshipCare: 3 },
  evaluationPressure: { ambition: 9, riskPrediction: 8, imageControl: 8, emotionalSensitivity: 3, expressiveDrama: -3 },
  stability: { riskPrediction: -9, emotionalSensitivity: -6, relationshipCare: 2, observerAnalysis: -3, freedomNeed: -2, imageControl: -2 },
  relationshipComplexity: { emotionalSensitivity: 8, relationshipCare: 8, observerAnalysis: 8, riskPrediction: 7, imageControl: 4, expressiveDrama: -2 },
  expressionFreedom: { expressiveDrama: 10, imageControl: -6, riskPrediction: -7, freedomNeed: 5, emotionalSensitivity: -2 },
  failureTolerance: { ambition: 5, freedomNeed: 5, riskPrediction: -8, imageControl: -6, observerAnalysis: -2 },
};

const typeProfiles = {
  '情绪客服主管': {
    vector: { emotionalSensitivity: 85, relationshipCare: 90, riskPrediction: 65, imageControl: 70, ambition: 45, freedomNeed: 35, expressiveDrama: 55, observerAnalysis: 50 },
    short: '你像一个随身携带情绪急救包的人，别人靠近你，会觉得世界暂时没那么难熬。',
    long: '你的底色里有很强的关系雷达和照护本能。你会本能地感知别人有没有不舒服，也会习惯把场面维持在一种可承受的温度里。它不是单纯的讨好，更像一种很早长出来的协调能力：你知道人和人之间哪里容易裂开，也知道怎样先把那条裂缝轻轻按住。',
  },
  '人间预警系统': {
    vector: { emotionalSensitivity: 90, relationshipCare: 55, riskPrediction: 90, imageControl: 65, ambition: 45, freedomNeed: 50, expressiveDrama: 45, observerAnalysis: 75 },
    short: '你不是想太多，你是把人生当成灾难片预告在看。',
    long: '你的底色很擅长提前捕捉风险。别人还在说“应该没事”，你可能已经把三种坏结果和两个备用方案都想好了。这种预警能力会让你显得谨慎、敏锐、甚至有点扫兴，但它也说明你很会保护自己和重要的人。只是在安全的时候，你也需要允许自己别那么早进入警戒状态。',
  },
  '体面发疯型': {
    vector: { emotionalSensitivity: 85, relationshipCare: 55, riskPrediction: 75, imageControl: 90, ambition: 60, freedomNeed: 55, expressiveDrama: 75, observerAnalysis: 60 },
    short: '你像精装修毛坯房：外面看着很体面，里面已经开始小规模坍塌。',
    long: '你的底色不是没有情绪，而是很会把情绪整理成别人看不出来的样子。你重视分寸、体面和场面完整度，即使心里已经弹幕刷屏，也会先把自己放进一个还能见人的外壳里。你的优点是稳定、克制、能扛事；你的副作用是太容易把真正的波动压到很深。',
  },
  '温柔野心家': {
    vector: { emotionalSensitivity: 60, relationshipCare: 65, riskPrediction: 60, imageControl: 80, ambition: 90, freedomNeed: 45, expressiveDrama: 55, observerAnalysis: 65 },
    short: '你嘴上说顺其自然，背地里已经把人生 KPI 拆到季度了。',
    long: '你的底色里有明显的向上欲望，但你不喜欢把自己变得太硬。你想赢，也想赢得好看；你想被认可，也不想让人觉得你过于用力。你最特别的地方在于，你的野心不是冷冰冰的，它被礼貌、分寸和某种柔软包起来，所以常常要到结果出来，别人才发现你其实一直在往前走。',
  },
  '逃跑路线规划师': {
    vector: { emotionalSensitivity: 65, relationshipCare: 40, riskPrediction: 70, imageControl: 50, ambition: 45, freedomNeed: 95, expressiveDrama: 70, observerAnalysis: 65 },
    short: '你不是叛逆，你只是任何生活一旦超过保质期，就开始搜索逃生出口。',
    long: '你的底色很需要自由感。你可以认真，可以负责，也可以投入一段关系或一件事，但前提是你仍然感觉自己有选择。你害怕的不是稳定本身，而是被一种安排彻底写死。你的人生动力常常来自“我还可以去别处”“我还可以换一种活法”这种可能性。',
  },
  '氛围修复师': {
    vector: { emotionalSensitivity: 75, relationshipCare: 90, riskPrediction: 45, imageControl: 55, ambition: 50, freedomNeed: 45, expressiveDrama: 85, observerAnalysis: 45 },
    short: '你像人形暖场 BGM，别人沉默三秒，你已经想给空气递台阶了。',
    long: '你的底色有很强的场面修复能力。你能感知冷场，也愿意主动让气氛重新流动起来。你不一定是最外向的人，但你很懂得什么时候该接一句、什么时候该让别人舒服一点。你的能力很有价值，只是别忘了：有些尴尬不一定都要由你负责。',
  },
  '清醒旁观者': {
    vector: { emotionalSensitivity: 55, relationshipCare: 40, riskPrediction: 70, imageControl: 65, ambition: 55, freedomNeed: 60, expressiveDrama: 45, observerAnalysis: 95 },
    short: '别人都已经入戏了，你还在分析导演到底想表达什么。',
    long: '你的底色习惯保留一个观察席。你可以参与生活，但不会完全被气氛卷走；你会在热闹里看结构，在关系里看逻辑，在情绪里找因果。它让你清醒，也让你不容易被骗。但有时你也会因为太会旁观，而错过直接投入一次的笨拙快乐。',
  },
  '浪漫废墟建筑师': {
    vector: { emotionalSensitivity: 85, relationshipCare: 55, riskPrediction: 60, imageControl: 45, ambition: 50, freedomNeed: 75, expressiveDrama: 95, observerAnalysis: 70 },
    short: '事情可以烂，但氛围必须有；日子可以碎，但文案必须会发光。',
    long: '你的底色很会把混乱加工成意义。你能在不完美的生活里捡到画面、记忆和故事感，也会把一些别人觉得普通的瞬间保存得很郑重。你不是沉迷痛苦，而是有一种把废墟重新搭成风景的能力。只是有时要小心，别把本该解决的问题全部美化成命运。',
  },
};

const scripts = {
  richKid: {
    name: '首富的孩子',
    subtitle: '你拥有一切，但不知道哪一次努力真的属于你。',
    params: { resourceDensity: 96, emotionalSupport: 55, controlLevel: 72, evaluationPressure: 88, stability: 76, relationshipComplexity: 76, expressionFreedom: 54, failureTolerance: 34 },
    events: ['继承期待', '公众审视', '选择过多', '失败不被允许'],
    hook: '资源过剩与真实感饥饿',
  },
  celebrityKid: {
    name: '顶流巨星家的小孩',
    subtitle: '你从小被看见，却不一定被理解。',
    params: { resourceDensity: 84, emotionalSupport: 55, controlLevel: 66, evaluationPressure: 93, stability: 48, relationshipComplexity: 90, expressionFreedom: 44, failureTolerance: 38 },
    events: ['舆论凝视', '人设管理', '表达被误读', '亲密关系被消费'],
    hook: '高曝光与被误读',
  },
  oldMoney: {
    name: '神秘老钱家族继承人',
    subtitle: '你被训练得很体面，但也许很晚才知道自己想要什么。',
    params: { resourceDensity: 92, emotionalSupport: 50, controlLevel: 88, evaluationPressure: 80, stability: 84, relationshipComplexity: 84, expressionFreedom: 34, failureTolerance: 34 },
    events: ['家族规训', '隐形竞争', '礼仪训练', '不能失态'],
    hook: '体面规训与自发性压抑',
  },
  seaside: {
    name: '海边小镇野生长大的小孩',
    subtitle: '你很自由，但要很晚才学会给自己搭结构。',
    params: { resourceDensity: 46, emotionalSupport: 72, controlLevel: 24, evaluationPressure: 30, stability: 60, relationshipComplexity: 42, expressionFreedom: 90, failureTolerance: 80 },
    events: ['低控制生活', '自然探索', '资源有限', '靠自己摸索'],
    hook: '自由感与结构感不足',
  },
  grindFamily: {
    name: '全家都是卷王的天选打工圣体',
    subtitle: '如果支持是理解，你会长出坚毅；如果支持是催促，你会长出焦虑。',
    params: { resourceDensity: 62, emotionalSupport: 45, controlLevel: 78, evaluationPressure: 96, stability: 72, relationshipComplexity: 58, expressionFreedom: 38, failureTolerance: 28 },
    events: ['长期比较', '规划人生', '成绩压力', '休息羞耻'],
    hook: '高执行力与休息困难',
  },
  relatives: {
    name: '被亲戚轮流带大的江湖型小孩',
    subtitle: '你很会生存，但很难完全相信一个地方真的属于你。',
    params: { resourceDensity: 45, emotionalSupport: 44, controlLevel: 55, evaluationPressure: 55, stability: 24, relationshipComplexity: 94, expressionFreedom: 50, failureTolerance: 48 },
    events: ['环境频繁切换', '看脸色', '人情规则', '早熟懂事'],
    hook: '高适应力与安全感不稳',
  },
};

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function mapValues(obj, mapper) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, mapper(v, k)]));
}

function emptyPersonalityVector(value = 50) {
  return Object.fromEntries(personalityDims.map(d => [d.key, value]));
}

function axisStrength(pairKey) {
  const d = state.mbti[pairKey];
  return ((d.strength - 50) / 50);
}

function getMbtiAxisFromInput() {
  return {
    EI: (state.mbti.EI.selected === 'E' ? 1 : -1) * axisStrength('EI'),
    SN: (state.mbti.SN.selected === 'N' ? 1 : -1) * axisStrength('SN'),
    TF: (state.mbti.TF.selected === 'F' ? 1 : -1) * axisStrength('TF'),
    JP: (state.mbti.JP.selected === 'J' ? 1 : -1) * axisStrength('JP'),
  };
}

function axisToMbti(axis) {
  const pairs = [
    ['EI', 'E', 'I'],
    ['SN', 'N', 'S'],
    ['TF', 'F', 'T'],
    ['JP', 'J', 'P'],
  ];
  const letters = pairs.map(([key, pos, neg]) => axis[key] >= 0 ? pos : neg).join('');
  const ratios = pairs.map(([key, pos, neg]) => {
    const positiveValue = clamp(Math.round(50 + axis[key] * 50));
    const negativeValue = 100 - positiveValue;
    return {
      key,
      positive: pos,
      negative: neg,
      positiveValue,
      negativeValue,
      selected: axis[key] >= 0 ? pos : neg,
      selectedValue: axis[key] >= 0 ? positiveValue : negativeValue,
    };
  });
  return { letters, ratios };
}

function inputMbtiResult() {
  return axisToMbti(getMbtiAxisFromInput());
}

function mbtiAxisToPersonalityVector(axis) {
  const { EI, SN, TF, JP } = axis;
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

function personalityVectorToMbtiAxis(vector) {
  const z = key => (vector[key] - 50) / 50;
  const axis = {
    EI: 0.35 * z('expressiveDrama') + 0.25 * z('relationshipCare') - 0.35 * z('observerAnalysis') - 0.12 * z('riskPrediction'),
    SN: 0.35 * z('expressiveDrama') + 0.30 * z('observerAnalysis') + 0.25 * z('freedomNeed') - 0.12 * z('imageControl'),
    TF: 0.35 * z('emotionalSensitivity') + 0.32 * z('relationshipCare') - 0.18 * z('observerAnalysis') - 0.12 * z('ambition'),
    JP: 0.34 * z('imageControl') + 0.24 * z('ambition') + 0.25 * z('riskPrediction') - 0.30 * z('freedomNeed'),
  };
  return mapValues(axis, v => Math.max(-1, Math.min(1, v)));
}

function applyCalibration(vector) {
  const next = { ...vector };
  calibrationQuestions.forEach(q => {
    const answer = state.calibration[q.id] ?? 4;
    const delta = answer - 4;
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
    const deviation = (envVector[envDim.key] - 50) / 50;
    const rules = envImpactMatrix[envDim.key] || {};
    Object.entries(rules).forEach(([pDim, coefficient]) => {
      impact[pDim] += deviation * coefficient * intensity;
    });
  });

  // 互动项：不是所有环境变量都单独起作用，支持/压力/资源会互相改写。
  if (envVector.evaluationPressure > 65 && envVector.emotionalSupport < 45) {
    impact.riskPrediction += 6 * intensity;
    impact.imageControl += 4 * intensity;
    impact.emotionalSensitivity += 3 * intensity;
  }
  if (envVector.evaluationPressure > 65 && envVector.failureTolerance > 65 && envVector.emotionalSupport > 55) {
    impact.ambition += 5 * intensity;
    impact.riskPrediction -= 3 * intensity;
  }
  if (envVector.resourceDensity > 70 && envVector.emotionalSupport < 45) {
    impact.imageControl += 4 * intensity;
    impact.freedomNeed += 3 * intensity;
    impact.emotionalSensitivity += 2 * intensity;
  }
  if (envVector.relationshipComplexity > 70 && envVector.stability < 45) {
    impact.observerAnalysis += 5 * intensity;
    impact.riskPrediction += 5 * intensity;
  }
  if (envVector.controlLevel > 70 && envVector.expressionFreedom < 45) {
    impact.expressiveDrama -= 4 * intensity;
    impact.imageControl += 4 * intensity;
  }

  return mapValues(impact, v => Math.round(v * 10) / 10);
}

function combineVectors(a, b, aWeight = 1, bWeight = 1) {
  const result = {};
  personalityDims.forEach(dim => {
    result[dim.key] = clamp(Math.round((a[dim.key] || 0) * aWeight + (b[dim.key] || 0) * bWeight));
  });
  return result;
}

function topDims(vector, dims = personalityDims, count = 3, descending = true) {
  return [...dims].sort((a, b) => descending ? vector[b.key] - vector[a.key] : vector[a.key] - vector[b.key]).slice(0, count);
}

function matchType(vector) {
  const dist = (a, b) => Math.sqrt(personalityDims.reduce((sum, d) => sum + Math.pow((a[d.key] || 0) - (b[d.key] || 0), 2), 0));
  const matches = Object.entries(typeProfiles).map(([name, data]) => ({ name, data, distance: dist(vector, data.vector) }));
  matches.sort((a, b) => a.distance - b.distance);
  return { main: matches[0], second: matches[1], all: matches };
}

function getEventSensitivity(baseVector, envParams) {
  const effect = emptyPersonalityVector(0);
  const notes = [];
  const add = (dim, val) => { effect[dim] += val; };

  if (baseVector.emotionalSensitivity > 62 && envParams.evaluationPressure > 65) {
    add('riskPrediction', 4); add('emotionalSensitivity', 3); add('imageControl', 2);
    notes.push('评价压力会更容易触发你的预警系统。');
  }
  if (baseVector.ambition > 62 && envParams.evaluationPressure > 65) {
    add('ambition', 5); add('imageControl', 2);
    notes.push('压力更容易被你转译成证明欲。');
  }
  if (baseVector.freedomNeed > 62 && envParams.controlLevel > 60) {
    add('freedomNeed', 5); add('expressiveDrama', 2); add('imageControl', -1);
    notes.push('规训越强，你越会在心里保留逃跑路线。');
  }
  if (baseVector.relationshipCare > 62 && envParams.relationshipComplexity > 65) {
    add('relationshipCare', 4); add('observerAnalysis', 2); add('emotionalSensitivity', 2);
    notes.push('复杂关系会放大你的察言观色能力。');
  }
  if (baseVector.riskPrediction > 62 && envParams.stability < 50) {
    add('riskPrediction', 4); add('imageControl', 2); add('expressiveDrama', -2);
    notes.push('不稳定环境会让你更谨慎地收紧表达。');
  }
  if (baseVector.imageControl > 65 && envParams.expressionFreedom < 45) {
    add('imageControl', 4); add('emotionalSensitivity', 2);
    notes.push('低表达自由会让你的体面外壳更厚。');
  }
  return { effect: mapValues(effect, v => Math.round(v * 10) / 10), notes };
}

function calculateAll() {
  const inputMbti = inputMbtiResult();
  const inputAxis = getMbtiAxisFromInput();
  const mbtiVector = mbtiAxisToPersonalityVector(inputAxis);
  const currentVector = applyCalibration(mbtiVector);
  const currentMbti = axisToMbti(personalityVectorToMbtiAxis(currentVector));
  const realEnv = getEnvironmentVector();
  const realImpact = getEnvironmentImpact(realEnv, 1);
  const baseVector = combineVectors(currentVector, realImpact, 1, -0.38);
  const initMbti = axisToMbti(personalityVectorToMbtiAxis(baseVector));
  const typeMatch = matchType(baseVector);
  const script = scripts[state.script];
  const scriptImpactBase = getEnvironmentImpact(script.params, 1);
  const sensitivity = getEventSensitivity(baseVector, script.params);
  const scriptImpact = combineDelta(scriptImpactBase, sensitivity.effect);
  const parallelVector = combineVectors(baseVector, scriptImpact, 1, 0.56);
  const parallelMbti = axisToMbti(personalityVectorToMbtiAxis(parallelVector));
  const parallelType = matchType(parallelVector);

  return { inputMbti, currentMbti, initMbti, parallelMbti, mbtiVector, currentVector, realEnv, realImpact, baseVector, typeMatch, script, scriptImpact, parallelVector, parallelType, notes: sensitivity.notes };
}

function combineDelta(a, b) {
  const out = {};
  personalityDims.forEach(d => out[d.key] = Math.round(((a[d.key] || 0) + (b[d.key] || 0)) * 10) / 10);
  return out;
}

function renderMbtiForm() {
  const root = document.getElementById('mbtiForm');
  root.innerHTML = mbtiPairs.map(pair => {
    const data = state.mbti[pair.key];
    const selectedValue = data.strength;
    const otherValue = 100 - selectedValue;
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
          <span>偏向强度：</span>
          <input type="number" min="50" max="100" value="${data.strength}" data-action="custom-strength" data-pair="${pair.key}" />
          <span>/ 100</span>
        </div>
        <div class="ratio-note">当前：${data.selected} ${selectedValue}% / ${data.selected === pair.left ? pair.right : pair.left} ${otherValue}%</div>
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

function renderCalibrationQuestions() {
  document.getElementById('calibrationForm').innerHTML = calibrationQuestions.map(q => renderScaleQuestion(q, 'calibration')).join('');
}

function renderStageNav() {
  const root = document.getElementById('stageNav');
  root.innerHTML = environmentStages.map((stage, idx) => `
    <button class="stage-pill ${state.stage === idx ? 'active' : ''}" data-action="stage" data-stage="${idx}">${stage.mood}</button>
  `).join('');
}

function renderEnvironmentStage() {
  renderStageNav();
  const stage = environmentStages[state.stage];
  document.getElementById('environmentForm').innerHTML = stage.questions.map(q => renderScaleQuestion(q, 'environment')).join('');
  document.getElementById('prevStageBtn').disabled = state.stage === 0;
  document.getElementById('nextStageBtn').textContent = state.stage === environmentStages.length - 1 ? '已经是最后一组' : '下一组';
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

function renderRatios(mbti) {
  return mbti.ratios.map(r => {
    const left = `${r.positive} ${r.positiveValue}%`;
    const right = `${r.negative} ${r.negativeValue}%`;
    return `<span class="tag">${left} / ${right}</span>`;
  }).join('');
}

function mbtiDifferenceText(input, current, init) {
  const diffInputInit = input.letters === init.letters ? '没有发生字母层面的变化，但比例已经被重新校准。' : `从你输入的 ${input.letters}，被反推到更接近 ${init.letters}。`;
  const diffCurrentInit = current.letters === init.letters ? '校准后的当前表现和初始化设定在字母上接近，说明环境剥离更多改变的是强弱比例。' : `校准后的当前表现更像 ${current.letters}，初始化设定更像 ${init.letters}，说明环境可能改变了你呈现出来的外壳。`;
  return `${diffInputInit}${diffCurrentInit}`;
}

function environmentText(env) {
  const high = topDims(env, environmentDims, 3).map(d => d.label);
  const low = topDims(env, environmentDims, 2, false).map(d => d.label);
  const parts = [];
  if (env.controlLevel > 64) parts.push('你可能比较早学会了先判断规则，再表达自己。');
  if (env.evaluationPressure > 64) parts.push('评价和比较可能把一部分动力变成了证明欲，也把一部分谨慎变成了预警。');
  if (env.emotionalSupport < 45) parts.push('当情绪没有被稳定接住，人就更容易把感受留给自己处理。');
  if (env.relationshipComplexity > 64) parts.push('复杂关系会训练出察言观色，也会让人很难完全放松。');
  if (env.failureTolerance < 45) parts.push('如果失败经常像判决书，你就会更早学会体面和回避风险。');
  if (!parts.length) parts.push('你的环境没有出现特别极端的塑形信号，所以系统只做轻度剥离。');
  return { high, low, paragraph: `你的成长环境里较突出的变量是 ${high.join('、')}；相对较弱的是 ${low.join('、')}。${parts.join('')}` };
}

function initialReportHTML(calc) {
  const type = calc.typeMatch.main;
  const second = calc.typeMatch.second;
  const env = environmentText(calc.realEnv);
  const currentHigh = topDims(calc.currentVector).map(d => d.label);
  return `
    <div class="report-grid">
      <section class="report-block full">
        <h3>一、MBTI 反推结果</h3>
        <div class="compare-row">
          <div class="compare-card"><span>你输入的现实 MBTI</span><b>${calc.inputMbti.letters}</b><div class="tag-row">${renderRatios(calc.inputMbti)}</div></div>
          <div class="compare-card"><span>校准后的当前表现</span><b>${calc.currentMbti.letters}</b><div class="tag-row">${renderRatios(calc.currentMbti)}</div></div>
          <div class="compare-card"><span>初始化设定</span><b>${calc.initMbti.letters}</b><div class="tag-row">${renderRatios(calc.initMbti)}</div></div>
        </div>
        <p>${mbtiDifferenceText(calc.inputMbti, calc.currentMbti, calc.initMbti)}这里的“初始化设定”不是在说真正的你，而是在做一个反事实推测：如果少一些现实环境的塑形痕迹，你更可能以什么方式反应、表达和选择。</p>
      </section>

      <section class="report-block">
        <h3>二、我们体系的人格底色</h3>
        <p><strong>${type.name}</strong>，副倾向接近 <strong>${second.name}</strong>。</p>
        <p>${type.data.long}</p>
        <div class="tag-row">${topDims(calc.baseVector).map(d => `<span class="tag">${d.label}</span>`).join('')}</div>
      </section>

      <section class="report-block">
        <h3>三、环境如何塑造你</h3>
        <p>${env.paragraph}</p>
        <p>所以你现在突出的 <strong>${currentHigh.join('、')}</strong>，不一定全是“天生如此”。其中一部分可能是你为了适应过去的重要关系、评价系统和生活规则而长出的能力。</p>
      </section>
    </div>
  `;
}

function parallelReportHTML(calc) {
  const type = calc.typeMatch.main;
  const pType = calc.parallelType.main;
  const env = environmentText(calc.realEnv);
  const bio = createMiniBiography(calc);
  const notes = calc.notes.length ? `这个剧本会特别触发：${calc.notes.join(' ')}` : '这个剧本没有触发特别极端的敏感规则，因此结果更多来自剧本本身的环境参数。';
  return `
    <div class="report-grid">
      <section class="report-block full">
        <h3>一、MBTI：现实、初始化与平行人生</h3>
        <div class="compare-row">
          <div class="compare-card"><span>现实输入</span><b>${calc.inputMbti.letters}</b><div class="tag-row">${renderRatios(calc.inputMbti)}</div></div>
          <div class="compare-card"><span>初始化设定</span><b>${calc.initMbti.letters}</b><div class="tag-row">${renderRatios(calc.initMbti)}</div></div>
          <div class="compare-card"><span>平行剧本后</span><b>${calc.parallelMbti.letters}</b><div class="tag-row">${renderRatios(calc.parallelMbti)}</div></div>
        </div>
        <p>在《${calc.script.name}》里，MBTI 不是被简单替换，而是被环境重新推了一把。你的初始化设定像一张底稿，剧本负责在上面加光、加阴影，也加一点生活的噪点。</p>
      </section>

      <section class="report-block">
        <h3>二、我们体系的人格结果</h3>
        <p>初始化人格底色是 <strong>${type.name}</strong>；进入这个剧本后，更接近 <strong>${pType.name}</strong>。</p>
        <p>${pType.data.short} 这不是说你变成另一个人，而是同一组倾向在不同环境里换了一种外壳。你身上原本就有的东西，会被这个剧本重新排列：有的被放大，有的被包装，有的则变成只有你自己知道的暗线。</p>
      </section>

      <section class="report-block">
        <h3>三、环境怎样继续改写你</h3>
        <p>${env.paragraph}</p>
        <p>${notes} 这部分不会在前台展开成公式，因为它更像一个叙事方向：同样的资源、压力和关系，落在不同底色的人身上，会长出不一样的反应。</p>
      </section>

      <section class="report-block full">
        <h3>四、平行人生小传</h3>
        <p>${bio}</p>
        <p class="poem">${poeticEnding(calc)}</p>
      </section>
    </div>
  `;
}

function createMiniBiography(calc) {
  const scriptKey = state.script;
  const baseName = calc.typeMatch.main.name;
  const pName = calc.parallelType.main.name;
  const common = `你还是那个底色为 ${baseName} 的人，只是被《${calc.script.name}》改写了外壳，最后长成了更接近 ${pName} 的版本。`;
  if (scriptKey === 'richKid') return `你坐在曼哈顿顶层公寓的落地窗前，城市灯光像一张已经替你写好答案的考卷。管家把晚餐菜单放在桌上，你却突然想起中学操场边那瓶两块钱的矿泉水。别人以为你最擅长享受，只有你知道，你最怀念的是一件必须靠自己拼尽全力的普通小事。${common} 你不缺选择，缺的是一次选择之后真的属于自己的汗水。`;
  if (scriptKey === 'celebrityKid') return `你从小就知道镜头会放大一切，也会误读一切。你的生日、成绩、表情和沉默都可能被别人写成故事。于是你很早学会整理自己，把每一次出现都调成刚好能被接受的亮度。${common} 很多年后，你最珍惜的反而不是掌声，而是某个没人拍到的下午：你终于不用解释自己，只是安静地做了一次自己。`;
  if (scriptKey === 'oldMoney') return `你在家族晚宴上学会的第一课，不是餐具怎么摆，而是情绪不能摆在脸上。你知道什么时候该微笑，什么时候该沉默，什么时候要把真正想说的话放进第二天的日记。${common} 你像一封格式正确的信，克制、漂亮、没有错字。直到有一天，你开始在页边写下真正属于自己的笔迹。`;
  if (scriptKey === 'seaside') return `如果你在海边小镇野生长大，很多事情不会那么早被送去审核。风、潮湿空气、便利店灯光和一场临时起意的出走，会比排名和规训更早教你理解自己。${common} 你可能不一定最会规划，但很会活。别人忙着证明自己，你忙着把黄昏和海盐味的风收进人生证据里。`;
  if (scriptKey === 'grindFamily') return `你很早就学会把人生拆成计划，把计划拆成进度，把休息拆成内疚。家里人不是不爱你，只是太习惯把爱翻译成“再努力一点”。${common} 如果支持是理解，你会长出坚毅；如果支持是催促，你会把焦虑包装成自律。后来你终于明白，真正厉害的人不是永远不累，而是知道什么时候停下来，才能继续走得更远。`;
  if (scriptKey === 'relatives') return `你像一只很早学会换季的动物，在哪里都能活，和谁都能说上几句。每个大人有不同规则，每个屋檐有不同天气，你于是练出一套很灵的生存系统。${common} 你会适应，会判断，会在夹缝里找到位置。可你人生最重要的成长，也许不是更会适应，而是终于找到一个地方，不用表演适应也能留下。`;
  return `${common} 这个剧本没有改变你是谁，只是让你的某些部分换了一个出场顺序。`;
}

function poeticEnding(calc) {
  const endings = {
    richKid: '你不需要证明自己配得上命运，你只需要找到一次，真的由你亲手开始的生活。',
    celebrityKid: '世界可以看见很多个你，但总有一个版本，只需要被你自己温柔保存。',
    oldMoney: '体面是你学会的语言，自由才是你迟早要写出的母语。',
    seaside: '愿你心里一直有海，也有一条回到自己的路。',
    grindFamily: '愿你终有一天相信，停下来不是失败，是为了把自己还给自己。',
    relatives: '愿你不只会在任何地方活下来，也终于能在某个地方安心留下。',
  };
  return endings[state.script] || '你没有被剧本决定，你只是借另一个剧本，看见了另一个自己。';
}

function renderVectorTable(title, vector, dims = personalityDims) {
  return `
    <div class="deep-block">
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
    </div>
  `;
}

function normalizeImpactForDisplay(impact) {
  return Object.fromEntries(personalityDims.map(d => [d.key, clamp(Math.round(50 + (impact[d.key] || 0) * 2))]));
}

function renderDeepPanel(calc) {
  return [
    renderVectorTable('MBTI 输入转换向量', calc.mbtiVector),
    renderVectorTable('校准后的当前人格向量', calc.currentVector),
    renderVectorTable('现实成长环境向量', calc.realEnv, environmentDims),
    renderVectorTable('现实环境塑形影响', normalizeImpactForDisplay(calc.realImpact)),
    renderVectorTable('反推后的初始化人格向量', calc.baseVector),
    renderVectorTable('当前选择剧本的塑形影响', normalizeImpactForDisplay(calc.scriptImpact)),
    renderVectorTable('平行人生人格向量', calc.parallelVector),
  ].join('');
}

function generateInitialReport() {
  const calc = calculateAll();
  state.lastCalc = calc;
  document.getElementById('initialReportContent').innerHTML = initialReportHTML(calc);
  document.getElementById('deepPanel').innerHTML = renderDeepPanel(calc);
  document.getElementById('initialReportWrap').hidden = false;
  document.getElementById('step-script').hidden = false;
  document.getElementById('initialReportWrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function generateParallelReport() {
  const calc = calculateAll();
  state.lastCalc = calc;
  document.getElementById('parallelTitle').textContent = `你在《${calc.script.name}》里会长成什么样`;
  document.getElementById('parallelReportContent').innerHTML = parallelReportHTML(calc);
  document.getElementById('deepPanel').innerHTML = renderDeepPanel(calc);
  document.getElementById('parallelReportWrap').hidden = false;
  document.getElementById('parallelReportWrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    state[target.dataset.group][target.dataset.id] = Number(target.dataset.value);
    if (target.dataset.group === 'calibration') renderCalibrationQuestions();
    if (target.dataset.group === 'environment') renderEnvironmentStage();
  }
  if (action === 'stage') {
    state.stage = Number(target.dataset.stage);
    renderEnvironmentStage();
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

function resetAll() {
  state.stage = 0;
  state.mbti = {
    EI: { selected: 'I', strength: 65, preset: 'clear' },
    SN: { selected: 'N', strength: 65, preset: 'clear' },
    TF: { selected: 'F', strength: 65, preset: 'clear' },
    JP: { selected: 'P', strength: 65, preset: 'clear' },
  };
  state.calibration = {};
  state.environment = {};
  state.script = 'richKid';
  state.lastCalc = null;
  document.getElementById('initialReportWrap').hidden = true;
  document.getElementById('parallelReportWrap').hidden = true;
  document.getElementById('step-script').hidden = true;
  document.getElementById('deepPanel').hidden = true;
  renderAll();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderAll() {
  renderMbtiForm();
  renderCalibrationQuestions();
  renderEnvironmentStage();
  renderScripts();
}

document.addEventListener('click', handleClick);
document.addEventListener('change', handleInput);
document.getElementById('initialReportBtn').addEventListener('click', generateInitialReport);
document.getElementById('parallelBtn').addEventListener('click', generateParallelReport);
document.getElementById('resetBtn').addEventListener('click', resetAll);
document.getElementById('prevStageBtn').addEventListener('click', () => { state.stage = Math.max(0, state.stage - 1); renderEnvironmentStage(); });
document.getElementById('nextStageBtn').addEventListener('click', () => { state.stage = Math.min(environmentStages.length - 1, state.stage + 1); renderEnvironmentStage(); });
document.getElementById('toggleDeepBtn').addEventListener('click', () => {
  const panel = document.getElementById('deepPanel');
  panel.hidden = !panel.hidden;
  document.getElementById('toggleDeepBtn').textContent = panel.hidden ? '展开深层分析' : '收起深层分析';
});

renderAll();
