import {
  birthYearAtom,
  formErrorsAtom,
  genderAtom,
  introductionAtom,
  nameAtom,
  themeConfigAtom,
} from "@/atoms"
import GenderSelector from "@/components/GenderSelector"
import YearPicker from "@/components/YearPicker"
import StepLayout from "@/layouts/StepLayout"
import { getFormSteps } from "@/utils/steps"

import { Input } from "@nutui/nutui-react-taro"
import { Text, Textarea, View } from "@tarojs/components"
import { useAtom } from "jotai/react"
import { useTranslation } from "react-i18next"
import "./index.scss"

const BasicInfo = () => {
  const [name, setName] = useAtom(nameAtom)
  const [birthYear, setBirthYear] = useAtom(birthYearAtom)
  const [gender, setGender] = useAtom(genderAtom)
  const [introduction, setIntroduction] = useAtom(introductionAtom)
  const [formErrors, setFormErrors] = useAtom(formErrorsAtom)
  const { t } = useTranslation()

  const steps = getFormSteps()
  const themeConfig = useAtom(themeConfigAtom)

  const handleNameChange = (val: string) => {
    setName(val)
    if (val.trim()) {
      setFormErrors(prev => ({ ...prev, name: "" }))
    }
  }

  const handleBirthYearChange = (val: string) => {
    setBirthYear(val)
    setFormErrors(prev => ({ ...prev, birthYear: "" }))
  }

  const handleGenderChange = (value: string) => {
    setGender(value)
    setFormErrors(prev => ({ ...prev, gender: "" }))
  }

  const handleIntroductionChange = (e: any) => {
    const value = e.detail.value
    setIntroduction(value)
    if (value.trim()) {
      setFormErrors(prev => ({ ...prev, introduction: "" }))
    }
  }

  return (
    <StepLayout description={t("basicInfo.description")} title={t(steps[2]!.title)}>
      <View className="input-group">
        <View className="input-section name-section">
          <View className="section-title">
            <Text className="title-text">
              {t("basicInfo.name.label")}
              <Text style={{ color: themeConfig.primary }}>{t("basicInfo.name.required")}</Text>
            </Text>
            <Text className="title-desc">{t("basicInfo.name.description")}</Text>
          </View>
          <View className="input-container">
            <Input
              className={`custom-input ${formErrors.name ? "error" : ""}`}
              placeholder={t("basicInfo.name.placeholder")}
              value={name}
              onChange={handleNameChange}
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
              {t("basicInfo.birthYear.label")}
              <Text style={{ color: themeConfig.primary }}>
                {t("basicInfo.birthYear.required")}
              </Text>
            </Text>
            <Text className="title-desc">{t("basicInfo.birthYear.description")}</Text>
          </View>
          <YearPicker
            themeColors={themeConfig}
            value={birthYear}
            onChange={handleBirthYearChange}
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
              {t("basicInfo.gender.label")}
              <Text style={{ color: themeConfig.primary }}>{t("basicInfo.gender.required")}</Text>
            </Text>
            <Text className="title-desc">{t("basicInfo.gender.description")}</Text>
          </View>
          <GenderSelector themeConfig={themeConfig} value={gender} onChange={handleGenderChange} />
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
              {t("basicInfo.bio.label")}
              <Text style={{ color: themeConfig.primary }}>{t("basicInfo.bio.required")}</Text>
            </Text>
            <Text className="title-desc">{t("basicInfo.bio.description")}</Text>
          </View>
          <View className="textarea-container">
            <Textarea
              className={`custom-textarea ${formErrors.introduction ? "error" : ""}`}
              maxlength={200}
              placeholder={t("basicInfo.bio.placeholder")}
              style={{
                background: "#ffffff",
                padding: "12px",
                borderRadius: "8px",
                border: `1px solid ${formErrors.introduction ? "#ff4d4f" : themeConfig.border}`,
                height: "120px",
              }}
              value={introduction}
              onInput={handleIntroductionChange}
            />
            {formErrors.introduction && (
              <Text
                className="error-message"
                style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
              >
                {formErrors.introduction}
              </Text>
            )}
            <Text className="word-count" style={{ color: themeConfig.secondary }}>
              {(introduction || "").length}/200
            </Text>
          </View>
        </View>
      </View>
    </StepLayout>
  )
}

export default BasicInfo
