import { japanese_colors } from "@/assets/data/japanese_colors"
import { Color } from "@/types"

// 定义颜色系列
export interface ColorSeries {
  name: string
  colors: Color[]
}

// 将 RGB 转换为 HSL
export const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [h * 360, s * 100, l * 100]
}

// 将 HSL 转换回 RGB
export const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  h /= 360
  s /= 100
  l /= 100
  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

// 生成互补色
export const getComplementaryColor = (rgb: [number, number, number]): [number, number, number] => {
  const [h, s, l] = rgbToHsl(...rgb)
  return hslToRgb((h + 180) % 360, s, l)
}

// 生成类似色
export const getAnalogousColors = (
  rgb: [number, number, number],
): [[number, number, number], [number, number, number]] => {
  const [h, s, l] = rgbToHsl(...rgb)
  return [hslToRgb((h + 30) % 360, s, l), hslToRgb((h - 30 + 360) % 360, s, l)]
}

// 生成三角色
export const getTriadicColors = (
  rgb: [number, number, number],
): [[number, number, number], [number, number, number]] => {
  const [h, s, l] = rgbToHsl(...rgb)
  return [hslToRgb((h + 120) % 360, s, l), hslToRgb((h + 240) % 360, s, l)]
}

// 按色相对颜色进行分类
export const categorizeColors = (): ColorSeries[] => {
  const categories: { [key: string]: Color[] } = {
    red: [],
    pink: [],
    orange: [],
    yellow: [],
    green: [],
    blue: [],
    purple: [],
    brown: [],
    gray: [],
  }

  japanese_colors.forEach(color => {
    const [h, s, l] = rgbToHsl(color.R, color.G, color.B)

    const colorObj: Color = {
      ID: color.ID,
      Chinese_Name: color.Chinese_Name,
      English_Name: color.English_Name,
      HEX: color.HEX,
      rgb: [color.R, color.G, color.B],
    }

    if (s < 10 && l > 80) {
      categories.gray!.push(colorObj)
    } else if (s < 10) {
      categories.gray!.push(colorObj)
    } else {
      if (h >= 345 || h < 10) categories.red!.push(colorObj)
      else if (h >= 10 && h < 40) categories.orange!.push(colorObj)
      else if (h >= 40 && h < 70) categories.yellow!.push(colorObj)
      else if (h >= 70 && h < 150) categories.green!.push(colorObj)
      else if (h >= 150 && h < 190) categories.blue!.push(colorObj)
      else if (h >= 190 && h < 270) categories.blue!.push(colorObj)
      else if (h >= 270 && h < 345) categories.purple!.push(colorObj)
    }
  })

  return Object.entries(categories).map(([name, colors]) => ({
    name,
    colors: colors.sort((a, b) => {
      const [aH, aS, aL] = rgbToHsl(...a.rgb)
      const [bH, bS, bL] = rgbToHsl(...b.rgb)
      return bL - aL
    }),
  }))
}

// 为主色生成推荐的辅色方案
export const generateColorSchemes = (mainColor: [number, number, number]) => {
  const complementary = getComplementaryColor(mainColor)
  const [analogous1, analogous2] = getAnalogousColors(mainColor)
  const [triadic1, triadic2] = getTriadicColors(mainColor)

  return {
    complementary: {
      name: "互补色",
      colors: [complementary],
    },
    analogous: {
      name: "类似色",
      colors: [analogous1, analogous2],
    },
    triadic: {
      name: "三角色",
      colors: [triadic1, triadic2],
    },
  }
}
