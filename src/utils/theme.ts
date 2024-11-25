import Taro from "@tarojs/taro"

export interface ThemeColors {
  primary: string
  primaryRgb: string
  secondary: string
  background: string
  surface: string
  text: string
  border: string
}

export const themes = {
  dark: {
    primary: "#2C1810",
    primaryRgb: "44, 24, 16",
    secondary: "#8C6C5A",
    background: "#FCF9F2",
    surface: "#F5EDE4",
    text: "#2C1810",
    border: "rgba(44, 24, 16, 0.2)",
  },
  blue: {
    primary: "#1B4B66",
    primaryRgb: "27, 75, 102",
    secondary: "#5B8BA0",
    background: "#F7FBFD",
    surface: "#E8F4F8",
    text: "#1B4B66",
    border: "rgba(27, 75, 102, 0.2)",
  },
  red: {
    primary: "#8C2E2E",
    primaryRgb: "140, 46, 46",
    secondary: "#B85959",
    background: "#FDF7F7",
    surface: "#FFE8E8",
    text: "#8C2E2E",
    border: "rgba(140, 46, 46, 0.2)",
  },
  green: {
    primary: "#2E5E3E",
    primaryRgb: "46, 94, 62",
    secondary: "#588C6B",
    background: "#F7FDF8",
    surface: "#E8F8EC",
    text: "#2E5E3E",
    border: "rgba(46, 94, 62, 0.2)",
  },
  purple: {
    primary: "#4E2E8C",
    primaryRgb: "78, 46, 140",
    secondary: "#7959B8",
    background: "#FAF7FD",
    surface: "#F2E8FF",
    text: "#4E2E8C",
    border: "rgba(78, 46, 140, 0.2)",
  },
} as const

export type ThemeType = keyof typeof themes

const THEME_STORAGE_KEY = "totem_theme"

export const getStoredTheme = (): ThemeType => {
  const stored = Taro.getStorageSync(THEME_STORAGE_KEY)
  return (stored as ThemeType) || "dark"
}

export const setStoredTheme = (theme: ThemeType) => {
  Taro.setStorageSync(THEME_STORAGE_KEY, theme)
}

export const getCssVars = (theme: ThemeType): Record<string, string> => {
  const themeColors = themes[theme]
  return Object.entries(themeColors).reduce(
    (acc, [key, value]) => {
      acc[`--theme-${key}`] = value
      return acc
    },
    {} as Record<string, string>,
  )
}
