(function (root, factory) {
  const data = factory();
  if (typeof module === 'object' && module.exports) module.exports = data;
  root.BBTI_PARALLEL_LIFE_ENV = data;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const PARALLEL_LIFE_ENV_QUESTIONS = [
  {
    id: "Q1_START_PLACE",
    title: "这条人生从哪里开始？",
    options: [
      { id: "A", label: "北上广深 / 超一线城市" },
      { id: "B", label: "省会 / 强二线城市" },
      { id: "C", label: "普通地级市" },
      { id: "D", label: "县城 / 小镇" },
      { id: "E", label: "乡镇 / 村镇" },
      { id: "F", label: "经常搬家或转学" }
    ]
  },
  {
    id: "Q2_FAMILY_RESOURCE",
    title: "这个家能给你多少资源？",
    options: [
      { id: "A", label: "做什么事都需要先考虑成本" },
      { id: "B", label: "日常稳定，但额外选择要精打细算" },
      { id: "C", label: "能支持大部分学习和兴趣" },
      { id: "D", label: "资源非常充足" },
      { id: "E", label: "资源时好时坏，波动较大" }
    ]
  },
  {
    id: "Q3_FAMILY_INTERACTION",
    title: "家里的相处更像哪一种？",
    options: [
      { id: "A", label: "关系和睦，很多事可以商量" },
      { id: "B", label: "没什么冲突，但很多话不会说出口" },
      { id: "C", label: "大人很忙，陪伴不太稳定" },
      { id: "D", label: "气氛较波动，有时会起冲突" },
      { id: "E", label: "比较冷淡，不太主动关注彼此" },
      { id: "F", label: "家庭结构发生过比较大的变化" }
    ]
  },
  {
    id: "Q4_FUTURE_ATTITUDE",
    title: "家里对你的未来更像哪种态度？",
    options: [
      { id: "A", label: "要求你优秀、稳定、少出错" },
      { id: "B", label: "要走主流路线，跟紧社会时钟" },
      { id: "C", label: "安逸求稳，不太接受风险" },
      { id: "D", label: "比较尊重你的兴趣和选择" },
      { id: "E", label: "有时支持你，有时又突然否定" },
      { id: "F", label: "基本不规划你，后果也多半要你自己承担" }
    ]
  },
  {
    id: "Q5_FAMILY_POSITION",
    title: "你在家里更像哪种孩子？",
    options: [
      { id: "A", label: "很多期待都放在你身上的孩子" },
      { id: "B", label: "需要懂事、不能太让人操心的孩子" },
      { id: "C", label: "家里不太细管，比较自由的孩子" },
      { id: "D", label: "总要证明自己不比别人差的孩子" },
      { id: "E", label: "不太被放在中心，很多事要自己处理的孩子" },
      { id: "F", label: "被仔细保护，也经常被安排好的孩子" }
    ]
  },
  {
    id: "Q6_SCHOOL_ENV",
    title: "你的学校环境更像哪一种？",
    options: [
      { id: "A", label: "鼓励兴趣、表达和不同选择" },
      { id: "B", label: "按部就班，主要看成绩和纪律" },
      { id: "C", label: "经常考试、排名、比较" },
      { id: "D", label: "目标很明确，升学压力很强" },
      { id: "E", label: "不太管你，很多事靠自己摸索" },
      { id: "F", label: "反馈不太稳定，遇到什么老师很重要" }
    ]
  },
  {
    id: "Q7_PEER_SUPPORT",
    title: "你和同龄人的关系更像哪一种？",
    options: [
      { id: "A", label: "容易融入，有稳定朋友" },
      { id: "B", label: "朋友不多，但有特别懂你的人" },
      { id: "C", label: "普通相处，不算特别被看见" },
      { id: "D", label: "经常觉得自己和别人不太一样" },
      { id: "E", label: "同龄人之间竞争大于友谊" },
      { id: "F", label: "遇到过关键支持者" }
    ]
  },
  {
    id: "Q8_FAILURE_RESPONSE",
    title: "当你做错、失败，或遇到麻烦时，周围通常会怎么回应？",
    options: [
      { id: "A", label: "会安慰你，也会陪你复盘" },
      { id: "B", label: "会讲道理，但不太接住情绪" },
      { id: "C", label: "会批评、比较，或者强调后果" },
      { id: "D", label: "不太会管你，你需要自己消化" },
      { id: "E", label: "会帮你解决，但之后管得更紧" },
      { id: "F", label: "平时不一定多说，但关键时会站出来兜底" }
    ]
  }
];
  const ENV_PARAM_KEYS = [
  "resource",
  "infoAccess",
  "socialCost",
  "retrySpace",
  "mobility",
  "familiarEvaluation",
  "pathSingularity",
  "warmth",
  "conflict",
  "expressionSafety",
  "emotionalPredictability",
  "control",
  "pressure",
  "autonomyRoom",
  "tolerance",
  "comparison",
  "protection",
  "selfHandling",
  "schoolPressure",
  "teacherSupport",
  "peerSupport",
  "belonging",
  "repair",
  "socialPermission",
  "roleBurden",
  "visibility"
];
  const ENV_OPTION_DELTAS = {
  "Q1_START_PLACE": {
    "A": {
      "resource": 25,
      "infoAccess": 30,
      "socialCost": 10,
      "schoolPressure": 10,
      "mobility": 20,
      "familiarEvaluation": -15,
      "pathSingularity": -20
    },
    "B": {
      "resource": 15,
      "infoAccess": 20,
      "schoolPressure": 15,
      "mobility": 10,
      "familiarEvaluation": -5,
      "pathSingularity": -10
    },
    "C": {},
    "D": {
      "resource": -15,
      "infoAccess": -15,
      "socialCost": 5,
      "schoolPressure": 5,
      "mobility": -15,
      "familiarEvaluation": 20,
      "pathSingularity": 25
    },
    "E": {
      "resource": -25,
      "infoAccess": -25,
      "socialCost": 20,
      "schoolPressure": -5,
      "mobility": -20,
      "familiarEvaluation": 25,
      "pathSingularity": 30
    },
    "F": {
      "mobility": 40,
      "familiarEvaluation": -10,
      "belonging": -20,
      "peerSupport": -10,
      "emotionalPredictability": -10,
      "pathSingularity": -10
    }
  },
  "Q2_FAMILY_RESOURCE": {
    "A": {
      "resource": -30,
      "socialCost": 35,
      "retrySpace": -25,
      "infoAccess": -15,
      "socialPermission": -20
    },
    "B": {
      "socialCost": 10,
      "retrySpace": -5
    },
    "C": {
      "resource": 20,
      "socialCost": -15,
      "retrySpace": 15,
      "infoAccess": 15,
      "socialPermission": 10
    },
    "D": {
      "resource": 35,
      "socialCost": -25,
      "retrySpace": 30,
      "infoAccess": 25,
      "socialPermission": 15
    },
    "E": {
      "socialCost": 15,
      "retrySpace": -20,
      "infoAccess": 5,
      "emotionalPredictability": -10
    }
  },
  "Q3_FAMILY_INTERACTION": {
    "A": {
      "warmth": 30,
      "conflict": -25,
      "expressionSafety": 25,
      "emotionalPredictability": 25,
      "repair": 10
    },
    "B": {
      "warmth": 5,
      "conflict": -10,
      "expressionSafety": -15,
      "emotionalPredictability": 10,
      "repair": -5
    },
    "C": {
      "warmth": 10,
      "conflict": -5,
      "emotionalPredictability": -15,
      "selfHandling": 15
    },
    "D": {
      "warmth": -10,
      "conflict": 30,
      "expressionSafety": -20,
      "emotionalPredictability": -30,
      "repair": -10
    },
    "E": {
      "warmth": -30,
      "expressionSafety": -25,
      "selfHandling": 30,
      "repair": -20
    },
    "F": {
      "warmth": -5,
      "conflict": 10,
      "expressionSafety": -10,
      "emotionalPredictability": -25,
      "selfHandling": 15,
      "repair": -5,
      "mobility": 10
    }
  },
  "Q4_FUTURE_ATTITUDE": {
    "A": {
      "pressure": 35,
      "control": 25,
      "autonomyRoom": -25,
      "tolerance": -20,
      "comparison": 15,
      "pathSingularity": 15
    },
    "B": {
      "pressure": 25,
      "control": 15,
      "autonomyRoom": -15,
      "tolerance": -10,
      "pathSingularity": 25,
      "schoolPressure": 5
    },
    "C": {
      "pressure": 15,
      "control": 20,
      "autonomyRoom": -20,
      "tolerance": -25,
      "pathSingularity": 20,
      "retrySpace": -10
    },
    "D": {
      "pressure": -15,
      "control": -20,
      "autonomyRoom": 30,
      "tolerance": 25,
      "pathSingularity": -20,
      "socialPermission": 10
    },
    "E": {
      "pressure": 10,
      "control": 10,
      "autonomyRoom": -5,
      "tolerance": -10,
      "emotionalPredictability": -25,
      "repair": -5
    },
    "F": {
      "pressure": -20,
      "control": -25,
      "autonomyRoom": 20,
      "tolerance": -10,
      "selfHandling": 20,
      "repair": -15
    }
  },
  "Q5_FAMILY_POSITION": {
    "A": {
      "pressure": 20,
      "comparison": 10,
      "visibility": 20,
      "roleBurden": 5
    },
    "B": {
      "roleBurden": 30,
      "pressure": 10,
      "expressionSafety": -10,
      "selfHandling": 15
    },
    "C": {
      "autonomyRoom": 20,
      "control": -15,
      "selfHandling": 10,
      "pressure": -10
    },
    "D": {
      "comparison": 30,
      "pressure": 15,
      "visibility": 10,
      "roleBurden": 5
    },
    "E": {
      "visibility": -30,
      "selfHandling": 30,
      "warmth": -5
    },
    "F": {
      "protection": 35,
      "control": 20,
      "autonomyRoom": -20,
      "retrySpace": 5,
      "selfHandling": -15
    }
  },
  "Q6_SCHOOL_ENV": {
    "A": {
      "teacherSupport": 30,
      "schoolPressure": -10,
      "comparison": -15,
      "expressionSafety": 10,
      "infoAccess": 5,
      "socialPermission": 10
    },
    "B": {
      "schoolPressure": 10,
      "comparison": 5,
      "pathSingularity": 5
    },
    "C": {
      "schoolPressure": 25,
      "comparison": 30,
      "pressure": 5,
      "teacherSupport": -5
    },
    "D": {
      "schoolPressure": 35,
      "comparison": 25,
      "pressure": 10,
      "pathSingularity": 20,
      "teacherSupport": -10
    },
    "E": {
      "schoolPressure": -10,
      "teacherSupport": -25,
      "selfHandling": 20,
      "comparison": -5
    },
    "F": {
      "schoolPressure": 10,
      "emotionalPredictability": -15,
      "expressionSafety": -10,
      "comparison": 10
    }
  },
  "Q7_PEER_SUPPORT": {
    "A": {
      "peerSupport": 25,
      "belonging": 30,
      "socialPermission": 10,
      "comparison": -10
    },
    "B": {
      "peerSupport": 20,
      "belonging": 15,
      "expressionSafety": 10
    },
    "C": {
      "visibility": -10
    },
    "D": {
      "peerSupport": -20,
      "belonging": -25,
      "expressionSafety": -10,
      "selfHandling": 10
    },
    "E": {
      "comparison": 25,
      "peerSupport": -10,
      "belonging": -10,
      "pressure": 5
    },
    "F": {
      "peerSupport": 30,
      "teacherSupport": 10,
      "repair": 15,
      "expressionSafety": 10,
      "visibility": 15
    }
  },
  "Q8_FAILURE_RESPONSE": {
    "A": {
      "repair": 30,
      "tolerance": 25,
      "expressionSafety": 15,
      "control": -10,
      "warmth": 10
    },
    "B": {
      "repair": 5,
      "tolerance": 5,
      "expressionSafety": -10,
      "control": 5
    },
    "C": {
      "repair": -20,
      "tolerance": -25,
      "expressionSafety": -20,
      "control": 15,
      "comparison": 20,
      "pressure": 10
    },
    "D": {
      "repair": -25,
      "tolerance": -5,
      "selfHandling": 25,
      "expressionSafety": -15
    },
    "E": {
      "repair": 10,
      "tolerance": -10,
      "control": 30,
      "protection": 20,
      "autonomyRoom": -15
    },
    "F": {
      "repair": 35,
      "warmth": 10,
      "tolerance": 10,
      "protection": 10
    }
  }
};
  const LIFE_REACTION_PARAM_KEYS = [
  "emotionalAlert",
  "expressDrive",
  "autonomyDrive",
  "safetyNeed",
  "ruleFit",
  "riskDrive",
  "boundaryNeed",
  "careDrive",
  "achievementBind",
  "meaningDrive"
];
  const PERSONALITY_LIFE_REACTION_FALLBACKS = {
  P01: { emotionalAlert: 90, expressDrive: 85, autonomyDrive: 45, safetyNeed: 55, ruleFit: 35, riskDrive: 55, boundaryNeed: 45, careDrive: 65, achievementBind: 45, meaningDrive: 60 },
  P02: { emotionalAlert: 85, expressDrive: 30, autonomyDrive: 35, safetyNeed: 90, ruleFit: 55, riskDrive: 20, boundaryNeed: 55, careDrive: 60, achievementBind: 45, meaningDrive: 45 },
  P03: { emotionalAlert: 55, expressDrive: 55, autonomyDrive: 90, safetyNeed: 35, ruleFit: 25, riskDrive: 80, boundaryNeed: 75, careDrive: 35, achievementBind: 45, meaningDrive: 70 },
  P04: { emotionalAlert: 45, expressDrive: 35, autonomyDrive: 35, safetyNeed: 85, ruleFit: 85, riskDrive: 25, boundaryNeed: 45, careDrive: 55, achievementBind: 55, meaningDrive: 40 },
  P05: { emotionalAlert: 75, expressDrive: 55, autonomyDrive: 35, safetyNeed: 65, ruleFit: 55, riskDrive: 35, boundaryNeed: 35, careDrive: 90, achievementBind: 45, meaningDrive: 50 },
  P06: { emotionalAlert: 40, expressDrive: 35, autonomyDrive: 35, safetyNeed: 65, ruleFit: 90, riskDrive: 30, boundaryNeed: 45, careDrive: 55, achievementBind: 70, meaningDrive: 35 },
  P07: { emotionalAlert: 55, expressDrive: 90, autonomyDrive: 70, safetyNeed: 35, ruleFit: 30, riskDrive: 80, boundaryNeed: 45, careDrive: 55, achievementBind: 55, meaningDrive: 65 },
  P08: { emotionalAlert: 80, expressDrive: 35, autonomyDrive: 45, safetyNeed: 90, ruleFit: 65, riskDrive: 20, boundaryNeed: 60, careDrive: 45, achievementBind: 55, meaningDrive: 55 },
  P09: { emotionalAlert: 50, expressDrive: 70, autonomyDrive: 70, safetyNeed: 55, ruleFit: 75, riskDrive: 60, boundaryNeed: 50, careDrive: 45, achievementBind: 90, meaningDrive: 55 },
  P10: { emotionalAlert: 65, expressDrive: 45, autonomyDrive: 35, safetyNeed: 70, ruleFit: 80, riskDrive: 25, boundaryNeed: 45, careDrive: 80, achievementBind: 65, meaningDrive: 40 },
  P11: { emotionalAlert: 45, expressDrive: 35, autonomyDrive: 85, safetyNeed: 35, ruleFit: 35, riskDrive: 75, boundaryNeed: 90, careDrive: 25, achievementBind: 40, meaningDrive: 70 },
  P12: { emotionalAlert: 70, expressDrive: 55, autonomyDrive: 85, safetyNeed: 50, ruleFit: 40, riskDrive: 55, boundaryNeed: 75, careDrive: 45, achievementBind: 50, meaningDrive: 90 }
};
  const EVENT_THEME_RULES = [
  {
    id: "T01_ABSENT_COMPANIONSHIP",
    name: "陪伴缺席与等待",
    envTerms: [
      { key: "emotionalPredictability", weight: 0.30, inverse: true },
      { key: "selfHandling", weight: 0.25 },
      { key: "warmth", weight: 0.25, inverse: true },
      { key: "conflict", weight: 0.20 }
    ],
    personalityTerms: [
      { key: "safetyNeed", weight: 0.40 },
      { key: "emotionalAlert", weight: 0.35 },
      { key: "careDrive", weight: 0.25 }
    ]
  },
  {
    id: "T02_CONFLICT_AND_REPAIR",
    name: "冲突爆发与关系修复",
    envTerms: [
      { key: "conflict", weight: 0.45 },
      { key: "repair", weight: 0.35 },
      { key: "expressionSafety", weight: 0.20, inverse: true }
    ],
    personalityTerms: [
      { key: "expressDrive", weight: 0.30 },
      { key: "emotionalAlert", weight: 0.30 },
      { key: "careDrive", weight: 0.25 },
      { key: "autonomyDrive", weight: 0.15 }
    ]
  },
  {
    id: "T03_SOCIAL_PERMISSION",
    name: "社交许可与外向养成",
    envTerms: [
      { key: "socialPermission", weight: 0.35 },
      { key: "peerSupport", weight: 0.25 },
      { key: "socialCost", weight: 0.20, inverse: true },
      { key: "resource", weight: 0.20 }
    ],
    personalityTerms: [
      { key: "expressDrive", weight: 0.35 },
      { key: "careDrive", weight: 0.30 },
      { key: "riskDrive", weight: 0.20 },
      { key: "emotionalAlert", weight: 0.15 }
    ]
  },
  {
    id: "T04_FAMILY_BACKUP",
    name: "外部危机中的家庭兜底",
    envTerms: [
      { key: "repair", weight: 0.40 },
      { key: "protection", weight: 0.25 },
      { key: "pressure", weight: 0.20 },
      { key: "control", weight: 0.15 }
    ],
    personalityTerms: [
      { key: "safetyNeed", weight: 0.35 },
      { key: "emotionalAlert", weight: 0.30 },
      { key: "autonomyDrive", weight: 0.20 },
      { key: "boundaryNeed", weight: 0.15 }
    ]
  },
  {
    id: "T05_INDEPENDENT_TASK",
    name: "独立任务与出错风险",
    envTerms: [
      { key: "control", weight: 0.30 },
      { key: "tolerance", weight: 0.30, inverse: true },
      { key: "pressure", weight: 0.25 },
      { key: "autonomyRoom", weight: 0.15, inverse: true }
    ],
    personalityTerms: [
      { key: "safetyNeed", weight: 0.30 },
      { key: "ruleFit", weight: 0.25 },
      { key: "emotionalAlert", weight: 0.25 },
      { key: "autonomyDrive", weight: 0.20 }
    ]
  },
  {
    id: "T06_ACHIEVEMENT_RECOGNITION",
    name: "成绩成功与被认可",
    envTerms: [
      { key: "schoolPressure", weight: 0.25 },
      { key: "comparison", weight: 0.25 },
      { key: "pressure", weight: 0.25 },
      { key: "teacherSupport", weight: 0.25 }
    ],
    personalityTerms: [
      { key: "achievementBind", weight: 0.45 },
      { key: "ruleFit", weight: 0.30 },
      { key: "expressDrive", weight: 0.25 }
    ]
  },
  {
    id: "T07_FAILURE_FEEDBACK",
    name: "成绩失利与失败反馈",
    envTerms: [
      { key: "schoolPressure", weight: 0.25 },
      { key: "comparison", weight: 0.25 },
      { key: "tolerance", weight: 0.25, inverse: true },
      { key: "pressure", weight: 0.25 }
    ],
    personalityTerms: [
      { key: "emotionalAlert", weight: 0.30 },
      { key: "safetyNeed", weight: 0.30 },
      { key: "achievementBind", weight: 0.25 },
      { key: "ruleFit", weight: 0.15 }
    ]
  },
  {
    id: "T08_RESOURCE_SOCIAL_COST",
    name: "资源限制与社交成本",
    envTerms: [
      { key: "socialCost", weight: 0.35 },
      { key: "resource", weight: 0.30, inverse: true },
      { key: "belonging", weight: 0.20 },
      { key: "socialPermission", weight: 0.15, inverse: true }
    ],
    personalityTerms: [
      { key: "careDrive", weight: 0.35 },
      { key: "emotionalAlert", weight: 0.30 },
      { key: "safetyNeed", weight: 0.25 },
      { key: "boundaryNeed", weight: 0.10 }
    ]
  },
  {
    id: "T09_INTEREST_MAINSTREAM_CONFLICT",
    name: "兴趣与主流路线冲突",
    envTerms: [
      { key: "pressure", weight: 0.25 },
      { key: "control", weight: 0.25 },
      { key: "pathSingularity", weight: 0.25 },
      { key: "teacherSupport", weight: 0.15, inverse: true },
      { key: "socialPermission", weight: 0.10, inverse: true }
    ],
    personalityTerms: [
      { key: "expressDrive", weight: 0.30 },
      { key: "autonomyDrive", weight: 0.30 },
      { key: "meaningDrive", weight: 0.25 },
      { key: "riskDrive", weight: 0.15 }
    ]
  },
  {
    id: "T10_PEER_ACCEPTANCE",
    name: "同伴接纳与被理解",
    envTerms: [
      { key: "peerSupport", weight: 0.35 },
      { key: "belonging", weight: 0.30 },
      { key: "expressionSafety", weight: 0.20 },
      { key: "repair", weight: 0.15 }
    ],
    personalityTerms: [
      { key: "emotionalAlert", weight: 0.30 },
      { key: "expressDrive", weight: 0.25 },
      { key: "careDrive", weight: 0.30 },
      { key: "safetyNeed", weight: 0.15 }
    ]
  },
  {
    id: "T11_PEER_ALIENATION",
    name: "同伴边缘感与自我隐藏",
    envTerms: [
      { key: "peerSupport", weight: 0.30, inverse: true },
      { key: "belonging", weight: 0.30, inverse: true },
      { key: "comparison", weight: 0.20 },
      { key: "socialCost", weight: 0.20 }
    ],
    personalityTerms: [
      { key: "emotionalAlert", weight: 0.30 },
      { key: "boundaryNeed", weight: 0.25 },
      { key: "meaningDrive", weight: 0.25 },
      { key: "autonomyDrive", weight: 0.20 }
    ]
  },
  {
    id: "T12_EXTERNAL_EVALUATION",
    name: "亲戚饭桌与外部评价",
    envTerms: [
      { key: "familiarEvaluation", weight: 0.30 },
      { key: "comparison", weight: 0.30 },
      { key: "pressure", weight: 0.25 },
      { key: "pathSingularity", weight: 0.15 }
    ],
    personalityTerms: [
      { key: "careDrive", weight: 0.25 },
      { key: "ruleFit", weight: 0.25 },
      { key: "achievementBind", weight: 0.25 },
      { key: "safetyNeed", weight: 0.25 }
    ]
  },
  {
    id: "T13_BOUNDARY_PRIVACY",
    name: "隐私边界与被过问",
    envTerms: [
      { key: "control", weight: 0.35 },
      { key: "autonomyRoom", weight: 0.30, inverse: true },
      { key: "protection", weight: 0.20 },
      { key: "tolerance", weight: 0.15, inverse: true }
    ],
    personalityTerms: [
      { key: "autonomyDrive", weight: 0.35 },
      { key: "boundaryNeed", weight: 0.35 },
      { key: "meaningDrive", weight: 0.20 },
      { key: "expressDrive", weight: 0.10 }
    ]
  },
  {
    id: "T14_GAOKAO_STABLE_PATH",
    name: "高考志愿与稳定路线",
    envTerms: [
      { key: "schoolPressure", weight: 0.25 },
      { key: "pressure", weight: 0.25 },
      { key: "pathSingularity", weight: 0.20 },
      { key: "control", weight: 0.15 },
      { key: "retrySpace", weight: 0.15, inverse: true }
    ],
    personalityTerms: [
      { key: "achievementBind", weight: 0.25 },
      { key: "meaningDrive", weight: 0.25 },
      { key: "autonomyDrive", weight: 0.20 },
      { key: "ruleFit", weight: 0.15 },
      { key: "safetyNeed", weight: 0.15 }
    ]
  },
  {
    id: "T15_LEAVING_FAMILIAR_PLACE",
    name: "第一次离开熟悉环境",
    envTerms: [
      { key: "mobility", weight: 0.25 },
      { key: "infoAccess", weight: 0.20 },
      { key: "resource", weight: 0.20 },
      { key: "autonomyRoom", weight: 0.20 },
      { key: "retrySpace", weight: 0.15 }
    ],
    personalityTerms: [
      { key: "autonomyDrive", weight: 0.30 },
      { key: "riskDrive", weight: 0.25 },
      { key: "safetyNeed", weight: 0.20 },
      { key: "boundaryNeed", weight: 0.15 },
      { key: "meaningDrive", weight: 0.10 }
    ]
  },
  {
    id: "T16_DEVIATING_EXPECTATION",
    name: "第一次偏离期待",
    envTerms: [
      { key: "pressure", weight: 0.25 },
      { key: "autonomyRoom", weight: 0.25 },
      { key: "peerSupport", weight: 0.15 },
      { key: "infoAccess", weight: 0.15 },
      { key: "pathSingularity", weight: 0.20, inverse: true }
    ],
    personalityTerms: [
      { key: "autonomyDrive", weight: 0.35 },
      { key: "meaningDrive", weight: 0.30 },
      { key: "expressDrive", weight: 0.20 },
      { key: "riskDrive", weight: 0.15 }
    ]
  }
];
  return {
    envQuestions: PARALLEL_LIFE_ENV_QUESTIONS,
    envParamKeys: ENV_PARAM_KEYS,
    envOptionDeltas: ENV_OPTION_DELTAS,
    lifeReactionParamKeys: LIFE_REACTION_PARAM_KEYS,
    personalityLifeReactionFallbacks: PERSONALITY_LIFE_REACTION_FALLBACKS,
    eventThemeRules: EVENT_THEME_RULES
  };
});
