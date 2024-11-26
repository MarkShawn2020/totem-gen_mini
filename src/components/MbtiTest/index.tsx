import { mbtiSelectionsAtom, themeConfigAtom } from "@/atoms"
import { MBTI_DIMENSIONS } from "@/utils/mbti"
import { FORM_STEPS } from "@/utils/steps"
import { Text, View } from "@tarojs/components"
import { useAtom } from "jotai/react"

const MbtiTest = () => {
  const [themeConfig] = useAtom(themeConfigAtom)
  const [mbtiSelections, setMbtiSelections] = useAtom(mbtiSelectionsAtom)

  // Ensure we always have valid selections
  const selections = Array.isArray(mbtiSelections) ? mbtiSelections : [false, false, false, false]

  const handleToggle = (index: number) => {
    const newSelections = [...selections]
    newSelections[index] = !newSelections[index]
    setMbtiSelections(newSelections)
  }

  const mbtiType = MBTI_DIMENSIONS.map((dim, i) =>
    selections[i] ? dim.right.letter : dim.left.letter,
  ).join("")

  return (
    <View className="step-content">
      <View className="step-header">
        <Text className="step-title">{FORM_STEPS[1]!.title}</Text>
        <Text className="step-desc">{FORM_STEPS[1]!.description}</Text>
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
                  className={`type-option ${!selections[index] ? "active" : ""}`}
                  style={{
                    background: !selections[index] ? themeConfig.surface : themeConfig.background,
                    borderColor: !selections[index] ? themeConfig.primary : themeConfig.border,
                    borderWidth: !selections[index] ? "2px" : "1px",
                  }}
                  onClick={() => handleToggle(index)}
                >
                  <Text
                    className="type-letter"
                    style={{
                      color: !selections[index] ? themeConfig.primary : themeConfig.secondary,
                    }}
                  >
                    {dimension.left.letter}
                  </Text>
                  <Text
                    className="type-name"
                    style={{
                      color: !selections[index] ? themeConfig.primary : themeConfig.secondary,
                    }}
                  >
                    {dimension.left.name}
                  </Text>
                </View>

                <View
                  className={`type-option ${selections[index] ? "active" : ""}`}
                  style={{
                    background: selections[index] ? themeConfig.surface : themeConfig.background,
                    borderColor: selections[index] ? themeConfig.primary : themeConfig.border,
                    borderWidth: selections[index] ? "2px" : "1px",
                  }}
                  onClick={() => handleToggle(index)}
                >
                  <Text
                    className="type-letter"
                    style={{
                      color: selections[index] ? themeConfig.primary : themeConfig.secondary,
                    }}
                  >
                    {dimension.right.letter}
                  </Text>
                  <Text
                    className="type-name"
                    style={{
                      color: selections[index] ? themeConfig.primary : themeConfig.secondary,
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
