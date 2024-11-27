import { View } from "@tarojs/components"
import "./index.scss"

export default function TestDynamicCssVariable() {
  return (
    <View className="test-color">
      <View className="">默认颜色</View>
      <View className="test-1">测试颜色1</View>
      <View className="test-2">测试颜色2</View>
    </View>
  )
}
