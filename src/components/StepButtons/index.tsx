import type { StepButtonsProps } from "@/types"
import { hexToHSL } from "@/utils/color"
import { View } from "@tarojs/components"
import "./index.scss"

const StepButtons: React.FC<StepButtonsProps> = ({
  currentStep,
  totalSteps,
  currentTheme,
  onPrevStep,
  onNextStep,
  onSubmit,
}) => {
  // 判断颜色是否较亮
  const isLightColor = (color: string) => {
    const { l } = hexToHSL(color)
    return l > 65
  }

  // 获取主按钮样式
  const getPrimaryButtonStyle = () => {
    const isPrimaryLight = isLightColor(currentTheme.primary)
    return {
      background: currentTheme.primary,
      color: isPrimaryLight ? currentTheme.text : currentTheme.surface,
      borderColor: currentTheme.primary,
      boxShadow: isPrimaryLight ? `0 0 0 1px ${currentTheme.border}` : "none",
    }
  }

  return (
    <View
      className="step-buttons"
      style={{
        background: currentTheme.background,
        borderTop: `1px solid ${currentTheme.border}`,
      }}
    >
      {currentStep > 0 && (
        <View
          className="step-button prev"
          style={{
            background: currentTheme.surface,
            color: currentTheme.text,
            borderColor: currentTheme.border,
            boxShadow: `0 0 0 1px ${currentTheme.border}`,
          }}
          onClick={onPrevStep}
        >
          上一步
        </View>
      )}
      {currentStep < totalSteps - 1 ? (
        <View className="step-button next" style={getPrimaryButtonStyle()} onClick={onNextStep}>
          下一步
        </View>
      ) : (
        <View className="step-button submit" style={getPrimaryButtonStyle()} onClick={onSubmit}>
          生成图腾
        </View>
      )}
    </View>
  )
}

export default StepButtons
