import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { taroStorage } from "../utils/storage"

// Form Data Atoms
export const nameAtom = atomWithStorage("userName", "", taroStorage)
export const birthYearAtom = atomWithStorage("userBirthYear", "", taroStorage)
export const genderAtom = atomWithStorage("userGender", "", taroStorage)
export const introductionAtom = atomWithStorage("userIntroduction", "", taroStorage)
export const colorThemeAtom = atomWithStorage("colorTheme", "dark", taroStorage)
export const mbtiSelectionsAtom = atomWithStorage("mbtiSelections", [false, false, false, false], taroStorage)
export const currentStepAtom = atomWithStorage("currentStep", 2, taroStorage)

// Form Errors Atom - This doesn't need persistence as it's temporary UI state
export const formErrorsAtom = atom({
  name: "",
  birthYear: "",
  gender: "",
  introduction: "",
})
