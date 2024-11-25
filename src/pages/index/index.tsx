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

  // Ensure we always have a valid theme by providing a default
  const currentTheme = themes[colorTheme || "dark"]

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
    mbtiSelections[i] ? dim.right.letter : dim.left.letter
  ).join("")

  const handleSubmit = () => {
    const { isValid, errors, firstErrorField } = validateForm(name, birthYear, gender, introduction)
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
      name,
      birthYear,
      gender,
      introduction,
      mbtiType,
    })
  }

  // Debug logs
  console.log('Rendering Index component')
  console.log('Current step:', currentStep)
  console.log('Current theme:', colorTheme)
  console.log('MBTI selections:', mbtiSelections)

  // Render content based on current step
  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ThemeSelection
            colorTheme={colorTheme || "dark"}
            currentTheme={currentTheme}
            onThemeChange={value => handleInputChange("colorTheme", value)}
          />
        )
      case 1:
        return (
          <MbtiTest
            currentTheme={currentTheme}
            mbtiSelections={mbtiSelections}
            mbtiType={mbtiType}
            onMbtiChange={setMbtiSelections}
          />
        )
      case 2:
        return (
          <BasicInfo
            birthYear={birthYear}
            currentTheme={currentTheme}
            formErrors={formErrors}
            gender={gender}
            introduction={introduction}
            name={name}
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
        currentStep={currentStep || 0}
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
