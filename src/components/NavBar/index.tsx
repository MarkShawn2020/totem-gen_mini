import { themeConfigAtom } from "@/atoms"
import { View } from "@tarojs/components"
import { useAtom } from "jotai/react"
import LanguageSwitcher from "../LanguageSwitcher"
import "./index.scss"

interface NavBarProps {
  currentStep: number
  totalSteps?: number
}

const NavBar = ({ currentStep, totalSteps = 3 }: NavBarProps) => {
  const [themeConfig] = useAtom(themeConfigAtom)

  return (
    <View
      className="nav-bar"
      style={{
        background: `${themeConfig.backgroundColor}cc`,
      }}
    >
      <View className="nav-bar-content">
        <View className="step-indicator">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View
              key={index}
              className={`step-dot ${index === currentStep ? "active" : ""}`}
              style={{
                background: index === currentStep ? themeConfig.primary : themeConfig.surface,
                borderColor: themeConfig.border,
              }}
            />
          ))}
        </View>
        <View className="language-switcher-wrapper">
          <LanguageSwitcher />
        </View>
      </View>
    </View>
  )
}

export default NavBar
