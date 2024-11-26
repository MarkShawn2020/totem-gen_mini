import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "./locales/en"
import ja from "./locales/ja"
import zh from "./locales/zh"

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    zh: {
      translation: zh,
    },
    ja: {
      translation: ja,
    },
  },
  lng: "zh", // default language
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
