import { themeColorAtom } from "@/atoms"
import { getFormSteps, getColorThemes } from "@/utils/steps"
import { themes } from "@/utils/theme"
import { Text, View } from "@tarojs/components"
import { useAtom } from "jotai/react"
import { useTranslation } from "react-i18next"

const ThemeSelection = () => {
  const { t } = useTranslation()
  const [colorTheme, setColorTheme] = useAtom(themeColorAtom)
  const steps = getFormSteps()
  const colorThemes = getColorThemes()

  return (
    <View className="step-content">
      <View className="step-header">
        <Text className="step-title">{t(steps[0]!.title)}</Text>
        <Text className="step-desc">{t(steps[0]!.description)}</Text>
      </View>

      <View className="theme-grid">
        {colorThemes.map(theme => (
          <View
            key={theme.value}
            className="theme-option"
            style={{
              background: themes[theme.value].surface,
              borderColor:
                colorTheme === theme.value
                  ? themes[theme.value].primary
                  : themes[theme.value].border,
            }}
            onClick={() => setColorTheme(theme.value)}
          >
            <Text className="theme-name" style={{ color: themes[theme.value].primary }}>
              {t(theme.name)}
            </Text>
            <Text className="theme-desc" style={{ color: themes[theme.value].text }}>
              {t(theme.description)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default ThemeSelection
