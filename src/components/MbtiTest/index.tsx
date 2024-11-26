import { mbtiSelectionsAtom, themeConfigAtom } from "@/atoms"
import StepLayout from "@/layouts/StepLayout"
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

  console.log("MBTI Selections:", mbtiSelections)

  // Ensure we always have valid selections with more defensive programming
  const selections =
    mbtiSelections == null || !Array.isArray(mbtiSelections)
      ? [false, false, false, false]
      : mbtiSelections.length !== 4
        ? [false, false, false, false]
        : mbtiSelections

  const handleSelect = (index: number, value: boolean) => {
    if (!Array.isArray(selections)) {
      console.error("Selections is not an array:", selections)
      return
    }
    const newSelections = [...selections]
    newSelections[index] = value
    setMbtiSelections(newSelections)
  }

  const dimensions = getMBTIDimensions()
  const mbtiType = dimensions
    .map((_, i) => (selections[i] ? _.right.letter : _.left.letter))
    .join("")

  return (
    <StepLayout description={t(steps[1]!.description)} title={t(steps[1]!.title)}>
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
                onClick={() => handleSelect(index, false)}
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
                    <Text
                      key={i}
                      className="trait"
                      style={{
                        color: !selections[index] ? themeConfig.text : "rgba(0,0,0,0.5)",
                      }}
                    >
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
                onClick={() => handleSelect(index, true)}
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
                    <Text
                      key={i}
                      className="trait"
                      style={{
                        color: selections[index] ? themeConfig.text : "rgba(0,0,0,0.5)",
                      }}
                    >
                      {trait}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View
        className="mbti-result"
        style={{
          borderColor: themeConfig.primary,
          background: themeConfig.surface,
        }}
      >
        <Text className="result-label">{t("mbti.result")}</Text>
        <Text className="result-value" style={{ color: themeConfig.primary }}>
          {mbtiType}
        </Text>
      </View>
    </StepLayout>
  )
}

export default MbtiTest
