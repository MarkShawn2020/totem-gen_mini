import "@nutui/nutui-react-taro/dist/style.css"

import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useAtom } from "jotai/react"

import {
  birthYearAtom,
  colorThemeAtom,
  currentStepAtom,
  formErrorsAtom,
  genderAtom,
  introductionAtom,
  mbtiSelectionsAtom,
  nameAtom,
} from "@/atoms"
import { MBTI_DIMENSIONS } from "@/utils/mbti"
import { FORM_STEPS } from "@/utils/steps"
import { themes } from "@/utils/theme"
import BasicInfo from "./components/BasicInfo"
import MbtiTest from "./components/MbtiTest"
import StepButtons from "./components/StepButtons"
import ThemeSelection from "./components/ThemeSelection"
import { validateForm } from "./utils/validation"

import "./index.scss"

const Index = () => {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom)
  const [name, setName] = useAtom(nameAtom)
  const [birthYear, setBirthYear] = useAtom(birthYearAtom)
  const [gender, setGender] = useAtom(genderAtom)
  const [introduction, setIntroduction] = useAtom(introductionAtom)
  const [colorTheme, setColorTheme] = useAtom(colorThemeAtom)
  const [mbtiSelections, setMbtiSelections] = useAtom(mbtiSelectionsAtom)
  const [formErrors, setFormErrors] = useAtom(formErrorsAtom)

  // Handle default values for null states
  const actualStep = currentStep ?? 0
  const actualName = name ?? ""
  const actualBirthYear = birthYear ?? ""
  const actualGender = gender ?? "neutral"
  const actualIntroduction = introduction ?? ""
  const actualColorTheme = colorTheme ?? "dark"
  const actualMbtiSelections = mbtiSelections ?? [false, false, false, false]

  // Ensure we always have a valid theme
  const currentTheme = themes[actualColorTheme]

  const handleInputChange = (key: string, value: string) => {
    switch (key) {
      case "name":
        setName(value)
        break
      case "birthYear":
        setBirthYear(value)
        break
      case "gender":
        setGender(value)
        break
      case "introduction":
        setIntroduction(value)
        break
      case "colorTheme":
        setColorTheme(value)
        break
    }
  }

  const mbtiType = MBTI_DIMENSIONS.map((dim, i) =>
    (actualMbtiSelections || [false, false, false, false])[i] ? dim.right.letter : dim.left.letter
  ).join("")

  const handleSubmit = () => {
    const { isValid, errors, firstErrorField } = validateForm(actualName, actualBirthYear, actualGender, actualIntroduction)
    setFormErrors(errors)

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
      name: actualName,
      birthYear: actualBirthYear,
      gender: actualGender,
      introduction: actualIntroduction,
      mbtiType,
    })
  }

  // Debug logs
  console.log('Rendering Index component')
  console.log('Current step:', actualStep)
  console.log('Current theme:', actualColorTheme)
  console.log('MBTI selections:', actualMbtiSelections)

  // Render content based on current step
  const renderContent = () => {
    switch (actualStep) {
      case 0:
        return (
          <ThemeSelection
            colorTheme={actualColorTheme}
            currentTheme={currentTheme}
            onThemeChange={value => handleInputChange("colorTheme", value)}
          />
        )
      case 1:
        return (
          <MbtiTest
            currentTheme={currentTheme}
            mbtiSelections={actualMbtiSelections}
            mbtiType={mbtiType}
            onMbtiChange={setMbtiSelections}
          />
        )
      case 2:
        return (
          <BasicInfo
            birthYear={actualBirthYear}
            currentTheme={currentTheme}
            formErrors={formErrors}
            gender={actualGender}
            introduction={actualIntroduction}
            name={actualName}
            onErrorUpdate={setFormErrors}
            onInputChange={handleInputChange}
          />
        )
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
            className={`step-dot ${actualStep === step ? "active" : ""}`}
            style={{
              background: actualStep === step ? currentTheme.primary : currentTheme.surface,
              borderColor: currentTheme.border,
            }}
          />
        ))}
      </View>

      {renderContent()}

      <StepButtons
        currentStep={actualStep}
        currentTheme={currentTheme}
        totalSteps={FORM_STEPS.length}
        onNextStep={() => setCurrentStep(prev => Math.min(prev + 1, FORM_STEPS.length - 1))}
        onPrevStep={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
        onSubmit={handleSubmit}
      />
    </View>
  )
}

export default Index
