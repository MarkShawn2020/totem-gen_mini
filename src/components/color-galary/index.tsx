import { themeColorAtom, themeConfigAtom } from "@/atoms"
import { japanese_colors } from "@/utils/japanese_colors"
import { Text, View } from "@tarojs/components"
import { useAtomValue } from "jotai"
import { ColorItem } from "./ColorItem"
import "./index.scss"

export const ColorGalary = () => {
  const themeConfig = useAtomValue(themeConfigAtom)
  const themeColor = useAtomValue(themeColorAtom)

  return (
    <View className="color-galary" style={{ background: themeConfig.backgroundColor }}>
      <View className="color-detail" style={{ background: themeConfig.backgroundColor }}>
        {/*<View className="color-preview" style={{ backgroundColor: themeColor.HEX }} />*/}
        <View className="color-info-detail">
          <View className="color-title">
            <Text className="chinese">{themeColor.Chinese_Name}</Text>
            <Text className="english" style={{ color: themeConfig.secondaryText }}>
              {themeColor.English_Name}
            </Text>
          </View>
          <View className="color-data">
            <View className="data-item" style={{ borderColor: themeConfig.border }}>
              <Text className="label" style={{ color: themeConfig.secondaryText }}>
                HEX
              </Text>
              <Text className="value" style={{ color: themeConfig.text }}>
                {themeColor.HEX}
              </Text>
            </View>
            <View className="data-item" style={{ borderColor: themeConfig.border }}>
              <Text className="label" style={{ color: themeConfig.secondaryText }}>
                RGB
              </Text>
              <Text className="value" style={{ color: themeConfig.text }}>
                {themeColor.R}, {themeColor.G}, {themeColor.B}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="color-list" style={{ background: themeConfig.backgroundColor }}>
        {japanese_colors.map(color => (
          <ColorItem key={color.ID} color={color} />
        ))}
      </View>
    </View>
  )
}
