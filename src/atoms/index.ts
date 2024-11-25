// import { atomWithStorage } from "jotai/utils"
// import { taroStorage } from "../utils/storage"

import { atom } from "jotai"

// Form Data Atoms
export const nameAtom = atom("")
export const birthYearAtom = atom("")
export const genderAtom = atom("")
export const introductionAtom = atom("")
export const colorThemeAtom = atom("dark")
export const mbtiSelectionsAtom = atom([false, false, false, false])
export const currentStepAtom = atom(2)

// Form Errors Atom
export const formErrorsAtom = atom({
  name: "",
  birthYear: "",
  gender: "",
  introduction: "",
})
