import "@nutui/nutui-react-taro/dist/style.css"

import {
  birthYearAtom,
  currentStepAtom,
  currentThemeAtom,
  genderAtom,
  introductionAtom,
  nameAtom,
} from "@/atoms"
import { FORM_STEPS } from "@/utils/steps"
import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useAtom } from "jotai"
import BasicInfo from "./components/BasicInfo"
import MbtiTest from "./components/MbtiTest"
import StepButtons from "./components/StepButtons"
import ThemeSelection from "./components/ThemeSelection"
import { validateForm } from "./utils/validation"

import "./index.scss"

const IndexContent = () => {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom)
  const [currentTheme] = useAtom(currentThemeAtom)
  const [name] = useAtom(nameAtom)
  const [birthYear] = useAtom(birthYearAtom)
  const [gender] = useAtom(genderAtom)
  const [introduction] = useAtom(introductionAtom)

  const handleSubmit = () => {
    const { isValid, errors, firstErrorField } = validateForm(name, birthYear, gender, introduction)

    if (!isValid) {
      if (firstErrorField) {
        const query = Taro.createSelectorQuery()
        query
          .select(`.${firstErrorField}-section`)
          .boundingClientRect()
          .exec(res => {
            if (res && res[0]) {
              const rect = res[0]
              Taro.createSelectorQuery()
                .selectViewport()
                .scrollOffset()
                .exec(scrollRes => {
                  if (scrollRes && scrollRes[0]) {
                    const scrollTop = scrollRes[0].scrollTop + rect.top - 100
                    Taro.pageScrollTo({
                      scrollTop,
                      duration: 300,
                    })
                  }
                })
            }
          })
      }
      return
    }

    console.log("提交数据:", {
      name,
      birthYear,
      gender,
      introduction,
    })
  }

  // Render content based on current step
  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <ThemeSelection />
      case 1:
        return <MbtiTest />
      case 2:
        return <BasicInfo />
      default:
        return null
    }
  }

  return (
    <View className="index">
      <View className="step-indicator">
        {[0, 1, 2].map(step => (
          <View
            key={step}
            className={`step-dot ${currentStep === step ? "active" : ""}`}
            style={{
              background: currentStep === step ? currentTheme.primary : currentTheme.surface,
              borderColor: currentTheme.border,
            }}
          />
        ))}
      </View>

      {renderContent()}

      <StepButtons
        currentStep={currentStep}
        currentTheme={currentTheme}
        totalSteps={FORM_STEPS.length}
        onNextStep={() => setCurrentStep(prev => Math.min(prev + 1, FORM_STEPS.length - 1))}
        onPrevStep={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
        onSubmit={handleSubmit}
      />
    </View>
  )
}

const Index = () => {
  return (
    <View className="index-container">
      <IndexContent />
    </View>
  )
}

export default Index
