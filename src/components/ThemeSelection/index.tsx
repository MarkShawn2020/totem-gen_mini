import { themeColorAtom } from "@/atoms"
import StepLayout from "@/layouts/StepLayout"
import { Color } from "@/types"
import { categorizeColors, generateColorSchemes } from "@/utils/colorUtils"
import { getFormSteps } from "@/utils/steps"
import { ScrollView, Text, View } from "@tarojs/components"
import { useAtom } from "jotai/react"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import "./index.scss"

const ThemeSelection = () => {
  const { t } = useTranslation()
  const [colorTheme, setColorTheme] = useAtom(themeColorAtom)
  const steps = getFormSteps()

  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("red")

  // 获取分类后的颜色
  const colorSeries = useMemo(() => categorizeColors(), [])

  // 获取当前选中颜色的配色方案
  const colorSchemes = useMemo(() => {
    if (!selectedColor) return null
    return generateColorSchemes(selectedColor.rgb)
  }, [selectedColor])

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color)
    setColorTheme({ ...color, R: color.rgb[0], G: color.rgb[1], B: color.rgb[2] })
  }

  return (
    <StepLayout description={t(steps[0]!.description)} title={t(steps[0]!.title)}>
      <View className="theme-selection">
        {/* 颜色分类标签 */}
        <ScrollView scrollX className="category-tabs">
          {colorSeries.map(series => (
            <View
              key={series.name}
              className={`category-tab ${activeCategory === series.name ? "active" : ""}`}
              onClick={() => setActiveCategory(series.name)}
            >
              <Text>{t(`colors.categories.${series.name}`)}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 主色展示区域 */}
        <ScrollView scrollY className="color-grid">
          {colorSeries
            .find(series => series.name === activeCategory)
            ?.colors.map(color => (
              <View
                key={color.ID}
                className={`color-item ${selectedColor?.ID === color.ID ? "active" : ""}`}
                onClick={() => handleColorSelect(color)}
              >
                <View className="color-preview" style={{ background: color.HEX }} />
                <View className="color-info">
                  <Text className="chinese-name">{color.Chinese_Name}</Text>
                  <Text className="english-name">{color.English_Name}</Text>
                </View>
              </View>
            ))}
        </ScrollView>

        {/* 配色方案展示区域 */}
        {selectedColor && colorSchemes && (
          <View className="color-schemes">
            <Text className="section-title">{t("colors.schemes.title")}</Text>
            <ScrollView scrollX className="schemes-scroll">
              {Object.entries(colorSchemes).map(([key, scheme]) => (
                <View key={key} className="scheme-card">
                  <Text className="scheme-name">{scheme.name}</Text>
                  <View className="scheme-colors">
                    <View className="main-color" style={{ background: selectedColor.HEX }} />
                    {scheme.colors.map((rgb, index) => (
                      <View
                        key={index}
                        className="scheme-color"
                        style={{
                          background: `rgb(${rgb.join(",")})`,
                        }}
                      />
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </StepLayout>
  )
}

export default ThemeSelection
