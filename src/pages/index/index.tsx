import { View, Text, Button, Input } from '@tarojs/components'
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
      {/* 头部区域 */}
      <View className='header'>
        <Text className='title'>你的图腾</Text>
        <Text className='subtitle'>基于 AI 的个性化图腾与诗偈生成器</Text>
      </View>

      {/* 主要内容区域 */}
      <View className='content'>
        {/* 图腾预览区域 */}
        <View className='preview-area'>
          <View className='totem-preview'>
            {/* TODO: 显示生成的图腾 */}
            <Text className='placeholder-text'>图腾预览区域</Text>
          </View>
        </View>

        {/* 输入区域 */}
        <View className='input-area'>
          <Form>
            <Cell.Group title='创作提示'>
              <TextArea
                className='prompt-input'
                placeholder='描述你想要的图腾风格和元素...'
                value={prompt}
                onChange={(val) => setPrompt(val)}
                maxLength={200}
                showCount
              />
            </Cell.Group>
          </Form>
          <Button 
            className='generate-btn'
            onClick={handleGenerate}
            loading={generating}
          >
            生成图腾
          </Button>
        </View>

        {/* 诗偈展示区域 */}
        <View className='poem-area'>
          <Text className='poem-title'>配套诗偈</Text>
          <View className='poem-content'>
            {/* TODO: 显示生成的诗偈 */}
            <Text className='placeholder-text'>诗偈将在生成后显示</Text>
          </View>
        </View>
      </View>

      {/* 底部操作区 */}
      <View className='footer'>
        <Button className='share-btn'>分享</Button>
        <Button className='save-btn'>保存</Button>
      </View>
    </View>
  )
}

export default Index
