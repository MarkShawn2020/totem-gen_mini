import { Theme } from "../../utils/theme"

export interface FormErrors {
  name: string
  birthYear: string
  gender: string
  introduction: string
}

export interface ThemeSelectionProps {
  colorTheme: string
  onThemeChange: (theme: string) => void
}

export interface MbtiTestProps {
  mbtiSelections: boolean[]
  onMbtiChange: (selections: boolean[]) => void
  currentTheme: Theme
  mbtiType: string
}

export interface BasicInfoProps {
  name: string
  birthYear: string
  gender: string
  introduction: string
  formErrors: FormErrors
  currentTheme: Theme
  onInputChange: (key: string, value: string) => void
  onErrorUpdate: (errors: FormErrors) => void
}

export interface StepButtonsProps {
  currentStep: number
  totalSteps: number
  currentTheme: Theme
  onPrevStep: () => void
  onNextStep: () => void
  onSubmit: () => void
}
