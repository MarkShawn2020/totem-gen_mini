import { Text, View } from "@tarojs/components"
import { MBTI_DIMENSIONS } from "@/utils/mbti"
import { FORM_STEPS } from "@/utils/steps"
import { MbtiTestProps } from "../../types"

const MbtiTest: React.FC<MbtiTestProps> = ({
  mbtiSelections,
  onMbtiChange,
  currentTheme,
  mbtiType,
}) => {
  return (
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
                    onMbtiChange(newSelections)
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
                    onMbtiChange(newSelections)
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
}

export default MbtiTest
