import { Input } from "@nutui/nutui-react-taro"
import { Text, Textarea, View } from "@tarojs/components"
import { FORM_STEPS } from "@/utils/steps"
import GenderSelector from "@/components/GenderSelector"
import YearPicker from "@/components/YearPicker"
import { BasicInfoProps } from "../../types"

const BasicInfo: React.FC<BasicInfoProps> = ({
  name,
  birthYear,
  gender,
  introduction,
  formErrors,
  currentTheme,
  onInputChange,
  onErrorUpdate,
}) => {
  return (
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
                onInputChange("name", val)
                if (val.trim()) {
                  onErrorUpdate({ ...formErrors, name: "" })
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
              onInputChange("birthYear", val)
              onErrorUpdate({ ...formErrors, birthYear: "" })
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
              onInputChange("gender", value)
              onErrorUpdate({ ...formErrors, gender: "" })
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
                onInputChange("introduction", e.detail.value)
                if (e.detail.value.trim()) {
                  onErrorUpdate({ ...formErrors, introduction: "" })
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
}

export default BasicInfo
