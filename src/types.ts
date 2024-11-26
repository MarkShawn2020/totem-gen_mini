import type { ThemeConfig } from "@/utils/theme"

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

// 定义颜色类型
export interface Color {
  ID: string
  Chinese_Name: string
  English_Name: string
  HEX: string
  rgb: [number, number, number]
}

export interface JapaneseColor {
  ID: string
  Chinese_Name: string
  English_Name: string
  HEX: string
  R: number
  G: number
  B: number
  C?: number
  M?: number
  Y?: number
  K?: number
}
