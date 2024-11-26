import { atomWithTaroStorage } from "@/utils/atom-helpers"
import { themes, ThemeType } from "@/utils/theme"
import { atom } from "jotai"

export const nameAtom = atomWithTaroStorage("userName", "")
export const birthYearAtom = atomWithTaroStorage("userBirthYear", "2024")
export const genderAtom = atomWithTaroStorage("userGender", "neutral")
export const introductionAtom = atomWithTaroStorage("userIntroduction", "")
export const themeColorAtom = atomWithTaroStorage<ThemeType>("themeColor", "dark")
export const mbtiSelectionsAtom = atomWithTaroStorage("mbtiSelections", [
  false,
  false,
  false,
  false,
])

export const stepAtom = atomWithTaroStorage("step", 0)
export const step2Atom = atomWithTaroStorage("step", 0)

// Derived atoms
export const themeConfigAtom = atom(get => {
  const themeColor = get(themeColorAtom)
  return themes[themeColor]
})

// Form Errors Atom - This doesn't need persistence as it's temporary UI state
export const formErrorsAtom = atom({
  name: "",
  birthYear: "",
  gender: "",
  introduction: "",
})
