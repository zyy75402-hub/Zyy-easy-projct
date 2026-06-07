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
const mbtiLetters = ['E','I','S','N','T','F','J','P'];

const state = {
  stage: 0,
  mbti: {
    EI: { selected: 'E', strength: 65, preset: 'clear' },
    SN: { selected: 'N', strength: 65, preset: 'clear' },
    TF: { selected: 'F', strength: 65, preset: 'clear' },
    JP: { selected: 'P', strength: 65, preset: 'clear' },
  },
  current: {},
  reflection: {},
  responseTimes: {},
  questionRenderedAt: {},
  script: 'richKid',
  lastCalc: null,
};

const currentQuestions = [
  {
    id: 'cur_01',
    text: '现在的我在热闹场合里比较容易被点燃，互动越多越有能量。',
    mbtiRule: { E: 0.55, I: -0.55 },
    objectRule: { expressiveDrama: 0.55, freedomNeed: 0.25, emotionalSensitivity: 0.1 },
    evidenceTags: ['当前社交能量']
  },
  {
    id: 'cur_02',
    text: '现在的我在做决定时，更容易先照顾人的感受，而不是先拆逻辑。',
    mbtiRule: { F: 0.55, T: -0.55 },
    objectRule: { relationshipCare: 0.55, emotionalSensitivity: 0.35, observerAnalysis: -0.15 },
    evidenceTags: ['当前决策方式']
  },
  {
    id: 'cur_03',
    text: '现在的我面对临时变化时，通常不会太抗拒，甚至会觉得有点新鲜。',
    mbtiRule: { P: 0.52, J: -0.52 },
    objectRule: { freedomNeed: 0.55, imageControl: -0.35, riskPrediction: -0.25 },
    evidenceTags: ['当前计划弹性']
  },
  {
    id: 'cur_04',
    text: '现在的我更容易被可能性、氛围和想象吸引，而不是只看现实细节。',
    mbtiRule: { N: 0.52, S: -0.52 },
    objectRule: { expressiveDrama: 0.45, observerAnalysis: 0.25, freedomNeed: 0.2 },
    evidenceTags: ['当前想象方式']
  },
  {
    id: 'cur_05',
    text: '现在的我会为了把事情做得更漂亮，而提前想很多细节和风险。',
    mbtiRule: { J: 0.35, P: -0.25, I: 0.12 },
    objectRule: { imageControl: 0.7, riskPrediction: 0.55, ambition: 0.25 },
    evidenceTags: ['当前风险预判']
  },
  {
    id: 'cur_06',
    text: '现在的我有不少想表达的东西，但会先判断时机和场合是否合适。',
    mbtiRule: { I: 0.25, E: -0.15, F: 0.15 },
    objectRule: { expressiveDrama: 0.55, imageControl: 0.5, riskPrediction: 0.28 },
    evidenceTags: ['当前表达控制']
  },
  {
    id: 'cur_07',
    text: '现在的我在关系里很容易先察觉别人没有明说的情绪。',
    mbtiRule: { F: 0.38, I: 0.18 },
    objectRule: { emotionalSensitivity: 0.75, relationshipCare: 0.45, observerAnalysis: 0.3 },
    evidenceTags: ['当前情绪雷达']
  },
  {
    id: 'cur_08',
    text: '现在的我会把一些野心藏得比较轻，不太喜欢显得太用力。',
    mbtiRule: { J: 0.2, I: 0.15 },
    objectRule: { ambition: 0.55, imageControl: 0.45, observerAnalysis: 0.25 },
    evidenceTags: ['当前隐藏野心']
  },
];

const reflectionStages = [
  {
    id: 'r1', mood: '片段 01',
    questions: [
      {
        id: 'ref_01',
        text: '当我和家里人意见不一样时，对方更常要求我“听话一点”，而不是认真听我为什么这么想。',
        mbtiRule: { I: 0.28, E: -0.16, J: 0.22, P: -0.12 },
        objectRule: { imageControl: 0.75, riskPrediction: 0.58, freedomNeed: 0.45, expressiveDrama: -0.28 },
        evidenceTags: ['表达自由', '控制反馈', '家庭沟通']
      },
      {
        id: 'ref_02',
        text: '如果我在家里表达不满，事情通常会变得更僵，而不是更容易被解决。',
        mbtiRule: { I: 0.24, F: 0.18, J: 0.16 },
        objectRule: { emotionalSensitivity: 0.62, riskPrediction: 0.7, imageControl: 0.55, expressiveDrama: -0.25 },
        evidenceTags: ['表达代价', '关系气氛', '自我保护']
      },
      {
        id: 'ref_03',
        text: '小时候偷偷玩手机、看电视或做自己想做的事被发现时，家里人更常先发火或定性，而不是先问清楚原因。',
        mbtiRule: { J: 0.22, P: -0.1, I: 0.12 },
        objectRule: { riskPrediction: 0.66, imageControl: 0.5, freedomNeed: 0.35, emotionalSensitivity: 0.32 },
        evidenceTags: ['日常规训', '失败反馈', '控制反馈']
      },
      {
        id: 'ref_04',
        text: '如果同样的事情发生在考试前或重要节点，家里人的反应通常会明显更严厉。',
        mbtiRule: { J: 0.3, P: -0.18, I: 0.1 },
        objectRule: { evaluationPressure: 0.0, riskPrediction: 0.72, imageControl: 0.55, ambition: 0.32, emotionalSensitivity: 0.25 },
        evidenceTags: ['评价压力', '重要节点', '家庭期待']
      },
      {
        id: 'ref_05',
        text: '当我成绩、表现或结果不够好时，周围人更常先指出问题，而不是先肯定我已经努力过。',
        mbtiRule: { J: 0.34, P: -0.22, I: 0.12 },
        objectRule: { riskPrediction: 0.82, imageControl: 0.74, ambition: 0.38, emotionalSensitivity: 0.38 },
        evidenceTags: ['评价压力', '失败反馈', '自我要求']
      },
      {
        id: 'ref_06',
        text: '如果我一次没做好，别人很容易把这件事上升成“我这个人不够自觉、不够努力或不够懂事”。',
        mbtiRule: { I: 0.22, J: 0.28, F: 0.12 },
        objectRule: { emotionalSensitivity: 0.72, riskPrediction: 0.82, imageControl: 0.72, ambition: 0.32 },
        evidenceTags: ['人格化评价', '失败反馈', '自我价值']
      },
      {
        id: 'ref_07',
        text: '表现好的时候像是应该的，表现不好时却会被记很久。',
        mbtiRule: { J: 0.28, I: 0.12 },
        objectRule: { ambition: 0.42, riskPrediction: 0.76, imageControl: 0.65, emotionalSensitivity: 0.38 },
        evidenceTags: ['评价记忆', '自我要求', '压力来源']
      },
      {
        id: 'ref_08',
        text: '我做错事后，别人更常让我记住“下次不能这样”，而不是帮我复盘“这次为什么会这样”。',
        mbtiRule: { J: 0.26, P: -0.16 },
        objectRule: { failureTolerance: 0.0, riskPrediction: 0.68, imageControl: 0.52, observerAnalysis: 0.3 },
        evidenceTags: ['失败反馈', '复盘方式', '试错空间']
      },
    ],
  },
  {
    id: 'r2', mood: '片段 02',
    questions: [
      {
        id: 'ref_09',
        text: '当我尝试新东西失败时，周围人的反应更像是提醒我别再乱试，而不是鼓励我继续探索。',
        mbtiRule: { J: 0.2, P: -0.3, I: 0.12 },
        objectRule: { riskPrediction: 0.65, imageControl: 0.46, freedomNeed: 0.36, expressiveDrama: -0.2 },
        evidenceTags: ['试错空间', '失败反馈', '探索受限']
      },
      {
        id: 'ref_10',
        text: '如果我在重要事情上失误，别人通常更关注后果，而不是我有没有从中学到东西。',
        mbtiRule: { J: 0.3, P: -0.18 },
        objectRule: { riskPrediction: 0.78, imageControl: 0.68, ambition: 0.35, observerAnalysis: 0.18 },
        evidenceTags: ['失败后果', '评价压力', '长期自我要求']
      },
      {
        id: 'ref_11',
        text: '在升学、兴趣、交友或重要选择上，家里人的意见通常比我的真实想法更有决定权。',
        mbtiRule: { J: 0.26, P: -0.22, I: 0.12 },
        objectRule: { imageControl: 0.72, riskPrediction: 0.55, freedomNeed: 0.66, expressiveDrama: -0.28 },
        evidenceTags: ['选择权', '家庭期待', '路线安排']
      },
      {
        id: 'ref_12',
        text: '如果我想做一个和别人期待不同的选择，通常需要解释很多，甚至要证明自己不是冲动。',
        mbtiRule: { J: 0.18, P: -0.1, I: 0.14 },
        objectRule: { freedomNeed: 0.7, imageControl: 0.62, riskPrediction: 0.54, observerAnalysis: 0.28 },
        evidenceTags: ['选择证明', '表达自由', '自主性']
      },
      {
        id: 'ref_13',
        text: '当我想临时改变计划时，周围人更常觉得这是不稳定或不靠谱的表现。',
        mbtiRule: { P: -0.3, J: 0.32 },
        objectRule: { imageControl: 0.62, riskPrediction: 0.48, freedomNeed: 0.45, expressiveDrama: -0.2 },
        evidenceTags: ['计划规则', '稳定期待', '自主性']
      },
      {
        id: 'ref_14',
        text: '当我想尝试一个新兴趣或新方向时，家里通常有能力提供时间、金钱或信息支持。',
        mbtiRule: { E: 0.08, P: 0.1, N: 0.12 },
        objectRule: { freedomNeed: 0.46, ambition: 0.42, expressiveDrama: 0.35, riskPrediction: -0.3, imageControl: -0.1 },
        evidenceTags: ['资源支持', '选择空间', '探索机会']
      },
      {
        id: 'ref_15',
        text: '我从小到大接触新机会时，更多是有人带我去看，而不是全靠自己摸索才知道。',
        mbtiRule: { E: 0.1, N: 0.1 },
        objectRule: { ambition: 0.35, freedomNeed: 0.32, riskPrediction: -0.26, observerAnalysis: -0.12 },
        evidenceTags: ['资源入口', '机会来源', '支持系统']
      },
      {
        id: 'ref_16',
        text: '如果我想换一条路，现实条件通常不会立刻把我卡住。',
        mbtiRule: { P: 0.18, J: -0.12, E: 0.06 },
        objectRule: { freedomNeed: 0.52, riskPrediction: -0.42, imageControl: -0.28, ambition: 0.25 },
        evidenceTags: ['资源密度', '选择空间', '现实约束']
      },
    ],
  },
  {
    id: 'r3', mood: '片段 03',
    questions: [
      {
        id: 'ref_17',
        text: '家里或集体气氛不对时，我常常是最先注意到的人之一。',
        mbtiRule: { F: 0.28, I: 0.12 },
        objectRule: { emotionalSensitivity: 0.82, observerAnalysis: 0.5, relationshipCare: 0.38, riskPrediction: 0.34 },
        evidenceTags: ['关系气氛', '情绪雷达', '观察能力']
      },
      {
        id: 'ref_18',
        text: '当大人、老师或朋友情绪不好时，我通常需要调整自己的说话方式，避免让情况更糟。',
        mbtiRule: { F: 0.36, I: 0.18, T: -0.14 },
        objectRule: { relationshipCare: 0.78, emotionalSensitivity: 0.7, imageControl: 0.55, riskPrediction: 0.42 },
        evidenceTags: ['情绪照护', '关系安全', '自我调整']
      },
      {
        id: 'ref_19',
        text: '在一些关系里，只要我多让一步，冲突就更容易结束。',
        mbtiRule: { F: 0.3, I: 0.16 },
        objectRule: { relationshipCare: 0.72, imageControl: 0.5, emotionalSensitivity: 0.42, freedomNeed: -0.18 },
        evidenceTags: ['冲突处理', '关系照护', '让步经验']
      },
      {
        id: 'ref_20',
        text: '在热闹场合里，如果我不主动接话或活跃气氛，场面很容易变得尴尬。',
        mbtiRule: { E: 0.26, I: -0.1, F: 0.12 },
        objectRule: { expressiveDrama: 0.64, relationshipCare: 0.58, imageControl: 0.36, emotionalSensitivity: 0.22 },
        evidenceTags: ['社交适应', '气氛维护', '关系角色']
      },
      {
        id: 'ref_21',
        text: '很多时候，我表现得外向，是因为场面需要有人撑起来。',
        mbtiRule: { I: 0.36, E: -0.12, F: 0.12 },
        objectRule: { relationshipCare: 0.62, expressiveDrama: 0.52, imageControl: 0.42, emotionalSensitivity: 0.32 },
        evidenceTags: ['外放适应', '气氛维护', '关系角色']
      },
      {
        id: 'ref_22',
        text: '如果我在集体里安静下来，别人会觉得我是不是不开心或不合群。',
        mbtiRule: { E: 0.18, I: 0.18, F: 0.12 },
        objectRule: { imageControl: 0.58, riskPrediction: 0.5, expressiveDrama: 0.3, emotionalSensitivity: 0.42 },
        evidenceTags: ['群体期待', '社交标签', '表达压力']
      },
      {
        id: 'ref_23',
        text: '过去在朋友或同学关系里，我被接纳的方式常常和“我是否有用、好玩、会照顾场面”有关。',
        mbtiRule: { F: 0.22, E: 0.12 },
        objectRule: { relationshipCare: 0.68, expressiveDrama: 0.5, imageControl: 0.52, ambition: 0.18 },
        evidenceTags: ['同伴接纳', '关系价值', '气氛维护']
      },
      {
        id: 'ref_24',
        text: '当朋友或同学之间出现矛盾时，我常常会被卷入调停、解释或缓和气氛的位置。',
        mbtiRule: { F: 0.3, J: 0.1 },
        objectRule: { relationshipCare: 0.82, emotionalSensitivity: 0.55, observerAnalysis: 0.35, imageControl: 0.32 },
        evidenceTags: ['关系调停', '情绪照护', '社交角色']
      },
    ],
  },
  {
    id: 'r4', mood: '片段 04',
    questions: [
      {
        id: 'ref_25',
        text: '当我在学校被老师或权威人物误会时，家里人更常先让我反思自己，而不是先听我把事情讲完。',
        mbtiRule: { I: 0.26, F: 0.14, J: 0.16 },
        objectRule: { riskPrediction: 0.72, imageControl: 0.62, emotionalSensitivity: 0.5, observerAnalysis: 0.3 },
        evidenceTags: ['权威评价', '表达代价', '家庭支持']
      },
      {
        id: 'ref_26',
        text: '当我和朋友闹矛盾时，周围人更常告诉我“别太计较”，而不是帮我分清楚我到底委屈在哪里。',
        mbtiRule: { F: 0.24, I: 0.14 },
        objectRule: { emotionalSensitivity: 0.62, relationshipCare: 0.38, riskPrediction: 0.45, imageControl: 0.34 },
        evidenceTags: ['关系委屈', '情绪支持', '自我表达']
      },
      {
        id: 'ref_27',
        text: '当我遇到压力时，别人更容易给我方法和建议，而不是先确认我现在是否真的撑得住。',
        mbtiRule: { T: 0.18, F: 0.08, I: 0.08 },
        objectRule: { riskPrediction: 0.42, imageControl: 0.35, emotionalSensitivity: 0.4, relationshipCare: -0.1 },
        evidenceTags: ['压力支持', '情绪承接', '工具性帮助']
      },
      {
        id: 'ref_28',
        text: '如果我很久没有拿出结果，周围人会更关注“进展到哪了”，而不是“你是不是卡住了”。',
        mbtiRule: { J: 0.28, P: -0.16 },
        objectRule: { ambition: 0.55, imageControl: 0.58, riskPrediction: 0.5, emotionalSensitivity: 0.25 },
        evidenceTags: ['结果压力', '过程支持', '自我要求']
      },
      {
        id: 'ref_29',
        text: '当我表现得不像平时那么积极时，别人更常催我恢复状态，而不是允许我先低落一会儿。',
        mbtiRule: { E: 0.18, I: 0.2, F: 0.12 },
        objectRule: { imageControl: 0.55, emotionalSensitivity: 0.5, riskPrediction: 0.42, expressiveDrama: 0.25 },
        evidenceTags: ['情绪许可', '状态期待', '关系气氛']
      },
      {
        id: 'ref_30',
        text: '从小到大的很多场景里，只要我表现得懂事、稳定、好相处，事情就会顺利很多。',
        mbtiRule: { J: 0.24, F: 0.22, I: 0.14 },
        objectRule: { imageControl: 0.78, relationshipCare: 0.62, riskPrediction: 0.42, emotionalSensitivity: 0.3 },
        evidenceTags: ['懂事奖励', '关系适应', '体面控制']
      },
      {
        id: 'ref_31',
        text: '如果我把真实想法说得太直接，后续往往需要花更多力气去解释、修补或让对方舒服。',
        mbtiRule: { F: 0.25, I: 0.2, T: -0.12 },
        objectRule: { imageControl: 0.72, riskPrediction: 0.6, relationshipCare: 0.46, expressiveDrama: -0.1 },
        evidenceTags: ['表达后果', '关系修补', '自我保护']
      },
      {
        id: 'ref_32',
        text: '当我没有按照别人期待的样子行动时，关系里的温度会变得明显不一样。',
        mbtiRule: { F: 0.28, I: 0.18, J: 0.12 },
        objectRule: { emotionalSensitivity: 0.75, riskPrediction: 0.62, imageControl: 0.55, relationshipCare: 0.32 },
        evidenceTags: ['关系温度', '期待落差', '自我调整']
      },
    ],
  },
];

const reflectionQuestions = reflectionStages.flatMap(s => s.questions);

const objectProfiles = [
  { name: '正在冒泡的汽水', desc: '你像一瓶刚拧开的汽水，很多情绪不是想表达，是根本压不住。你身上有一种会把场面点亮的能量，但这种热闹不一定永远轻松，有时候它也是你和世界保持连接的方式。', affinity: { E: .8, N: .5, F: .3, P: .7 }, vector: { emotionalSensitivity: 60, relationshipCare: 50, riskPrediction: 30, imageControl: 25, ambition: 45, freedomNeed: 82, expressiveDrama: 95, observerAnalysis: 30 } },
  { name: '雨天便利店塑料袋', desc: '你看起来轻飘飘的，好像随时会被生活带走，但其实很能装，也很会藏。你不是不喜欢热闹，只是比起在人群里持续发光，你更需要一个能安静恢复自己的角落。', affinity: { I: .75, N: .5, F: .45, P: .55 }, vector: { emotionalSensitivity: 82, relationshipCare: 48, riskPrediction: 60, imageControl: 45, ambition: 35, freedomNeed: 82, expressiveDrama: 70, observerAnalysis: 60 } },
  { name: '深夜还亮着的小台灯', desc: '你不是最亮的光，但你经常是别人最需要的那一盏。你安静、稳定、愿意陪伴，也很容易在别人看不见的地方把自己烧得很久。', affinity: { I: .75, F: .55, J: .25 }, vector: { emotionalSensitivity: 78, relationshipCare: 84, riskPrediction: 52, imageControl: 60, ambition: 35, freedomNeed: 35, expressiveDrama: 45, observerAnalysis: 62 } },
  { name: '反复加热的热水袋', desc: '你很会给别人供暖，但也容易忘记自己其实也会冷。你习惯被需要，也习惯在关系里默默续温，只是偶尔要记得别把自己烫坏。', affinity: { F: .7, I: .35, J: .35 }, vector: { emotionalSensitivity: 72, relationshipCare: 92, riskPrediction: 48, imageControl: 58, ambition: 35, freedomNeed: 25, expressiveDrama: 35, observerAnalysis: 38 } },
  { name: '没发出去的朋友圈草稿', desc: '你不是没话说，只是每句话在发出去前都被你审判过一遍。你想被理解，又不太想把自己完全摊开给别人看。', affinity: { I: .65, N: .45, F: .35, J: .2 }, vector: { emotionalSensitivity: 84, relationshipCare: 48, riskPrediction: 72, imageControl: 88, ambition: 42, freedomNeed: 58, expressiveDrama: 82, observerAnalysis: 62 } },
  { name: '旧书里夹着的电影票', desc: '你很会把普通一天过成某种纪念日。很多别人随手丢掉的瞬间，在你这里会被保存成有重量的证据。', affinity: { I: .55, N: .65, F: .6, P: .2 }, vector: { emotionalSensitivity: 80, relationshipCare: 50, riskPrediction: 45, imageControl: 40, ambition: 30, freedomNeed: 70, expressiveDrama: 88, observerAnalysis: 58 } },
  { name: '总被借走的充电宝', desc: '别人没电的时候第一个想到你。你不是天生电量多，只是太习惯在别人需要的时候递过去。', affinity: { F: .75, J: .2, E: .15 }, vector: { emotionalSensitivity: 64, relationshipCare: 95, riskPrediction: 42, imageControl: 55, ambition: 38, freedomNeed: 25, expressiveDrama: 42, observerAnalysis: 35 } },
  { name: '出门前找不到的耳机', desc: '你经常不是想离开谁，只是突然很想回到自己的频道。你需要一种随时切歌的自由，好让世界别一直贴得太近。', affinity: { I: .45, N: .35, P: .7 }, vector: { emotionalSensitivity: 62, relationshipCare: 35, riskPrediction: 45, imageControl: 35, ambition: 28, freedomNeed: 92, expressiveDrama: 62, observerAnalysis: 52 } },
  { name: '贴满便利贴的冰箱门', desc: '你很会把生活拆成一张张提醒，连崩溃都想排进日程。你不是不能乱，只是秩序会让你安心一点。', affinity: { J: .8, S: .35, F: .25 }, vector: { emotionalSensitivity: 55, relationshipCare: 72, riskPrediction: 58, imageControl: 86, ambition: 58, freedomNeed: 20, expressiveDrama: 28, observerAnalysis: 52 } },
  { name: '地铁里攥皱的纸质车票', desc: '你很会去下一个地方，但不一定很会相信自己已经抵达。你一直在路上，也一直在学习怎么把某个地方当成终点。', affinity: { I: .45, P: .35, F: .25 }, vector: { emotionalSensitivity: 72, relationshipCare: 42, riskPrediction: 68, imageControl: 52, ambition: 38, freedomNeed: 72, expressiveDrama: 52, observerAnalysis: 68 } },
  { name: '派对结束后的纸杯', desc: '你可以把场子点亮，也会在散场后突然觉得自己被剩下。热闹不是假的，只是热闹之后的安静也很真。', affinity: { E: .7, F: .35, P: .45 }, vector: { emotionalSensitivity: 70, relationshipCare: 58, riskPrediction: 42, imageControl: 38, ambition: 35, freedomNeed: 68, expressiveDrama: 88, observerAnalysis: 40 } },
  { name: '凌晨两点的手机屏幕', desc: '你不是失眠，你是脑内会议没有投票结束。很多事别人已经翻篇了，你还在后台反复刷新。', affinity: { I: .65, N: .45, J: .25 }, vector: { emotionalSensitivity: 88, relationshipCare: 48, riskPrediction: 88, imageControl: 62, ambition: 42, freedomNeed: 50, expressiveDrama: 52, observerAnalysis: 78 } },
  { name: '安静工作的空气净化器', desc: '你不一定抢眼，但环境会因为你变得没那么刺鼻。你擅长默默修复空气，只是别把所有浑浊都当成自己的责任。', affinity: { I: .35, F: .65, J: .25 }, vector: { emotionalSensitivity: 66, relationshipCare: 88, riskPrediction: 42, imageControl: 55, ambition: 35, freedomNeed: 30, expressiveDrama: 32, observerAnalysis: 45 } },
  { name: '自动续杯的保温杯', desc: '你不一定热烈，但你有一种长期供给的能力。你给人的感觉不是惊喜，而是“还好你在”。', affinity: { F: .55, J: .55, S: .25 }, vector: { emotionalSensitivity: 55, relationshipCare: 82, riskPrediction: 48, imageControl: 70, ambition: 45, freedomNeed: 20, expressiveDrama: 25, observerAnalysis: 36 } },
  { name: '被折得很整齐的草稿纸', desc: '你不是没有乱过，只是连混乱都要被你折出边角。你会把很多复杂情绪整理成一个看起来还算体面的形状。', affinity: { I: .45, J: .75, T: .25 }, vector: { emotionalSensitivity: 72, relationshipCare: 42, riskPrediction: 75, imageControl: 92, ambition: 52, freedomNeed: 35, expressiveDrama: 38, observerAnalysis: 70 } },
  { name: '窗边快化掉的冰美式', desc: '你看起来很清醒，其实有些部分已经在安静融化。你擅长维持一个冷静外壳，但疲惫会从杯壁上慢慢渗出来。', affinity: { I: .35, J: .45, N: .25 }, vector: { emotionalSensitivity: 66, relationshipCare: 38, riskPrediction: 64, imageControl: 82, ambition: 62, freedomNeed: 48, expressiveDrama: 52, observerAnalysis: 72 } },
  { name: '电梯里没按下的楼层键', desc: '你不是没有方向，只是太清楚每一层都有代价。你经常站在选择前，先把每个结果都想了一遍。', affinity: { I: .6, N: .35, P: .25 }, vector: { emotionalSensitivity: 68, relationshipCare: 32, riskPrediction: 82, imageControl: 58, ambition: 42, freedomNeed: 70, expressiveDrama: 42, observerAnalysis: 82 } },
  { name: '台风天的路牌', desc: '你可以被风吹得很累，但你不会轻易失去判断方向的能力。越混乱的时候，你越会逼自己保持清醒。', affinity: { J: .65, T: .35, I: .25 }, vector: { emotionalSensitivity: 48, relationshipCare: 35, riskPrediction: 72, imageControl: 78, ambition: 62, freedomNeed: 48, expressiveDrama: 30, observerAnalysis: 92 } },
  { name: '自习室最后一排的小台灯', desc: '你不是不想赢，只是不太想让别人看见你用力。你的努力常常很安静，像夜里最后一排还没熄掉的光。', affinity: { I: .65, J: .55, N: .25 }, vector: { emotionalSensitivity: 62, relationshipCare: 38, riskPrediction: 62, imageControl: 78, ambition: 82, freedomNeed: 40, expressiveDrama: 38, observerAnalysis: 68 } },
  { name: '过期但舍不得丢的会员卡', desc: '你保存很多东西，不是因为它还有用，而是因为它曾经属于你。你对意义有一种很固执的留恋。', affinity: { I: .45, F: .55, S: .15 }, vector: { emotionalSensitivity: 76, relationshipCare: 54, riskPrediction: 45, imageControl: 36, ambition: 24, freedomNeed: 55, expressiveDrama: 74, observerAnalysis: 48 } },
  { name: '被攥皱的演出票', desc: '你喜欢那些发生过的瞬间，哪怕它们最后只剩一张皱掉的票。你不是只爱热烈，也爱热烈之后留下的痕迹。', affinity: { E: .35, N: .45, F: .5, P: .35 }, vector: { emotionalSensitivity: 70, relationshipCare: 45, riskPrediction: 36, imageControl: 32, ambition: 30, freedomNeed: 70, expressiveDrama: 92, observerAnalysis: 45 } },
  { name: '雨伞骨架', desc: '你很会撑住别人，但没人撑你时，你也会变形。你不是不会脆弱，只是经常先把自己架起来。', affinity: { F: .55, J: .35, I: .25 }, vector: { emotionalSensitivity: 70, relationshipCare: 80, riskPrediction: 58, imageControl: 72, ambition: 38, freedomNeed: 28, expressiveDrama: 28, observerAnalysis: 42 } },
  { name: '冰箱里半瓶气泡水', desc: '你不是不热烈，只是有些热烈被冷藏过太久。靠近你的人会发现，你其实还在冒一点泡。', affinity: { F: .35, P: .35, I: .25, E: .2 }, vector: { emotionalSensitivity: 72, relationshipCare: 40, riskPrediction: 40, imageControl: 42, ambition: 32, freedomNeed: 68, expressiveDrama: 72, observerAnalysis: 45 } },
  { name: '贴着标签的收纳盒', desc: '你很需要秩序，因为秩序让世界暂时不再追着你跑。你把东西放回原位，也是在把自己放回安全区。', affinity: { J: .82, S: .45, I: .2 }, vector: { emotionalSensitivity: 45, relationshipCare: 50, riskPrediction: 68, imageControl: 92, ambition: 58, freedomNeed: 18, expressiveDrama: 20, observerAnalysis: 62 } },
  { name: '忘在出租车后座的花', desc: '你有很多热烈的瞬间，只是它们不一定都被好好带回家。你很会盛开，也很容易把自己落在路上。', affinity: { E: .4, N: .45, F: .55, P: .55 }, vector: { emotionalSensitivity: 68, relationshipCare: 42, riskPrediction: 30, imageControl: 25, ambition: 28, freedomNeed: 82, expressiveDrama: 88, observerAnalysis: 35 } },
  { name: '倒计时三分钟的微波炉', desc: '你很难真正等事情自然发生，你总想知道它还剩几分钟。你不是急躁，只是需要一个可见的进度条来安放焦虑。', affinity: { J: .55, T: .25, E: .1 }, vector: { emotionalSensitivity: 55, relationshipCare: 35, riskPrediction: 82, imageControl: 72, ambition: 68, freedomNeed: 28, expressiveDrama: 35, observerAnalysis: 65 } },
  { name: '便利店最后一个饭团', desc: '你不一定显眼，但你经常在别人最饿的时候出现。你像一种很朴素的可靠，普通但救命。', affinity: { F: .55, S: .35, I: .25 }, vector: { emotionalSensitivity: 52, relationshipCare: 78, riskPrediction: 38, imageControl: 52, ambition: 30, freedomNeed: 28, expressiveDrama: 22, observerAnalysis: 30 } },
  { name: '反复刷新中的快递页面', desc: '你很会等待，但你等待的时候并不平静。结果还没来，你已经把所有可能都看了一遍。', affinity: { I: .4, J: .35, N: .2 }, vector: { emotionalSensitivity: 76, relationshipCare: 35, riskPrediction: 90, imageControl: 62, ambition: 45, freedomNeed: 48, expressiveDrama: 35, observerAnalysis: 78 } },
  { name: '写到一半的待办清单', desc: '你不是没有行动力，你是太容易把人生写成任务栏。很多时候你还没开始累，就已经被“应该完成”这四个字压住了。', affinity: { J: .65, N: .25, T: .15 }, vector: { emotionalSensitivity: 56, relationshipCare: 35, riskPrediction: 66, imageControl: 80, ambition: 86, freedomNeed: 35, expressiveDrama: 35, observerAnalysis: 70 } },
  { name: '自动门前犹豫的一阵风', desc: '你不是不想进入关系，只是进入之前要先确认出口还在。你靠近世界的方式很轻，也很谨慎。', affinity: { I: .45, N: .45, P: .6 }, vector: { emotionalSensitivity: 70, relationshipCare: 32, riskPrediction: 55, imageControl: 34, ambition: 28, freedomNeed: 95, expressiveDrama: 60, observerAnalysis: 70 } },
];

const scripts = {
  richKid: { name: '首富的孩子', subtitle: '你拥有一切，但不知道哪一次努力真的属于你。', events: ['继承期待', '公众审视', '选择过多', '失败不被允许'], hook: '资源过剩与真实感饥饿' },
  celebrityKid: { name: '顶流巨星家的小孩', subtitle: '你从小被看见，却不一定被理解。', events: ['舆论凝视', '人设管理', '表达被误读', '亲密关系被消费'], hook: '高曝光与被误读' },
  oldMoney: { name: '神秘老钱家族继承人', subtitle: '你被训练得很体面，但也许很晚才知道自己想要什么。', events: ['家族规训', '隐形竞争', '礼仪训练', '不能失态'], hook: '体面规训与自发性压抑' },
  seaside: { name: '海边小镇野生长大的小孩', subtitle: '你很自由，但要很晚才学会给自己搭结构。', events: ['低控制生活', '自然探索', '资源有限', '靠自己摸索'], hook: '自由感与结构感不足' },
  grindFamily: { name: '全家都是卷王的天选打工圣体', subtitle: '如果支持是理解，你会长出坚毅；如果支持是催促，你会长出焦虑。', events: ['长期比较', '规划人生', '成绩压力', '休息羞耻'], hook: '高执行力与休息困难' },
  relatives: { name: '被亲戚轮流带大的江湖型小孩', subtitle: '你很会生存，但很难完全相信一个地方真的属于你。', events: ['环境频繁切换', '看脸色', '人情规则', '早熟懂事'], hook: '高适应力与安全感不稳' },
};

function clamp(value, min = 0, max = 100) { return Math.max(min, Math.min(max, value)); }
function emptyTraitVector(value = 50) { return Object.fromEntries(personalityDims.map(d => [d.key, value])); }
function emptyMbtiScores(value = 50) { return Object.fromEntries(mbtiLetters.map(l => [l, value])); }
function scaleDelta(value) { return Number(value || 4) - 4; }
function selectedMbtiString(scores) {
  return [scores.E >= scores.I ? 'E' : 'I', scores.N >= scores.S ? 'N' : 'S', scores.F >= scores.T ? 'F' : 'T', scores.J >= scores.P ? 'J' : 'P'].join('');
}
function userInputMbtiString() {
  return mbtiPairs.map(pair => state.mbti[pair.key].selected).join('');
}
function mbtiRatios(scores) {
  return mbtiPairs.map(pair => {
    const a = scores[pair.left]; const b = scores[pair.right]; const total = Math.max(1, a + b);
    const leftPct = Math.round((a / total) * 100); const rightPct = 100 - leftPct;
    return { pair, leftPct, rightPct, dominant: leftPct >= rightPct ? pair.left : pair.right, dominantPct: Math.max(leftPct, rightPct) };
  });
}
function baseMbtiScores() {
  const scores = emptyMbtiScores(50);
  mbtiPairs.forEach(pair => {
    const data = state.mbti[pair.key]; const chosen = data.selected; const other = chosen === pair.left ? pair.right : pair.left;
    scores[chosen] = data.strength; scores[other] = 100 - data.strength;
  });
  return scores;
}
function applyQuestionScores(scores, answers, questions, multiplier = 3.4) {
  const next = { ...scores };
  questions.forEach(q => {
    const ans = answers[q.id]; if (!ans || !q.mbtiRule) return;
    const d = scaleDelta(ans);
    Object.entries(q.mbtiRule).forEach(([letter, weight]) => { next[letter] = clamp(next[letter] + d * weight * multiplier); });
  });
  return next;
}
function applyObjectScores(vector, answers, questions, multiplier = 3.8) {
  const next = { ...vector };
  questions.forEach(q => {
    const ans = answers[q.id]; if (!ans || !q.objectRule) return;
    const d = scaleDelta(ans);
    Object.entries(q.objectRule).forEach(([dim, weight]) => {
      if (dim in next) next[dim] = clamp(next[dim] + d * weight * multiplier);
    });
  });
  return next;
}
function combineAnswers() { return { ...state.current, ...state.reflection }; }
function answerConfidence(answers) {
  const vals = Object.values(answers).map(Number); if (!vals.length) return { level: '信息不足', score: 0, nonNeutral: 0, avgAbs: 0 };
  const abs = vals.map(v => Math.abs(v - 4)); const nonNeutral = abs.filter(v => v > 0).length;
  const avgAbs = abs.reduce((a,b)=>a+b,0) / vals.length;
  const score = Math.round((nonNeutral / vals.length) * 60 + (avgAbs / 3) * 40);
  let level = '高'; if (score < 35) level = '信息不足'; else if (score < 62) level = '中';
  return { level, score, nonNeutral, avgAbs: Number(avgAbs.toFixed(2)) };
}
function cosineSimilarity(a, b) {
  const keys = Object.keys(a); let dot = 0, na = 0, nb = 0;
  keys.forEach(k => { dot += a[k]*b[k]; na += a[k]*a[k]; nb += b[k]*b[k]; });
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}
function mbtiAffinityScore(obj, mbti) {
  if (!obj.affinity) return 0;
  return Object.entries(obj.affinity).reduce((sum, [letter, w]) => sum + (mbti.includes(letter) ? w : -w * 0.25), 0);
}
function matchObject(traitVector, initialMbti) {
  const results = objectProfiles.map(obj => ({
    obj,
    score: cosineSimilarity(traitVector, obj.vector) + mbtiAffinityScore(obj, initialMbti) * 0.018,
  })).sort((a,b) => b.score - a.score);
  return { best: results[0], alternatives: results.slice(1, 4) };
}
function topEvidenceTags(answers) {
  const counter = {};
  reflectionQuestions.concat(currentQuestions).forEach(q => {
    const ans = answers[q.id]; if (!ans || !q.evidenceTags) return;
    const weight = Math.abs(scaleDelta(ans));
    if (weight === 0) return;
    q.evidenceTags.forEach(tag => { counter[tag] = (counter[tag] || 0) + weight; });
  });
  return Object.entries(counter).sort((a,b)=>b[1]-a[1]).slice(0, 5).map(([tag, score]) => ({ tag, score }));
}
function biggestMbtiChanges(input, initial) {
  return mbtiPairs.map(pair => {
    const leftChange = initial[pair.left] - input[pair.left];
    const rightChange = initial[pair.right] - input[pair.right];
    const dominant = Math.abs(leftChange) >= Math.abs(rightChange) ? pair.left : pair.right;
    const delta = Math.abs(Math.abs(leftChange) >= Math.abs(rightChange) ? leftChange : rightChange);
    return { pair, dominant, delta: Math.round(delta), leftChange: Math.round(leftChange), rightChange: Math.round(rightChange) };
  }).sort((a,b)=>b.delta-a.delta);
}
function calculate() {
  const inputScores = baseMbtiScores();
  const currentScores = applyQuestionScores(inputScores, state.current, currentQuestions, 3.2);
  const initialScores = applyQuestionScores(currentScores, state.reflection, reflectionQuestions, 4.2);
  const traitBase = emptyTraitVector(50);
  const afterCurrentTrait = applyObjectScores(traitBase, state.current, currentQuestions, 3.2);
  const initialTrait = applyObjectScores(afterCurrentTrait, state.reflection, reflectionQuestions, 3.8);
  const inputMbti = userInputMbtiString();
  const currentMbti = selectedMbtiString(currentScores);
  const initialMbti = selectedMbtiString(initialScores);
  const objectMatch = matchObject(initialTrait, initialMbti);
  const confidence = answerConfidence(combineAnswers());
  const evidence = topEvidenceTags(combineAnswers());
  const changes = biggestMbtiChanges(inputScores, initialScores);
  const calc = { inputScores, currentScores, initialScores, initialTrait, inputMbti, currentMbti, initialMbti, objectMatch, confidence, evidence, changes };
  state.lastCalc = calc;
  return calc;
}
function ratioHtml(scores) {
  return `<div class="ratio-list">${mbtiRatios(scores).map(r => `<div class="ratio-item"><b>${r.pair.left}/${r.pair.right}</b><div class="ratio-bar"><i style="width:${r.leftPct}%"></i></div><span>${r.pair.left} ${r.leftPct}%</span><small>${r.pair.right} ${r.rightPct}%</small></div>`).join('')}</div>`;
}
function vectorTable(title, vector) {
  return `<div class="deep-block"><h3>${title}</h3><table class="vector-table"><tbody>${Object.entries(vector).map(([k,v]) => {
    const label = personalityDims.find(d=>d.key===k)?.label || k;
    return `<tr><td>${label}</td><td>${Math.round(v)}</td><td><div class="bar"><i style="width:${clamp(v)}%"></i></div></td></tr>`;
  }).join('')}</tbody></table></div>`;
}
function mbtiTable(title, scores) {
  return `<div class="deep-block"><h3>${title}</h3>${ratioHtml(scores)}</div>`;
}
function renderMbtiForm() {
  const root = document.getElementById('mbtiForm');
  root.innerHTML = mbtiPairs.map(pair => {
    const data = state.mbti[pair.key];
    return `<div class="mbti-card">
      <h3>${pair.left}/${pair.right} · ${pair.leftLabel}/${pair.rightLabel}</h3>
      <div class="pair-row">
        <button class="choice-btn ${data.selected === pair.left ? 'active' : ''}" data-pair="${pair.key}" data-letter="${pair.left}">${pair.left} ${pair.leftLabel}</button>
        <button class="choice-btn ${data.selected === pair.right ? 'active' : ''}" data-pair="${pair.key}" data-letter="${pair.right}">${pair.right} ${pair.rightLabel}</button>
      </div>
      <div class="strength-row">
        ${strengthPresets.map(p => `<button class="strength-btn ${data.preset === p.key ? 'active' : ''}" data-pair="${pair.key}" data-preset="${p.key}">${p.label}</button>`).join('')}
      </div>
      <div class="custom-row"><span>当前偏向强度</span><input type="number" min="50" max="100" value="${data.strength}" data-custom="${pair.key}"><span>% ${data.selected}</span></div>
      <div class="ratio-note">后台赋值：${data.selected}=${data.strength}，另一端=${100 - data.strength}</div>
    </div>`;
  }).join('');
  root.querySelectorAll('.choice-btn').forEach(btn => btn.addEventListener('click', () => {
    state.mbti[btn.dataset.pair].selected = btn.dataset.letter; renderMbtiForm();
  }));
  root.querySelectorAll('.strength-btn').forEach(btn => btn.addEventListener('click', () => {
    const data = state.mbti[btn.dataset.pair]; const preset = strengthPresets.find(p => p.key === btn.dataset.preset);
    data.preset = preset.key; if (preset.value) data.strength = preset.value; renderMbtiForm();
  }));
  root.querySelectorAll('input[data-custom]').forEach(input => input.addEventListener('change', () => {
    const data = state.mbti[input.dataset.custom]; data.strength = clamp(Number(input.value || 65), 50, 100); data.preset = 'custom'; renderMbtiForm();
  }));
}
function renderQuestionList(root, questions, answersKey, compact=false) {
  root.innerHTML = questions.map(q => {
    state.questionRenderedAt[q.id] = performance.now();
    const selected = state[answersKey][q.id] || 4;
    return `<div class="question-card"><h3>${q.text}</h3><div class="scale-row">${scaleLabels.map((label, idx) => {
      const val = idx + 1;
      return `<button class="scale-btn ${Number(selected) === val ? 'active' : ''}" data-qid="${q.id}" data-value="${val}">${label}</button>`;
    }).join('')}</div><div class="question-meta"><span>七级程度题</span><span></span></div></div>`;
  }).join('');
  root.querySelectorAll('.scale-btn').forEach(btn => btn.addEventListener('click', () => {
    const qid = btn.dataset.qid;
    if (state.questionRenderedAt[qid]) state.responseTimes[qid] = Math.round(performance.now() - state.questionRenderedAt[qid]);
    state[answersKey][qid] = Number(btn.dataset.value);
    renderQuestionList(root, questions, answersKey, compact);
  }));
}
function renderCurrentQuestions() { renderQuestionList(document.getElementById('currentForm'), currentQuestions, 'current', true); }
function renderStageNav() {
  const nav = document.getElementById('stageNav');
  nav.innerHTML = reflectionStages.map((s, idx) => `<button class="stage-pill ${idx===state.stage?'active':''}" data-stage="${idx}">${s.mood}</button>`).join('');
  nav.querySelectorAll('.stage-pill').forEach(btn => btn.addEventListener('click', () => { state.stage = Number(btn.dataset.stage); renderReflectionStage(); }));
}
function renderReflectionStage() {
  renderStageNav();
  renderQuestionList(document.getElementById('reflectionForm'), reflectionStages[state.stage].questions, 'reflection');
  document.getElementById('prevStageBtn').disabled = state.stage === 0;
  document.getElementById('nextStageBtn').disabled = state.stage === reflectionStages.length - 1;
}
function renderScriptChoices() {
  const root = document.getElementById('scriptChoices');
  root.innerHTML = Object.entries(scripts).map(([key, s]) => `<button class="script-card ${state.script===key?'active':''}" data-script="${key}"><h3>${s.name}</h3><p>${s.subtitle}</p><div class="tag-row">${s.events.map(e=>`<span class="tag">${e}</span>`).join('')}</div></button>`).join('');
  root.querySelectorAll('.script-card').forEach(btn => btn.addEventListener('click', () => { state.script = btn.dataset.script; renderScriptChoices(); }));
}
function initialReportText(calc) {
  const obj = calc.objectMatch.best.obj;
  const topChange = calc.changes[0];
  const tags = calc.evidence.map(e=>e.tag).slice(0,3).join('、') || '信息不足';
  let changeLine = `你输入的是 ${calc.inputMbti}，系统校准后的当前表现接近 ${calc.currentMbti}，初始化反推后更接近 ${calc.initialMbti}。`;
  if (calc.confidence.level === '信息不足') changeLine = `你输入的是 ${calc.inputMbti}。由于后续回答方向性不足，系统只做保守反推，初始化设定暂时接近 ${calc.initialMbti}。`;
  return `<div class="report-grid">
    <div class="report-block full">
      <div class="object-title"><small>你的初始化设定是</small>${calc.initialMbti} - ${obj.name}</div>
      <p class="lead">${obj.desc}</p>
      <span class="confidence">反推置信度：${calc.confidence.level} · ${calc.confidence.score}/100</span>
    </div>
    <div class="report-block">
      <h3>MBTI 反推</h3>
      <p>${changeLine}</p>
      <p>变化最明显的轴是 <b>${topChange.pair.left}/${topChange.pair.right}</b>。这不是重新测试你，而是根据场景反馈推演：哪些外放、克制、照护或计划感，可能是后天适应后被放大的。</p>
    </div>
    <div class="report-block">
      <h3>四组比例</h3>
      ${ratioHtml(calc.initialScores)}
    </div>
    <div class="report-block full">
      <h3>环境怎样塑形你</h3>
      <p>影响你初始化设定的主要线索是：<b>${tags}</b>。系统不会把这些线索单独算成一种“环境人格”，而是用它们解释为什么你的 MBTI 和物件标签会被推向现在这个方向。</p>
    </div>
  </div>`;
}
function renderInitialReport() {
  const calc = calculate();
  document.getElementById('initialReportContent').innerHTML = initialReportText(calc);
  const wrap = document.getElementById('initialReportWrap'); wrap.hidden = false; wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.getElementById('step-script').hidden = false;
  renderScriptChoices(); renderDeepPanel(calc);
}
function renderDeepPanel(calc) {
  const panel = document.getElementById('deepPanel');
  const topTimes = Object.entries(state.responseTimes).sort((a,b)=>b[1]-a[1]).slice(0,8);
  panel.innerHTML = `
    <p class="no-upload">本地版默认不上传任何数据。导出的 JSON 只包含匿名答案、用时、结果和权重调试信息，不包含姓名、联系方式、位置或自述原文。</p>
    ${mbtiTable('输入 MBTI 分数', calc.inputScores)}
    ${mbtiTable('校准后当前 MBTI 分数', calc.currentScores)}
    ${mbtiTable('初始化 MBTI 分数', calc.initialScores)}
    ${vectorTable('物件匹配特质向量', calc.initialTrait)}
    <div class="deep-block"><h3>主要证据标签</h3><div class="tag-row">${calc.evidence.map(e=>`<span class="tag">${e.tag} ${e.score}</span>`).join('')}</div></div>
    <div class="deep-block"><h3>用时较长的题目</h3><ul>${topTimes.map(([id, ms])=>`<li>${id}：${(ms/1000).toFixed(1)} 秒</li>`).join('') || '<li>暂无</li>'}</ul></div>
    <div class="deep-block"><h3>物件候选</h3><ul>${[calc.objectMatch.best, ...calc.objectMatch.alternatives].map(x=>`<li>${x.obj.name} · ${(x.score*100).toFixed(1)}</li>`).join('')}</ul></div>
  `;
}
function renderParallelReport() {
  const calc = state.lastCalc || calculate();
  const obj = calc.objectMatch.best.obj;
  const script = scripts[state.script];
  const tags = calc.evidence.map(e=>e.tag).slice(0,3).join('、') || '一些没被明说的成长线索';
  const story = buildStory(calc.initialMbti, obj.name, script, tags);
  document.getElementById('parallelTitle').textContent = `${calc.initialMbti} - ${obj.name} 的平行人生`;
  document.getElementById('parallelReportContent').innerHTML = `<div class="report-grid">
    <div class="report-block full"><h3>${script.name}</h3><p>${script.subtitle}</p><div class="tag-row">${script.events.map(e=>`<span class="tag">${e}</span>`).join('')}</div></div>
    <div class="report-block full"><h3>如果你进入这个剧本</h3><p>${story}</p></div>
    <div class="report-block full"><h3>诗意收尾</h3><p class="poem">你不一定要换一种人生，才有资格遇见另一个自己。</p></div>
  </div>`;
  const wrap = document.getElementById('parallelReportWrap'); wrap.hidden = false; wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function buildStory(mbti, objectName, script, tags) {
  const base = `如果 ${mbti} - ${objectName} 被放进“${script.name}”这个剧本里，${script.hook} 会成为你人生里最显眼的底色。`;
  if (state.script === 'richKid') return `${base}你可能坐在顶层公寓的落地窗前，看着整座城市像一张提前拿到答案的考卷。别人以为你最该学会享受，但你反而会反复确认：哪一次努力是真的属于我，哪一次胜利不是资源替我提前铺好的路。你身上的 ${tags} 会让你在拥有很多选择时，仍然怀念一次必须靠自己拼到底的普通比赛。`;
  if (state.script === 'celebrityKid') return `${base}你从小就知道镜头会把一切放大：一次沉默会被解读成冷漠，一次热情会被写成表演。你会很早学会管理自己的表情，也很早知道被看见不等于被理解。你身上的 ${tags} 会让你在掌声里保持警觉，在热闹里寻找一个没人替你命名的自己。`;
  if (state.script === 'oldMoney') return `${base}你会被训练得很得体，连不开心都像一封写好格式的信。家族规则不会每天大声命令你，但会像餐具摆放一样无处不在。你身上的 ${tags} 会让你把很多真实欲望折好收起来，直到某天你突然发现：所谓体面，也可能是一种很安静的笼子。`;
  if (state.script === 'seaside') return `${base}你可能在海边小镇长大，很多事情没有标准答案，风、潮水和放学后的便利店会替你保存自由感。你不会那么早学会看别人脸色，也不太会把每一次失败都当成判决。你身上的 ${tags} 会被吹得松一点，变成一种更直接、更野生、更愿意先发生再解决的生命力。`;
  if (state.script === 'grindFamily') return `${base}你会很早知道计划、排名和结果的重量。休息不是休息，而是下一轮努力之前短暂的蓄电。你身上的 ${tags} 会决定你长出的究竟是坚毅还是焦虑：如果支持是真的理解，你会越挫越稳；如果支持更像催促，你会把人生过成一张永远写不完的待办清单。`;
  return `${base}你会在不同家门、不同饭桌、不同大人的规则之间长大。你很快学会看脸色，也很快学会把自己调成别人容易接受的版本。你身上的 ${tags} 会让你拥有很强的适应力，但也可能让你很晚才相信：有些地方不需要你表现得很好，才允许你留下。`;
}
function exportData() {
  const calc = state.lastCalc || calculate();
  const payload = {
    version: 'v3-local', createdAt: new Date().toISOString(),
    note: '本地匿名测试数据，不包含姓名、联系方式、位置或自述原文。',
    mbtiInput: state.mbti,
    answers: { current: state.current, reflection: state.reflection },
    responseTimesMs: state.responseTimes,
    result: { inputMbti: calc.inputMbti, currentMbti: calc.currentMbti, initialMbti: calc.initialMbti, object: calc.objectMatch.best.obj.name, confidence: calc.confidence, evidence: calc.evidence }
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href = url; a.download = `we-are-same-v3-anon-${Date.now()}.json`; a.click(); URL.revokeObjectURL(url);
}
function resetAll() {
  state.current = {}; state.reflection = {}; state.responseTimes = {}; state.lastCalc = null; state.stage = 0;
  document.getElementById('initialReportWrap').hidden = true; document.getElementById('parallelReportWrap').hidden = true; document.getElementById('step-script').hidden = true;
  renderCurrentQuestions(); renderReflectionStage(); window.scrollTo({top: 0, behavior: 'smooth'});
}
function init() {
  renderMbtiForm(); renderCurrentQuestions(); renderReflectionStage(); renderScriptChoices();
  document.getElementById('prevStageBtn').addEventListener('click', () => { if (state.stage > 0) { state.stage--; renderReflectionStage(); } });
  document.getElementById('nextStageBtn').addEventListener('click', () => { if (state.stage < reflectionStages.length - 1) { state.stage++; renderReflectionStage(); } });
  document.getElementById('initialReportBtn').addEventListener('click', renderInitialReport);
  document.getElementById('parallelBtn').addEventListener('click', renderParallelReport);
  document.getElementById('resetBtn').addEventListener('click', resetAll);
  document.getElementById('toggleDeepBtn').addEventListener('click', () => { const p = document.getElementById('deepPanel'); p.hidden = !p.hidden; document.getElementById('toggleDeepBtn').textContent = p.hidden ? '展开深层分析' : '收起深层分析'; });
  document.getElementById('exportDataBtn').addEventListener('click', exportData);
}
init();
