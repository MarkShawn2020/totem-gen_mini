import Taro from "@tarojs/taro"
import { Component, type PropsWithChildren } from "react"
import { I18nextProvider } from "react-i18next"
import "./app.scss"
import i18n from "./i18n"

// 从本地存储获取上次选择的语言
const savedLanguage = Taro.getStorageSync("language")
// todo: validate language
if (savedLanguage) {
  i18n.changeLanguage(savedLanguage)
}

class App extends Component<PropsWithChildren> {
  override render() {
    return <I18nextProvider i18n={i18n}>{this.props.children}</I18nextProvider>
  }
}

export default App
