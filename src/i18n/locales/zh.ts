export default {
  basicInfo: {
    title: '基本信息',
    description: '请填写你的基本信息，这些信息将用于生成你独特的图腾',
    name: {
      label: '姓名',
      required: '*',
      description: '你希望在图腾中展现的称呼',
      placeholder: '请输入你的名字'
    },
    birthYear: {
      label: '生辰年份',
      required: '*',
      description: '你的出生年份将影响图腾的核心元素'
    },
    gender: {
      label: '性别倾向',
      required: '*',
      description: '选择更适合你的性别特征，这将影响图腾的整体风格',
      options: {
        yin: {
          label: '阴',
          description: '柔和 / 内敛 / 优雅'
        },
        neutral: {
          label: '中',
          description: '平衡 / 和谐 / 中庸'
        },
        yang: {
          label: '阳',
          description: '坚定 / 开放 / 进取'
        }
      }
    },
    bio: {
      label: '个人简介',
      required: '*',
      description: '描述一下你的性格、爱好或期望，这些将融入你的图腾中',
      placeholder: '例如：我是一个热爱艺术的人，喜欢探索新事物...'
    }
  },
  mbti: {
    result: '你的MBTI类型：',
    dimensions: {
      energy: {
        title: '能量来源',
        description: '你倾向于从哪里获取能量和动力？',
        left: {
          letter: 'E',
          name: '外向',
          traits: ['从外部世界获取能量', '享受社交互动', '倾向于先说后想', '喜欢群体活动']
        },
        right: {
          letter: 'I',
          name: '内向',
          traits: ['从独处中获取能量', '享受深度思考', '倾向于先想后说', '喜欢独处或小群体']
        }
      },
      source: {
        title: '信息获取',
        description: '你更倾向于关注哪种类型的信息？',
        left: {
          letter: 'S',
          name: '感知',
          traits: ['关注具体细节', '重视现实经验', '相信眼见为实', '专注当下']
        },
        right: {
          letter: 'N',
          name: '直觉',
          traits: ['关注整体模式', '重视未来可能', '相信直觉感受', '展望未来']
        }
      },
      decision: {
        title: '决策方式',
        description: '你在做决定时更依赖什么？',
        left: {
          letter: 'T',
          name: '思维',
          traits: ['重视逻辑分析', '追求客观公正', '关注因果关系', '重视效率']
        },
        right: {
          letter: 'F',
          name: '情感',
          traits: ['重视情感体验', '追求和谐关系', '关注人际影响', '重视共情']
        }
      },
      lifestyle: {
        title: '生活方式',
        description: '你更喜欢怎样的生活节奏？',
        left: {
          letter: 'J',
          name: '判断',
          traits: ['喜欢计划和秩序', '追求确定性', '及时完成任务', '重视结构']
        },
        right: {
          letter: 'P',
          name: '知觉',
          traits: ['喜欢灵活和自由', '保持开放性', '享受探索过程', '重视适应']
        }
      }
    }
  },
  steps: {
    theme: {
      title: "主题选择",
      description: "选择你喜欢的颜色风格"
    },
    mbti: {
      title: "性格测试",
      description: "了解你的MBTI性格类型"
    },
    basic: {
      title: "基本信息",
      description: "告诉我你的名字和生年"
    }
  },
  themes: {
    dark: {
      name: "墨玉",
      description: "沉稳内敛"
    },
    blue: {
      name: "青瓷",
      description: "清雅脱俗"
    },
    red: {
      name: "朱砂",
      description: "热情奔放"
    },
    green: {
      name: "翡翠",
      description: "生机盎然"
    },
    purple: {
      name: "紫玉",
      description: "高贵典雅"
    }
  },
  common: {
    navigation: {
      prev: '上一步',
      next: '下一步',
      generate: '生成图腾'
    },
    pages: {
      home: '首页'
    }
  }
};
