(function (root, factory) {
  const data = factory();
  if (typeof module === 'object' && module.exports) module.exports = data;
  root.BBTI_PARALLEL_LIFE_EVENTS = data;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  return {
  "themes": [
    {
      "id": "T01_ABSENT_COMPANIONSHIP",
      "name": "陪伴缺席与等待",
      "description": "父母/照顾者不是不爱，但陪伴不稳定，用户很早学会等待和自我安抚。"
    },
    {
      "id": "T02_CONFLICT_AND_REPAIR",
      "name": "冲突爆发与关系修复",
      "description": "冲突发生后是否被修复，决定用户如何理解爱、伤害和关系延续。"
    },
    {
      "id": "T03_SOCIAL_PERMISSION",
      "name": "社交许可与外向养成",
      "description": "家庭或环境是否允许用户把时间、钱和精力放在人际体验上。"
    },
    {
      "id": "T04_FAMILY_BACKUP",
      "name": "外部危机中的家庭兜底",
      "description": "外部世界施压时，家里是否先保护、处理局面，而不是只责怪。"
    },
    {
      "id": "T05_INDEPENDENT_TASK",
      "name": "独立任务与出错风险",
      "description": "小事被当成独立能力测试时，用户如何理解出错、步骤和责任。"
    },
    {
      "id": "T06_ACHIEVEMENT_RECOGNITION",
      "name": "成绩成功与被认可",
      "description": "通过成绩或能力被看见，形成成就感或结果价值绑定。"
    },
    {
      "id": "T07_FAILURE_FEEDBACK",
      "name": "成绩失利与失败反馈",
      "description": "失败后的批评、复盘、沉默或管控，塑造失败观。"
    },
    {
      "id": "T08_RESOURCE_SOCIAL_COST",
      "name": "资源限制与社交成本",
      "description": "经济、交通、时间或家庭限制如何影响同伴参与。"
    },
    {
      "id": "T09_INTEREST_MAINSTREAM_CONFLICT",
      "name": "兴趣与主流路线冲突",
      "description": "喜欢的事情与实用、成绩、稳定路线发生冲突。"
    },
    {
      "id": "T10_PEER_ACCEPTANCE",
      "name": "同伴接纳与被理解",
      "description": "被朋友、老师或同伴接住，修复表达和归属。"
    },
    {
      "id": "T11_PEER_ALIENATION",
      "name": "同伴边缘感与自我隐藏",
      "description": "在同龄关系中不被理解，逐渐收起一部分自己。"
    },
    {
      "id": "T12_EXTERNAL_EVALUATION",
      "name": "亲戚饭桌与外部评价",
      "description": "熟人、亲戚、饭桌评价让用户学习体面、证明或比较。"
    },
    {
      "id": "T13_BOUNDARY_PRIVACY",
      "name": "隐私边界与被过问",
      "description": "隐私、交友、爱好或内心世界被介入时，边界感被塑造。"
    },
    {
      "id": "T14_GAOKAO_STABLE_PATH",
      "name": "高考志愿与稳定路线",
      "description": "升学/志愿节点上，喜欢与稳定、现实与意义发生拉扯。"
    },
    {
      "id": "T15_LEAVING_FAMILIAR_PLACE",
      "name": "第一次离开熟悉环境",
      "description": "离开原生环境后，重新建立安全、自由和自我定义。"
    },
    {
      "id": "T16_DEVIATING_EXPECTATION",
      "name": "第一次偏离期待",
      "description": "用户第一次认真考虑不走最稳、最被期待的路。"
    }
  ],
  "events": [
    {
      "eventId": "E01_01_LIVING_ROOM_WAITING",
      "themeId": "T01_ABSENT_COMPANIONSHIP",
      "ageRange": "3-7岁",
      "sceneCore": "晚上一个人在客厅等大人回来",
      "triggerEnv": [
        "大人忙、陪伴不稳、情绪可预测低"
      ],
      "triggerPersonality": [
        "高 SAFE / ES / CARE"
      ],
      "downrank": [
        "高 AUT + 高 BOUND 且已习惯独处时降权"
      ],
      "impactTags": [
        {
          "tag": "SAFETY_GAP",
          "weight": 3
        },
        {
          "tag": "WAITING_SENSITIVITY",
          "weight": 3
        },
        {
          "tag": "SELF_HANDLING",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E01_02_EMPTY_HOME_AFTER_SCHOOL",
      "themeId": "T01_ABSENT_COMPANIONSHIP",
      "ageRange": "6-10岁",
      "sceneCore": "放学后家里没人，只能自己待一段时间",
      "triggerEnv": [
        "家庭低参与、资源不差但时间不足"
      ],
      "triggerPersonality": [
        "高 SAFETY_NEED / RISK_PREVIEW"
      ],
      "downrank": [
        "同伴或照顾者稳定接住时降权"
      ],
      "impactTags": [
        {
          "tag": "SELF_HANDLING",
          "weight": 2
        },
        {
          "tag": "STABLE_ANCHOR",
          "weight": 2
        },
        {
          "tag": "SAFETY_GAP",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E01_03_NEED_HELP_BUT_ADULT_ABSENT",
      "themeId": "T01_ABSENT_COMPANIONSHIP",
      "ageRange": "4-9岁",
      "sceneCore": "害怕、生病或遇到小麻烦时，大人不能马上出现",
      "triggerEnv": [
        "陪伴不稳、repair低或延迟"
      ],
      "triggerPersonality": [
        "高 ES / SAFE / CARE"
      ],
      "downrank": [
        "repair高且后来有明显补偿时转入修复线"
      ],
      "impactTags": [
        {
          "tag": "WAITING_SENSITIVITY",
          "weight": 2
        },
        {
          "tag": "RELATION_CAUTIOUS",
          "weight": 2
        },
        {
          "tag": "SAFETY_GAP",
          "weight": 2
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E02_01_PHONE_ARGUMENT_REPAIR",
      "themeId": "T02_CONFLICT_AND_REPAIR",
      "ageRange": "10-16岁",
      "sceneCore": "因为手机、游戏或学习时间和家里争执，后来被修复",
      "triggerEnv": [
        "conflict中高 + repair中高"
      ],
      "triggerPersonality": [
        "高 EXP / AUT / ES"
      ],
      "downrank": [
        "repair低时转入失败反馈或边界事件"
      ],
      "impactTags": [
        {
          "tag": "CONFLICT_DIRECTNESS",
          "weight": 2
        },
        {
          "tag": "REPAIR_UNDERSTANDING",
          "weight": 3
        },
        {
          "tag": "EMOTIONAL_WORDS",
          "weight": 2
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E02_02_HEAVY_WORDS_LATE_REGRET",
      "themeId": "T02_CONFLICT_AND_REPAIR",
      "ageRange": "8-16岁",
      "sceneCore": "大人说了重话，之后表现出后悔或难过",
      "triggerEnv": [
        "表达不安全但仍有情感温度"
      ],
      "triggerPersonality": [
        "高 ES / CARE"
      ],
      "downrank": [
        "家庭冷淡且无修复时降权"
      ],
      "impactTags": [
        {
          "tag": "REPAIR_UNDERSTANDING",
          "weight": 3
        },
        {
          "tag": "RELATION_CAUTIOUS",
          "weight": 1
        },
        {
          "tag": "EMOTIONAL_WORDS",
          "weight": 2
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E02_03_FIRST_REAL_CONVERSATION_AFTER_FIGHT",
      "themeId": "T02_CONFLICT_AND_REPAIR",
      "ageRange": "12-18岁",
      "sceneCore": "一次争吵后，双方第一次认真讲出委屈",
      "triggerEnv": [
        "conflict高 + expressionSafety回升"
      ],
      "triggerPersonality": [
        "高 EXP / AUT / CARE"
      ],
      "downrank": [
        "用户极低表达驱动时降权"
      ],
      "impactTags": [
        {
          "tag": "CONFLICT_DIRECTNESS",
          "weight": 2
        },
        {
          "tag": "EXPRESSION_CONFIDENCE",
          "weight": 2
        },
        {
          "tag": "REPAIR_UNDERSTANDING",
          "weight": 2
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E03_01_ENCOURAGED_TO_GO_OUT",
      "themeId": "T03_SOCIAL_PERMISSION",
      "ageRange": "6-15岁",
      "sceneCore": "同学约你出去玩，家里鼓励你去",
      "triggerEnv": [
        "socialPermission高、socialCost低或被缓冲"
      ],
      "triggerPersonality": [
        "高 EXP / CARE / RISK"
      ],
      "downrank": [
        "peerSupport极低时降权"
      ],
      "impactTags": [
        {
          "tag": "SOCIAL_PERMISSION",
          "weight": 3
        },
        {
          "tag": "BELONGING_REPAIRED",
          "weight": 2
        },
        {
          "tag": "EXPRESSION_CONFIDENCE",
          "weight": 1
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E03_02_DONT_WORRY_MONEY_FOR_FRIENDS",
      "themeId": "T03_SOCIAL_PERMISSION",
      "ageRange": "8-16岁",
      "sceneCore": "你担心花钱，大人告诉你不用总担心",
      "triggerEnv": [
        "resource中高 + socialPermission高"
      ],
      "triggerPersonality": [
        "高 CARE / ES / SAFE"
      ],
      "downrank": [
        "resource紧张且无人兜底时转入T08"
      ],
      "impactTags": [
        {
          "tag": "SOCIAL_PERMISSION",
          "weight": 3
        },
        {
          "tag": "COST_AWARENESS",
          "weight": -1
        },
        {
          "tag": "CONFIDENCE_TO_TRY",
          "weight": 2
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E03_03_SUPPORTED_GROUP_ACTIVITY",
      "themeId": "T03_SOCIAL_PERMISSION",
      "ageRange": "9-18岁",
      "sceneCore": "家里支持你参加活动、社团、比赛或聚会",
      "triggerEnv": [
        "teacherSupport/peerSupport/socialPermission高"
      ],
      "triggerPersonality": [
        "高 EXP / RISK / CARE"
      ],
      "downrank": [
        "学校和同伴均低支持时降权"
      ],
      "impactTags": [
        {
          "tag": "BEING_SEEN",
          "weight": 2
        },
        {
          "tag": "SOCIAL_PERMISSION",
          "weight": 2
        },
        {
          "tag": "EXPRESSION_CONFIDENCE",
          "weight": 2
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E04_01_OUTSIDE_PRESSURE_FAMILY_STEPS_IN",
      "themeId": "T04_FAMILY_BACKUP",
      "ageRange": "12-19岁",
      "sceneCore": "外部压力出现时，家里先站出来处理局面",
      "triggerEnv": [
        "repair高、protection中高"
      ],
      "triggerPersonality": [
        "高 SAFE / ES / AUT"
      ],
      "downrank": [
        "control极高且事后强管控时转为混合线"
      ],
      "impactTags": [
        {
          "tag": "BACKUP_TRUST",
          "weight": 3
        },
        {
          "tag": "SAFETY_GAP",
          "weight": -1
        },
        {
          "tag": "CONFIDENCE_TO_TRY",
          "weight": 2
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E04_02_SCHOOL_OR_PARENT_CONFLICT_BACKUP",
      "themeId": "T04_FAMILY_BACKUP",
      "ageRange": "10-18岁",
      "sceneCore": "老师、同学或其他家长施压时，家里没有只责怪你",
      "triggerEnv": [
        "repair高、warmth中高"
      ],
      "triggerPersonality": [
        "高 SAFE / CARE / BOUNDARY"
      ],
      "downrank": [
        "repair低时降权"
      ],
      "impactTags": [
        {
          "tag": "BACKUP_TRUST",
          "weight": 3
        },
        {
          "tag": "BEING_SEEN",
          "weight": 1
        },
        {
          "tag": "RELATION_CAUTIOUS",
          "weight": -1
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E04_03_MISTAKE_BUT_PROTECTED_FIRST",
      "themeId": "T04_FAMILY_BACKUP",
      "ageRange": "12-20岁",
      "sceneCore": "你做了不完全符合期待的事，家里先保护再处理",
      "triggerEnv": [
        "pressure中高 + repair高"
      ],
      "triggerPersonality": [
        "高 AUT / SAFE / ES"
      ],
      "downrank": [
        "tolerance极低且主要是惩罚时转T07/T13"
      ],
      "impactTags": [
        {
          "tag": "BACKUP_TRUST",
          "weight": 3
        },
        {
          "tag": "DECISION_OWNERSHIP",
          "weight": 1
        },
        {
          "tag": "REPAIR_UNDERSTANDING",
          "weight": 2
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E05_01_BUY_ITEM_ALONE",
      "themeId": "T05_INDEPENDENT_TASK",
      "ageRange": "4-7岁",
      "sceneCore": "第一次被要求一个人下楼买东西或完成小任务",
      "triggerEnv": [
        "control/pressure中高，tolerance低"
      ],
      "triggerPersonality": [
        "高 SAFE / RULE / ES / AUT"
      ],
      "downrank": [
        "RISK高且AUT高、觉得好玩时跳过"
      ],
      "impactTags": [
        {
          "tag": "RISK_PREVIEW",
          "weight": 2
        },
        {
          "tag": "FAILURE_FEAR",
          "weight": 1
        },
        {
          "tag": "STABLE_ANCHOR",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E05_02_FIRST_TRANSPORT_ALONE",
      "themeId": "T05_INDEPENDENT_TASK",
      "ageRange": "7-13岁",
      "sceneCore": "第一次自己坐车、问路或穿过陌生路段",
      "triggerEnv": [
        "autonomyRoom中高或被迫独立"
      ],
      "triggerPersonality": [
        "高 SAFE / RISK / AUT"
      ],
      "downrank": [
        "有稳定陪伴且低影响时跳过"
      ],
      "impactTags": [
        {
          "tag": "CONFIDENCE_TO_TRY",
          "weight": 2
        },
        {
          "tag": "RISK_PREVIEW",
          "weight": 1
        },
        {
          "tag": "SELF_HANDLING",
          "weight": 1
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E05_03_HANDLE_SMALL_ERRAND",
      "themeId": "T05_INDEPENDENT_TASK",
      "ageRange": "8-14岁",
      "sceneCore": "自己去办一件小事，被要求别出错",
      "triggerEnv": [
        "pressure高、failure feedback严"
      ],
      "triggerPersonality": [
        "高 RULE / SAFE / ACHIEVEMENT"
      ],
      "downrank": [
        "家庭宽容时变成尝试底气"
      ],
      "impactTags": [
        {
          "tag": "FAILURE_FEAR",
          "weight": 2
        },
        {
          "tag": "RULE_FIT",
          "weight": 1
        },
        {
          "tag": "RISK_PREVIEW",
          "weight": 2
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E06_01_GOOD_EXAM_FAMILY_HAPPIER",
      "themeId": "T06_ACHIEVEMENT_RECOGNITION",
      "ageRange": "7-16岁",
      "sceneCore": "一次考得好后，家里明显更高兴",
      "triggerEnv": [
        "pressure/schoolPressure/comparison中高"
      ],
      "triggerPersonality": [
        "高 ACHIEVEMENT / RULE / CARE"
      ],
      "downrank": [
        "家里不看成绩且老师不反馈时降权"
      ],
      "impactTags": [
        {
          "tag": "ACHIEVEMENT_BIND",
          "weight": 3
        },
        {
          "tag": "PROOF_DRIVE",
          "weight": 2
        },
        {
          "tag": "BEING_SEEN",
          "weight": 1
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E06_02_TEACHER_PUBLIC_PRAISE",
      "themeId": "T06_ACHIEVEMENT_RECOGNITION",
      "ageRange": "8-18岁",
      "sceneCore": "老师在班级或重要场合表扬你",
      "triggerEnv": [
        "teacherSupport高、schoolPressure中"
      ],
      "triggerPersonality": [
        "高 EXP / ACHIEVEMENT"
      ],
      "downrank": [
        "用户低在意评价时降权"
      ],
      "impactTags": [
        {
          "tag": "BEING_SEEN",
          "weight": 3
        },
        {
          "tag": "EXPRESSION_CONFIDENCE",
          "weight": 1
        },
        {
          "tag": "PROOF_DRIVE",
          "weight": 1
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E06_03_FIRST_ABILITY_RECOGNITION",
      "themeId": "T06_ACHIEVEMENT_RECOGNITION",
      "ageRange": "9-20岁",
      "sceneCore": "你的某种能力第一次被认真看见",
      "triggerEnv": [
        "teacherSupport/peerSupport高"
      ],
      "triggerPersonality": [
        "高 MEANING / EXP / ACHIEVEMENT"
      ],
      "downrank": [
        "无外部支持时降权"
      ],
      "impactTags": [
        {
          "tag": "BEING_SEEN",
          "weight": 3
        },
        {
          "tag": "MEANING_QUESTION",
          "weight": 1
        },
        {
          "tag": "CONFIDENCE_TO_TRY",
          "weight": 2
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E07_01_FAILED_EXAM_QUESTIONED",
      "themeId": "T07_FAILURE_FEEDBACK",
      "ageRange": "8-17岁",
      "sceneCore": "一次考试失利后被追问原因",
      "triggerEnv": [
        "schoolPressure/pressure高、tolerance低"
      ],
      "triggerPersonality": [
        "高 ES / SAFE / ACHIEVEMENT"
      ],
      "downrank": [
        "失败后被温和复盘时转积极线"
      ],
      "impactTags": [
        {
          "tag": "FAILURE_FEAR",
          "weight": 3
        },
        {
          "tag": "ACHIEVEMENT_BIND",
          "weight": 2
        },
        {
          "tag": "RISK_PREVIEW",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E07_02_COMPARED_AFTER_MISTAKE",
      "themeId": "T07_FAILURE_FEEDBACK",
      "ageRange": "7-18岁",
      "sceneCore": "做错或退步后被拿来和别人比较",
      "triggerEnv": [
        "comparison高、repair低"
      ],
      "triggerPersonality": [
        "高 ES / ACHIEVEMENT / CARE"
      ],
      "downrank": [
        "comparison低时降权"
      ],
      "impactTags": [
        {
          "tag": "COMPARISON_WOUND",
          "weight": 3
        },
        {
          "tag": "PROOF_DRIVE",
          "weight": 2
        },
        {
          "tag": "FAILURE_FEAR",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E07_03_SILENCE_AFTER_FAILURE",
      "themeId": "T07_FAILURE_FEEDBACK",
      "ageRange": "8-18岁",
      "sceneCore": "失败后没人骂你，但沉默让你更不安",
      "triggerEnv": [
        "expressionSafety低、warmth低"
      ],
      "triggerPersonality": [
        "高 ES / CARE / SAFE"
      ],
      "downrank": [
        "EXP高且直接沟通修复时转T02"
      ],
      "impactTags": [
        {
          "tag": "SELF_HANDLING",
          "weight": 2
        },
        {
          "tag": "FAILURE_FEAR",
          "weight": 2
        },
        {
          "tag": "VISIBILITY_HUNGER",
          "weight": 2
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E08_01_OUTING_COST_CALCULATION",
      "themeId": "T08_RESOURCE_SOCIAL_COST",
      "ageRange": "8-18岁",
      "sceneCore": "同学约你出去玩，你先开始算花费",
      "triggerEnv": [
        "socialCost高、resource低/波动"
      ],
      "triggerPersonality": [
        "高 CARE / ES / SAFE"
      ],
      "downrank": [
        "家里明确鼓励并兜底时转T03"
      ],
      "impactTags": [
        {
          "tag": "COST_AWARENESS",
          "weight": 3
        },
        {
          "tag": "SOCIAL_WITHDRAW_COST",
          "weight": 2
        },
        {
          "tag": "RESOURCE_REALISM",
          "weight": 2
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E08_02_INTEREST_ACTIVITY_COST",
      "themeId": "T08_RESOURCE_SOCIAL_COST",
      "ageRange": "8-18岁",
      "sceneCore": "想参加兴趣班、比赛或活动，但成本成了问题",
      "triggerEnv": [
        "resource低、retrySpace低"
      ],
      "triggerPersonality": [
        "高 EXP / MEANING / AUT"
      ],
      "downrank": [
        "资源高且支持兴趣时转T09正向"
      ],
      "impactTags": [
        {
          "tag": "COST_AWARENESS",
          "weight": 2
        },
        {
          "tag": "CREATIVE_KEEPING",
          "weight": 1
        },
        {
          "tag": "RESOURCE_REALISM",
          "weight": 2
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E08_03_DECLINED_OPPORTUNITY_COST",
      "themeId": "T08_RESOURCE_SOCIAL_COST",
      "ageRange": "12-22岁",
      "sceneCore": "因为钱、交通或时间成本放弃一次机会",
      "triggerEnv": [
        "resource低、mobility低、socialCost高"
      ],
      "triggerPersonality": [
        "高 AUT / MEANING / CARE"
      ],
      "downrank": [
        "机会可轻易替代时降权"
      ],
      "impactTags": [
        {
          "tag": "OPPORTUNITY_AWARE",
          "weight": 2
        },
        {
          "tag": "SOCIAL_WITHDRAW_COST",
          "weight": 2
        },
        {
          "tag": "RESOURCE_REALISM",
          "weight": 3
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E09_01_INTEREST_NOT_PRACTICAL",
      "themeId": "T09_INTEREST_MAINSTREAM_CONFLICT",
      "ageRange": "8-18岁",
      "sceneCore": "你想学或做某个兴趣，家里觉得不够实用",
      "triggerEnv": [
        "pressure/control/pathSingularity高"
      ],
      "triggerPersonality": [
        "高 EXP / AUT / MEANING"
      ],
      "downrank": [
        "家庭支持兴趣时降权"
      ],
      "impactTags": [
        {
          "tag": "CREATIVE_KEEPING",
          "weight": 3
        },
        {
          "tag": "PATH_CONFLICT",
          "weight": 2
        },
        {
          "tag": "EXPRESSION_DELAY",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E09_02_CREATIVE_WORK_NOT_UNDERSTOOD",
      "themeId": "T09_INTEREST_MAINSTREAM_CONFLICT",
      "ageRange": "10-20岁",
      "sceneCore": "你做出的表达被认为不务正业或没前途",
      "triggerEnv": [
        "teacherSupport低、pressure高"
      ],
      "triggerPersonality": [
        "高 EXP / MEANING"
      ],
      "downrank": [
        "被老师/朋友接住时转T10/T06"
      ],
      "impactTags": [
        {
          "tag": "SELF_HIDE",
          "weight": 2
        },
        {
          "tag": "CREATIVE_KEEPING",
          "weight": 3
        },
        {
          "tag": "MEANING_QUESTION",
          "weight": 2
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E09_03_HIDE_TRUE_INTEREST",
      "themeId": "T09_INTEREST_MAINSTREAM_CONFLICT",
      "ageRange": "12-22岁",
      "sceneCore": "你开始把真正喜欢的东西放在心里，不马上说",
      "triggerEnv": [
        "control高、expressionSafety低"
      ],
      "triggerPersonality": [
        "高 AUT / EXP / BOUNDARY"
      ],
      "downrank": [
        "表达安全高时降权"
      ],
      "impactTags": [
        {
          "tag": "EXPRESSION_DELAY",
          "weight": 2
        },
        {
          "tag": "SELF_HIDE",
          "weight": 3
        },
        {
          "tag": "IDENTITY_DIFF",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E10_01_FRIEND_UNDERSTANDS_YOU",
      "themeId": "T10_PEER_ACCEPTANCE",
      "ageRange": "8-22岁",
      "sceneCore": "朋友认真听完你的想法，没有急着否定",
      "triggerEnv": [
        "peerSupport高、belonging中高"
      ],
      "triggerPersonality": [
        "高 ES / CARE / EXP"
      ],
      "downrank": [
        "同伴支持低时降权"
      ],
      "impactTags": [
        {
          "tag": "BELONGING_REPAIRED",
          "weight": 3
        },
        {
          "tag": "EXPRESSION_CONFIDENCE",
          "weight": 2
        },
        {
          "tag": "BEING_SEEN",
          "weight": 2
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E10_02_NOT_MOCKED_FOR_SENSITIVITY",
      "themeId": "T10_PEER_ACCEPTANCE",
      "ageRange": "8-18岁",
      "sceneCore": "有人没有笑你想太多，反而理解你",
      "triggerEnv": [
        "expressionSafety高、peerSupport高"
      ],
      "triggerPersonality": [
        "高 ES / SAFE"
      ],
      "downrank": [
        "用户低情绪警觉时降权"
      ],
      "impactTags": [
        {
          "tag": "BELONGING_REPAIRED",
          "weight": 2
        },
        {
          "tag": "SAFETY_GAP",
          "weight": -1
        },
        {
          "tag": "EMOTIONAL_WORDS",
          "weight": 2
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E10_03_SUPPORTER_SEES_STRENGTH",
      "themeId": "T10_PEER_ACCEPTANCE",
      "ageRange": "10-22岁",
      "sceneCore": "朋友、老师或前辈认真肯定你的能力",
      "triggerEnv": [
        "teacherSupport/peerSupport高"
      ],
      "triggerPersonality": [
        "高 MEANING / EXP / ACHIEVEMENT"
      ],
      "downrank": [
        "没有关键支持时降权"
      ],
      "impactTags": [
        {
          "tag": "BEING_SEEN",
          "weight": 3
        },
        {
          "tag": "CONFIDENCE_TO_TRY",
          "weight": 2
        },
        {
          "tag": "MEANING_QUESTION",
          "weight": 1
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E11_01_CANNOT_JOIN_TOPIC",
      "themeId": "T11_PEER_ALIENATION",
      "ageRange": "8-18岁",
      "sceneCore": "你发现自己和多数同龄人聊不到一起",
      "triggerEnv": [
        "belonging低、peerSupport低"
      ],
      "triggerPersonality": [
        "高 MEANING / ES / BOUNDARY"
      ],
      "downrank": [
        "有稳定小圈子时降权"
      ],
      "impactTags": [
        {
          "tag": "PEER_MISTRUST",
          "weight": 2
        },
        {
          "tag": "SELF_HIDE",
          "weight": 2
        },
        {
          "tag": "IDENTITY_DIFF",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E11_02_HIDE_PART_TO_BELONG",
      "themeId": "T11_PEER_ALIENATION",
      "ageRange": "9-20岁",
      "sceneCore": "为了融入，你藏起了一部分爱好、想法或情绪",
      "triggerEnv": [
        "comparison/socialCost高、expressionSafety低"
      ],
      "triggerPersonality": [
        "高 CARE / ES / EXP"
      ],
      "downrank": [
        "BOUNDARY极高时可能变成直接抽离"
      ],
      "impactTags": [
        {
          "tag": "SELF_HIDE",
          "weight": 3
        },
        {
          "tag": "PLEASE_TENDENCY",
          "weight": 1
        },
        {
          "tag": "BELONGING_REPAIRED",
          "weight": -1
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E11_03_STOP_EXPLAINING_SELF",
      "themeId": "T11_PEER_ALIENATION",
      "ageRange": "12-22岁",
      "sceneCore": "解释几次无效后，你不再急着让别人理解",
      "triggerEnv": [
        "peerSupport低、belonging低"
      ],
      "triggerPersonality": [
        "高 BOUNDARY / AUT / MEANING"
      ],
      "downrank": [
        "被关键支持者接住时转T10"
      ],
      "impactTags": [
        {
          "tag": "BOUNDARY_HARDEN",
          "weight": 2
        },
        {
          "tag": "SELF_HANDLING",
          "weight": 2
        },
        {
          "tag": "PEER_MISTRUST",
          "weight": 2
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E12_01_RELATIVES_ASK_GRADES",
      "themeId": "T12_EXTERNAL_EVALUATION",
      "ageRange": "7-18岁",
      "sceneCore": "亲戚或熟人反复问成绩、排名、未来打算",
      "triggerEnv": [
        "familiarEvaluation/comparison高"
      ],
      "triggerPersonality": [
        "高 CARE / RULE / ACHIEVEMENT"
      ],
      "downrank": [
        "熟人评价低时降权"
      ],
      "impactTags": [
        {
          "tag": "COMPARISON_WOUND",
          "weight": 2
        },
        {
          "tag": "PROOF_DRIVE",
          "weight": 2
        },
        {
          "tag": "CARE_BURDEN",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E12_02_BEHAVE_WELL_AT_GATHERING",
      "themeId": "T12_EXTERNAL_EVALUATION",
      "ageRange": "5-16岁",
      "sceneCore": "大人提醒你在外面要懂事、别丢脸",
      "triggerEnv": [
        "roleBurden/pressure高"
      ],
      "triggerPersonality": [
        "高 CARE / RULE / SAFE"
      ],
      "downrank": [
        "家庭不在意体面时降权"
      ],
      "impactTags": [
        {
          "tag": "CARE_BURDEN",
          "weight": 2
        },
        {
          "tag": "STABLE_PATH_DEPEND",
          "weight": 1
        },
        {
          "tag": "EXPRESSION_DELAY",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E12_03_COMPARED_WITH_OTHER_CHILD",
      "themeId": "T12_EXTERNAL_EVALUATION",
      "ageRange": "7-18岁",
      "sceneCore": "你被拿来和同龄人或亲戚家的孩子比较",
      "triggerEnv": [
        "comparison高、visibility条件化"
      ],
      "triggerPersonality": [
        "高 ACHIEVEMENT / ES"
      ],
      "downrank": [
        "comparison低时降权"
      ],
      "impactTags": [
        {
          "tag": "COMPARISON_WOUND",
          "weight": 3
        },
        {
          "tag": "PROOF_DRIVE",
          "weight": 2
        },
        {
          "tag": "VISIBILITY_HUNGER",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E13_01_PHONE_OR_DIARY_QUESTIONED",
      "themeId": "T13_BOUNDARY_PRIVACY",
      "ageRange": "10-18岁",
      "sceneCore": "手机、日记、聊天或房间被过问",
      "triggerEnv": [
        "control/protection高、autonomyRoom低"
      ],
      "triggerPersonality": [
        "高 BOUNDARY / AUT"
      ],
      "downrank": [
        "家庭边界尊重高时降权"
      ],
      "impactTags": [
        {
          "tag": "BOUNDARY_HARDEN",
          "weight": 3
        },
        {
          "tag": "CONTROL_SENSITIVITY",
          "weight": 2
        },
        {
          "tag": "SELF_HIDE",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E13_02_FRIENDSHIP_OR_HOBBY_INTERVENED",
      "themeId": "T13_BOUNDARY_PRIVACY",
      "ageRange": "11-19岁",
      "sceneCore": "交友、喜欢的人或兴趣被明显干预",
      "triggerEnv": [
        "control高、tolerance低"
      ],
      "triggerPersonality": [
        "高 AUT / BOUNDARY / MEANING"
      ],
      "downrank": [
        "repair高且沟通后尊重时转修复线"
      ],
      "impactTags": [
        {
          "tag": "CONTROL_SENSITIVITY",
          "weight": 3
        },
        {
          "tag": "AUTONOMY_AWAKEN",
          "weight": 2
        },
        {
          "tag": "PATH_CONFLICT",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E13_03_INNER_WORLD_RESERVED",
      "themeId": "T13_BOUNDARY_PRIVACY",
      "ageRange": "12-22岁",
      "sceneCore": "你开始把一些东西放进只有自己知道的地方",
      "triggerEnv": [
        "expressionSafety低、control高"
      ],
      "triggerPersonality": [
        "高 BOUNDARY / MEANING"
      ],
      "downrank": [
        "表达安全高时降权"
      ],
      "impactTags": [
        {
          "tag": "SELF_HIDE",
          "weight": 2
        },
        {
          "tag": "BOUNDARY_HARDEN",
          "weight": 3
        },
        {
          "tag": "IDENTITY_DIFF",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E14_01_MAJOR_STABLE_VS_LIKE",
      "themeId": "T14_GAOKAO_STABLE_PATH",
      "ageRange": "16-19岁",
      "sceneCore": "填志愿时，稳定和喜欢发生冲突",
      "triggerEnv": [
        "schoolPressure/pressure/pathSingularity高"
      ],
      "triggerPersonality": [
        "高 MEANING / AUT / ACHIEVEMENT"
      ],
      "downrank": [
        "非升学路径或压力低时降权"
      ],
      "impactTags": [
        {
          "tag": "PATH_CONFLICT",
          "weight": 3
        },
        {
          "tag": "STABLE_PATH_DEPEND",
          "weight": 2
        },
        {
          "tag": "DECISION_OWNERSHIP",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E14_02_CITY_CHOICE_COST",
      "themeId": "T14_GAOKAO_STABLE_PATH",
      "ageRange": "16-22岁",
      "sceneCore": "想去外地或更远城市，但成本和稳定性变重",
      "triggerEnv": [
        "resource/retrySpace/mobility共同影响"
      ],
      "triggerPersonality": [
        "高 AUT / SAFETY / MEANING"
      ],
      "downrank": [
        "资源充足且自由高时转T15"
      ],
      "impactTags": [
        {
          "tag": "RESOURCE_REALISM",
          "weight": 2
        },
        {
          "tag": "PATH_CONFLICT",
          "weight": 2
        },
        {
          "tag": "ESCAPE_IMPULSE",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E14_03_TEACHER_FAMILY_PATH_ADVICE",
      "themeId": "T14_GAOKAO_STABLE_PATH",
      "ageRange": "16-19岁",
      "sceneCore": "老师和家里都建议你按分数、前途和稳定走",
      "triggerEnv": [
        "schoolPressure高、teacherSupport偏路径化"
      ],
      "triggerPersonality": [
        "高 RULE / ACHIEVEMENT / MEANING"
      ],
      "downrank": [
        "学校鼓励多元时降权"
      ],
      "impactTags": [
        {
          "tag": "STABLE_PATH_DEPEND",
          "weight": 2
        },
        {
          "tag": "ACHIEVEMENT_BIND",
          "weight": 1
        },
        {
          "tag": "MEANING_QUESTION",
          "weight": 2
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E15_01_FIRST_OUT_OF_TOWN_STUDY",
      "themeId": "T15_LEAVING_FAMILIAR_PLACE",
      "ageRange": "18-23岁",
      "sceneCore": "第一次去外地读书、实习或生活",
      "triggerEnv": [
        "mobility/resource/autonomyRoom中高"
      ],
      "triggerPersonality": [
        "高 AUT / RISK / MEANING / SAFE"
      ],
      "downrank": [
        "环境无法离开且无机会时降权"
      ],
      "impactTags": [
        {
          "tag": "AUTONOMY_AWAKEN",
          "weight": 2
        },
        {
          "tag": "CONFIDENCE_TO_TRY",
          "weight": 2
        },
        {
          "tag": "SAFETY_GAP",
          "weight": 1
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E15_02_HANDLE_LIFE_ALONE",
      "themeId": "T15_LEAVING_FAMILIAR_PLACE",
      "ageRange": "18-23岁",
      "sceneCore": "在陌生地方自己处理租房、手续、生活问题",
      "triggerEnv": [
        "mobility高、selfHandling中高"
      ],
      "triggerPersonality": [
        "高 AUT / SAFE / BOUNDARY"
      ],
      "downrank": [
        "有强兜底且低自主时降权"
      ],
      "impactTags": [
        {
          "tag": "SELF_HANDLING",
          "weight": 2
        },
        {
          "tag": "DECISION_OWNERSHIP",
          "weight": 2
        },
        {
          "tag": "STABLE_ANCHOR",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E15_03_NEW_CITY_REDEFINE_SELF",
      "themeId": "T15_LEAVING_FAMILIAR_PLACE",
      "ageRange": "18-23岁",
      "sceneCore": "离开熟悉环境后，你发现自己可以换一种方式生活",
      "triggerEnv": [
        "infoAccess/mobility高、peerSupport可变"
      ],
      "triggerPersonality": [
        "高 MEANING / AUT / EXP"
      ],
      "downrank": [
        "低意义驱动时降权"
      ],
      "impactTags": [
        {
          "tag": "IDENTITY_DIFF",
          "weight": 3
        },
        {
          "tag": "MEANING_QUESTION",
          "weight": 2
        },
        {
          "tag": "EXPRESSION_CONFIDENCE",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E16_01_CONSIDER_NOT_STABLE_PATH",
      "themeId": "T16_DEVIATING_EXPECTATION",
      "ageRange": "18-23岁",
      "sceneCore": "你第一次认真考虑不走最稳的路线",
      "triggerEnv": [
        "autonomyRoom/infoAccess高且pressure存在"
      ],
      "triggerPersonality": [
        "高 AUT / MEANING / RISK"
      ],
      "downrank": [
        "自主低且压力极高时转压制线"
      ],
      "impactTags": [
        {
          "tag": "AUTONOMY_AWAKEN",
          "weight": 3
        },
        {
          "tag": "PATH_CONFLICT",
          "weight": 2
        },
        {
          "tag": "DECISION_OWNERSHIP",
          "weight": 2
        }
      ],
      "positiveAllowed": false
    },
    {
      "eventId": "E16_02_NEW_OPPORTUNITY_SHOWS_OTHER_LIFE",
      "themeId": "T16_DEVIATING_EXPECTATION",
      "ageRange": "16-23岁",
      "sceneCore": "一次机会让你看到另一种人生可能",
      "triggerEnv": [
        "infoAccess/teacherSupport/peerSupport中高"
      ],
      "triggerPersonality": [
        "高 MEANING / EXP / AUT"
      ],
      "downrank": [
        "信息封闭时降权"
      ],
      "impactTags": [
        {
          "tag": "OPPORTUNITY_AWARE",
          "weight": 3
        },
        {
          "tag": "MEANING_QUESTION",
          "weight": 2
        },
        {
          "tag": "CONFIDENCE_TO_TRY",
          "weight": 1
        }
      ],
      "positiveAllowed": true
    },
    {
      "eventId": "E16_03_CORRECT_LIFE_VS_MY_LIFE",
      "themeId": "T16_DEVIATING_EXPECTATION",
      "ageRange": "18-23岁",
      "sceneCore": "你把“别人觉得正确的人生”和“我的人生”分开",
      "triggerEnv": [
        "pressure/pathSingularity存在，autonomy也存在"
      ],
      "triggerPersonality": [
        "高 MEANING / BOUNDARY / AUT"
      ],
      "downrank": [
        "低自主低意义时降权"
      ],
      "impactTags": [
        {
          "tag": "IDENTITY_DIFF",
          "weight": 3
        },
        {
          "tag": "DECISION_OWNERSHIP",
          "weight": 2
        },
        {
          "tag": "GOAL_RELAX",
          "weight": 1
        }
      ],
      "positiveAllowed": false
    }
  ]
};
});
