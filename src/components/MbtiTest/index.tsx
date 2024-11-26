import { mbtiSelectionsAtom, themeColorAtom } from "@/atoms"
import StepLayout from "@/layouts/StepLayout"
import { getMBTIDimensions } from "@/utils/mbti"
import { getFormSteps } from "@/utils/steps"
import { themes } from "@/utils/theme"
import { Text, View } from "@tarojs/components"
import { useAtom } from "jotai/react"
import { useTranslation } from "react-i18next"
import "./index.scss"

const MbtiTest = () => {
  const { t } = useTranslation()
  const [colorTheme] = useAtom(themeColorAtom)
  const [mbtiSelections, setMbtiSelections] = useAtom(mbtiSelectionsAtom)
  const steps = getFormSteps()

  // Ensure we always have valid selections
  const selections = Array.isArray(mbtiSelections) ? mbtiSelections : [false, false, false, false]

  const handleSelect = (index: number, value: boolean) => {
    const newSelections = [...selections]
    newSelections[index] = value
    setMbtiSelections(newSelections)
  }

  const dimensions = getMBTIDimensions()
  const mbtiType = dimensions
    .map((_, i) => (selections[i] ? _.right.letter : _.left.letter))
    .join("")

  return (
    <StepLayout title={t(steps[1]!.title)} description={t(steps[1]!.description)}>
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
                  background: !selections[index] ? themes[colorTheme].surface : themes[colorTheme].background,
                  borderColor: !selections[index] ? themes[colorTheme].primary : themes[colorTheme].border,
                }}
                onClick={() => handleSelect(index, false)}
              >
                <View className="type-header">
                  <Text
                    className="type-letter"
                    style={{ color: !selections[index] ? themes[colorTheme].primary : themes[colorTheme].text }}
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
                        color: !selections[index] ? themes[colorTheme].text : "rgba(0,0,0,0.5)",
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
                  background: selections[index] ? themes[colorTheme].surface : themes[colorTheme].background,
                  borderColor: selections[index] ? themes[colorTheme].primary : themes[colorTheme].border,
                }}
                onClick={() => handleSelect(index, true)}
              >
                <View className="type-header">
                  <Text
                    className="type-letter"
                    style={{ color: selections[index] ? themes[colorTheme].primary : themes[colorTheme].text }}
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
                        color: selections[index] ? themes[colorTheme].text : "rgba(0,0,0,0.5)",
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
          borderColor: themes[colorTheme].primary,
          background: themes[colorTheme].surface,
        }}
      >
        <Text className="result-label">{t("mbti.result")}</Text>
        <Text className="result-value" style={{ color: themes[colorTheme].primary }}>
          {mbtiType}
        </Text>
      </View>
    </StepLayout>
  )
}

export default MbtiTest
