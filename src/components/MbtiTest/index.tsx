import { Text, View } from "@tarojs/components"
import { useAtom } from "jotai"
import { currentThemeAtom, mbtiSelectionsAtom } from "../../store/atoms"
import { MBTI_DIMENSIONS } from "../../utils/mbti"
import { FORM_STEPS } from "../../utils/steps"
import "./index.scss"

const MbtiTest = () => {
  const [mbtiSelections, setMbtiSelections] = useAtom(mbtiSelectionsAtom)
  const [currentTheme] = useAtom(currentThemeAtom)

  const mbtiType = MBTI_DIMENSIONS.map((dim, i) =>
    mbtiSelections[i] ? dim.right.letter : dim.left.letter,
  ).join("")

  return (
    <View className="step-content">
      <View className="step-header">
        <Text className="step-title">{FORM_STEPS[1].title}</Text>
        <Text className="step-desc">{FORM_STEPS[1].description}</Text>
      </View>

      <View className="mbti-container">
        {MBTI_DIMENSIONS.map((dimension, index) => (
          <View key={dimension.title} className="mbti-dimension">
            <Text className="dimension-title" style={{ color: currentTheme.primary }}>
              {dimension.title}
            </Text>
            <View className="dimension-options">
              <View
                className={`option ${!mbtiSelections[index] ? "selected" : ""}`}
                style={{
                  backgroundColor: !mbtiSelections[index]
                    ? currentTheme.primary
                    : currentTheme.surface,
                  color: !mbtiSelections[index] ? currentTheme.onPrimary : currentTheme.onSurface,
                }}
                onClick={() => {
                  const newSelections = [...mbtiSelections]
                  newSelections[index] = false
                  setMbtiSelections(newSelections)
                }}
              >
                <Text className="option-letter">{dimension.left.letter}</Text>
                <Text className="option-desc">{dimension.left.description}</Text>
              </View>
              <View
                className={`option ${mbtiSelections[index] ? "selected" : ""}`}
                style={{
                  backgroundColor: mbtiSelections[index]
                    ? currentTheme.primary
                    : currentTheme.surface,
                  color: mbtiSelections[index] ? currentTheme.onPrimary : currentTheme.onSurface,
                }}
                onClick={() => {
                  const newSelections = [...mbtiSelections]
                  newSelections[index] = true
                  setMbtiSelections(newSelections)
                }}
              >
                <Text className="option-letter">{dimension.right.letter}</Text>
                <Text className="option-desc">{dimension.right.description}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View className="mbti-result">
        <Text className="result-label">你的MBTI类型是：</Text>
        <Text className="result-value" style={{ color: currentTheme.primary }}>
          {mbtiType}
        </Text>
      </View>
    </View>
  )
}

export default MbtiTest
