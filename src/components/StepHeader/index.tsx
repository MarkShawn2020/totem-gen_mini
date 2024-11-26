import { themeColorAtom } from "@/atoms"
import { themes } from "@/utils/theme"
import { Text, View } from "@tarojs/components"
import { useAtom } from "jotai/react"
import "./index.scss"

interface StepHeaderProps {
  title: string
  description: string
}

const StepHeader = ({ title, description }: StepHeaderProps) => {
  const [colorTheme] = useAtom(themeColorAtom)

  return (
    <View className="step-header">
      <Text className="step-title" style={{ color: themes[colorTheme].primary }}>
        {title}
      </Text>
      <Text className="step-desc">{description}</Text>
    </View>
  )
}

export default StepHeader
