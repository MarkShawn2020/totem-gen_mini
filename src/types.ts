import { Theme } from "src/utils/theme"

export interface FormErrors {
  name: string
  birthYear: string
  gender: string
  introduction: string
}

export interface StepButtonsProps {
  currentStep: number
  totalSteps: number
  currentTheme: Theme
  onPrevStep: () => void
  onNextStep: () => void
  onSubmit: () => void
}
