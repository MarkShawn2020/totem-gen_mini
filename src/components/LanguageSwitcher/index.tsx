import { themeConfigAtom } from "@/atoms"
import { Picker, View, Text } from "@tarojs/components"
import { useAtom } from "jotai/react"
import { useTranslation } from "react-i18next"
import "./index.scss"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [themeConfig] = useAtom(themeConfigAtom)

  const languages = [
    { value: "zh", label: "中文" },
    { value: "en", label: "English" },
    { value: "ja", label: "日本語" },
  ]

  const handleLanguageChange = e => {
    const index = parseInt(e.detail.value)
    i18n.changeLanguage(languages[index].value)
  }

  return (
    <View className="language-switcher">
      <Picker mode="selector" range={languages} rangeKey="label" onChange={handleLanguageChange}>
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
