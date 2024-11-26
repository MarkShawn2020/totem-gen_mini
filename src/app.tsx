import { View } from "@tarojs/components"
import { Component, PropsWithChildren } from "react"
import Taro from "@tarojs/taro"
import { I18nextProvider } from "react-i18next"
import i18n from "./i18n"
import "./app.scss"

// 从本地存储获取上次选择的语言
const savedLanguage = Taro.getStorageSync('language')
if (savedLanguage) {
  i18n.changeLanguage(savedLanguage)
}

class App extends Component<PropsWithChildren> {
  override render() {
    return (
      <I18nextProvider i18n={i18n}>
        <View>{this.props.children}</View>
      </I18nextProvider>
    )
  }
}

export default App
