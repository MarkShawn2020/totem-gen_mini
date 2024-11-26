import { japanese_colors } from "@/assets/data/japanese_colors"
import { atomWithTaroStorage } from "@/utils/atom-helpers"
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
  return generateThemeConfig(color)
})

// Form Errors Atom - This doesn't need persistence as it's temporary UI state
export const formErrorsAtom = atom({
  name: "",
  birthYear: "",
  gender: "",
  introduction: "",
})
