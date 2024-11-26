import "@nutui/nutui-react-taro/dist/style.css"

import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useAtom } from "jotai"

import {
  birthYearAtom,
  genderAtom,
  introductionAtom,
  nameAtom,
  stepAtom,
  themeConfigAtom,
} from "@/atoms"
import { getFormSteps } from "@/utils/steps"
import { validateForm } from "@/utils/validation"

import BasicInfo from "@/components/BasicInfo"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import MbtiTest from "@/components/MbtiTest"
import StepButtons from "@/components/StepButtons"
import ThemeSelection from "@/components/ThemeSelection"

import "./index.scss"

const IndexContent = () => {
  const [step, setStep] = useAtom<number>(stepAtom)
  const [themeConfig] = useAtom(themeConfigAtom)
  const [name] = useAtom(nameAtom)
  const [birthYear] = useAtom(birthYearAtom)
  const [gender] = useAtom(genderAtom)
  const [introduction] = useAtom(introductionAtom)

  const FORM_STEPS = getFormSteps()

  console.log({ step, themeConfig, name, birthYear, gender, introduction })

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
    switch (step) {
      case 1:
        return <MbtiTest />
      case 2:
        return <BasicInfo />
      case 0:
      default:
        return <ThemeSelection />
    }
  }

  return (
    <View className="index">
      <View className="language-switcher-container">
        <LanguageSwitcher />
      </View>

      <View className="step-indicator">
        {[0, 1, 2].map(_ => (
          <View
            key={_}
            className={`step-dot ${_ === step ? "active" : ""}`}
            style={{
              background: _ === step ? themeConfig.primary : themeConfig.surface,
              borderColor: themeConfig.border,
            }}
          />
        ))}
      </View>

      {renderContent()}

      <StepButtons
        currentStep={step}
        currentTheme={themeConfig}
        totalSteps={FORM_STEPS.length}
        onNextStep={() => setStep(prev => Math.min(prev + 1, FORM_STEPS.length - 1))}
        onPrevStep={() => setStep(prev => Math.max(prev - 1, 0))}
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
