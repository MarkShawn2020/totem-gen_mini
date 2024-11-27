/**
 * 将 RGB 颜色值转换为 CMYK 颜色值
 * @param r 红色通道 (0-255)
 * @param g 绿色通道 (0-255)
 * @param b 蓝色通道 (0-255)
 * @returns CMYK值 (0-100)
 */
export function rgb2cmyk(r: number, g: number, b: number): [number, number, number, number] {
  // 将 RGB 值标准化到 0-1 范围
  const red = r / 255
  const green = g / 255
  const blue = b / 255

  // 计算 CMY
  let c = 1 - red
  let m = 1 - green
  let y = 1 - blue

  // 计算 K (black)
  const k = Math.min(c, m, y)

  // 如果 k = 1，说明是纯黑色
  if (k === 1) {
    return [0, 0, 0, 100]
  }

  // 计算真实的 CMY 值
  c = (c - k) / (1 - k)
  m = (m - k) / (1 - k)
  y = (y - k) / (1 - k)

  // 转换为百分比并四舍五入到整数
  return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)]
}

interface HSL {
  h: number
  s: number
  l: number
}

export function hexToHSL(hex: string): HSL {
  // 移除 # 号
  hex = hex.replace(/^#/, "")

  // 解析 RGB 值
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
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

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export function hslToHex({ h, s, l }: HSL): string {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0")
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

// 转换颜色为 RGB 格式的辅助函数
export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${parseInt(result[1]!, 16)},${parseInt(result[2]!, 16)},${parseInt(result[3]!, 16)}`
    : null
}
