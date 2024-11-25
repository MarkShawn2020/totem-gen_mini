export interface MBTIDimension {
  id: string
  title: string
  description: string
  left: {
    letter: string
    name: string
    traits: string[]
  }
  right: {
    letter: string
    name: string
    traits: string[]
  }
}

export const MBTI_DIMENSIONS: MBTIDimension[] = [
  {
    id: "energy",
    title: "能量来源",
    description: "你倾向于从哪里获取能量和动力？",
    left: {
      letter: "E",
      name: "外向",
      traits: ["从外部世界获取能量", "享受社交互动", "倾向于先说后想", "喜欢群体活动"],
    },
    right: {
      letter: "I",
      name: "内向",
      traits: ["从独处中获取能量", "享受深度思考", "倾向于先想后说", "喜欢独处或小群体"],
    },
  },
  {
    id: "source",
    title: "信息获取",
    description: "你更倾向于关注哪种类型的信息？",
    left: {
      letter: "S",
      name: "感知",
      traits: ["关注具体细节", "重视现实经验", "相信眼见为实", "专注当下"],
    },
    right: {
      letter: "N",
      name: "直觉",
      traits: ["关注整体模式", "重视未来可能", "相信直觉感受", "展望未来"],
    },
  },
  {
    id: "decision",
    title: "决策方式",
    description: "你在做决定时更依赖什么？",
    left: {
      letter: "T",
      name: "思考",
      traits: ["基于逻辑分析", "追求客观公正", "重视真理", "关注因果"],
    },
    right: {
      letter: "F",
      name: "情感",
      traits: ["基于价值观和感受", "考虑他人感受", "重视和谐", "关注影响"],
    },
  },
  {
    id: "lifestyle",
    title: "生活方式",
    description: "你更喜欢怎样的生活节奏？",
    left: {
      letter: "J",
      name: "判断",
      traits: ["喜欢计划和组织", "追求确定性", "及时完成任务", "遵循规则"],
    },
    right: {
      letter: "P",
      name: "认知",
      traits: ["保持灵活开放", "享受自发性", "适应力强", "随机应变"],
    },
  },
]
