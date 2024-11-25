// import { atomWithStorage } from "jotai/utils"
// import { taroStorage } from "../utils/storage"

import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { taroStorage } from "../utils/storage"

// Form Data Atoms
export const nameAtom = atom("")
export const birthYearAtom = atom("")
export const genderAtom = atom("")
export const introductionAtom = atom("")
export const colorThemeAtom = atomWithStorage("colorTheme", "dark", taroStorage)
export const mbtiSelectionsAtom = atom([false, false, false, false])
export const currentStepAtom = atom(2)

// Form Errors Atom
export const formErrorsAtom = atom({
  name: "",
  birthYear: "",
  gender: "",
  introduction: "",
})
