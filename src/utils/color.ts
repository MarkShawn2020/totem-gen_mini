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
