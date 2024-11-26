import { ThemeType } from "@/utils/theme"
import i18next from "i18next"

export interface Step {
  title: string
  description: string
  key: "theme" | "mbti" | "basic"
}

export const getFormSteps = (): Step[] => {
  const t = i18next.t
  return [
    {
      title: t("steps.theme.title"),
      description: t("steps.theme.description"),
      key: "theme",
    },
    {
      title: t("steps.mbti.title"),
      description: t("steps.mbti.description"),
      key: "mbti",
    },
    {
      title: t("steps.basic.title"),
      description: t("steps.basic.description"),
      key: "basic",
    },
  ]
}

export interface ThemeOption {
  name: string
  description: string
  value: ThemeType
}

export const getColorThemes = (): ThemeOption[] => {
  const t = i18next.t
  return [
    {
      name: t("themes.dark.name"),
      description: t("themes.dark.description"),
      value: "dark",
    },
    {
      name: t("themes.blue.name"),
      description: t("themes.blue.description"),
      value: "blue",
    },
    {
      name: t("themes.red.name"),
      description: t("themes.red.description"),
      value: "red",
    },
    {
      name: t("themes.green.name"),
      description: t("themes.green.description"),
      value: "green",
    },
    {
      name: t("themes.purple.name"),
      description: t("themes.purple.description"),
      value: "purple",
    },
  ]
}
