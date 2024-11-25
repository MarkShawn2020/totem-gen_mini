import { View, Text, Button } from '@tarojs/components'
import { useState } from 'react'
import { Input } from '@nutui/nutui-react-taro'
import { themes, ThemeType, getStoredTheme, setStoredTheme } from '../../utils/theme'
import './index.scss'

const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
]

const COLOR_THEMES = [
  { name: '墨玉', value: 'dark' as ThemeType, desc: '深邃内敛' },
  { name: '青瓷', value: 'blue' as ThemeType, desc: '清雅高洁' },
  { name: '朱砂', value: 'red' as ThemeType, desc: '热情奔放' },
  { name: '翡翠', value: 'green' as ThemeType, desc: '生机盎然' },
  { name: '紫玉', value: 'purple' as ThemeType, desc: '高贵典雅' }
]

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthYear: '',
    mbti: '',
    colorTheme: getStoredTheme()
  })

  const currentTheme = themes[formData.colorTheme]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (field === 'colorTheme') {
      setStoredTheme(value as ThemeType)
    }
  }

  return (
    <View className='totem-page' style={{ backgroundColor: currentTheme.background }}>
      <View className='header'>
        <View className='title-container'>
          <Text className='title' style={{ color: currentTheme.primary }}>图腾造境</Text>
          <Text className='subtitle' style={{ color: currentTheme.secondary }}>专属于你的灵魂印记</Text>
        </View>
      </View>

      <View className='content'>
        <View className='input-section'>
          <View className='section-title' style={{ color: currentTheme.primary }}>基本信息</View>
          <View className='input-group'>
            <View className='input-item'>
              <Text className='label' style={{ color: currentTheme.primary }}>姓名</Text>
              <Input 
                className='input'
                placeholder='请输入你的名字'
                value={formData.name}
                onChange={(val) => handleInputChange('name', val)}
                style={{
                  background: currentTheme.surface,
                  borderColor: currentTheme.border,
                  color: currentTheme.text
                }}
              />
            </View>

            <View className='input-item'>
              <Text className='label' style={{ color: currentTheme.primary }}>生年</Text>
              <Input 
                className='input'
                type='number'
                placeholder='请输入出生年份'
                value={formData.birthYear}
                onChange={(val) => handleInputChange('birthYear', val)}
                style={{
                  background: currentTheme.surface,
                  borderColor: currentTheme.border,
                  color: currentTheme.text
                }}
              />
            </View>

            <View className='input-item'>
              <Text className='label' style={{ color: currentTheme.primary }}>MBTI 性格类型</Text>
              <View className='mbti-grid'>
                {MBTI_TYPES.map(type => (
                  <View 
                    key={type}
                    className={`mbti-option ${formData.mbti === type ? 'selected' : ''}`}
                    onClick={() => handleInputChange('mbti', type)}
                    style={
                      formData.mbti === type
                        ? {
                            background: currentTheme.primary,
                            borderColor: currentTheme.primary,
                            color: currentTheme.background
                          }
                        : {
                            background: currentTheme.surface,
                            borderColor: currentTheme.border,
                            color: currentTheme.text
                          }
                    }
                  >
                    {type}
                  </View>
                ))}
              </View>
            </View>

            <View className='input-item'>
              <Text className='label' style={{ color: currentTheme.primary }}>选择主题色调</Text>
              <View className='color-grid'>
                {COLOR_THEMES.map(theme => {
                  const themeColors = themes[theme.value]
                  return (
                    <View 
                      key={theme.value}
                      className={`color-option ${formData.colorTheme === theme.value ? 'selected' : ''}`}
                      onClick={() => handleInputChange('colorTheme', theme.value)}
                      style={{
                        background: themeColors.surface,
                        borderColor: themeColors.border
                      }}
                    >
                      <Text 
                        className='color-name'
                        style={{ color: themeColors.primary }}
                      >
                        {theme.name}
                      </Text>
                      <Text 
                        className='color-desc'
                        style={{ color: themeColors.secondary }}
                      >
                        {theme.desc}
                      </Text>
                    </View>
                  )
                })}
              </View>
            </View>
          </View>
        </View>

        <View className='preview-section'>
          <View 
            className='preview-area'
            style={{
              background: currentTheme.surface,
              borderColor: currentTheme.border
            }}
          >
            <Text className='placeholder-text' style={{ color: currentTheme.secondary }}>
              你的专属图腾将在此呈现
            </Text>
          </View>
        </View>

        <Button 
          className='generate-btn'
          style={{
            background: `linear-gradient(135deg, ${currentTheme.secondary} 0%, ${currentTheme.primary} 100%)`,
            color: currentTheme.background
          }}
        >
          <Text className='btn-text'>生成图腾</Text>
        </Button>
      </View>

      <View className='footer'>
        <Button 
          className='action-btn share-btn'
          style={{
            background: `linear-gradient(135deg, ${currentTheme.secondary} 0%, ${currentTheme.primary} 100%)`,
            color: currentTheme.background
          }}
        >
          分享图腾
        </Button>
        <Button 
          className='action-btn save-btn'
          style={{
            color: currentTheme.primary,
            borderColor: currentTheme.secondary
          }}
        >
          保存图腾
        </Button>
      </View>
    </View>
  )
}

export default Index
