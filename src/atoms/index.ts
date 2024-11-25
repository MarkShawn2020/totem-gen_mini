import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { taroStorage } from "../utils/storage"

// Form Data Atoms with default values
export const nameAtom = atom("")
export const birthYearAtom = atom("")
export const genderAtom = atom("neutral")
export const introductionAtom = atom("")
export const colorThemeAtom = atom("dark")
export const mbtiSelectionsAtom = atom([false, false, false, false])
export const currentStepAtom = atom(0)

// Form Errors Atom - This doesn't need persistence as it's temporary UI state
export const formErrorsAtom = atom({
  name: "",
  birthYear: "",
  gender: "",
  introduction: "",
})
