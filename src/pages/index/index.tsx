import { DynamicCssVariableWrapper } from "@/layouts/dynamic-css-variable-wrapper"
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
import MbtiTest from "@/components/MbtiTest"
import NavBar from "@/components/NavBar"
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
    <View className="index" style={{ backgroundColor: themeConfig.backgroundColor }}>
      {/*<TestDynamicCssVariable />*/}

      <NavBar currentStep={step} />

      {renderContent()}
      <StepButtons
        currentStep={step}
        currentTheme={themeConfig}
        totalSteps={3}
        onNextStep={() => setStep(prev => Math.min(prev + 1, FORM_STEPS.length - 1))}
        onPrevStep={() => setStep(prev => Math.max(prev - 1, 0))}
        onSubmit={handleSubmit}
      />
    </View>
  )
}

/**
 * todo: 为什么 AppWrapper 在 app.tsx 里不奏效，但是在 pages 里就可以呢？
 */
const Index = () => {
  return (
    <DynamicCssVariableWrapper>
      <View className="index-container">
        <IndexContent />
      </View>
    </DynamicCssVariableWrapper>
  )
}

export default Index
