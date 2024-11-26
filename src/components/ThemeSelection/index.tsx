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

  // 状态管理
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("red")
  const [showSchemes, setShowSchemes] = useState(false)

  // 获取分类后的颜色
  const colorSeries = useMemo(() => categorizeColors(), [])

  // 获取当前选中颜色的配色方案
  const colorSchemes = useMemo(() => {
    if (!selectedColor) return null
    return generateColorSchemes(selectedColor.rgb)
  }, [selectedColor])

  // 获取当前分类的颜色
  const currentColors = useMemo(() => {
    return colorSeries.find(series => series.name === activeCategory)?.colors || []
  }, [colorSeries, activeCategory])

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color)
    setColorTheme(color)
    setShowSchemes(true)
  }

  return (
    <StepLayout description={t(steps[0]!.description)} title={t(steps[0]!.title)}>
      <View className="theme-selection">
        {/* 颜色分类标签栏 */}
        <ScrollView scrollX className="category-tabs">
          {colorSeries.map(series => (
            <View
              key={series.name}
              className={`category-tab ${activeCategory === series.name ? "active" : ""}`}
              onClick={() => setActiveCategory(series.name)}
            >
              <View
                className="category-preview"
                style={{
                  background: `linear-gradient(45deg, ${series.colors[0]?.HEX || "#fff"}, ${series.colors[Math.floor(series.colors.length / 2)]?.HEX || "#fff"})`,
                }}
              />
              <Text>{t(`colors.categories.${series.name}`)}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 颜色网格 */}
        <ScrollView scrollY className="color-grid">
          {currentColors.map(color => (
            <View
              key={color.ID}
              className={`color-item ${selectedColor?.ID === color.ID ? "active" : ""}`}
              onClick={() => handleColorSelect(color)}
            >
              <View className="color-preview" style={{ backgroundColor: color.HEX }} />
              <View className="color-info">
                <Text
                  className="color-name"
                  style={selectedColor?.ID === color.ID ? { color: color.HEX } : undefined}
                >
                  {color.Chinese_Name}
                </Text>
                <Text
                  className="color-name-en"
                  style={selectedColor?.ID === color.ID ? { color: color.HEX } : undefined}
                >
                  {color.English_Name}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* 配色方案展示 */}
        {showSchemes && colorSchemes && (
          <View className="color-schemes">
            <View className="scheme-section">
              <Text className="scheme-title">{t("colors.schemes.complementary")}</Text>
              <View className="scheme-colors">
                <View
                  className="scheme-color"
                  style={{
                    backgroundColor: `rgb(${colorSchemes.complementary.colors.join(",")})`,
                  }}
                />
              </View>
            </View>

            <View className="scheme-section">
              <Text className="scheme-title">{t("colors.schemes.analogous")}</Text>
              <View className="scheme-colors">
                {colorSchemes.analogous.colors.map((rgb, index) => (
                  <View
                    key={index}
                    className="scheme-color"
                    style={{ backgroundColor: `rgb(${rgb.join(",")})` }}
                  />
                ))}
              </View>
            </View>

            <View className="scheme-section">
              <Text className="scheme-title">{t("colors.schemes.triadic")}</Text>
              <View className="scheme-colors">
                {colorSchemes.triadic.colors.map((rgb, index) => (
                  <View
                    key={index}
                    className="scheme-color"
                    style={{ backgroundColor: `rgb(${rgb.join(",")})` }}
                  />
                ))}
              </View>
            </View>
          </View>
        )}
      </View>
    </StepLayout>
  )
}

export default ThemeSelection
