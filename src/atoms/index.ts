import { japanese_colors } from "@/assets/data/japanese_colors"
import { atomWithTaroStorage } from "@/utils/atom-helpers"
import { hexToHSL, hslToHex } from "@/utils/color"
import { generateThemeConfig } from "@/utils/theme"
import { atom } from "jotai"

export const nameAtom = atomWithTaroStorage("userName", "")
export const birthYearAtom = atomWithTaroStorage("userBirthYear", "2024")
export const genderAtom = atomWithTaroStorage("userGender", "neutral")
export const introductionAtom = atomWithTaroStorage("userIntroduction", "")

const firstColor = japanese_colors[0]!

export const themeColorAtom = atomWithTaroStorage("themeColor", firstColor)

export const mbtiSelectionsAtom = atomWithTaroStorage("mbtiSelections", [
  false,
  false,
  false,
  false,
])

export const stepAtom = atomWithTaroStorage("step", 0)
export const step2Atom = atomWithTaroStorage("step", 0)

// 派生的主题配置
export const themeConfigAtom = atom(get => {
  const color = get(themeColorAtom)
  const config = generateThemeConfig(color)

  // 获取主题色的 HSL 值
  const hsl = hexToHSL(config.primary)

  // 计算背景色 - 使用补色，但保持高亮度低饱和度
  const backgroundColor = hslToHex({
    h: (hsl.h + 180) % 360,
    s: Math.min(20, hsl.s), // 降低饱和度
    l: Math.max(92, Math.min(98, 100 - hsl.l * 0.1)), // 保持很高的亮度
  })

  // 计算文本颜色 - 基于背景色的亮度动态调整
  const bgHsl = hexToHSL(backgroundColor)
  const textColor = hslToHex({
    h: hsl.h,
    s: 15, // 保持低饱和度
    l: bgHsl.l > 50 ? 20 : 90, // 在浅色背景上用深色文本，深色背景上用浅色文本
  })

  // 计算次要文本颜色
  const secondaryTextColor = hslToHex({
    h: hsl.h,
    s: 10,
    l: bgHsl.l > 50 ? 45 : 75,
  })

  // 计算边框颜色
  const borderColor = hslToHex({
    h: hsl.h,
    s: 15,
    l: bgHsl.l > 50 ? 80 : 30,
  })

  // 计算表面色（用于卡片等元素）
  const surfaceColor = hslToHex({
    h: hsl.h,
    s: Math.min(15, hsl.s),
    l: bgHsl.l > 50 ? bgHsl.l - 5 : bgHsl.l + 5,
  })

  return {
    ...config,
    backgroundColor,
    text: textColor,
    secondaryText: secondaryTextColor,
    border: borderColor,
    surface: surfaceColor,
  }
})

// Form Errors Atom - This doesn't need persistence as it's temporary UI state
export const formErrorsAtom = atom({
  name: "",
  birthYear: "",
  gender: "",
  introduction: "",
})
