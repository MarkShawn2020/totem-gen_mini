import type { ThemeConfig } from "@/utils/theme"
import { Text, View } from "@tarojs/components"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import "./index.scss"

interface GenderSelectorProps {
  value: string
  onChange?: (value: string) => void
  themeConfig: ThemeConfig
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ value, onChange, themeConfig }) => {
  const { t, i18n } = useTranslation()
  const [selectedGender, setSelectedGender] = useState(value || "")
  const isVerticalLayout = i18n.language === "zh" || i18n.language === "ja"

  useEffect(() => {
    if (value !== selectedGender) {
      setSelectedGender(value || "")
    }
  }, [value])

  const handleSelect = (gender: string) => {
    setSelectedGender(gender)
    onChange?.(gender)
  }

  const options = [
    {
      value: "yin",
      label: t("basicInfo.gender.options.yin.label"),
      description: t("basicInfo.gender.options.yin.description"),
    },
    {
      value: "neutral",
      label: t("basicInfo.gender.options.neutral.label"),
      description: t("basicInfo.gender.options.neutral.description"),
    },
    {
      value: "yang",
      label: t("basicInfo.gender.options.yang.label"),
      description: t("basicInfo.gender.options.yang.description"),
    },
  ]

  return (
    <View className="gender-selector">
      <View className={`gender-options ${isVerticalLayout ? "vertical" : "horizontal"}`}>
        {options.map(option => {
          const isSelected = selectedGender === option.value
          const Inner = () => (
            <>
              <View className="label">
                <Text
                  style={{
                    color: `var(--theme-${isSelected ? "primary" : "text"}-color)`,
                  }}
                >
                  {option.label}
                </Text>
              </View>
              <View className="description">
                <Text
                  style={{
                    color: `var(--theme-${isSelected ? "primary" : "text"}-color)`,
                  }}
                >
                  {option.description}
                </Text>
              </View>
            </>
          )

          return (
            <View
              key={option.value}
              className={`gender-option ${isSelected ? "selected" : ""}`}
              style={{
                borderColor: `var(--theme-${isSelected ? "primary" : "border"}-color)`,
                backgroundColor: isSelected ? "var(--theme-surface-color)" : "#ffffff",
              }}
              onClick={() => handleSelect(option.value)}
            >
              <View
                className="symbol"
                style={{
                  color: `var(--theme-${isSelected ? "primary" : "text"}-color)`,
                }}
              >
                ☯
              </View>
              {isVerticalLayout ? (
                <Inner />
              ) : (
                <View className="content">
                  <Inner />
                </View>
              )}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default GenderSelector
