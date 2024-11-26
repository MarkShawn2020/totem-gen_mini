import {
  birthYearAtom,
  formErrorsAtom,
  genderAtom,
  introductionAtom,
  mbtiSelectionsAtom,
  nameAtom,
  stepAtom,
  themeColorAtom,
} from "@/atoms"
import { themes } from "@/utils/theme"
import { useAtom } from "jotai/react"

export const useTotemForm = () => {
  const [currentStep, setCurrentStep] = useAtom(stepAtom)
  const [name, setName] = useAtom(nameAtom)
  const [birthYear, setBirthYear] = useAtom(birthYearAtom)
  const [gender, setGender] = useAtom(genderAtom)
  const [introduction, setIntroduction] = useAtom(introductionAtom)
  const [colorTheme, setColorTheme] = useAtom(themeColorAtom)
  const [mbtiSelections, setMbtiSelections] = useAtom(mbtiSelectionsAtom)
  const [formErrors, setFormErrors] = useAtom(formErrorsAtom)

  // Handle default values for null states
  const actualStep = currentStep ?? 0
  const actualName = name ?? ""
  const actualBirthYear = birthYear ?? ""
  const actualGender = gender ?? "neutral"
  const actualIntroduction = introduction ?? ""
  const actualColorTheme = colorTheme ?? "dark"
  const actualMbtiSelections = mbtiSelections ?? [false, false, false, false]

  // Ensure we always have a valid theme
  const currentTheme = themes[actualColorTheme]

  const handleInputChange = (key: string, value: string) => {
    switch (key) {
      case "name":
        setName(value)
        break
      case "birthYear":
        setBirthYear(value)
        break
      case "gender":
        setGender(value)
        break
      case "introduction":
        setIntroduction(value)
        break
      case "colorTheme":
        setColorTheme(value)
        break
    }
  }

  return {
    currentStep,
    setCurrentStep,
    name: actualName,
    birthYear: actualBirthYear,
    gender: actualGender,
    introduction: actualIntroduction,
    colorTheme: actualColorTheme,
    mbtiSelections: actualMbtiSelections,
    setMbtiSelections,
    formErrors,
    setFormErrors,
    currentTheme,
    handleInputChange,
  }
}
