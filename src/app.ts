import { Component, PropsWithChildren } from 'react'
import './app.scss'
import './i18n'

class App extends Component<PropsWithChildren> {
  // 可以使用所有的 React Hooks
  // useEffect(() => {})

  // 对应 onShow
  // useDidShow(() => {})

  // 对应 onHide
  // useDidHide(() => {})

  render() {
    return this.props.children
  }
}

export default App
