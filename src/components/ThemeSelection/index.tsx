import { themeColorAtom } from "@/atoms"
import StepLayout from "@/layouts/StepLayout"
import type { Color } from "@/types"
import { BASE_COLORS, categorizeColors, generateColorSchemes } from "@/utils/colorUtils"
import { getFormSteps } from "@/utils/steps"
import { ScrollView, Text, View } from "@tarojs/components"
import { useAtom } from "jotai/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import "./index.scss"

// 添加动画配置类型
interface AnimationConfig {
  rotation: {
    baseSpeed: number // 基础旋转速度
    maxSpeed: number // 最大旋转速度
    acceleration: number // 加速度
    frameInterval: number // 帧间隔 (ms)
    deceleration: number // 减速度
    minSpeed: number // 最小速度阈值
  }
  interaction: {
    longPressDelay: number // 长按触发时间 (ms)
    stopDuration: number // 停止时的过渡动画时长 (ms)
  }
  alignment: {
    smoothing: number // 对齐平滑度 (0-1)
  }
}

const ThemeSelection = () => {
  const { t } = useTranslation()
  const [colorTheme, setColorTheme] = useAtom(themeColorAtom)
  const steps = getFormSteps()

  // 状态管理
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("red")
  const [showSchemes, setShowSchemes] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const wheelRef = useRef<any>()
  const animationRef = useRef<number>()
  const longPressTimerRef = useRef<any>()
  const lastFrameTimeRef = useRef<number>(0)

  // 获取分类后的颜色
  const colorSeries = useMemo(() => categorizeColors(), [])

  // 获取当前选中颜色的配色方案
  const colorSchemes = useMemo(() => {
    if (!selectedColor) return null
    return generateColorSchemes(selectedColor.rgb)
  }, [selectedColor])

  // 获取当前分类的颜色
  const currentColors = useMemo(() => {
    return colorSeries.find(series => series.name === activeCategory)?.colors || []
  }, [colorSeries, activeCategory])

  // 修改 handleColorSelect 函数来处理类型转换
  const handleColorSelect = (color: Color) => {
    setSelectedColor(color)
    // 转换 Color 为 JapaneseColor 类型
    const japaneseColor = {
      ...color,
      R: parseInt(color.rgb.split(",")[0]),
      G: parseInt(color.rgb.split(",")[1]),
      B: parseInt(color.rgb.split(",")[2]),
    }
    setColorTheme(japaneseColor)
    setShowSchemes(true)
  }

  // 更新动画配置
  const [animationConfig, setAnimationConfig] = useState<AnimationConfig>({
    rotation: {
      baseSpeed: 5,
      maxSpeed: 15,
      acceleration: 0.1,
      frameInterval: 16,
      deceleration: 0.98,
      minSpeed: 0.5,
    },
    interaction: {
      longPressDelay: 200,
      stopDuration: 500,
    },
    alignment: {
      smoothing: 0.5,
    },
  })

  // 添加速度状态
  const speedRef = useRef(animationConfig.rotation.baseSpeed)
  const frameIdRef = useRef<NodeJS.Timeout>()
  const isSpinningRef = useRef(false)

  // 修改旋转函数
  const startSpinning = () => {
    console.log("Starting spin animation")

    setIsSpinning(true)
    isSpinningRef.current = true
    speedRef.current = animationConfig.rotation.baseSpeed

    const spin = () => {
      if (!isSpinningRef.current) {
        console.log("Spin stopped")
        return
      }

      // 增加速度
      speedRef.current = Math.min(
        speedRef.current + animationConfig.rotation.acceleration,
        animationConfig.rotation.maxSpeed,
      )

      // 更新旋转角度
      setWheelRotation(prev => {
        const newRotation = prev + speedRef.current
        console.log("Current speed:", speedRef.current, "New rotation:", newRotation)
        return newRotation
      })

      // 继续下一帧
      frameIdRef.current = setTimeout(spin, animationConfig.rotation.frameInterval)
    }

    if (frameIdRef.current) {
      clearTimeout(frameIdRef.current)
    }

    spin()
  }

  // 修改停止函数，移除对齐逻辑
  const stopSpinning = () => {
    console.log("Stopping spin")
    isSpinningRef.current = false
    setIsSpinning(false)

    const decelerate = () => {
      // 应用减速
      speedRef.current *= animationConfig.rotation.deceleration

      // 如果速度大于最小阈值，继续旋转
      if (speedRef.current > animationConfig.rotation.minSpeed) {
        setWheelRotation(prev => prev + speedRef.current)
        frameIdRef.current = setTimeout(decelerate, animationConfig.rotation.frameInterval)
      } else {
        // 速度足够小时，直接停止
        if (frameIdRef.current) {
          clearTimeout(frameIdRef.current)
          frameIdRef.current = undefined
        }

        // 更新当前分类
        const categoryCount = colorSeries.length
        const sectionAngle = 360 / categoryCount
        const currentRotation = wheelRotation % 360
        const normalizedRotation = currentRotation < 0 ? currentRotation + 360 : currentRotation
        const newIndex = Math.floor(normalizedRotation / sectionAngle) % categoryCount
        setActiveCategory(colorSeries[newIndex]?.name || "red")
      }
    }

    // 开始减速动画
    decelerate()
  }

  // 修改触摸事件处理
  const handleCenterTouchStart = () => {
    console.log("Touch Start")
    if (isSpinningRef.current) {
      stopSpinning()
      return
    }

    longPressTimerRef.current = setTimeout(() => {
      console.log("Long press detected")
      startSpinning()
    }, animationConfig.interaction.longPressDelay)
  }

  const handleCenterTouchEnd = () => {
    console.log("Touch End")
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = undefined
    }

    if (isSpinningRef.current) {
      stopSpinning()
    }
  }

  const handleCenterTouchMove = () => {
    if (longPressTimerRef.current && !isSpinningRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = undefined
    }
  }

  // 清理副作用
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
      if (frameIdRef.current) {
        clearTimeout(frameIdRef.current)
      }
    }
  }, [])

  return (
    <StepLayout description={t(steps[0]!.description)} title={t(steps[0]!.title)}>
      <View className="theme-selection">
        <View className="selection-container">
          {/* 上方主色系旋转选择器 */}
          <View catchMove className="primary-color-wheel">
            <View
              ref={wheelRef}
              catchMove
              className={`wheel-container ${isSpinning ? "spinning" : ""}`}
              style={{
                transform: `rotate(${wheelRotation}deg)`,
                transition: "none",
              }}
            >
              {colorSeries.map((series, index) => {
                const angle = (360 / colorSeries.length) * index
                return (
                  <View
                    key={series.name}
                    catchMove
                    className={`wheel-item ${activeCategory === series.name ? "active" : ""}`}
                    style={{
                      transform: `rotate(${angle}deg) translateX(120px) rotate(${-wheelRotation}deg)`,
                    }}
                  >
                    <View
                      catchMove
                      className="color-preview"
                      style={{
                        background: `linear-gradient(45deg, ${series.colors[0]?.HEX || BASE_COLORS[series.name as keyof typeof BASE_COLORS]}, ${series.colors[Math.floor(series.colors.length / 2)]?.HEX || BASE_COLORS[series.name as keyof typeof BASE_COLORS]})`,
                      }}
                    />
                  </View>
                )
              })}
              <View
                catchMove
                className="wheel-center"
                onTouchEnd={handleCenterTouchEnd}
                onTouchMove={handleCenterTouchMove}
                onTouchStart={handleCenterTouchStart}
              >
                {selectedColor && (
                  <View className="selected-color" style={{ backgroundColor: selectedColor.HEX }} />
                )}
              </View>
            </View>
          </View>

          {/* 下方颜色列表 */}
          <ScrollView enhanced scrollY className="color-list">
            {currentColors.map(color => (
              <View
                key={color.ID}
                className={`color-item ${selectedColor?.ID === color.ID ? "active" : ""}`}
                style={{ backgroundColor: color.HEX }}
                onClick={() => handleColorSelect(color)}
              >
                <Text className="color-name" style={{ color: "#fff" }}>
                  {color.Chinese_Name}
                </Text>
                <Text className="color-name-en" style={{ color: "#fff" }}>
                  {color.English_Name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 配色方案展示 */}
        {showSchemes && colorSchemes && (
          <View className="color-schemes">
            <View className="scheme-section">
              <Text className="scheme-title">{t("colors.schemes.complementary")}</Text>
              <View className="scheme-colors">
                <View
                  className="scheme-color"
                  style={{
                    backgroundColor: `rgb(${colorSchemes.complementary.colors.join(",")})`,
                  }}
                />
              </View>
            </View>

            <View className="scheme-section">
              <Text className="scheme-title">{t("colors.schemes.analogous")}</Text>
              <View className="scheme-colors">
                {colorSchemes.analogous.colors.map((rgb, index) => (
                  <View
                    key={index}
                    className="scheme-color"
                    style={{ backgroundColor: `rgb(${rgb.join(",")})` }}
                  />
                ))}
              </View>
            </View>

            <View className="scheme-section">
              <Text className="scheme-title">{t("colors.schemes.triadic")}</Text>
              <View className="scheme-colors">
                {colorSchemes.triadic.colors.map((rgb, index) => (
                  <View
                    key={index}
                    className="scheme-color"
                    style={{ backgroundColor: `rgb(${rgb.join(",")})` }}
                  />
                ))}
              </View>
            </View>
          </View>
        )}
      </View>
    </StepLayout>
  )
}

export default ThemeSelection
