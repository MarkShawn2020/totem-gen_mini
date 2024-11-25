import { Text, View } from "@tarojs/components"
import { COLOR_THEMES, FORM_STEPS } from "@/utils/steps"
import { themes } from "@/utils/theme"
import { ThemeSelectionProps } from "../../types"

const ThemeSelection: React.FC<ThemeSelectionProps> = ({
  colorTheme,
  currentTheme,
  onThemeChange,
}) => {
  return (
    <View className="step-content">
      <View className="step-header">
        <Text className="step-title">{FORM_STEPS[0].title}</Text>
        <Text className="step-desc">{FORM_STEPS[0].description}</Text>
      </View>
      <View className="theme-grid">
        {COLOR_THEMES.map(theme => (
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
            onClick={() => onThemeChange(theme.value)}
          >
            <Text 
              className="theme-name" 
              style={{ color: themes[theme.value].primary }}
            >
              {theme.name}
            </Text>
            <Text 
              className="theme-desc" 
              style={{ color: themes[theme.value].text }}
            >
              {theme.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default ThemeSelection
