import { JapaneseColor } from "@/types"
import Taro from "@tarojs/taro"
import { generateColorSchemes } from "./colorUtils"

export interface ThemeConfig {
  primary: string
  primaryRgb: string
  secondary: string
  background: string
  surface: string
  text: string
  border: string
}

// 将 RGB 数组转换为 CSS rgb 字符串
const rgbToString = (rgb: [number, number, number]): string => {
  return rgb.join(", ")
}

// 根据主色生成主题配置
export const generateThemeConfig = (color: JapaneseColor): ThemeConfig => {
  const rgb = [color.R, color.G, color.B] as [number, number, number]
  const [r, g, b] = rgb
  const schemes = generateColorSchemes(rgb)

  // 计算是否为深色
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  const isDark = brightness < 128

  // 生成次要颜色
  const secondaryRgb = schemes.analogous.colors[0] as [number, number, number]

  // 为深色主题和浅色主题生成不同的配色
  if (isDark) {
    return {
      primary: color.HEX,
      primaryRgb: rgbToString(rgb),
      secondary: `rgb(${rgbToString(secondaryRgb)})`,
      background: "#FCF9F2",
      surface: "#F5EDE4",
      text: color.HEX,
      border: `rgba(${rgbToString(rgb)}, 0.2)`,
    }
  } else {
    return {
      primary: color.HEX,
      primaryRgb: rgbToString(rgb),
      secondary: `rgb(${rgbToString(secondaryRgb)})`,
      background: `rgba(${rgbToString(rgb)}, 0.03)`,
      surface: `rgba(${rgbToString(rgb)}, 0.08)`,
      text: color.HEX,
      border: `rgba(${rgbToString(rgb)}, 0.2)`,
    }
  }
}

const THEME_STORAGE_KEY = "theme_color"

// 从存储中获取主题颜色
export const getStoredTheme = (): string => {
  return Taro.getStorageSync(THEME_STORAGE_KEY) || "#2C1810"
}

// 将主题颜色保存到存储
export const setStoredTheme = (colorHex: string) => {
  Taro.setStorageSync(THEME_STORAGE_KEY, colorHex)
}

// 生成 CSS 变量
export const getCssVars = (config: ThemeConfig): Record<string, string> => {
  return {
    "--primary-color": config.primary,
    "--primary-rgb": config.primaryRgb,
    "--secondary-color": config.secondary,
    "--background-color": config.background,
    "--surface-color": config.surface,
    "--text-color": config.text,
    "--border-color": config.border,
  }
}
