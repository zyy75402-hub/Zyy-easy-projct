const DATA = {
  "currentQuestions": [
    {
      "id": "cur_01",
      "text": "热闹的互动会让我更容易进入状态。",
      "mbtiRule": {
        "E": 0.55,
        "I": -0.55
      },
      "objectRule": {
        "expressiveDrama": 0.55,
        "freedomNeed": 0.25,
        "emotionalSensitivity": 0.1
      },
      "evidenceTags": [
        "当前社交能量"
      ]
    },
    {
      "id": "cur_02",
      "text": "做决定时，我会先顾及人的感受。",
      "mbtiRule": {
        "F": 0.55,
        "T": -0.55
      },
      "objectRule": {
        "relationshipCare": 0.55,
        "emotionalSensitivity": 0.35,
        "observerAnalysis": -0.15
      },
      "evidenceTags": [
        "当前决策方式"
      ]
    },
    {
      "id": "cur_03",
      "text": "计划临时变了，我不太容易被打乱。",
      "mbtiRule": {
        "P": 0.52,
        "J": -0.52
      },
      "objectRule": {
        "freedomNeed": 0.55,
        "imageControl": -0.35,
        "riskPrediction": -0.25
      },
      "evidenceTags": [
        "当前计划弹性"
      ]
    },
    {
      "id": "cur_04",
      "text": "比起现实细节，我更容易被可能性和氛围吸引。",
      "mbtiRule": {
        "N": 0.52,
        "S": -0.52
      },
      "objectRule": {
        "expressiveDrama": 0.45,
        "observerAnalysis": 0.25,
        "freedomNeed": 0.2
      },
      "evidenceTags": [
        "当前想象方式"
      ]
    },
    {
      "id": "cur_05",
      "text": "为了把事情做好，我会提前想很多风险。",
      "mbtiRule": {
        "J": 0.35,
        "P": -0.25,
        "I": 0.12
      },
      "objectRule": {
        "imageControl": 0.7,
        "riskPrediction": 0.55,
        "ambition": 0.25
      },
      "evidenceTags": [
        "当前风险预判"
      ]
    },
    {
      "id": "cur_06",
      "text": "我有想表达的东西，但会先看时机和场合。",
      "mbtiRule": {
        "I": 0.25,
        "E": -0.15,
        "F": 0.15
      },
      "objectRule": {
        "expressiveDrama": 0.55,
        "imageControl": 0.5,
        "riskPrediction": 0.28
      },
      "evidenceTags": [
        "当前表达控制"
      ]
    },
    {
      "id": "cur_07",
      "text": "关系里没说出口的情绪，我常常能察觉到。",
      "mbtiRule": {
        "F": 0.38,
        "I": 0.18
      },
      "objectRule": {
        "emotionalSensitivity": 0.75,
        "relationshipCare": 0.45,
        "observerAnalysis": 0.3
      },
      "evidenceTags": [
        "当前情绪雷达"
      ]
    },
    {
      "id": "cur_08",
      "text": "我有野心，但不太喜欢表现得太用力。",
      "mbtiRule": {
        "J": 0.2,
        "I": 0.15
      },
      "objectRule": {
        "ambition": 0.55,
        "imageControl": 0.45,
        "observerAnalysis": 0.25
      },
      "evidenceTags": [
        "当前隐藏野心"
      ]
    }
  ],
  "fragments": [
    {
      "id": "frag01",
      "title": "片段 01",
      "start": "请选择“不开心情绪”的删除比例。",
      "startDesc": "这一段会读取表达、评价和失败反馈的旧日志。你不用解释过去，只需要判断这些反馈还剩多少重量。",
      "doneTitle": "第一段日志已删除。",
      "doneDesc": "那些让你不敢表达、害怕出错、总想提前解释清楚的东西，不一定是你天生如此。它们可能只是一些旧反馈留下的缓存。系统会把它们从“你是谁”里暂时移开一点。"
    },
    {
      "id": "frag02",
      "title": "片段 02",
      "start": "请选择“不自由感”的删除比例。",
      "startDesc": "这一段会读取选择权、资源和试错空间。不是评判过去好坏，而是看看哪些审批流程被装进了你的人生后台。",
      "doneTitle": "第二段日志已删除。",
      "doneDesc": "如果你曾经觉得选择一条路之前，要先证明自己不是冲动，那不代表你没有方向。有些人不是缺少勇气，只是太早习惯了给自己的愿望写申请书。"
    },
    {
      "id": "frag03",
      "title": "片段 03",
      "start": "请选择“关系压力”的删除比例。",
      "startDesc": "这一段会读取你在关系、集体和气氛里的位置。有些人不是天生会看脸色，只是很早被推到维持场面的岗位上。",
      "doneTitle": "第三段日志已删除。",
      "doneDesc": "如果你很会照顾气氛，很会判断别人没说出口的情绪，那可能是一种能力，也可能是一种很早装上的雷达。你不需要永远负责让场面好看。"
    },
    {
      "id": "frag04",
      "title": "片段 04",
      "start": "请选择“失败回忆”的删除比例。",
      "startDesc": "这一段会读取权威、期待、支持和情绪承接相关的记录。请按真实感受选择，不用把答案修饰得更体面。",
      "doneTitle": "第四段日志已删除。",
      "doneDesc": "如果你总是习惯先拿出结果、先恢复状态、先让别人放心，那不代表你不能脆弱。你可能只是太熟悉“表现正常”这件事。"
    }
  ],
  "refQuestions": [
    {
      "id": "ref_01",
      "fragment": "frag01",
      "text": "我和家里人意见不同时，常常会被要求先听话。",
      "tags": [
        "表达审查",
        "控制反馈"
      ],
      "mbtiRule": {
        "E": 0.18,
        "P": 0.18,
        "I": -0.1,
        "J": -0.1
      },
      "objectRule": {
        "imageControl": 0.55,
        "riskPrediction": 0.45,
        "freedomNeed": 0.45,
        "expressiveDrama": -0.22
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_02",
      "fragment": "frag01",
      "text": "我表达不满后，气氛常常会变差。",
      "tags": [
        "表达后果",
        "关系气氛"
      ],
      "mbtiRule": {
        "I": 0.12,
        "F": 0.1
      },
      "objectRule": {
        "emotionalSensitivity": 0.62,
        "riskPrediction": 0.7,
        "imageControl": 0.55,
        "expressiveDrama": -0.2
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_03",
      "fragment": "frag01",
      "text": "我只是多玩一会儿手机、电视或游戏，家里就容易像出了大事。",
      "tags": [
        "日常规训",
        "控制反馈"
      ],
      "mbtiRule": {
        "P": 0.18,
        "E": 0.08,
        "J": -0.12
      },
      "objectRule": {
        "riskPrediction": 0.66,
        "imageControl": 0.5,
        "freedomNeed": 0.55,
        "emotionalSensitivity": 0.3
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_04",
      "fragment": "frag01",
      "text": "同样的小错放在考试前，家里的反应会明显升级。",
      "tags": [
        "重要节点",
        "评价压力"
      ],
      "mbtiRule": {
        "P": 0.16,
        "E": 0.06,
        "J": -0.12
      },
      "objectRule": {
        "riskPrediction": 0.72,
        "imageControl": 0.55,
        "ambition": 0.32,
        "emotionalSensitivity": 0.25
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_05",
      "fragment": "frag01",
      "text": "我表现不好时，别人更常先指出问题。",
      "tags": [
        "评价压力",
        "失败反馈"
      ],
      "mbtiRule": {
        "P": 0.2,
        "I": -0.05,
        "J": -0.1
      },
      "objectRule": {
        "riskPrediction": 0.82,
        "imageControl": 0.74,
        "ambition": 0.38,
        "emotionalSensitivity": 0.38
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_06",
      "fragment": "frag01",
      "text": "我一次没做好，容易被说成不够自觉或不够努力。",
      "tags": [
        "人格化评价",
        "自我价值"
      ],
      "mbtiRule": {
        "P": 0.18,
        "E": 0.06,
        "J": -0.12
      },
      "objectRule": {
        "emotionalSensitivity": 0.72,
        "riskPrediction": 0.82,
        "imageControl": 0.72,
        "ambition": 0.32
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_07",
      "fragment": "frag01",
      "text": "表现好像是应该的，表现不好会被记很久。",
      "tags": [
        "评价记忆",
        "自我要求"
      ],
      "mbtiRule": {
        "P": 0.18,
        "E": 0.05,
        "J": -0.12
      },
      "objectRule": {
        "ambition": 0.42,
        "riskPrediction": 0.76,
        "imageControl": 0.65,
        "emotionalSensitivity": 0.38
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_08",
      "fragment": "frag01",
      "text": "我做错事后，更常听到“不许这样”，而不是“为什么会这样”。",
      "tags": [
        "失败反馈",
        "复盘缺口"
      ],
      "mbtiRule": {
        "P": 0.2,
        "N": 0.04,
        "J": -0.1
      },
      "objectRule": {
        "riskPrediction": 0.68,
        "imageControl": 0.52,
        "observerAnalysis": 0.3
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_09",
      "fragment": "frag02",
      "text": "我尝试新东西失败后，更容易被提醒别再乱试。",
      "tags": [
        "试错空间",
        "探索受限"
      ],
      "mbtiRule": {
        "P": 0.24,
        "N": 0.08,
        "J": -0.16
      },
      "objectRule": {
        "riskPrediction": 0.65,
        "imageControl": 0.46,
        "freedomNeed": 0.5,
        "expressiveDrama": -0.18
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_10",
      "fragment": "frag02",
      "text": "重要事情失误时，别人更常关注后果。",
      "tags": [
        "失败后果",
        "结果压力"
      ],
      "mbtiRule": {
        "P": 0.18,
        "J": -0.08
      },
      "objectRule": {
        "riskPrediction": 0.78,
        "imageControl": 0.68,
        "ambition": 0.35,
        "observerAnalysis": 0.18
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_11",
      "fragment": "frag02",
      "text": "升学、兴趣或交友上，家里人的意见常常更有分量。",
      "tags": [
        "选择权",
        "路线安排"
      ],
      "mbtiRule": {
        "P": 0.2,
        "E": 0.06,
        "J": -0.12
      },
      "objectRule": {
        "imageControl": 0.72,
        "riskPrediction": 0.55,
        "freedomNeed": 0.66,
        "expressiveDrama": -0.22
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_12",
      "fragment": "frag02",
      "text": "我做“不标准”的选择时，常常要解释很多。",
      "tags": [
        "选择证明",
        "表达自由"
      ],
      "mbtiRule": {
        "P": 0.18,
        "E": 0.06,
        "J": -0.08
      },
      "objectRule": {
        "freedomNeed": 0.7,
        "imageControl": 0.62,
        "riskPrediction": 0.54,
        "observerAnalysis": 0.28
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_13",
      "fragment": "frag02",
      "text": "我临时改变计划时，容易被认为不靠谱。",
      "tags": [
        "计划规则",
        "稳定期待"
      ],
      "mbtiRule": {
        "P": 0.22,
        "J": -0.18
      },
      "objectRule": {
        "imageControl": 0.62,
        "riskPrediction": 0.48,
        "freedomNeed": 0.45,
        "expressiveDrama": -0.16
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_14",
      "fragment": "frag02",
      "text": "我想尝试新方向时，家里通常能提供支持。",
      "tags": [
        "资源支持",
        "探索机会"
      ],
      "mbtiRule": {
        "P": 0.1,
        "N": 0.1,
        "E": 0.04
      },
      "objectRule": {
        "freedomNeed": 0.46,
        "ambition": 0.42,
        "expressiveDrama": 0.3,
        "riskPrediction": -0.3,
        "imageControl": -0.1
      },
      "polarity": "support"
    },
    {
      "id": "ref_15",
      "fragment": "frag02",
      "text": "我接触新机会时，常常有人带我去看。",
      "tags": [
        "机会来源",
        "支持系统"
      ],
      "mbtiRule": {
        "E": 0.08,
        "N": 0.08
      },
      "objectRule": {
        "ambition": 0.35,
        "freedomNeed": 0.32,
        "riskPrediction": -0.26,
        "observerAnalysis": -0.12
      },
      "polarity": "support"
    },
    {
      "id": "ref_16",
      "fragment": "frag02",
      "text": "我想换一条路时，现实条件不太会立刻卡住我。",
      "tags": [
        "资源密度",
        "选择空间"
      ],
      "mbtiRule": {
        "P": 0.16,
        "E": 0.04,
        "J": -0.08
      },
      "objectRule": {
        "freedomNeed": 0.52,
        "riskPrediction": -0.42,
        "imageControl": -0.28,
        "ambition": 0.25
      },
      "polarity": "support"
    },
    {
      "id": "ref_17",
      "fragment": "frag03",
      "text": "家里或集体气氛变了，我常常很快感觉到。",
      "tags": [
        "关系气氛",
        "情绪雷达"
      ],
      "mbtiRule": {
        "F": 0.18,
        "I": 0.08
      },
      "objectRule": {
        "emotionalSensitivity": 0.82,
        "observerAnalysis": 0.5,
        "relationshipCare": 0.38,
        "riskPrediction": 0.34
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_18",
      "fragment": "frag03",
      "text": "别人情绪不好时，我常常要先调整自己的说法。",
      "tags": [
        "情绪照护",
        "自我调整"
      ],
      "mbtiRule": {
        "F": 0.24,
        "I": 0.12,
        "T": -0.08
      },
      "objectRule": {
        "relationshipCare": 0.78,
        "emotionalSensitivity": 0.7,
        "imageControl": 0.55,
        "riskPrediction": 0.42
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_19",
      "fragment": "frag03",
      "text": "很多冲突里，只要我先让一步，事情就会过去。",
      "tags": [
        "冲突处理",
        "让步经验"
      ],
      "mbtiRule": {
        "F": 0.2,
        "I": 0.1
      },
      "objectRule": {
        "relationshipCare": 0.72,
        "imageControl": 0.5,
        "emotionalSensitivity": 0.42,
        "freedomNeed": -0.18
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_20",
      "fragment": "frag03",
      "text": "热闹场合里，我安静一会儿，气氛就容易掉下来。",
      "tags": [
        "社交适应",
        "气氛维护"
      ],
      "mbtiRule": {
        "I": 0.2,
        "E": -0.12,
        "F": 0.08
      },
      "objectRule": {
        "expressiveDrama": 0.64,
        "relationshipCare": 0.58,
        "imageControl": 0.36,
        "emotionalSensitivity": 0.22
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_21",
      "fragment": "frag03",
      "text": "我的热情很多时候像临时打开的场控模式。",
      "tags": [
        "外放适应",
        "关系角色"
      ],
      "mbtiRule": {
        "I": 0.28,
        "E": -0.18,
        "F": 0.08
      },
      "objectRule": {
        "relationshipCare": 0.62,
        "expressiveDrama": 0.52,
        "imageControl": 0.42,
        "emotionalSensitivity": 0.32
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_22",
      "fragment": "frag03",
      "text": "我在集体里安静下来，别人容易觉得不对劲。",
      "tags": [
        "群体期待",
        "表达压力"
      ],
      "mbtiRule": {
        "I": 0.1,
        "E": 0.06,
        "F": 0.06
      },
      "objectRule": {
        "imageControl": 0.58,
        "riskPrediction": 0.5,
        "expressiveDrama": 0.3,
        "emotionalSensitivity": 0.42
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_23",
      "fragment": "frag03",
      "text": "在朋友或同学关系里，我常常要有用或好玩才更容易被接纳。",
      "tags": [
        "同伴接纳",
        "关系价值"
      ],
      "mbtiRule": {
        "I": 0.18,
        "F": 0.16,
        "E": -0.06
      },
      "objectRule": {
        "relationshipCare": 0.68,
        "expressiveDrama": 0.5,
        "imageControl": 0.52,
        "ambition": 0.18
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_24",
      "fragment": "frag03",
      "text": "朋友或同学闹矛盾时，我常常会被推到中间调和。",
      "tags": [
        "关系调停",
        "情绪照护"
      ],
      "mbtiRule": {
        "F": 0.24,
        "J": 0.06
      },
      "objectRule": {
        "relationshipCare": 0.82,
        "emotionalSensitivity": 0.55,
        "observerAnalysis": 0.35,
        "imageControl": 0.32
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_25",
      "fragment": "frag04",
      "text": "我被老师或权威误会时，家里人更常先让我反思自己。",
      "tags": [
        "权威评价",
        "家庭支持"
      ],
      "mbtiRule": {
        "P": 0.12,
        "E": 0.05,
        "J": -0.05
      },
      "objectRule": {
        "riskPrediction": 0.72,
        "imageControl": 0.62,
        "emotionalSensitivity": 0.5,
        "observerAnalysis": 0.3
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_26",
      "fragment": "frag04",
      "text": "我和朋友闹矛盾时，别人更常劝我别太计较。",
      "tags": [
        "关系委屈",
        "情绪支持"
      ],
      "mbtiRule": {
        "F": 0.18,
        "I": 0.1
      },
      "objectRule": {
        "emotionalSensitivity": 0.62,
        "relationshipCare": 0.38,
        "riskPrediction": 0.45,
        "imageControl": 0.34
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_27",
      "fragment": "frag04",
      "text": "我遇到压力时，别人更常先给方法，而不是先接住情绪。",
      "tags": [
        "压力支持",
        "情绪承接"
      ],
      "mbtiRule": {
        "F": 0.12,
        "I": 0.04
      },
      "objectRule": {
        "riskPrediction": 0.42,
        "imageControl": 0.35,
        "emotionalSensitivity": 0.4,
        "relationshipCare": -0.1
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_28",
      "fragment": "frag04",
      "text": "我很久没拿出结果时，别人更关心进展到哪了。",
      "tags": [
        "结果压力",
        "过程支持"
      ],
      "mbtiRule": {
        "P": 0.14,
        "J": -0.1
      },
      "objectRule": {
        "ambition": 0.55,
        "imageControl": 0.58,
        "riskPrediction": 0.5,
        "emotionalSensitivity": 0.25
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_29",
      "fragment": "frag04",
      "text": "我不积极时，别人更常催我快点恢复状态。",
      "tags": [
        "情绪许可",
        "状态期待"
      ],
      "mbtiRule": {
        "I": 0.12,
        "F": 0.08
      },
      "objectRule": {
        "imageControl": 0.55,
        "emotionalSensitivity": 0.5,
        "riskPrediction": 0.42,
        "expressiveDrama": 0.25
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_30",
      "fragment": "frag04",
      "text": "我表现得懂事稳定时，很多事会顺利很多。",
      "tags": [
        "懂事奖励",
        "关系适应"
      ],
      "mbtiRule": {
        "P": 0.14,
        "E": 0.06,
        "J": -0.08
      },
      "objectRule": {
        "imageControl": 0.78,
        "relationshipCare": 0.62,
        "riskPrediction": 0.42,
        "emotionalSensitivity": 0.3
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_31",
      "fragment": "frag04",
      "text": "我说得太直接后，常常还要负责修补气氛。",
      "tags": [
        "表达后果",
        "关系修补"
      ],
      "mbtiRule": {
        "F": 0.16,
        "I": 0.12,
        "T": -0.08
      },
      "objectRule": {
        "imageControl": 0.72,
        "riskPrediction": 0.6,
        "relationshipCare": 0.46,
        "expressiveDrama": -0.1
      },
      "polarity": "pressure"
    },
    {
      "id": "ref_32",
      "fragment": "frag04",
      "text": "我没按期待行动时，关系里的温度会变得不一样。",
      "tags": [
        "期待落差",
        "关系温度"
      ],
      "mbtiRule": {
        "F": 0.18,
        "I": 0.1,
        "J": 0.04
      },
      "objectRule": {
        "emotionalSensitivity": 0.75,
        "riskPrediction": 0.62,
        "imageControl": 0.55,
        "relationshipCare": 0.32
      },
      "polarity": "pressure"
    }
  ],
  "objects": [
    {
      "name": "马桶圈",
      "emoji": "🚽",
      "mbtiAffinity": {
        "I": 0.35,
        "F": 0.55,
        "J": 0.25
      },
      "traits": {
        "emotionalSensitivity": 62,
        "relationshipCare": 78,
        "riskPrediction": 55,
        "imageControl": 86,
        "ambition": 28,
        "freedomNeed": 25,
        "expressiveDrama": 30,
        "observerAnalysis": 45
      },
      "warm": "你很擅长在别人最不体面、最慌乱的时候，提供一个稳定又不让人难堪的落点。你不是高调的拯救者，却常常让混乱现场重新变得可以面对。只是你也要记得，承接别人的狼狈不代表你永远不能乱，你也可以拥有一个不用随时保持干净的版本。",
      "crazy": "别人最着急、最狼狈、最不想被看见的时候，你负责提供一个干净、稳定、不会让人太难堪的落点。最荒诞的是，事后你还要维持一种“我没事，我很高洁”的表情，像一位在厕所里修行的天使。",
      "ip": "白色圆环小人，头顶光环，拿消毒喷雾。"
    },
    {
      "name": "马桶刷",
      "emoji": "🧽",
      "mbtiAffinity": {
        "S": 0.35,
        "T": 0.2,
        "J": 0.65
      },
      "traits": {
        "emotionalSensitivity": 45,
        "relationshipCare": 62,
        "riskPrediction": 64,
        "imageControl": 82,
        "ambition": 50,
        "freedomNeed": 18,
        "expressiveDrama": 22,
        "observerAnalysis": 48
      },
      "warm": "你有一种很实用的责任感。别人绕开的脏活、残局和麻烦，你往往会先处理起来，让事情恢复到还能继续运行的状态。你的价值不在于漂亮，而在于可靠。只是你也不必永远做那个负责清理现场的人。",
      "crazy": "别人负责优雅离开现场，你负责面对污点、残局和一切不适合发朋友圈的伟大工程。你很少被感谢，因为你的工作一旦成功，就像什么都没发生过。你不是喜欢脏活，只是见不得事情烂在那里。",
      "ip": "长柄刷子小人，戴口罩，手套比身体大。"
    },
    {
      "name": "厕所搋子",
      "emoji": "🪠",
      "mbtiAffinity": {
        "E": 0.25,
        "T": 0.35,
        "J": 0.65
      },
      "traits": {
        "emotionalSensitivity": 38,
        "relationshipCare": 58,
        "riskPrediction": 62,
        "imageControl": 64,
        "ambition": 70,
        "freedomNeed": 20,
        "expressiveDrama": 58,
        "observerAnalysis": 40
      },
      "warm": "你在关键时刻很有效。别人还在尴尬、迟疑、分析原因的时候，你往往先把堵住的地方处理掉。你不一定温柔，但你能让事情重新流动。只是救急不是你的唯一价值，你也可以不用总在事故现场出现。",
      "crazy": "平时没人想起你，一出事全场都在找你。你的人格功能非常粗暴：别分析了，先把堵住的地方搋开。你不一定好看，但关键时刻能救命；你常常被召唤到最尴尬的现场，完成最不能写进简历的壮举。",
      "ip": "红色搋子小人，像消防员一样冲向事故现场。"
    },
    {
      "name": "垃圾袋",
      "emoji": "🗑️",
      "mbtiAffinity": {
        "I": 0.55,
        "N": 0.3,
        "F": 0.45,
        "P": 0.25
      },
      "traits": {
        "emotionalSensitivity": 85,
        "relationshipCare": 56,
        "riskPrediction": 72,
        "imageControl": 78,
        "ambition": 30,
        "freedomNeed": 52,
        "expressiveDrama": 44,
        "observerAnalysis": 60
      },
      "warm": "你很会把混乱先收起来。很多时候，别人还没想好怎么处理情绪、麻烦和尴尬，你已经先把它们放到自己这里，尽量不让场面散开。但能装很多东西不代表你必须一直装下去。你可以被清空，也可以被好好安放。",
      "crazy": "你经常负责把别人没来得及处理的东西先装起来，还要礼貌地打个结。最荒诞的是，里面明明快成灾难现场了，外面还要看起来没漏。你不是生来就该收拾残局，只是太熟悉这种角色：先装起来，别让别人闻到。",
      "ip": "黑色垃圾袋小人，袋口扎蝴蝶结，肚子鼓鼓。"
    },
    {
      "name": "纸巾",
      "emoji": "🧻",
      "mbtiAffinity": {
        "I": 0.25,
        "F": 0.65,
        "J": 0.15
      },
      "traits": {
        "emotionalSensitivity": 72,
        "relationshipCare": 88,
        "riskPrediction": 38,
        "imageControl": 48,
        "ambition": 20,
        "freedomNeed": 25,
        "expressiveDrama": 35,
        "observerAnalysis": 32
      },
      "warm": "你很会给人临时的安慰。别人一乱、一哭、一尴尬，你常常能让场面不再那么难看。你的温柔不是宏大的拯救，而是很及时、很轻、很贴近的照顾。只是一次次被抽走以后，你也需要有人把你展开，而不是让你皱成一团。",
      "crazy": "别人一哭、一乱、一尴尬，就很自然地抽你一张。你负责擦掉现场的水分、眼泪和一些说不清的狼狈。荒诞的是，很少有人问被用过以后你去哪了，你的温柔经常被设计成一次性用品。",
      "ip": "白色纸巾小人，边角皱皱，抱着一滴眼泪。"
    },
    {
      "name": "湿巾",
      "emoji": "🧴",
      "mbtiAffinity": {
        "I": 0.3,
        "F": 0.65,
        "J": 0.35
      },
      "traits": {
        "emotionalSensitivity": 70,
        "relationshipCare": 82,
        "riskPrediction": 48,
        "imageControl": 76,
        "ambition": 25,
        "freedomNeed": 24,
        "expressiveDrama": 28,
        "observerAnalysis": 45
      },
      "warm": "你对关系里的细节很敏感，也很愿意把那些说不清的不舒服慢慢擦干净。你不是小题大做，只是能察觉到很多别人忽略的残留感。你可以继续认真，但不必把每一次尴尬都当成自己需要消毒的责任。",
      "crazy": "随便擦一擦对你来说不够，你还想把看不见的黏腻感都处理掉。别人觉得差不多就行，你却能发现关系里残留的尴尬、空气里的不舒服、话没说干净的地方。擦完别人，自己也快干了。",
      "ip": "湿巾包装小人，手拿喷雾，表情认真过头。"
    },
    {
      "name": "内裤",
      "emoji": "🩲",
      "mbtiAffinity": {
        "I": 0.55,
        "F": 0.35,
        "P": 0.2
      },
      "traits": {
        "emotionalSensitivity": 86,
        "relationshipCare": 38,
        "riskPrediction": 58,
        "imageControl": 80,
        "ambition": 22,
        "freedomNeed": 55,
        "expressiveDrama": 40,
        "observerAnalysis": 52
      },
      "warm": "你有很强的隐私感和边界感。你承载的是最贴身、最不能随便展示的那部分自己：脆弱、羞耻、小小的安全感。你不喜欢被公开讨论，并不代表你不重要；相反，你是一个人能不能体面出门的底层系统。",
      "crazy": "存在感不能太高，但一旦出问题，全人类都会立刻崩溃。你承载的是最贴身、最不能乱给别人看的那部分自己。你不是低调，你是隐私基础设施；没人应该随手把你拿出来开会。",
      "ip": "棉质内裤小人，脸红，举牌写着“别问”。"
    },
    {
      "name": "袜子",
      "emoji": "🧦",
      "mbtiAffinity": {
        "I": 0.45,
        "F": 0.4,
        "P": 0.25
      },
      "traits": {
        "emotionalSensitivity": 72,
        "relationshipCare": 62,
        "riskPrediction": 58,
        "imageControl": 42,
        "ambition": 24,
        "freedomNeed": 72,
        "expressiveDrama": 40,
        "observerAnalysis": 55
      },
      "warm": "你很能陪人走很长的路，也能忍受一些摩擦和不合脚的安排。你不一定总被看见，但你的存在让很多日常变得可继续。即使偶尔只剩自己一只，也不代表你不完整，你只是还在寻找更合脚的地方。",
      "crazy": "天天跟人走最远的路，却很少被认真看见。你能忍受摩擦、汗味和不合脚的人生安排，还要在洗衣机里承担失踪风险。最大的悲剧不是辛苦，而是成双成对出发，最后只剩自己在阳台上假装独立。",
      "ip": "一只孤独袜子小人，脚尖破洞，举着“另一只去哪了”。"
    },
    {
      "name": "拖鞋",
      "emoji": "🩴",
      "mbtiAffinity": {
        "I": 0.2,
        "S": 0.2,
        "F": 0.25,
        "P": 0.55
      },
      "traits": {
        "emotionalSensitivity": 55,
        "relationshipCare": 50,
        "riskPrediction": 25,
        "imageControl": 22,
        "ambition": 18,
        "freedomNeed": 88,
        "expressiveDrama": 48,
        "observerAnalysis": 28
      },
      "warm": "你身上有一种低门槛的松弛感。你不一定适合宏大场面，但很适合在别人疲惫的时候提醒对方：先把外面的盔甲脱掉。你不是不认真，只是你知道人也需要回到一个不用表演的地方。",
      "crazy": "最高理想不是征服世界，而是让人一进门就卸下外面那套人类盔甲。你不适合参加太正式的战争，但很适合在生活最疲惫的时候接住脚。你不上台面，但你让人终于可以不像个人样。",
      "ip": "软塌塌拖鞋小人，走路啪嗒啪嗒。"
    },
    {
      "name": "秋裤",
      "emoji": "🧣",
      "mbtiAffinity": {
        "I": 0.25,
        "S": 0.4,
        "J": 0.45
      },
      "traits": {
        "emotionalSensitivity": 48,
        "relationshipCare": 70,
        "riskPrediction": 66,
        "imageControl": 65,
        "ambition": 35,
        "freedomNeed": 18,
        "expressiveDrama": 18,
        "observerAnalysis": 42
      },
      "warm": "你代表一种不够酷但很有效的保护。你会提前考虑风险、温度和后果，也许不浪漫，但很管用。你不是扫兴，而是知道很多事等到冷了才想起保暖，就已经晚了。",
      "crazy": "年轻人嘴上嫌你土，降温以后身体却很诚实。你的人格美学像一句中年人的预言：现在嫌我烦，等风一吹你就知道谁是真爱。你不浪漫，但你保命。",
      "ip": "棕色秋裤小人，戴保温帽，举温度计。"
    },
    {
      "name": "充电宝",
      "emoji": "🔋",
      "mbtiAffinity": {
        "E": 0.1,
        "F": 0.7,
        "J": 0.3
      },
      "traits": {
        "emotionalSensitivity": 62,
        "relationshipCare": 95,
        "riskPrediction": 42,
        "imageControl": 55,
        "ambition": 35,
        "freedomNeed": 22,
        "expressiveDrama": 42,
        "observerAnalysis": 35
      },
      "warm": "你很会在关键时刻递出一点能量。别人没电的时候想到你，是因为你可靠、及时、愿意兜底。但你也不是无限电源。被需要很重要，被好好充电也同样重要。",
      "crazy": "别人没电时第一个想到你，而你自己只剩 3%。你像一份随叫随充的人生合同，关键时刻总能输出一点能量。但没人会认真研究充电宝的童年，大家只关心你还能不能救急。",
      "ip": "小方块充电宝，电量 3%，仍伸出线。"
    },
    {
      "name": "数据线",
      "emoji": "🔌",
      "mbtiAffinity": {
        "I": 0.2,
        "T": 0.25,
        "J": 0.35
      },
      "traits": {
        "emotionalSensitivity": 45,
        "relationshipCare": 75,
        "riskPrediction": 55,
        "imageControl": 58,
        "ambition": 42,
        "freedomNeed": 30,
        "expressiveDrama": 22,
        "observerAnalysis": 62
      },
      "warm": "你很擅长连接那些本来不太相通的东西。你不一定显眼，但很多顺畅、续命和传递都靠你维持。只是你也会被弯折、缠绕、损耗，不要等到接触不良才承认自己需要被好好放置。",
      "crazy": "负责让两个本来不通的东西勉强连上。你经常被弯折、缠绕、随手塞进包里，直到某天接触不良，别人才发现世界顺畅运行，是因为你一直没断。你普通得像耗材，重要得像命门。",
      "ip": "弯折数据线小人，接口冒火花。"
    },
    {
      "name": "创可贴",
      "emoji": "🩹",
      "mbtiAffinity": {
        "I": 0.2,
        "F": 0.65,
        "J": 0.25
      },
      "traits": {
        "emotionalSensitivity": 70,
        "relationshipCare": 88,
        "riskPrediction": 35,
        "imageControl": 50,
        "ambition": 25,
        "freedomNeed": 18,
        "expressiveDrama": 28,
        "observerAnalysis": 38
      },
      "warm": "你很擅长处理小伤口，也很懂得让别人暂时不那么疼。你的安慰不夸张，却很及时。只是你不需要永远贴在别人的伤口上，伤口会愈合，你也可以慢慢松开。",
      "crazy": "哪里破了就被贴到哪里，像关系里的急诊科耗材。你让伤口暂时不那么难看，也让别人觉得“至少处理过了”。荒诞的是，伤口好了，你还黏在那里，撕下来时甚至比原伤更有存在感。",
      "ip": "创可贴小人，身上贴着更多小创可贴。"
    },
    {
      "name": "胶带",
      "emoji": "🩹",
      "mbtiAffinity": {
        "I": 0.2,
        "S": 0.25,
        "J": 0.55
      },
      "traits": {
        "emotionalSensitivity": 52,
        "relationshipCare": 65,
        "riskPrediction": 60,
        "imageControl": 78,
        "ambition": 40,
        "freedomNeed": 18,
        "expressiveDrama": 20,
        "observerAnalysis": 46
      },
      "warm": "你有很强的修补能力。关系、计划、场面快要散架时，你总能先让它们维持住。你不是逃避问题，只是知道有些东西必须先别碎。只是临时方案不能永远变成你的人格。",
      "crazy": "擅长把已经裂开的东西先粘住，至少让它看起来还能用。你的人生哲学很朴素：别先讨论本质，先别让它散架。胶带贴久了会发黄，临时方案很容易被误认为永久人格。",
      "ip": "透明胶带小人，身体黏住自己一只脚。"
    },
    {
      "name": "拉链",
      "emoji": "🤐",
      "mbtiAffinity": {
        "I": 0.45,
        "J": 0.45
      },
      "traits": {
        "emotionalSensitivity": 60,
        "relationshipCare": 38,
        "riskPrediction": 78,
        "imageControl": 85,
        "ambition": 42,
        "freedomNeed": 45,
        "expressiveDrama": 28,
        "observerAnalysis": 64
      },
      "warm": "你很重视边界和收束。该开到哪里、该合到哪里，你心里有一条很清楚的线。只是当自己卡住时，不必一直硬拉。慢慢松开，也是一种恢复。",
      "crazy": "你负责把东西合上，让外面看起来体面完整。问题是人生经常把你拉到一半就卡住，别人还要怪你“不顺”。你不是难搞，你只是被夹住了。再硬拽下去，坏的不是你，是整件衣服的尊严。",
      "ip": "拉链小人，拉头卡在中间，表情忍耐。"
    },
    {
      "name": "门锁",
      "emoji": "🔒",
      "mbtiAffinity": {
        "I": 0.55,
        "T": 0.2,
        "J": 0.45
      },
      "traits": {
        "emotionalSensitivity": 55,
        "relationshipCare": 28,
        "riskPrediction": 84,
        "imageControl": 80,
        "ambition": 40,
        "freedomNeed": 60,
        "expressiveDrama": 18,
        "observerAnalysis": 75
      },
      "warm": "你很清楚什么可以放进来，什么应该留在外面。你的边界不是冷漠，而是保护自己不被随意进入。只是偶尔也要记得，锁的意义不只是防备，也可以是等待合适的人用合适的方式敲门。",
      "crazy": "你不是高冷，你是门锁。别人乱拧你，你当然打不开。你经常被说难懂、难接近，其实只是很多人没拿对钥匙，还非要怪门不够热情。你的人生安全系统不是摆设，是长期维护过的防盗工程。",
      "ip": "门锁小人，抱着钥匙孔，眼神警惕。"
    },
    {
      "name": "水龙头",
      "emoji": "🚰",
      "mbtiAffinity": {
        "I": 0.2,
        "F": 0.55
      },
      "traits": {
        "emotionalSensitivity": 82,
        "relationshipCare": 70,
        "riskPrediction": 65,
        "imageControl": 48,
        "ambition": 25,
        "freedomNeed": 42,
        "expressiveDrama": 45,
        "observerAnalysis": 54
      },
      "warm": "你对外界靠近和变化很敏感，很容易给出回应。你的情绪不是坏掉了，只是感应系统比较灵。你可以继续保持柔软，但也要允许自己把水关小一点。",
      "crazy": "别人只是路过一下，你就开始流出回应。你不是多管闲事，是感应系统太灵敏。关系里一点靠近、一点冷淡、一点变化，都能让你开始滴滴答答。最离谱的是，有时根本没人洗手，你已经先湿了。",
      "ip": "水龙头小人，鼻尖滴水，慌张看四周。"
    },
    {
      "name": "下水道",
      "emoji": "🕳️",
      "mbtiAffinity": {
        "I": 0.45,
        "T": 0.15,
        "J": 0.25
      },
      "traits": {
        "emotionalSensitivity": 76,
        "relationshipCare": 38,
        "riskPrediction": 86,
        "imageControl": 70,
        "ambition": 24,
        "freedomNeed": 40,
        "expressiveDrama": 20,
        "observerAnalysis": 68
      },
      "warm": "你很能承接那些别人不愿意看见的东西，也很擅长把表面的混乱往深处处理。只是承接太多以后，也会堵住。你不必永远保持畅通，偶尔需要被疏通，也不是丢脸。",
      "crazy": "所有人都希望你安静运行，最好把乱七八糟的东西吞下去，还不要有味道。你长期处理别人看不见也不想看的部分，直到某天堵住了，大家才突然意识到：原来文明社会靠你在地下硬撑。",
      "ip": "圆形下水道小人，盖子半开，冒出问号。"
    },
    {
      "name": "打印机",
      "emoji": "🖨️",
      "mbtiAffinity": {
        "I": 0.25,
        "T": 0.35,
        "J": 0.55
      },
      "traits": {
        "emotionalSensitivity": 58,
        "relationshipCare": 32,
        "riskPrediction": 75,
        "imageControl": 88,
        "ambition": 58,
        "freedomNeed": 22,
        "expressiveDrama": 18,
        "observerAnalysis": 70
      },
      "warm": "你对输出质量有要求，也很怕在关键时刻出错。你不是效率低，而是太想把东西完整、清楚、体面地交出去。卡住的时候，不代表你坏了，也许只是纸路需要重新整理。",
      "crazy": "你平时看起来像办公室文明的象征，关键时刻却能卡出整个部门的精神危机。你不是不想输出，是纸歪了、格式乱了、任务太多了。别人只看到你没打印出来，却没人看见你内部已经全是错误提示。",
      "ip": "打印机小人，嘴里吐出皱纸，屏幕显示 ERROR。"
    },
    {
      "name": "路由器",
      "emoji": "📡",
      "mbtiAffinity": {
        "I": 0.25,
        "N": 0.35,
        "T": 0.45,
        "P": 0.15
      },
      "traits": {
        "emotionalSensitivity": 62,
        "relationshipCare": 30,
        "riskPrediction": 78,
        "imageControl": 45,
        "ambition": 38,
        "freedomNeed": 68,
        "expressiveDrama": 28,
        "observerAnalysis": 82
      },
      "warm": "你很在意连接是否顺畅，也很容易感知到关系里的延迟和断线。你不是冷漠，只是有时需要重启，才能重新把信号发出去。断连不代表失败，可能只是过载后的自我保护。",
      "crazy": "大家只有在没网的时候才想起你。平时你默默发信号，没人感谢；一旦断线，全屋人类开始围着你献祭。你不是情绪不稳定，你是长期承担隐形连接工作，偶尔需要拔电源重启一下。",
      "ip": "路由器小人，头顶天线，信号格忽明忽暗。"
    },
    {
      "name": "微波炉",
      "emoji": "♨️",
      "mbtiAffinity": {
        "E": 0.05,
        "T": 0.25,
        "J": 0.6
      },
      "traits": {
        "emotionalSensitivity": 55,
        "relationshipCare": 35,
        "riskPrediction": 82,
        "imageControl": 72,
        "ambition": 68,
        "freedomNeed": 25,
        "expressiveDrama": 35,
        "observerAnalysis": 60
      },
      "warm": "你需要看见进度，才能把焦虑安放下来。你不是急躁，只是对不确定太敏感。给你一个倒计时、一个过程、一个明确的“叮”，你就能安心很多。",
      "crazy": "你很难让事情自然发生，必须盯着它还剩几分钟。没有进度条的人生会让你自动加热焦虑。你不是急躁，你只是希望宇宙至少像微波炉一样，给个倒计时，最后叮一声告诉你：可以取出来了。",
      "ip": "微波炉小人，肚子里转着饭团，倒计时 03:00。"
    },
    {
      "name": "排队小票",
      "emoji": "🎫",
      "mbtiAffinity": {
        "I": 0.35,
        "J": 0.35
      },
      "traits": {
        "emotionalSensitivity": 62,
        "relationshipCare": 28,
        "riskPrediction": 82,
        "imageControl": 55,
        "ambition": 38,
        "freedomNeed": 35,
        "expressiveDrama": 18,
        "observerAnalysis": 70
      },
      "warm": "你很能等待，也很习惯在秩序里找到位置。你不一定喜欢这个系统，但你知道怎么让自己不失控。只是你的人生不必永远等别人叫号，你也可以主动走向柜台。",
      "crazy": "命运给你吐了一张号码纸，你只好拿着它等。你不一定认同这个系统，但你很会遵守流程。你的焦虑不是大喊大叫，而是盯着电子屏幕，看自己到底什么时候被叫到。",
      "ip": "小票小人，号码 99，坐在椅子上盯屏幕。"
    },
    {
      "name": "快递盒",
      "emoji": "📦",
      "mbtiAffinity": {
        "I": 0.25,
        "N": 0.35,
        "P": 0.25
      },
      "traits": {
        "emotionalSensitivity": 70,
        "relationshipCare": 35,
        "riskPrediction": 76,
        "imageControl": 48,
        "ambition": 45,
        "freedomNeed": 62,
        "expressiveDrama": 50,
        "observerAnalysis": 68
      },
      "warm": "你对未知有很多预演，也对结果怀有期待。还没打开之前，你已经想过很多种可能。你的想象力让等待不那么空白，但也会让你提前消耗。你可以慢慢拆，不必急着把所有结果一次性确认。",
      "crazy": "东西还没出现，你已经在脑子里预演了满意、失望、退货和惊喜。你很会等待，但等待时并不平静。结果到来之前，想象已经先拆了一遍，甚至把售后流程也走完了。",
      "ip": "纸箱小人，胶带没拆，里面冒出各种问号。"
    },
    {
      "name": "保鲜膜",
      "emoji": "🫙",
      "mbtiAffinity": {
        "I": 0.35,
        "S": 0.25,
        "J": 0.35
      },
      "traits": {
        "emotionalSensitivity": 60,
        "relationshipCare": 62,
        "riskPrediction": 58,
        "imageControl": 80,
        "ambition": 28,
        "freedomNeed": 25,
        "expressiveDrama": 22,
        "observerAnalysis": 46
      },
      "warm": "你很擅长把事情先保存起来，让它们不至于立刻坏掉。你对关系和情绪都有一种延缓腐烂的本能。只是保存不等于解决，有些东西放太久，也需要被打开、被看见。",
      "crazy": "你的人生技能是把一切先裹起来：尴尬裹起来，情绪裹起来，没说完的话也裹起来。外面看着干净透明，里面其实已经开始串味。你不是虚伪，你只是太擅长延长保质期。",
      "ip": "透明保鲜膜小人，把自己缠成一圈。"
    },
    {
      "name": "门把手",
      "emoji": "🚪",
      "mbtiAffinity": {
        "I": 0.2,
        "F": 0.55,
        "J": 0.25
      },
      "traits": {
        "emotionalSensitivity": 66,
        "relationshipCare": 80,
        "riskPrediction": 54,
        "imageControl": 65,
        "ambition": 22,
        "freedomNeed": 28,
        "expressiveDrama": 26,
        "observerAnalysis": 52
      },
      "warm": "你经常成为别人进入某个空间前必须经过的位置。你连接外面和里面，也承接很多手心里的犹豫、急躁和期待。你可以继续温和地打开一些门，但不必允许所有人都随便触碰你。",
      "crazy": "每个人经过时都要碰你一下，留下情绪、请求、麻烦和一句“顺手帮我”。你不是没有边界，只是边界长得太像公共设施。别人摸完就走，你还得继续保持正常开合。",
      "ip": "门把手小人，戴白手套，脸上写着“请轻一点”。"
    },
    {
      "name": "门垫",
      "emoji": "🦶",
      "mbtiAffinity": {
        "I": 0.25,
        "F": 0.45,
        "J": 0.3
      },
      "traits": {
        "emotionalSensitivity": 58,
        "relationshipCare": 84,
        "riskPrediction": 48,
        "imageControl": 70,
        "ambition": 18,
        "freedomNeed": 18,
        "expressiveDrama": 20,
        "observerAnalysis": 36
      },
      "warm": "你很擅长让别人进入一个地方之前先缓一缓。你接住外面的灰尘和脚步，也帮空间保持一点体面。只是你不必永远被踩在入口处，你也可以被认真拍一拍、晒一晒。",
      "crazy": "所有人都从你身上经过，还希望你负责把外面的脏东西留在门口。你像关系里的入场缓冲区：别人踩一脚就轻松了，你留下满身灰尘还要写着“欢迎光临”。",
      "ip": "门垫小人，身上写 Welcome，表情很疲惫。"
    },
    {
      "name": "楼道声控灯",
      "emoji": "💡",
      "mbtiAffinity": {
        "I": 0.35,
        "F": 0.25,
        "J": 0.15
      },
      "traits": {
        "emotionalSensitivity": 78,
        "relationshipCare": 50,
        "riskPrediction": 60,
        "imageControl": 42,
        "ambition": 20,
        "freedomNeed": 48,
        "expressiveDrama": 55,
        "observerAnalysis": 55
      },
      "warm": "你对外界的声音很敏感，也很容易因为一点动静就亮起来。你的回应不是多余，而是你在努力让黑暗里的人不那么慌。只是你也需要安静地暗一会儿，不必每次有人经过都立刻发光。",
      "crazy": "别人咳一声你就亮，电梯响一下你也亮。你不是戏多，是感应系统太灵。你的人格像楼道声控灯：平时没人注意，大家一害怕黑，就开始期待你自动发光。",
      "ip": "声控灯小人，听到脚步就啪地亮眼睛。"
    },
    {
      "name": "一次性纸杯",
      "emoji": "🥤",
      "mbtiAffinity": {
        "E": 0.35,
        "F": 0.3,
        "P": 0.35
      },
      "traits": {
        "emotionalSensitivity": 66,
        "relationshipCare": 58,
        "riskPrediction": 34,
        "imageControl": 34,
        "ambition": 22,
        "freedomNeed": 65,
        "expressiveDrama": 82,
        "observerAnalysis": 32
      },
      "warm": "你很适合短暂而真诚的相遇。你不一定要成为谁生命里永久的容器，但你能在热闹、聚会和某个临时场合里，让别人感到被接住。只是你也不必因为自己轻便，就允许别人用完就丢。",
      "crazy": "你经常出现在热闹场合，承接可乐、啤酒、眼泪和一些三分钟友谊。你很轻，很方便，很好用，也因此容易被用完就放在桌角。你不是廉价，你只是太擅长临时陪伴。",
      "ip": "纸杯小人，杯身被捏皱，仍举着小吸管。"
    },
    {
      "name": "烟灰缸",
      "emoji": "🚬",
      "mbtiAffinity": {
        "I": 0.35,
        "T": 0.25,
        "N": 0.2
      },
      "traits": {
        "emotionalSensitivity": 64,
        "relationshipCare": 28,
        "riskPrediction": 62,
        "imageControl": 55,
        "ambition": 30,
        "freedomNeed": 50,
        "expressiveDrama": 35,
        "observerAnalysis": 78
      },
      "warm": "你能承接一些不太好看、不太健康、但真实存在的情绪残留。你不急着评判，也不急着美化。你只是让那些烧过的东西有地方落下。只是你也不该永远吸收别人的灰。",
      "crazy": "你负责承接别人燃烧完以后留下的东西：灰、味道、沉默和一些说完就后悔的话。你不一定干净，但很诚实。别人抽完就走，你留在桌上，像一座微型情绪坟场。",
      "ip": "烟灰缸小人，头顶一缕烟，表情冷淡。"
    },
    {
      "name": "外卖塑料勺",
      "emoji": "🥄",
      "mbtiAffinity": {
        "I": 0.2,
        "S": 0.25,
        "P": 0.35
      },
      "traits": {
        "emotionalSensitivity": 48,
        "relationshipCare": 58,
        "riskPrediction": 30,
        "imageControl": 30,
        "ambition": 18,
        "freedomNeed": 62,
        "expressiveDrama": 44,
        "observerAnalysis": 28
      },
      "warm": "你很朴素，也很及时。你不一定是最精致的工具，但在别人饿着、乱着、急着的时候，你能让事情先运转起来。你的价值不在于长期被收藏，而在于关键时刻真的能用。",
      "crazy": "你经常和外卖袋一起出现，命运非常塑料，但很实用。别人不会把你洗干净供起来，却会在最饿的时候疯狂找你。你不是高级餐具，你是“先活下来再说”的文明火种。",
      "ip": "白色塑料勺小人，弯了一点，戴外卖袋帽子。"
    }
  ],
  "scripts": [
    {
      "id": "rich",
      "name": "首富的孩子",
      "desc": "资源多到溢出来，但每次失败都像财报暴雷。",
      "story": "如果把你的初始化设定丢进这个剧本，人生会先变得很宽，再变得很窄。你会拥有很多选择，但也更难判断哪一次努力真正属于自己。系统暂时保留剧本功能，后续再深挖。"
    },
    {
      "id": "star",
      "name": "顶流巨星家的小孩",
      "desc": "从小被看见，但不一定被理解。",
      "story": "你会很早学会镜头前的体面和镜头后的疲惫。外界以为你拥有光环，系统却会检测你是否还有一个能自由发疯的私人角落。"
    },
    {
      "id": "oldmoney",
      "name": "神秘老钱家族继承人",
      "desc": "体面是一门课，逃跑是一种天赋。",
      "story": "这个剧本会把你的体面控制拉满，也会让你更想知道：除了被训练得很好看，你到底还想成为谁。"
    },
    {
      "id": "coast",
      "name": "海边小镇野生长大的小孩",
      "desc": "风很大，规则很少，人生靠自己摸索。",
      "story": "在这个剧本里，你可能变得更自由，也更晚学会给自己搭结构。好处是灵魂不太容易被写死，坏处是路要自己踩出来。"
    },
    {
      "id": "worker",
      "name": "全家都是卷王的天选打工圣体",
      "desc": "从小就被安装了进度条和自我鞭策插件。",
      "story": "这个剧本会放大你的结果压力，但也可能训练出很强的执行力。系统会把它作为后续版本重点优化。"
    },
    {
      "id": "relative",
      "name": "被亲戚轮流带大的江湖型小孩",
      "desc": "走到哪都能活，但不一定哪里都能安心。",
      "story": "你会很早学会看人、看场、看饭桌上的风向。这个剧本会提升你的适应力，也会让“归属感”变得很难直接获得。"
    }
  ],
  "traits": [
    "emotionalSensitivity",
    "relationshipCare",
    "riskPrediction",
    "imageControl",
    "ambition",
    "freedomNeed",
    "expressiveDrama",
    "observerAnalysis"
  ]
};

const SCALE = [
  {v:1,label:'非常不同意'}, {v:2,label:'不同意'}, {v:3,label:'有点不同意'}, {v:4,label:'不确定'}, {v:5,label:'有点同意'}, {v:6,label:'同意'}, {v:7,label:'非常同意'}
];
const AXES = [ ['E','I','外向','内向'], ['S','N','实感','直觉'], ['T','F','思考','情感'], ['J','P','判断','知觉'] ];
const PAIRS = [['E','I'],['S','N'],['T','F'],['J','P']];
const state = {
  screen:'welcome',
  mbti:{E:65,I:35,S:35,N:65,T:35,F:65,J:35,P:65},
  selected:{EI:'E',SN:'N',TF:'F',JP:'P'},
  strengths:{EI:65,SN:65,TF:65,JP:65},
  currentAnswers:{},
  refAnswers:{},
  times:{},
  qStart:Date.now(),
  qIndex:0,
  fragmentIndex:0,
  mode:'warm',
  scriptId:null,
  result:null
};
const app = document.getElementById('app');
function clamp(n,min=0,max=100){return Math.max(min,Math.min(max,n));}
function signed(v){return (Number(v)-4)/3;}
function pairKey(a,b){return (a==='E'||a==='I')?'EI':(a==='S'||a==='N')?'SN':(a==='T'||a==='F')?'TF':'JP';}
function normalizePairs(scores){
  const out = {...scores};
  for(const [a,b] of PAIRS){
    const total = Math.max(1,out[a]+out[b]);
    out[a]=clamp(out[a]/total*100,3,97);
    out[b]=100-out[a];
  }
  return out;
}
function applyMbti(scores, rule, value, scale=15){
  const out = {...scores};
  const s = signed(value);
  for(const [k,w] of Object.entries(rule||{})) out[k] = clamp((out[k]||50) + w*s*scale, 3, 97);
  return normalizePairs(out);
}
function mbtiType(scores){return PAIRS.map(([a,b])=>scores[a]>=scores[b]?a:b).join('');}
function setAxis(pair, letter, strength){
  const [a,b]= pair==='EI'?['E','I']:pair==='SN'?['S','N']:pair==='TF'?['T','F']:['J','P'];
  state.selected[pair]=letter; state.strengths[pair]=strength;
  state.mbti[a]= letter===a ? strength : 100-strength;
  state.mbti[b]= letter===b ? strength : 100-strength;
  render();
}
function setScreen(screen){state.screen=screen; state.qStart=Date.now(); render(); window.scrollTo(0,0);}
function answerCurrent(id,val){state.times[id]=Date.now()-state.qStart; state.currentAnswers[id]=val; state.qStart=Date.now(); render();}
function answerRef(id,val){state.times[id]=Date.now()-state.qStart; state.refAnswers[id]=val; state.qStart=Date.now(); render();}
function nextQ(){state.qIndex++; state.qStart=Date.now(); render(); window.scrollTo(0,0);}
function prevQ(){state.qIndex=Math.max(0,state.qIndex-1); state.qStart=Date.now(); render(); window.scrollTo(0,0);}
function startFragment(i){state.fragmentIndex=i; state.qIndex=0; setScreen('refQuestions');}
function finishFragment(){setScreen('fragmentDone');}
function allCurrentDone(){return DATA.currentQuestions.every(q=>state.currentAnswers[q.id]);}
function allRefDone(){return DATA.refQuestions.every(q=>state.refAnswers[q.id]);}
function computeResult(){
  let current = normalizePairs({...state.mbti});
  const trait = Object.fromEntries(DATA.traits.map(t=>[t,50]));
  for(const q of DATA.currentQuestions){
    const val = state.currentAnswers[q.id] || 4;
    current = applyMbti(current,q.mbtiRule,val,16);
    const s=signed(val);
    for(const [k,w] of Object.entries(q.objectRule||{})) trait[k]=clamp(trait[k]+w*s*18,0,100);
  }
  let init = {...current};
  const evidence = {};
  const retainEvidence = {};
  for(const q of DATA.refQuestions){
    const val = state.refAnswers[q.id] || 4;
    init = applyMbti(init,q.mbtiRule,val,18);
    const s=signed(val);
    for(const [k,w] of Object.entries(q.objectRule||{})) trait[k]=clamp(trait[k]+w*s*16,0,100);
    const mag = Math.abs(s);
    if(q.polarity==='support'){
      if(s>=0){ for(const tag of q.tags) retainEvidence[tag]=(retainEvidence[tag]||0)+mag; }
      else { for(const tag of q.tags) evidence[tag]=(evidence[tag]||0)+mag*1.1; }
    }else{
      if(s>=0){ for(const tag of q.tags) evidence[tag]=(evidence[tag]||0)+mag; }
      else { for(const tag of q.tags) retainEvidence[tag]=(retainEvidence[tag]||0)+mag*.7; }
    }
  }
  const object = matchObject(trait, init);
  const deletion = buildDeletionList(evidence);
  const retained = buildRetainList(init, trait, retainEvidence);
  const neutralCount = [...Object.values(state.currentAnswers),...Object.values(state.refAnswers)].filter(v=>Number(v)===4).length;
  const totalCount = DATA.currentQuestions.length + DATA.refQuestions.length;
  const neutralRatio = neutralCount/totalCount;
  const confidence = neutralRatio>.55?'低':neutralRatio>.32?'中':'高';
  const result = {inputMbti:mbtiType(state.mbti), currentMbti:mbtiType(current), initMbti:mbtiType(init), currentScores:current, initScores:init, traitScores:trait, object, deletion, retained, confidence, neutralRatio};
  state.result=result; return result;
}
function matchObject(trait, mbtiScores){
  let best=null, bestScore=-Infinity;
  const type=mbtiType(mbtiScores);
  for(const obj of DATA.objects){
    let dist=0;
    for(const t of DATA.traits){dist += Math.pow((trait[t]||50)-(obj.traits[t]||50),2);}
    let score = -Math.sqrt(dist);
    for(const [letter,weight] of Object.entries(obj.mbtiAffinity||{})) score += ((mbtiScores[letter]||50)-50)/50 * weight * 18;
    if(score>bestScore){bestScore=score; best=obj;}
  }
  return {...best, matchScore:Math.round(bestScore)};
}
const tagMap = {
  '表达审查':['表达审查残留','说一句真话前，系统会自动弹出风险提示。'],
  '表达后果':['表达后果预演','还没开口，你已经先把后续修补流程跑了一遍。'],
  '关系气氛':['关系温度监控','房间里的空气一变，你的雷达就开始上班。'],
  '控制反馈':['听话缓存','有些自由不是没有，只是曾经被要求先排队。'],
  '日常规训':['小题大做警报','一点点小错也可能被系统升级成重大事故。'],
  '重要节点':['关键节点红色警报','越重要的时候，越容易把小错看成命运塌方。'],
  '评价压力':['评价压力残留','结果不只是结果，还会被拿来重新定义你这个人。'],
  '失败反馈':['失败反馈残留','你不是怕失败，是太熟悉失败后的连坐反应。'],
  '人格化评价':['人格审判缓存','事情没做好时，问题容易被上升到“你这个人”。'],
  '自我价值':['自我价值扣分器','表现波动时，你会先担心自己整个人被扣分。'],
  '评价记忆':['坏表现回放机','好像做得好是应该，做不好会被反复播放。'],
  '自我要求':['自我要求残留','你脑内住着一个不打卡不下班的质检员。'],
  '复盘缺口':['复盘缺口','比起理解原因，你更常先记住“下次不许”。'],
  '试错空间':['试错惩罚残留','探索失败后，系统容易提示“别再乱试”。'],
  '探索受限':['探索受限','想往外走之前，先被现实拽了一下裤脚。'],
  '失败后果':['后果放大器','失误还没结束，后果已经开始扩音。'],
  '结果压力':['结果压力插件','没产出时，进度条比你本人更受关注。'],
  '选择权':['选择权残留','做决定时，你的真实想法不一定拥有最高投票权。'],
  '路线安排':['路线安排缓存','人生路线有时像被别人先画过草图。'],
  '选择证明':['自证清白流程','选一条不标准的路，还要证明自己不是冲动。'],
  '表达自由':['表达自由残留','自由不是没有，但常常需要提交说明材料。'],
  '计划规则':['计划规则残留','临时改变计划时，容易被系统判定为不靠谱。'],
  '稳定期待':['稳定期待','别人更喜欢你按他们熟悉的方式稳定运行。'],
  '资源支持':['资源断电残留','想试新方向时，支持系统不一定随叫随到。'],
  '探索机会':['机会缺口','有些机会不是你不想要，而是入口不在你手边。'],
  '机会来源':['机会入口残留','别人有人带路时，你可能还在研究门在哪里。'],
  '支持系统':['支持系统残留','你不是不会求助，只是不总能确认谁真的能接住。'],
  '资源密度':['现实条件卡顿','想换一条路时，现实条件可能先按下暂停。'],
  '选择空间':['选择空间残留','退路不够明显的时候，人很难真的松弛。'],
  '情绪雷达':['情绪雷达过早安装','别人还没说出口的情绪，你的后台已经收到通知。'],
  '情绪照护':['情绪照护插件','别人情绪一变，你很容易先调整自己。'],
  '自我调整':['自我调整缓存','你太熟悉先改自己，来让场面继续。'],
  '冲突处理':['冲突处理补丁','很多冲突里，你先让一步，系统就显示“已解决”。'],
  '让步经验':['让步经验','你不是天生好说话，是让步经常真的有用。'],
  '社交适应':['社交适应插件','热情有时不是默认设置，而是临时场控模式。'],
  '气氛维护':['气氛维护残留','你安静几分钟，场面就像没人续费。'],
  '外放适应':['外放适应','你的外向里可能有一部分是为了让场面活下去。'],
  '关系角色':['关系角色缓存','你很容易被安排成“那个会处理气氛的人”。'],
  '群体期待':['群体期待','你一安静，别人就开始检查你是不是坏了。'],
  '表达压力':['表达压力','表达不是问题，表达之后的连锁反应才是。'],
  '同伴接纳':['同伴接纳缓存','有用、好玩、会照顾场面，曾经是入场券。'],
  '关系价值':['关系价值残留','你可能太早把“被喜欢”和“有用”绑在一起。'],
  '关系调停':['关系调停插件','别人吵架，你像系统自动弹出的调解窗口。'],
  '权威评价':['权威误判缓存','被误会时，你更习惯先检查自己哪里不对。'],
  '家庭支持':['家庭支持缺口','有些时候，你需要的不是反思，是先被听完。'],
  '关系委屈':['委屈压缩包','很多委屈被打包成“别太计较”。'],
  '情绪支持':['情绪承接缺口','你收到过很多方法，但不总是收到怀抱。'],
  '压力支持':['工具性支持残留','别人给你方案，但不一定先问你还能不能撑。'],
  '情绪承接':['情绪无人接住','你的情绪有时像快递，到了但没人签收。'],
  '过程支持':['过程支持缺口','别人问进展到哪了，却很少问你卡在哪里。'],
  '情绪许可':['情绪许可残留','你不积极的时候，系统会催你尽快恢复正常。'],
  '状态期待':['状态期待','别人习惯你稳定，于是你的低落也要申请。'],
  '懂事奖励':['被动懂事补丁','表现懂事稳定时，世界确实会对你更顺一点。'],
  '关系适应':['关系适应缓存','你太熟悉把自己调成别人舒服的模式。'],
  '关系修补':['关系修补插件','说得太直接后，你还要负责把空气缝回去。'],
  '期待落差':['期待落差残留','你没按期待行动时，关系温度会立刻变天。'],
  '关系温度':['关系温度监控','你不是敏感，是温度计被装得太早。']
};
function buildDeletionList(scores){
  const items = Object.entries(scores).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([tag,score],idx)=>{
    const mapped=tagMap[tag]||[tag,'这条旧反馈在你的回答里反复出现。'];
    return {tag, title:mapped[0], desc:mapped[1], percent:Math.round(Math.min(78,Math.max(18,28+score*18)))};
  });
  return items.length?items:[{tag:'信息不足',title:'时间回溯不完全',desc:'线索偏少，系统只能给出一个保守版本。',percent:20}];
}
function buildRetainList(mbti, traits, retainEvidence){
  const candidates=[];
  const type=mbtiType(mbti);
  if(type.includes('I')) candidates.push(['独处恢复','你需要一点不被催促的空间。']);
  if(type.includes('E')) candidates.push(['热场能力','你能让场面重新有电。']);
  if(type.includes('N')) candidates.push(['想象力','你会先看见事情的可能版本。']);
  if(type.includes('S')) candidates.push(['现实触感','你知道事情最后要落到地面。']);
  if(type.includes('F')) candidates.push(['情绪感知','你很容易听见话外的温度。']);
  if(type.includes('T')) candidates.push(['结构判断','你能把混乱先拆成逻辑。']);
  if(type.includes('J')) candidates.push(['秩序感','你会试图让事情有边界。']);
  if(type.includes('P')) candidates.push(['退路需求','你不喜欢把人生写死。']);
  const traitLabels={emotionalSensitivity:['情绪雷达','你能捕捉到很细的变化。'],relationshipCare:['关系直觉','你知道关系里的空气怎么流动。'],riskPrediction:['提前预警','坏天气还没来，你已经听见风声。'],imageControl:['体面感','你很会让混乱先保持形状。'],ambition:['暗处野心','你不一定高调，但不代表没在用力。'],freedomNeed:['轻微逃跑冲动','你需要确认出口还在。'],expressiveDrama:['表达火花','你身体里有一些没被熄灭的戏剧感。'],observerAnalysis:['旁观分析','你很会站远一点看清楚局面。']};
  for(const [k,v] of Object.entries(traits).sort((a,b)=>b[1]-a[1]).slice(0,5)) candidates.push(traitLabels[k]);
  for(const [k,v] of Object.entries(retainEvidence).sort((a,b)=>b[1]-a[1]).slice(0,2)) candidates.push([k, '这部分支持性线索仍然被系统保留下来。']);
  const seen=new Set();
  return candidates.filter(Boolean).filter(x=>!seen.has(x[0]) && seen.add(x[0])).slice(0,4).map(([title,desc])=>({title,desc}));
}
function axisPercentHTML(scores){
  return PAIRS.map(([a,b])=>{
    const win=scores[a]>=scores[b]?a:b, pct=Math.round(Math.max(scores[a],scores[b]));
    return `<div class="pill-card"><strong>${win} ${pct}%</strong><span>${a}/${b}</span><div class="percent"><i style="width:${pct}%"></i></div></div>`;
  }).join('');
}
function render(){
  if(state.screen==='welcome') return renderWelcome();
  if(state.screen==='mbti') return renderMbti();
  if(state.screen==='current') return renderQuestions('current');
  if(state.screen==='fragmentIntro') return renderFragmentIntro();
  if(state.screen==='refQuestions') return renderQuestions('ref');
  if(state.screen==='fragmentDone') return renderFragmentDone();
  if(state.screen==='loading') return renderLoading();
  if(state.screen==='result') return renderResult();
}
function layout(main, side=''){
  app.innerHTML = `<div class="topbar"><div class="brand">返老还童 <span class="note">我们都一样 · v3.4</span></div><div class="note">娱乐型反事实人生生成器</div></div><div class="shell"><section>${main}</section><aside>${side||renderSide()}</aside></div>`;
}
function renderSide(){
  const steps=['现在的你','当前确认','删除日志','初始化报告','平行剧本'];
  const map={mbti:0,current:1,fragmentIntro:2,refQuestions:2,fragmentDone:2,loading:3,result:3};
  const current=map[state.screen]??0;
  return `<div class="side-card"><h3>系统流程</h3><div class="mini-list">${steps.map((s,i)=>`<div class="mini-item ${i===current?'active':''}">${String(i+1).padStart(2,'0')} · ${s}</div>`).join('')}</div><div class="privacy">本版本默认不上传任何数据。导出 JSON 只会保存选项、用时与结果，不包含姓名、联系方式或定位。部署平台可能有自己的访问日志，请在正式公开前补充隐私说明。</div></div>`;
}
function renderWelcome(){
  app.innerHTML = `<section class="hero"><div class="kicker"><span class="logo-dot"></span>v3.4 初始化设定反推报告</div><h1>时间正在回溯。</h1><p class="subtitle">这不是审判你，也不是给你贴标签。系统会读取一些旧场景，看看哪些反馈曾经把你推向现在的样子。你给我现在的你，我还你 <b>0 岁的你</b>。</p><div class="warn">请根据直觉选择。不用答得很完美，也不用解释给谁听。这一次，你只需要告诉系统：这些旧情绪在你身上还剩多少。</div><div class="actions"><button class="btn" onclick="setScreen('mbti')">开始回溯</button><button class="btn secondary" onclick="alert('当前版本为静态网页，适合直接上传 GitHub Pages / Vercel / Netlify。')">部署说明</button></div></section>`;
}
function renderMbti(){
  const main = `<div class="panel"><h2 class="panel-title">先确认现在的你</h2><p class="panel-desc">这里不是重新测试 MBTI，只是让系统知道你现在给出的自己。后面会根据旧反馈反推“初始化设定”。</p><div class="grid">${AXES.map(([a,b,an,bn])=>renderAxis(a,b,an,bn)).join('')}</div><div class="actions"><button class="btn" onclick="setScreen('current')">继续：当前确认</button></div></div>`;
  layout(main);
}
function renderAxis(a,b,an,bn){
  const pk=pairKey(a,b), selected=state.selected[pk], strength=state.strengths[pk];
  return `<div class="axis-card"><div class="axis-title">${a}/${b}</div><div class="letter-row"><button class="letter-btn ${selected===a?'active':''}" onclick="setAxis('${pk}','${a}',${strength})">${a} · ${an}</button><button class="letter-btn ${selected===b?'active':''}" onclick="setAxis('${pk}','${b}',${strength})">${b} · ${bn}</button></div><div class="scale-row">${[55,65,80].map(v=>`<button class="scale-btn ${strength===v?'active':''}" onclick="setAxis('${pk}','${selected}',${v})">${v===55?'稍微':v===65?'明显':'非常'}</button>`).join('')}</div><div class="range-row"><input type="range" min="50" max="95" value="${strength}" oninput="setAxis('${pk}','${selected}',Number(this.value))"><div class="axis-preview"><span>${selected} ${strength}%</span><span>${selected===a?b:a} ${100-strength}%</span></div></div></div>`;
}
function renderQuestions(kind){
  let questions, idx, q, total, val, progress, title;
  if(kind==='current'){
    questions=DATA.currentQuestions; idx=state.qIndex; q=questions[idx]; total=questions.length; val=state.currentAnswers[q.id]; title='当前确认题';
  }else{
    const frag=DATA.fragments[state.fragmentIndex]; questions=DATA.refQuestions.filter(x=>x.fragment===frag.id); idx=state.qIndex; q=questions[idx]; total=questions.length; val=state.refAnswers[q.id]; title=`${frag.title} · 删除日志`;
  }
  progress = Math.round((idx)/(total)*100);
  const main = `<div class="panel"><div class="progress-wrap"><div class="progress-bar" style="width:${progress}%"></div></div></div><div class="question-card"><div class="q-meta"><span>${title}</span><span>${idx+1}/${total}</span></div><h2 class="q-text">${q.text}</h2><div class="options">${SCALE.map(o=>`<button class="opt ${Number(val)===o.v?'active':''}" onclick="${kind==='current'?'answerCurrent':'answerRef'}('${q.id}',${o.v})">${o.label}</button>`).join('')}</div><div class="question-nav"><button class="btn ghost" onclick="${idx===0? (kind==='current'?`setScreen('mbti')`:`setScreen('fragmentIntro')`) : `prevQ()`}">上一步</button>${val?`<button class="btn" onclick="${idx===total-1? (kind==='current'?`state.qIndex=0;setScreen('fragmentIntro')`:`finishFragment()`) : `nextQ()`}">${idx===total-1?'完成本段':'下一题'}</button>`:`<button class="btn" disabled>先选择</button>`}</div></div>`;
  layout(main);
}
function renderFragmentIntro(){
  const frag=DATA.fragments[state.fragmentIndex] || DATA.fragments[0];
  const main=`<div class="transition"><div class="panel"><div class="kicker"><span class="logo-dot"></span>${frag.title}</div><h2>${frag.start}</h2><p>${frag.startDesc}</p><div class="humanline">时间正在回溯，本段旧反馈等待读取。</div><div class="actions"><button class="btn" onclick="startFragment(${state.fragmentIndex})">开始本段</button>${state.fragmentIndex>0?`<button class="btn secondary" onclick="state.fragmentIndex--; setScreen('fragmentDone')">返回上一段</button>`:''}</div></div></div>`;
  layout(main);
}
function renderFragmentDone(){
  const frag=DATA.fragments[state.fragmentIndex];
  const doneLast=state.fragmentIndex>=DATA.fragments.length-1;
  const main=`<div class="transition"><div class="panel"><h2>${frag.doneTitle}</h2><p>${frag.doneDesc}</p><div class="humanline">这一段旧反馈的音量已调低。</div><div class="actions">${doneLast?`<button class="btn" onclick="setScreen('loading')">生成初始化设定</button>`:`<button class="btn" onclick="state.fragmentIndex++; setScreen('fragmentIntro')">进入下一段</button>`}</div></div></div>`;
  layout(main);
}
function renderLoading(){
  computeResult();
  const main=`<div class="transition"><div class="panel"><h2>日志清理完成，时间正在回溯。</h2><p>系统正在清空你的人生日志……不是把过去抹掉，而是暂时把那些旧反馈调低音量。接下来，我们会根据你留下来的倾向，生成你的初始化设定。</p><div class="humanline">系统正在把旧反馈调低，把留下来的倾向重新拼回去。</div><div class="actions"><button class="btn" onclick="setScreen('result')">查看报告</button></div></div></div>`;
  layout(main);
}

function getTopTraits(traits, n=3){
  return Object.entries(traits||{}).sort((a,b)=>b[1]-a[1]).slice(0,n).map(([k,v])=>({key:k,value:v,label:TRAIT_COPY[k]?.title||k,desc:TRAIT_COPY[k]?.desc||''}));
}
const TRAIT_COPY = {
  emotionalSensitivity:{title:'情绪感知很灵',desc:'能捕捉到别人没说出口的变化，也容易被细节牵动。'},
  relationshipCare:{title:'关系兜底欲强',desc:'会本能地让场面别坏掉，也会在别人失控时先接住一点。'},
  riskPrediction:{title:'风险预演很多',desc:'事情还没发生，脑子里已经跑过几种坏结局。'},
  imageControl:{title:'体面控制感高',desc:'混乱可以存在，但最好先被整理成能见人的样子。'},
  ambition:{title:'野心有暗线',desc:'不一定高调冲出去，但心里并不是完全没有想赢的部分。'},
  freedomNeed:{title:'退路需求明显',desc:'靠近之前会先确认出口还在，自由感对你很重要。'},
  expressiveDrama:{title:'表达能量强',desc:'情绪和想法不适合被长期塞住，它们总会找到一点出口。'},
  observerAnalysis:{title:'旁观分析值高',desc:'很会站远一点看清局势，甚至比当事人更早看出问题。'}
};
function buildObjectFeature(r, desc){
  const top=getTopTraits(r.traitScores,3);
  const topText=top.map(x=>x.label).join('、');
  const modePrefix = state.mode==='warm' ? '最原始的你保留着一种很清楚的底色' : '最原始的你不是一张温顺的人格说明书';
  return `${modePrefix}：${r.object.name}对应的不是单一标签，而是一组最突出的运行方式——${topText}。${desc}`;
}
function buildLongAnalysis(r){
  const top=getTopTraits(r.traitScores,4);
  const del=r.deletion.slice(0,3).map(x=>x.title).join('、') || '旧反馈残留';
  const keep=r.retained.slice(0,3).map(x=>x.title).join('、') || '核心倾向';
  const mbtiChange = r.inputMbti===r.initMbti ? `这次反推没有强行改写你的 MBTI 字母，更多是在同一类型内部调整比例。` : `这次从 ${r.inputMbti} 反推到 ${r.initMbti}，变化不是为了制造惊喜，而是因为你的回答里反复出现了足够强的旧反馈线索。`;
  const traitText = top.map(t=>`${t.label}：${t.desc}`).join(' ');
  if(state.mode==='warm'){
    return `更细一点看，系统先把${del}这些后天适应痕迹调低，再观察还留下什么。${mbtiChange} 保留下来的部分包括${keep}。${traitText} 这说明最原始的你并不只是“脆弱”或“敏感”，而是有一套很细的感知系统，也有自己恢复、判断和选择的方式。你不需要把所有后来学会的生存技能都当成本性，它们帮过你，但不必永远定义你。`;
  }
  return `更细一点看，系统先把${del}这些人生后台插件调低音量，再检查还剩哪些出厂零件。${mbtiChange} 保留下来的部分包括${keep}。${traitText} 所以这个结果不是在宣布一个漂亮人设，而是在说：最原始的你可能没那么想营业，也没那么想随时稳定、懂事、好用。很多看起来像性格的东西，其实只是生活后来装上的补丁包，能用，但不一定属于原装。`;
}
function renderDeepAnalysis(r){
  const traits=getTopTraits(r.traitScores,5);
  return `<div id="deep" class="deep"><div class="deep-grid">
    <div class="pill-card"><strong>反推路径</strong><span>现实输入 ${r.inputMbti} → 当前校准 ${r.currentMbti} → 初始化 ${r.initMbti}</span></div>
    <div class="pill-card"><strong>置信度</strong><span>${r.confidence}；不确定选项比例 ${Math.round(r.neutralRatio*100)}%</span></div>
    ${traits.map(t=>`<div class="pill-card"><strong>${t.label} ${Math.round(t.value)}%</strong><span>${t.desc}</span></div>`).join('')}
  </div></div>`;
}

function renderResult(){
  const r=state.result || computeResult();
  const rawDesc = state.mode==='warm'?r.object.warm:r.object.crazy;
  const featureDesc = buildObjectFeature(r, rawDesc);
  const longDesc = buildLongAnalysis(r);
  const modeTitle = state.mode==='warm'?'温柔地看':'劳资爱怎么看怎么看';
  const main=`
  <div class="result-tip"><strong>提示</strong><span>系统把你回答里最强的旧反馈先调低音量，再根据剩下的倾向生成这个初始化设定。它不是心理诊断，也不是最终答案，只是一个反事实推演版本：如果少一些被迫适应，你可能更接近什么样子。</span></div>
  <div class="result-head">
    <div class="result-card"><div class="result-title">你的初始化设定</div><div class="big-result">${r.initMbti} - ${r.object.name}</div><p class="note">现实输入：${r.inputMbti}　当前校准：${r.currentMbti}　反推置信度：${r.confidence}</p></div>
    <div class="object-stage"><div class="object-emoji" title="${r.object.ip}">${r.object.emoji}</div></div>
  </div>
  <div class="result-card"><div class="result-title">系统删除了这些旧反馈</div><div class="list-grid">${r.deletion.map(d=>`<div class="pill-card"><strong>${d.title} ${d.percent}%</strong><span>${d.desc}</span><div class="percent"><i style="width:${d.percent}%"></i></div></div>`).join('')}</div></div>
  <div class="result-card"><div class="result-title">删除后保留下来的部分</div><div class="list-grid">${r.retained.map(x=>`<div class="pill-card"><strong>${x.title}</strong><span>${x.desc}</span></div>`).join('')}</div></div>
  <div class="result-card"><div class="result-title">你想怎么看自己？</div><div class="mode-toggle"><button class="mode-btn ${state.mode==='warm'?'active':''}" onclick="state.mode='warm';render()">温柔地看</button><button class="mode-btn crazy ${state.mode==='crazy'?'active':''}" onclick="state.mode='crazy';render()">劳资爱怎么看怎么看</button></div>
    <div class="analysis-block"><h3>物件画像</h3><p class="description">${featureDesc}</p></div>
    <div class="analysis-block"><h3>人格细化</h3><p class="description">${longDesc}</p></div>
  </div>
  <div class="result-card"><div class="result-title">MBTI 反推比例</div><div class="list-grid">${axisPercentHTML(r.initScores)}</div></div>
  <div class="result-card"><div class="result-title">平行人生剧本</div><div class="script-grid">${DATA.scripts.map(s=>`<div class="script-card ${state.scriptId===s.id?'active':''}" onclick="state.scriptId='${s.id}';render()"><h4>${s.name}</h4><p>${s.desc}</p></div>`).join('')}</div>${state.scriptId?`<p class="description">${DATA.scripts.find(s=>s.id===state.scriptId).story.replace('系统暂时保留剧本功能，后续再深挖。','')}</p>`:''}</div>
  <div class="result-card"><button class="btn secondary" onclick="toggleDeep()">展开深层分析</button>${renderDeepAnalysis(r)}<div class="footer-actions"><button class="btn" onclick="downloadShare()">生成分享图</button><button class="btn secondary" onclick="exportJSON()">导出匿名 JSON</button><button class="btn ghost" onclick="copyResult()">复制结果文本</button><button class="btn ghost" onclick="location.reload()">重新开始</button></div><textarea id="copyText" class="textarea-copy" readonly>${makeShareText(r, modeTitle, featureDesc+'\n\n'+longDesc)}</textarea></div>`;
  layout(main);
}
function toggleDeep(){document.getElementById('deep').classList.toggle('open');}
function escapeHtml(s){return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}
function makeShareText(r, modeTitle, desc){return `我的初始化设定：${r.initMbti} - ${r.object.name}\n查看方式：${modeTitle}\n删除清单：${r.deletion.slice(0,3).map(x=>x.title+' '+x.percent+'%').join(' / ')}\n保留部分：${r.retained.map(x=>x.title).join(' / ')}\n\n${desc}`;}
function copyResult(){const t=document.getElementById('copyText');t.select();document.execCommand('copy');alert('已复制结果文本');}
function exportJSON(){
  const blob=new Blob([JSON.stringify({answers:{current:state.currentAnswers,ref:state.refAnswers},times:state.times,result:state.result},null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='initial-self-anonymous-result.json';a.click();URL.revokeObjectURL(a.href);
}
function downloadShare(){
  const r=state.result || computeResult(); const canvas=document.getElementById('shareCanvas'); const ctx=canvas.getContext('2d');
  ctx.fillStyle='#f7efe3'; ctx.fillRect(0,0,1200,1600);
  ctx.fillStyle='#241f1a'; ctx.font='bold 64px -apple-system, BlinkMacSystemFont, sans-serif'; ctx.fillText('返老还童',80,120);
  ctx.font='26px -apple-system, BlinkMacSystemFont, sans-serif'; ctx.fillText('初始化设定反推报告',84,165);
  roundRect(ctx,70,220,1060,310,36,'#fff9ee');
  ctx.font='bold 58px -apple-system, BlinkMacSystemFont, sans-serif'; ctx.fillStyle='#241f1a'; wrapText(ctx,`${r.initMbti} - ${r.object.name}`,110,300,780,70);
  ctx.font='120px serif'; ctx.fillText(r.object.emoji,910,360);
  ctx.font='26px -apple-system, BlinkMacSystemFont, sans-serif'; ctx.fillStyle='#6b6258'; wrapText(ctx,`现实输入 ${r.inputMbti} · 删除旧反馈后生成`,112,455,860,38);
  roundRect(ctx,70,570,1060,420,36,'#fff9ee');
  ctx.fillStyle='#241f1a'; ctx.font='bold 34px -apple-system, BlinkMacSystemFont, sans-serif'; ctx.fillText('系统删除了',110,640);
  ctx.font='28px -apple-system, BlinkMacSystemFont, sans-serif';
  r.deletion.slice(0,4).forEach((d,i)=>{ctx.fillStyle='#241f1a';ctx.fillText(`${i+1}. ${d.title} ${d.percent}%`,120,700+i*70);});
  roundRect(ctx,70,1040,1060,360,36,'#241f1a');
  ctx.fillStyle='#fff4e2'; ctx.font='bold 34px -apple-system, BlinkMacSystemFont, sans-serif'; ctx.fillText('保留下来的你',110,1110);
  ctx.font='28px -apple-system, BlinkMacSystemFont, sans-serif'; wrapText(ctx,r.retained.map(x=>x.title).join(' / '),110,1170,940,42);
  ctx.font='24px -apple-system, BlinkMacSystemFont, sans-serif'; wrapText(ctx,'这不是测你是谁，而是推演：如果少一些旧反馈、少一些被迫适应，你可能更接近什么样子。',110,1280,940,36);
  const a=document.createElement('a'); a.href=canvas.toDataURL('image/png'); a.download='initial-self-card.png'; a.click();
}
function roundRect(ctx,x,y,w,h,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();ctx.fill();}
function wrapText(ctx,text,x,y,maxWidth,lineHeight){let words=String(text).split(''),line='';for(let n=0;n<words.length;n++){let test=line+words[n];if(ctx.measureText(test).width>maxWidth&&n>0){ctx.fillText(line,x,y);line=words[n];y+=lineHeight;}else{line=test;}}ctx.fillText(line,x,y);}
render();
