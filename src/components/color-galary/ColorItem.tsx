import { themeColorAtom } from "@/atoms"
import type { JapaneseColor } from "@/types"
import { rgb2cmyk } from "@/utils/color"
import { View } from "@tarojs/components"
import { useAtom } from "jotai"
import "./ColorItem.scss"

interface ColorItemProps {
  color: JapaneseColor
}

export const ColorItem = ({ color }: ColorItemProps) => {
  const [themeColor, setThemeColor] = useAtom(themeColorAtom)
  const isSelected = color.ID === themeColor.ID
  const [c, m, y, k] = rgb2cmyk(color.R, color.G, color.B)

  // 提取ID中的数字部分
  const numericId = color.ID.match(/\d+/)?.[0] || color.ID

  return (
    <View
      className={`color-item ${isSelected ? "selected" : ""}`}
      onClick={() => setThemeColor(color)}
    >
      <View className="color-strip" style={{ backgroundColor: color.HEX }} />

      <View className="middle-column">
        <View className="id-name-row">
          <View className="numeric-id" style={{ color: color.HEX }}>
            {numericId}
          </View>
          <View className="chinese-name" style={{ color: color.HEX }}>
            {color.Chinese_Name}
          </View>
        </View>
        <View className="cmyk-rings">
          {[c, m, y, k].map((value, index) => (
            <View
              key={index}
              className="ring"
              style={{
                background: `conic-gradient(${color.HEX} 0deg, ${color.HEX} ${value * 3.6}deg, transparent ${value * 3.6}deg), #f5f5f5`,
              }}
            >
              <View className="ring-center" />
            </View>
          ))}
        </View>
      </View>

      <View className="right-column">
        <View className="english-name" style={{ color: color.HEX }}>
          {color.English_Name}
        </View>
        <View className="rgb-bars">
          {[color.R, color.G, color.B].map((value, index) => (
            <View key={index} className="bar-container">
              <View
                className="bar"
                style={{
                  width: `${(value / 255) * 100}%`,
                  backgroundColor: color.HEX,
                }}
              />
            </View>
          ))}
        </View>
        <View className="hex-value" style={{ color: color.HEX }}>
          #{color.ID.toUpperCase()}
        </View>
      </View>
    </View>
  )
}
