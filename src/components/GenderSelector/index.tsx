import { ThemeConfig } from "@/utils/theme"
import { View, Text } from "@tarojs/components"
import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next'
import "./index.scss"

interface GenderSelectorProps {
  value?: string
  onChange?: (value: string) => void
  themeConfig: ThemeConfig
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ value, onChange, themeConfig }) => {
  const { t } = useTranslation()
  const [selectedGender, setSelectedGender] = useState(value || "")

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
      value: 'female',
      label: t('basicInfo.gender.options.female.label'),
      description: t('basicInfo.gender.options.female.description'),
    },
    {
      value: 'neutral',
      label: t('basicInfo.gender.options.neutral.label'),
      description: t('basicInfo.gender.options.neutral.description'),
    },
    {
      value: 'male',
      label: t('basicInfo.gender.options.male.label'),
      description: t('basicInfo.gender.options.male.description'),
    },
  ]

  return (
    <View className="gender-selector">
      <View className="gender-options">
        {options.map(option => (
          <View
            key={option.value}
            className={`gender-option ${selectedGender === option.value ? 'selected' : ''}`}
            style={{
              borderColor: selectedGender === option.value ? themeConfig.primary : themeConfig.border,
            }}
            onClick={() => handleSelect(option.value)}
          >
            <View className="symbol">
              ☯
            </View>
            <View className="label">
              <Text>{option.label}</Text>
            </View>
            <View className="description">
              <Text>{option.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default GenderSelector
