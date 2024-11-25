import { Component, type PropsWithChildren } from "react"
// 全局样式
import "./app.scss"

class App extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return this.props.children
  }
}

export default App
