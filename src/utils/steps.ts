export interface Step {
  title: string
  description: string
  key: "theme" | "mbti" | "basic"
}

export const FORM_STEPS: Step[] = [
  {
    title: "主题选择",
    description: "选择你喜欢的颜色风格",
    key: "theme",
  },
  {
    title: "性格测试",
    description: "了解你的MBTI性格类型",
    key: "mbti",
  },
  {
    title: "基本信息",
    description: "告诉我你的名字和生年",
    key: "basic",
  },
]

export const COLOR_THEMES = [
  {
    name: "墨玉",
    description: "沉稳内敛",
    value: "dark",
  },
  {
    name: "青瓷",
    description: "清雅脱俗",
    value: "blue",
  },
  {
    name: "朱砂",
    description: "热情奔放",
    value: "red",
  },
  {
    name: "翡翠",
    description: "生机盎然",
    value: "green",
  },
  {
    name: "紫玉",
    description: "高贵典雅",
    value: "purple",
  },
]
