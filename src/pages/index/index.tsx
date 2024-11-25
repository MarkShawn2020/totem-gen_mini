"use client"

import { Input } from "@nutui/nutui-react-taro"
import "@nutui/nutui-react-taro/dist/style.css"

import { Text, Textarea, View } from "@tarojs/components"
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
} from "../../atoms"
import GenderSelector from "../../components/GenderSelector"
import YearPicker from "../../components/YearPicker"
import { MBTI_DIMENSIONS } from "../../utils/mbti"
import { COLOR_THEMES, FORM_STEPS } from "../../utils/steps"
import { themes } from "../../utils/theme"

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

  const currentTheme = themes[colorTheme]

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
        setColorTheme(value as any)
        break
    }
  }

  const mbtiType = MBTI_DIMENSIONS.map((dim, i) =>
    mbtiSelections[i] ? dim.right.letter : dim.left.letter,
  ).join("")

  const validateForm = () => {
    const errors = {
      name: "",
      birthYear: "",
      gender: "",
      introduction: "",
    }
    let isValid = true
    let firstErrorField = ""

    if (!name.trim()) {
      errors.name = "请输入姓名"
      isValid = false
      firstErrorField = firstErrorField || "name"
    }
    if (!birthYear) {
      errors.birthYear = "请选择生辰年份"
      isValid = false
      firstErrorField = firstErrorField || "birthYear"
    }
    if (!gender) {
      errors.gender = "请选择性别倾向"
      isValid = false
      firstErrorField = firstErrorField || "gender"
    }
    if (!introduction.trim()) {
      errors.introduction = "请输入个人简介"
      isValid = false
      firstErrorField = firstErrorField || "intro"
    }

    setFormErrors(errors)

    if (!isValid && firstErrorField) {
      // 使用Taro的选择器API获取元素位置
      const query = Taro.createSelectorQuery()
      query
        .select(`.${firstErrorField}-section`)
        .boundingClientRect()
        .exec(res => {
          console.log("Error element rect:", res)
          if (res && res[0]) {
            const rect = res[0]
            // 获取页面滚动位置
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

    return isValid
  }

  const handleSubmit = () => {
    if (!validateForm()) {
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

  const renderStepButtons = () => (
    <View className="step-buttons">
      {currentStep > 0 && (
        <View
          className="step-button prev"
          style={{
            background: currentTheme.surface,
            color: currentTheme.text,
            borderColor: currentTheme.border,
          }}
          onClick={() => setCurrentStep(prev => prev - 1)}
        >
          上一步
        </View>
      )}
      {currentStep < FORM_STEPS.length - 1 ? (
        <View
          className="step-button next"
          style={{
            background: currentTheme.primary,
            color: "#fff",
          }}
          onClick={() => setCurrentStep(prev => prev + 1)}
        >
          下一步
        </View>
      ) : (
        <View
          className="step-button submit"
          style={{
            background: currentTheme.primary,
            color: "#fff",
          }}
          onClick={handleSubmit}
        >
          生成图腾
        </View>
      )}
    </View>
  )

  const renderThemeSelection = () => (
    <View className="step-content">
      <View className="step-header">
        <Text className="step-title">{FORM_STEPS[0].title}</Text>
        <Text className="step-desc">{FORM_STEPS[0].description}</Text>
      </View>
      <View className="theme-grid">
        {COLOR_THEMES.map(theme => (
          <View
            key={theme.value}
            className="theme-option"
            style={{
              background: themes[theme.value].surface,
              borderColor:
                colorTheme === theme.value
                  ? themes[theme.value].primary
                  : themes[theme.value].border,
            }}
            onClick={() => handleInputChange("colorTheme", theme.value)}
          >
            <Text className="theme-name" style={{ color: themes[theme.value].primary }}>
              {theme.name}
            </Text>
            <Text className="theme-desc" style={{ color: themes[theme.value].text }}>
              {theme.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )

  const renderMbtiTest = () => (
    <View className="step-content">
      <View className="step-header">
        <Text className="step-title">{FORM_STEPS[1].title}</Text>
        <Text className="step-desc">{FORM_STEPS[1].description}</Text>
      </View>
      <View className="mbti-section">
        {MBTI_DIMENSIONS.map((dimension, index) => (
          <View key={dimension.id || index} className="mbti-dimension">
            <View className="dimension-header">
              <Text className="dimension-title">{dimension.title}</Text>
              <Text className="dimension-desc">{dimension.description}</Text>
            </View>
            <View className="dimension-content">
              <View className="type-options">
                <View
                  className={`type-option ${!mbtiSelections[index] ? "active" : ""}`}
                  style={{
                    background: !mbtiSelections[index]
                      ? currentTheme.surface
                      : currentTheme.background,
                    borderColor: !mbtiSelections[index]
                      ? currentTheme.primary
                      : currentTheme.border,
                    borderWidth: !mbtiSelections[index] ? "2px" : "1px",
                  }}
                  onClick={() => {
                    const newSelections = [...mbtiSelections]
                    newSelections[index] = false
                    setMbtiSelections(newSelections)
                  }}
                >
                  <Text
                    className="type-letter"
                    style={{
                      color: !mbtiSelections[index] ? currentTheme.primary : currentTheme.secondary,
                    }}
                  >
                    {dimension.left.letter}
                  </Text>
                  <Text
                    className="type-name"
                    style={{
                      color: !mbtiSelections[index] ? currentTheme.primary : currentTheme.secondary,
                    }}
                  >
                    {dimension.left.name}
                  </Text>
                </View>
                <View
                  className={`type-option ${mbtiSelections[index] ? "active" : ""}`}
                  style={{
                    background: mbtiSelections[index]
                      ? currentTheme.surface
                      : currentTheme.background,
                    borderColor: mbtiSelections[index] ? currentTheme.primary : currentTheme.border,
                    borderWidth: mbtiSelections[index] ? "2px" : "1px",
                  }}
                  onClick={() => {
                    const newSelections = [...mbtiSelections]
                    newSelections[index] = true
                    setMbtiSelections(newSelections)
                  }}
                >
                  <Text
                    className="type-letter"
                    style={{
                      color: mbtiSelections[index] ? currentTheme.primary : currentTheme.secondary,
                    }}
                  >
                    {dimension.right.letter}
                  </Text>
                  <Text
                    className="type-name"
                    style={{
                      color: mbtiSelections[index] ? currentTheme.primary : currentTheme.secondary,
                    }}
                  >
                    {dimension.right.name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
        <View className="mbti-result">
          <Text className="result-label">你的MBTI类型：</Text>
          <Text className="result-value">{mbtiType}</Text>
        </View>
      </View>
    </View>
  )

  const renderBasicInfo = () => (
    <View className="step-content">
      <View className="step-header">
        <Text className="step-title">{FORM_STEPS[2].title}</Text>
        <Text className="step-desc">请填写你的基本信息，这些信息将用于生成你独特的图腾</Text>
      </View>
      <View className="input-group">
        <View className="input-section name-section">
          <View className="section-title">
            <Text className="title-text">
              姓名<Text style={{ color: currentTheme.primary }}>*</Text>
            </Text>
            <Text className="title-desc">你希望在图腾中展现的称呼</Text>
          </View>
          <View className="input-container">
            <Input
              className={`custom-input ${formErrors.name ? "error" : ""}`}
              placeholder="请输入你的名字"
              value={name}
              onChange={val => {
                handleInputChange("name", val)
                if (val.trim()) {
                  setFormErrors(prev => ({ ...prev, name: "" }))
                }
              }}
            />
            {formErrors.name && (
              <Text
                className="error-message"
                style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
              >
                {formErrors.name}
              </Text>
            )}
          </View>
        </View>

        <View className="input-section year-section">
          <View className="section-title">
            <Text className="title-text">
              生辰年份<Text style={{ color: currentTheme.primary }}>*</Text>
            </Text>
            <Text className="title-desc">你的出生年份将影响图腾的核心元素</Text>
          </View>
          <YearPicker
            themeColors={currentTheme}
            value={birthYear}
            onChange={val => {
              handleInputChange("birthYear", val)
              setFormErrors(prev => ({ ...prev, birthYear: "" }))
            }}
          />
          {formErrors.birthYear && (
            <Text
              className="error-message"
              style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
            >
              {formErrors.birthYear}
            </Text>
          )}
        </View>

        <View className="input-section gender-section">
          <View className="section-title">
            <Text className="title-text">
              性别倾向<Text style={{ color: currentTheme.primary }}>*</Text>
            </Text>
            <Text className="title-desc">选择更适合你的性别特征，这将影响图腾的整体风格</Text>
          </View>
          <GenderSelector
            themeColors={currentTheme}
            value={gender}
            onChange={value => {
              handleInputChange("gender", value)
              setFormErrors(prev => ({ ...prev, gender: "" }))
            }}
          />
          {formErrors.gender && (
            <Text
              className="error-message"
              style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
            >
              {formErrors.gender}
            </Text>
          )}
        </View>

        <View className="input-section intro-section">
          <View className="section-title">
            <Text className="title-text">
              个人简介<Text style={{ color: currentTheme.primary }}>*</Text>
            </Text>
            <Text className="title-desc">描述一下你的性格、爱好或期望，这些将融入你的图腾中</Text>
          </View>
          <View className="textarea-container">
            <Textarea
              className={`custom-textarea ${formErrors.introduction ? "error" : ""}`}
              maxlength={200}
              placeholder="例如：我是一个热爱艺术的人，喜欢探索新事物..."
              style={{
                background: "#ffffff",
                padding: "12px",
                borderRadius: "8px",
                border: `1px solid ${formErrors.introduction ? "#ff4d4f" : currentTheme.border}`,
                height: "120px",
              }}
              value={introduction}
              onInput={e => {
                handleInputChange("introduction", e.detail.value)
                if (e.detail.value.trim()) {
                  setFormErrors(prev => ({ ...prev, introduction: "" }))
                }
              }}
            />
            {formErrors.introduction && (
              <Text
                className="error-message"
                style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
              >
                {formErrors.introduction}
              </Text>
            )}
            <Text className="word-count" style={{ color: currentTheme.secondary }}>
              {introduction.length}/200
            </Text>
          </View>
        </View>
      </View>
    </View>
  )

  return (
    // <Provider>
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

      {currentStep === 0 && renderThemeSelection()}
      {currentStep === 1 && renderMbtiTest()}
      {currentStep === 2 && renderBasicInfo()}

      {renderStepButtons()}
    </View>
    // </Provider>
  )
}

export default Index
