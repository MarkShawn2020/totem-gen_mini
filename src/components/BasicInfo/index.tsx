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
import { FORM_STEPS } from "@/utils/steps"
import { Input } from "@nutui/nutui-react-taro"
import { Text, Textarea, View } from "@tarojs/components"
import { useAtom } from "jotai/react"

const BasicInfo = () => {
  const [themeConfig] = useAtom(themeConfigAtom)
  const [name, setName] = useAtom(nameAtom)
  const [birthYear, setBirthYear] = useAtom(birthYearAtom)
  const [gender, setGender] = useAtom(genderAtom)
  const [introduction, setIntroduction] = useAtom(introductionAtom)
  const [formErrors, setFormErrors] = useAtom(formErrorsAtom)

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
    <View className="step-content">
      <View className="step-header">
        <Text className="step-title">{FORM_STEPS[2]!.title}</Text>
        <Text className="step-desc">请填写你的基本信息，这些信息将用于生成你独特的图腾</Text>
      </View>
      <View className="input-group">
        <View className="input-section name-section">
          <View className="section-title">
            <Text className="title-text">
              姓名<Text style={{ color: themeConfig.primary }}>*</Text>
            </Text>
            <Text className="title-desc">你希望在图腾中展现的称呼</Text>
          </View>
          <View className="input-container">
            <Input
              className={`custom-input ${formErrors.name ? "error" : ""}`}
              placeholder="请输入你的名字"
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
              生辰年份<Text style={{ color: themeConfig.primary }}>*</Text>
            </Text>
            <Text className="title-desc">你的出生年份将影响图腾的核心元素</Text>
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
              性别倾向<Text style={{ color: themeConfig.primary }}>*</Text>
            </Text>
            <Text className="title-desc">选择更适合你的性别特征，这将影响图腾的整体风格</Text>
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
              个人简介<Text style={{ color: themeConfig.primary }}>*</Text>
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
    </View>
  )
}

export default BasicInfo
