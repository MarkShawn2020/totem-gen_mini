import { themeColorAtom } from "@/atoms"
import StepLayout from "@/layouts/StepLayout"
import { getFormSteps, getColorThemes } from "@/utils/steps"
import { themes } from "@/utils/theme"
import { Text, View } from "@tarojs/components"
import { useAtom } from "jotai/react"
import { useTranslation } from "react-i18next"
import "./index.scss"

const ThemeSelection = () => {
  const { t } = useTranslation()
  const [colorTheme, setColorTheme] = useAtom(themeColorAtom)
  const steps = getFormSteps()
  const colorThemes = getColorThemes()

  const handleThemeChange = (theme: string) => {
    setColorTheme(theme)
  }

  return (
    <StepLayout title={t(steps[0]!.title)} description={t(steps[0]!.description)}>
      <View className="theme-selection">
        <View className="theme-list">
          {colorThemes.map(theme => (
            <View
              key={theme.value}
              className={`theme-item ${colorTheme === theme.value ? "active" : ""}`}
              style={{
                background: themes[theme.value].primary,
                borderColor: colorTheme === theme.value ? themes[theme.value].primary : "transparent",
              }}
              onClick={() => handleThemeChange(theme.value)}
            />
          ))}
          <View
            className="theme-item placeholder"
            style={{
              background: "rgba(0,0,0,0.1)",
            }}
          >
            <Text className="placeholder-text">{t("theme.more")}</Text>
          </View>
        </View>
      </View>
    </StepLayout>
  )
}

export default ThemeSelection
