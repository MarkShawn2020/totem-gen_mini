import { themeColorAtom } from "@/atoms"
import type { JapaneseColor } from "@/types"
import { View } from "@tarojs/components"
import { useAtom } from "jotai"
import "./ColorItem.scss"

interface ColorItemProps {
  color: JapaneseColor
}

export const ColorItem = ({ color }: ColorItemProps) => {
  const [themeColor, setThemeColor] = useAtom(themeColorAtom)
  const isSelected = color.ID === themeColor.ID

  return (
    <View
      className={`color-item ${isSelected ? "selected" : ""}`}
      onClick={() => setThemeColor(color)}
    >
      <View className="color-block" style={{ backgroundColor: color.HEX }} />
      <View className="color-info">
        <View className="color-name">{color.Chinese_Name}</View>
        <View className="color-name-en">{color.English_Name}</View>
      </View>
    </View>
  )
}
