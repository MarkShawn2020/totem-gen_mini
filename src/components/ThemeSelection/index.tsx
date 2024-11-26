import { themeColorAtom, themeConfigAtom } from "@/atoms"
import StepLayout from "@/layouts/StepLayout"
import { Color } from "@/types"
import { BASE_COLORS, categorizeColors, generateColorSchemes } from "@/utils/colorUtils"
import { getFormSteps } from "@/utils/steps"
import { ScrollView, Text, View } from "@tarojs/components"
import { useAtom } from "jotai/react"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import "./index.scss"

const ThemeSelection = () => {
  const { t } = useTranslation()
  const [colorTheme, setColorTheme] = useAtom(themeColorAtom)
  const [themeConfig] = useAtom(themeConfigAtom)
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
        <View className="selection-container">
          {/* 上方主色系旋转选择器 */}
          <View className="primary-color-wheel">
            <View className="wheel-container">
              {colorSeries.map((series, index) => (
                <View
                  key={series.name}
                  className={`wheel-item ${activeCategory === series.name ? "active" : ""}`}
                  style={{
                    transform: `rotate(${(index * 360) / colorSeries.length}deg) translateX(120px)`,
                  }}
                  onClick={() => setActiveCategory(series.name)}
                >
                  <View
                    className="color-preview"
                    style={{
                      background: `linear-gradient(45deg, ${series.colors[0]?.HEX || BASE_COLORS[series.name as keyof typeof BASE_COLORS]}, ${series.colors[Math.floor(series.colors.length / 2)]?.HEX || BASE_COLORS[series.name as keyof typeof BASE_COLORS]})`,
                      transform: `rotate(-${(index * 360) / colorSeries.length}deg)`,
                    }}
                  />
                </View>
              ))}
              <View className="wheel-center">
                {selectedColor && (
                  <View 
                    className="selected-color"
                    style={{ backgroundColor: selectedColor.HEX }}
                  />
                )}
              </View>
            </View>
          </View>

          {/* 下方颜色列表 */}
          <ScrollView scrollY className="color-list" enhanced>
            {currentColors.map(color => (
              <View
                key={color.ID}
                className={`color-item ${selectedColor?.ID === color.ID ? "active" : ""}`}
                onClick={() => handleColorSelect(color)}
                style={{ backgroundColor: color.HEX }}
              >
                <Text className="color-name" style={{ color: "#fff" }}>
                  {color.Chinese_Name}
                </Text>
                <Text className="color-name-en" style={{ color: "#fff" }}>
                  {color.English_Name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

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
