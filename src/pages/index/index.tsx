import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import { Input, Range } from '@nutui/nutui-react-taro'
import '@nutui/nutui-react-taro/dist/style.css'
import { themes } from '../../utils/theme'
import { MBTI_DIMENSIONS } from '../../utils/mbti'
import { COLOR_THEMES, FORM_STEPS } from '../../utils/steps'
import './index.scss'

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    birthYear: '',
    colorTheme: 'dark'
  })
  const [mbtiSelections, setMbtiSelections] = useState([false, false, false, false])
  const currentTheme = themes[formData.colorTheme]

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const mbtiType = MBTI_DIMENSIONS.map((dim, i) => 
    mbtiSelections[i] ? dim.right.letter : dim.left.letter
  ).join('')

  const handleSubmit = () => {
    // 在这里处理表单提交
    console.log('提交数据:', {
      ...formData,
      mbtiType
    })
  }

  const renderStepButtons = () => (
    <View className='step-buttons'>
      {currentStep > 0 && (
        <View 
          className='step-button prev'
          onClick={() => setCurrentStep(prev => prev - 1)}
          style={{
            background: currentTheme.surface,
            color: currentTheme.text,
            borderColor: currentTheme.border
          }}
        >
          上一步
        </View>
      )}
      {currentStep < FORM_STEPS.length - 1 ? (
        <View 
          className='step-button next'
          onClick={() => setCurrentStep(prev => prev + 1)}
          style={{
            background: currentTheme.primary,
            color: '#fff'
          }}
        >
          下一步
        </View>
      ) : (
        <View 
          className='step-button submit'
          onClick={handleSubmit}
          style={{
            background: currentTheme.primary,
            color: '#fff'
          }}
        >
          生成图腾
        </View>
      )}
    </View>
  )

  const renderThemeSelection = () => (
    <View className='step-content'>
      <View className='step-header'>
        <Text className='step-title'>{FORM_STEPS[0].title}</Text>
        <Text className='step-desc'>{FORM_STEPS[0].description}</Text>
      </View>
      <View className='theme-grid'>
        {COLOR_THEMES.map(theme => (
          <View
            key={theme.value}
            className='theme-option'
            onClick={() => handleInputChange('colorTheme', theme.value)}
            style={{
              background: themes[theme.value].surface,
              borderColor: formData.colorTheme === theme.value 
                ? themes[theme.value].primary 
                : themes[theme.value].border
            }}
          >
            <Text 
              className='theme-name'
              style={{ color: themes[theme.value].primary }}
            >
              {theme.name}
            </Text>
            <Text 
              className='theme-desc'
              style={{ color: themes[theme.value].text }}
            >
              {theme.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )

  const renderMbtiTest = () => (
    <View className='step-content'>
      <View className='step-header'>
        <Text className='step-title'>{FORM_STEPS[1].title}</Text>
        <Text className='step-desc'>{FORM_STEPS[1].description}</Text>
      </View>
      <View className='mbti-section'>
        {MBTI_DIMENSIONS.map((dimension, index) => (
          <View className='mbti-dimension' key={dimension.name}>
            <View className='dimension-header'>
              <View className='dimension-title'>
                <Text>{dimension.title}</Text>
                <Text className='dimension-letter'>
                  {mbtiSelections[index] ? dimension.right.letter : dimension.left.letter}
                </Text>
              </View>
              <Text className='dimension-desc'>{dimension.description}</Text>
            </View>
            <View className='dimension-content'>
              <View className='type-labels'>
                <View 
                  className={`type-label ${!mbtiSelections[index] ? 'active' : ''}`}
                  onClick={() => {
                    const newSelections = [...mbtiSelections]
                    newSelections[index] = false
                    setMbtiSelections(newSelections)
                  }}
                >
                  <Text className='type-name'>{dimension.left.name}</Text>
                  <Text className='type-letter'>{dimension.left.letter}</Text>
                </View>
                <View 
                  className={`type-label ${mbtiSelections[index] ? 'active' : ''}`}
                  onClick={() => {
                    const newSelections = [...mbtiSelections]
                    newSelections[index] = true
                    setMbtiSelections(newSelections)
                  }}
                >
                  <Text className='type-name'>{dimension.right.name}</Text>
                  <Text className='type-letter'>{dimension.right.letter}</Text>
                </View>
              </View>
              
              <View className='slider-container'>
                <Range
                  value={mbtiSelections[index] ? 100 : 0}
                  onChange={(val) => {
                    const newSelections = [...mbtiSelections]
                    newSelections[index] = val > 50
                    setMbtiSelections(newSelections)
                  }}
                  min={0}
                  max={100}
                  step={1}
                  buttonColor='var(--nutui-primary-color)'
                  inactiveColor='var(--nutui-gray-6)'
                  activeColor='var(--nutui-primary-color)'
                />
              </View>

              <View className='traits-container'>
                <View 
                  className={`traits-column ${!mbtiSelections[index] ? 'active' : ''}`}
                  onClick={() => {
                    const newSelections = [...mbtiSelections]
                    newSelections[index] = false
                    setMbtiSelections(newSelections)
                  }}
                >
                  {dimension.left.traits.map((trait, i) => (
                    <Text className='trait-item' key={i}>
                      {trait}
                    </Text>
                  ))}
                </View>
                <View 
                  className={`traits-column ${mbtiSelections[index] ? 'active' : ''}`}
                  onClick={() => {
                    const newSelections = [...mbtiSelections]
                    newSelections[index] = true
                    setMbtiSelections(newSelections)
                  }}
                >
                  {dimension.right.traits.map((trait, i) => (
                    <Text className='trait-item' key={i}>
                      {trait}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
        ))}
        <View className='mbti-result'>
          <Text className='result-label'>你的MBTI类型：</Text>
          <Text className='result-value'>{mbtiType}</Text>
        </View>
      </View>
    </View>
  )

  const renderBasicInfo = () => (
    <View className='step-content'>
      <View className='step-header'>
        <Text className='step-title'>{FORM_STEPS[2].title}</Text>
        <Text className='step-desc'>{FORM_STEPS[2].description}</Text>
      </View>
      <View className='input-group'>
        <View className='input-item'>
          <Input
            label='姓名'
            placeholder='请输入你的名字'
            value={formData.name}
            onChange={(val) => handleInputChange('name', val)}
          />
        </View>
        <View className='input-item'>
          <Input
            label='出生年份'
            placeholder='请输入你的出生年份'
            type='number'
            value={formData.birthYear}
            onChange={(val) => handleInputChange('birthYear', val)}
          />
        </View>
      </View>
    </View>
  )

  return (
    <View className='index'>
      <View className='step-indicator'>
        {[0, 1, 2].map(step => (
          <View
            key={step}
            className={`step-dot ${currentStep === step ? 'active' : ''}`}
            style={{
              background: currentStep === step ? currentTheme.primary : currentTheme.surface,
              borderColor: currentTheme.border
            }}
          />
        ))}
      </View>

      {currentStep === 0 && renderThemeSelection()}
      {currentStep === 1 && renderMbtiTest()}
      {currentStep === 2 && renderBasicInfo()}

      {renderStepButtons()}
    </View>
  )
}

export default Index
