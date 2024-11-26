import { View } from "@tarojs/components"
import { Component, PropsWithChildren } from "react"
import "./app.scss"
import "./i18n"

class App extends Component<PropsWithChildren> {
  override render() {
    return <View>{this.props.children}</View>
  }
}

export default App
