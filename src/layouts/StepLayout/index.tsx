import { themeConfigAtom } from "@/atoms"
import { Text, View } from "@tarojs/components"
import { useAtom } from "jotai/react"
import type { ReactNode } from "react"
import "./index.scss"

interface StepLayoutProps {
  title: string
  description: string
  children: ReactNode
}

const StepLayout = ({ title, description, children }: StepLayoutProps) => {
  const [themeConfig] = useAtom(themeConfigAtom)

  return (
    <View className="step-content">
      <View className="step-header">
        <Text className="step-title" style={{ color: themeConfig.primary }}>
          {title}
        </Text>
        <Text className="step-desc">{description}</Text>
      </View>
      {children}
    </View>
  )
}

export default StepLayout
