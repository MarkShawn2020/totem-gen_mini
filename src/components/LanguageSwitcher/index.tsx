import { themeConfigAtom } from "@/atoms"
import { Picker, View, Text } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useAtom } from "jotai/react"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import "./index.scss"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [themeConfig] = useAtom(themeConfigAtom)
  const [, setForceUpdate] = useState({})

  const languages = [
    { value: "zh", label: "中文" },
    { value: "en", label: "English" },
    { value: "ja", label: "日本語" },
  ]

  // 获取当前语言的索引
  const getCurrentIndex = () => {
    const currentLang = i18n.language
    return languages.findIndex(lang => lang.value === currentLang)
  }

  const handleLanguageChange = e => {
    const index = parseInt(e.detail.value)
    const newLang = languages[index].value
    // 保存语言选择到本地存储
    Taro.setStorageSync('language', newLang)
    i18n.changeLanguage(newLang).then(() => {
      // 强制组件树重新渲染
      setForceUpdate({})
    })
  }

  return (
    <View className="language-switcher">
      <Picker
        mode="selector"
        range={languages}
        rangeKey="label"
        onChange={handleLanguageChange}
        value={getCurrentIndex()}
      >
        <View
          className="language-button"
          style={{
            borderColor: themeConfig.border,
            color: themeConfig.primary,
          }}
        >
          <Text className="icon">語</Text>
        </View>
      </Picker>
    </View>
  )
}

export default LanguageSwitcher
