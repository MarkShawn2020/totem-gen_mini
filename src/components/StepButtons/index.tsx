import type { StepButtonsProps } from "@/types"
import { View } from "@tarojs/components"

const StepButtons: React.FC<StepButtonsProps> = ({
  currentStep,
  totalSteps,
  currentTheme,
  onPrevStep,
  onNextStep,
  onSubmit,
}) => {
  return (
    <View className="step-buttons">
      {currentStep > 0 && (
        <View
          className="step-button prev"
          style={{
            background: currentTheme.surface,
            color: currentTheme.text,
            borderColor: currentTheme.border,
          }}
          onClick={onPrevStep}
        >
          上一步
        </View>
      )}
      {currentStep < totalSteps - 1 ? (
        <View
          className="step-button next"
          style={{
            background: currentTheme.primary,
            color: "#fff",
          }}
          onClick={onNextStep}
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
          onClick={onSubmit}
        >
          生成图腾
        </View>
      )}
    </View>
  )
}

export default StepButtons
