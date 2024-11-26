import { mbtiSelectionsAtom, themeConfigAtom } from "@/atoms"
import { getMBTIDimensions } from "@/utils/mbti"
import { getFormSteps } from "@/utils/steps"
import { Text, View } from "@tarojs/components"
import { useAtom } from "jotai/react"
import { useTranslation } from "react-i18next"
import "./index.scss"

const MbtiTest = () => {
  const { t } = useTranslation()
  const [themeConfig] = useAtom(themeConfigAtom)
  const [mbtiSelections, setMbtiSelections] = useAtom(mbtiSelectionsAtom)
  const steps = getFormSteps()

  // Ensure we always have valid selections
  const selections = Array.isArray(mbtiSelections) ? mbtiSelections : [false, false, false, false]

  const handleToggle = (index: number) => {
    const newSelections = [...selections]
    newSelections[index] = !newSelections[index]
    setMbtiSelections(newSelections)
  }

  const dimensions = getMBTIDimensions()
  const mbtiType = dimensions
    .map((_, i) => (selections[i] ? _.right.letter : _.left.letter))
    .join("")

  return (
    <View className="step-content">
      <View className="step-header">
        <Text className="step-title">{steps[1]!.title}</Text>
        <Text className="step-desc">{steps[1]!.description}</Text>
      </View>

      <View className="mbti-section">
        {dimensions.map((dimension, index) => (
          <View key={dimension.id} className="mbti-dimension">
            <View className="dimension-header">
              <Text className="dimension-title">{dimension.title}</Text>
              <Text className="dimension-desc">{dimension.description}</Text>
            </View>

            <View className="type-options">
              <View
                className={`type-option ${!selections[index] ? "active" : ""}`}
                style={{
                  background: !selections[index] ? themeConfig.surface : themeConfig.background,
                  borderColor: !selections[index] ? themeConfig.primary : themeConfig.border,
                }}
                onClick={() => handleToggle(index)}
              >
                <View className="type-header">
                  <Text
                    className="type-letter"
                    style={{ color: !selections[index] ? themeConfig.primary : themeConfig.text }}
                  >
                    {dimension.left.letter}
                  </Text>
                  <Text className="type-name">{dimension.left.name}</Text>
                </View>
                <View className="type-traits">
                  {dimension.left.traits.map((trait, i) => (
                    <Text key={i} className="trait">
                      {trait}
                    </Text>
                  ))}
                </View>
              </View>

              <View
                className={`type-option ${selections[index] ? "active" : ""}`}
                style={{
                  background: selections[index] ? themeConfig.surface : themeConfig.background,
                  borderColor: selections[index] ? themeConfig.primary : themeConfig.border,
                }}
                onClick={() => handleToggle(index)}
              >
                <View className="type-header">
                  <Text
                    className="type-letter"
                    style={{ color: selections[index] ? themeConfig.primary : themeConfig.text }}
                  >
                    {dimension.right.letter}
                  </Text>
                  <Text className="type-name">{dimension.right.name}</Text>
                </View>
                <View className="type-traits">
                  {dimension.right.traits.map((trait, i) => (
                    <Text key={i} className="trait">
                      {trait}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View className="mbti-result">
        <Text className="result-label">{t("mbti.result")}</Text>
        <Text className="result-value">{mbtiType}</Text>
      </View>
    </View>
  )
}

export default MbtiTest
