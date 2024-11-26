import { japanese_colors } from "@/assets/data/japanese_colors"
import { themeColorAtom } from "@/atoms"
import { Text, View } from "@tarojs/components"
import { useAtomValue } from "jotai"
import { ColorItem } from "./ColorItem"
import "./index.scss"

export const ColorGalary = () => {
  const themeColor = useAtomValue(themeColorAtom)

  return (
    <View className="color-galary">
      <View className="color-detail">
        <View className="color-preview" style={{ backgroundColor: themeColor.HEX }} />
        <View className="color-info-detail">
          <View className="color-title">
            <Text className="chinese">{themeColor.Chinese_Name}</Text>
            <Text className="english">{themeColor.English_Name}</Text>
          </View>
          <View className="color-data">
            <View className="data-item">
              <Text className="label">HEX</Text>
              <Text className="value">{themeColor.HEX}</Text>
            </View>
            <View className="data-item">
              <Text className="label">RGB</Text>
              <Text className="value">
                {themeColor.R}, {themeColor.G}, {themeColor.B}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="color-list">
        {japanese_colors.map(color => (
          <ColorItem key={color.ID} color={color} />
        ))}
      </View>
    </View>
  )
}
