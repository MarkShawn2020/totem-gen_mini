import { themeColorAtom } from "@/atoms"
import { themes } from "@/utils/theme"
import { Text, View } from "@tarojs/components"
import { useAtom } from "jotai/react"
import { ReactNode } from "react"
import "./index.scss"

interface StepLayoutProps {
  title: string
  description: string
  children: ReactNode
}

const StepLayout = ({ title, description, children }: StepLayoutProps) => {
  const [colorTheme] = useAtom(themeColorAtom)

  return (
    <View className="step-content">
      <View className="step-header">
        <Text className="step-title" style={{ color: themes[colorTheme].primary }}>
          {title}
        </Text>
        <Text className="step-desc">{description}</Text>
      </View>
      {children}
    </View>
  )
}

export default StepLayout
