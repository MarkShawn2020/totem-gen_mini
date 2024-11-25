import { View, Text, Button, Image } from '@tarojs/components'
import { useState } from 'react'
import { Cell, Form, TextArea } from '@nutui/nutui-react-taro'
import './index.scss'

const Index = () => {
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setGenerating(true)
    // TODO: 实现生成逻辑
    setTimeout(() => setGenerating(false), 2000)
  }

  return (
    <View className='totem-page'>
      <View className='bg-pattern top-pattern' />
      <View className='bg-pattern bottom-pattern' />
      
      {/* 头部区域 */}
      <View className='header'>
        <View className='title-container'>
          <Text className='title'>图腾造境</Text>
          <Text className='subtitle'>AI · 图腾 · 诗偈</Text>
        </View>
        <View className='ink-decoration left' />
        <View className='ink-decoration right' />
      </View>

      {/* 主要内容区域 */}
      <View className='content'>
        {/* 图腾预览区域 */}
        <View className='preview-area'>
          <View className='scroll-container'>
            <View className='totem-preview'>
              {/* TODO: 显示生成的图腾 */}
              <Text className='placeholder-text'>图腾将在此呈现</Text>
            </View>
          </View>
          <View className='corner-decoration top-left' />
          <View className='corner-decoration top-right' />
          <View className='corner-decoration bottom-left' />
          <View className='corner-decoration bottom-right' />
        </View>

        {/* 输入区域 */}
        <View className='input-area'>
          <View className='input-wrapper'>
            <Text className='input-label'>创作提示</Text>
            <TextArea
              className='prompt-input'
              placeholder='描绘你心中的图腾意象...'
              value={prompt}
              onChange={(val) => setPrompt(val)}
              maxLength={200}
              showCount
            />
          </View>
          <Button 
            className='generate-btn'
            onClick={handleGenerate}
            loading={generating}
          >
            <Text className='btn-text'>凝聚图腾</Text>
          </Button>
        </View>

        {/* 诗偈展示区域 */}
        <View className='poem-area'>
          <View className='poem-scroll'>
            <Text className='poem-title'>玄思偈语</Text>
            <View className='poem-content'>
              {/* TODO: 显示生成的诗偈 */}
              <Text className='placeholder-text'>诗偈将在此显现</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 底部操作区 */}
      <View className='footer'>
        <Button className='action-btn share-btn'>
          <Text className='btn-text'>分享妙境</Text>
        </Button>
        <Button className='action-btn save-btn'>
          <Text className='btn-text'>珍藏图腾</Text>
        </Button>
      </View>
    </View>
  )
}

export default Index
