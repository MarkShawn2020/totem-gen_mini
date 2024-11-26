import { ThemeConfig } from "@/utils/theme"

export interface FormErrors {
  name: string
  birthYear: string
  gender: string
  introduction: string
}

export interface StepButtonsProps {
  currentStep: number
  totalSteps: number
  currentTheme: ThemeConfig
  onPrevStep: () => void
  onNextStep: () => void
  onSubmit: () => void
}
