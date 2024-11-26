import { ThemeConfig } from "@/utils/theme"
import { View } from "@tarojs/components"
import { useEffect, useState } from "react"
import "./index.scss"

interface GenderSelectorProps {
  value?: string
  onChange?: (value: string) => void
  themeConfig: ThemeConfig
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ value, onChange, themeConfig }) => {
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

  const getOptionStyle = (gender: string) => {
    const isSelected = selectedGender === gender
    return {
      background: isSelected ? themeConfig.background : "#FFFFFF",
      border: isSelected ? `4rpx solid ${themeConfig.primary}` : "none",
      padding: isSelected ? "36rpx 16rpx" : "40rpx 20rpx",
    }
  }

  const getSymbolStyle = (gender: string) => {
    const isSelected = selectedGender === gender
    return {
      color: isSelected ? themeConfig.primary : themeConfig.text,
      transform: isSelected ? "rotate(180deg)" : "none",
    }
  }

  const getLabelStyle = (gender: string) => {
    const isSelected = selectedGender === gender
    return {
      color: isSelected ? themeConfig.primary : themeConfig.text,
      fontWeight: isSelected ? "bold" : "normal",
    }
  }

  const getDescriptionStyle = (gender: string) => {
    const isSelected = selectedGender === gender
    return {
      color: isSelected ? themeConfig.primary : themeConfig.surface,
    }
  }

  const genderOptions = [
    {
      value: "female",
      symbol: "☯",
      label: "阴",
      description: "柔和 / 内敛 / 优雅",
    },
    {
      value: "neutral",
      symbol: "☯",
      label: "中",
      description: "平衡 / 和谐 / 中庸",
    },
    {
      value: "male",
      symbol: "☯",
      label: "阳",
      description: "坚定 / 开放 / 进取",
    },
  ]

  return (
    <View className="gender-selector">
      <View className="gender-options">
        {genderOptions.map(option => (
          <View
            key={option.value}
            className="gender-option"
            style={getOptionStyle(option.value)}
            onClick={() => handleSelect(option.value)}
          >
            <View className="symbol" style={getSymbolStyle(option.value)}>
              {option.symbol}
            </View>
            <View className="label" style={getLabelStyle(option.value)}>
              {option.label}
            </View>
            <View className="description" style={getDescriptionStyle(option.value)}>
              {option.description}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default GenderSelector
