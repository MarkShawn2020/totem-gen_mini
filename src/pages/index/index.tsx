import { Input, Radio } from "@nutui/nutui-react-taro";
import "@nutui/nutui-react-taro/dist/style.css";
import { Text, View, Textarea } from "@tarojs/components";
import { useState, useEffect } from "react";
import YearPicker from "../../components/YearPicker";
import GenderSelector from "../../components/GenderSelector";
import { MBTI_DIMENSIONS } from "../../utils/mbti";
import { COLOR_THEMES, FORM_STEPS } from "../../utils/steps";
import { themes } from "../../utils/theme";
import "./index.scss";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [formData, setFormData] = useState({
    name: "",
    birthYear: new Date().getFullYear().toString(),
    gender: "neutral",
    introduction: "",
    colorTheme: "dark",
  });
  const [mbtiSelections, setMbtiSelections] = useState([false, false, false, false]);
  const currentTheme = themes[formData.colorTheme];

  const yearSelectorStyle = {
    '--theme-primary': currentTheme.primary,
    '--theme-primary-rgb': currentTheme.primaryRgb,
    '--theme-secondary': currentTheme.secondary,
    '--theme-background': currentTheme.background,
    '--theme-surface': currentTheme.surface,
    '--theme-text': currentTheme.text,
    '--theme-border': currentTheme.border,
    '--nutui-primary-color': currentTheme.primary,
    '--nutui-primary-color-end': currentTheme.primary,
  } as any;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', currentTheme.primary);
    root.style.setProperty('--theme-primary-rgb', currentTheme.primaryRgb);
    root.style.setProperty('--theme-secondary', currentTheme.secondary);
    root.style.setProperty('--theme-background', currentTheme.background);
    root.style.setProperty('--theme-surface', currentTheme.surface);
    root.style.setProperty('--theme-text', currentTheme.text);
    root.style.setProperty('--theme-border', currentTheme.border);
    root.style.setProperty('--nutui-primary-color', currentTheme.primary);
    root.style.setProperty('--nutui-primary-color-end', currentTheme.primary);
  }, [currentTheme]);

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const mbtiType = MBTI_DIMENSIONS.map((dim, i) =>
    mbtiSelections[i] ? dim.right.letter : dim.left.letter
  ).join("");

  const handleSubmit = () => {
    console.log("提交数据:", {
      ...formData,
      mbtiType,
    });
  };

  const renderStepButtons = () => (
    <View className="step-buttons">
      {currentStep > 0 && (
        <View
          className="step-button prev"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          style={{
            background: currentTheme.surface,
            color: currentTheme.text,
            borderColor: currentTheme.border,
          }}
        >
          上一步
        </View>
      )}
      {currentStep < FORM_STEPS.length - 1 ? (
        <View
          className="step-button next"
          onClick={() => setCurrentStep((prev) => prev + 1)}
          style={{
            background: currentTheme.primary,
            color: "#fff",
          }}
        >
          下一步
        </View>
      ) : (
        <View
          className="step-button submit"
          onClick={handleSubmit}
          style={{
            background: currentTheme.primary,
            color: "#fff",
          }}
        >
          生成图腾
        </View>
      )}
    </View>
  );

  const renderThemeSelection = () => (
    <View className="step-content">
      <View className="step-header">
        <Text className="step-title">{FORM_STEPS[0].title}</Text>
        <Text className="step-desc">{FORM_STEPS[0].description}</Text>
      </View>
      <View className="theme-grid">
        {COLOR_THEMES.map((theme) => (
          <View
            key={theme.value}
            className="theme-option"
            onClick={() => handleInputChange("colorTheme", theme.value)}
            style={{
              background: themes[theme.value].surface,
              borderColor:
                formData.colorTheme === theme.value
                  ? themes[theme.value].primary
                  : themes[theme.value].border,
            }}
          >
            <Text
              className="theme-name"
              style={{ color: themes[theme.value].primary }}
            >
              {theme.name}
            </Text>
            <Text
              className="theme-desc"
              style={{ color: themes[theme.value].text }}
            >
              {theme.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderMbtiTest = () => (
    <View className="step-content">
      <View className="step-header">
        <Text className="step-title">{FORM_STEPS[1].title}</Text>
        <Text className="step-desc">{FORM_STEPS[1].description}</Text>
      </View>
      <View className="mbti-section">
        {MBTI_DIMENSIONS.map((dimension, index) => (
          <View className="mbti-dimension" key={dimension.id || index}>
            <View className="dimension-header">
              <Text className="dimension-title">{dimension.title}</Text>
              <Text className="dimension-desc">{dimension.description}</Text>
            </View>
            <View className="dimension-content">
              <View className="type-options">
                <View 
                  className={`type-option ${!mbtiSelections[index] ? 'active' : ''}`}
                  onClick={() => {
                    const newSelections = [...mbtiSelections];
                    newSelections[index] = false;
                    setMbtiSelections(newSelections);
                  }}
                  style={{
                    background: !mbtiSelections[index] ? currentTheme.surface : currentTheme.background,
                    borderColor: !mbtiSelections[index] ? currentTheme.primary : currentTheme.border,
                    borderWidth: !mbtiSelections[index] ? '2px' : '1px'
                  }}
                >
                  <Text 
                    className="type-letter"
                    style={{ 
                      color: !mbtiSelections[index] ? currentTheme.primary : currentTheme.secondary 
                    }}
                  >{dimension.left.letter}</Text>
                  <Text 
                    className="type-name"
                    style={{ 
                      color: !mbtiSelections[index] ? currentTheme.primary : currentTheme.secondary 
                    }}
                  >{dimension.left.name}</Text>
                </View>
                <View 
                  className={`type-option ${mbtiSelections[index] ? 'active' : ''}`}
                  onClick={() => {
                    const newSelections = [...mbtiSelections];
                    newSelections[index] = true;
                    setMbtiSelections(newSelections);
                  }}
                  style={{
                    background: mbtiSelections[index] ? currentTheme.surface : currentTheme.background,
                    borderColor: mbtiSelections[index] ? currentTheme.primary : currentTheme.border,
                    borderWidth: mbtiSelections[index] ? '2px' : '1px'
                  }}
                >
                  <Text 
                    className="type-letter"
                    style={{ 
                      color: mbtiSelections[index] ? currentTheme.primary : currentTheme.secondary 
                    }}
                  >{dimension.right.letter}</Text>
                  <Text 
                    className="type-name"
                    style={{ 
                      color: mbtiSelections[index] ? currentTheme.primary : currentTheme.secondary 
                    }}
                  >{dimension.right.name}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
        <View className="mbti-result">
          <Text className="result-label">你的MBTI类型：</Text>
          <Text className="result-value">{mbtiType}</Text>
        </View>
      </View>
    </View>
  );

  const renderBasicInfo = () => (
    <View className="step-content">
      <View className="step-header">
        <Text className="step-title">{FORM_STEPS[2].title}</Text>
        <Text className="step-desc">请填写你的基本信息，这些信息将用于生成你独特的图腾</Text>
      </View>
      <View className="input-group">
        <View className="input-section name-section">
          <View className="section-title">
            <Text className="title-text">姓名</Text>
            <Text className="title-desc">你希望在图腾中展现的称呼</Text>
          </View>
          <View className="input-container">
            <Input
              className="custom-input"
              placeholder="请输入你的名字"
              value={formData.name}
              onChange={(val) => handleInputChange("name", val)}
            />
          </View>
        </View>

        <View className="input-section year-section">
          <View className="section-title">
            <Text className="title-text">生辰年份 （{formData.birthYear}）</Text>
            <Text className="title-desc">你的出生年份将影响图腾的核心元素</Text>
          </View>
          <YearPicker
            value={formData.birthYear}
            onChange={(val) => {
              handleInputChange("birthYear", val)
              console.log({val});
              
            }}
            themeColors={currentTheme}
          />
        </View>

        <View className="input-section gender-section">
          <View className="section-title">
            <Text className="title-text">性别倾向</Text>
            <Text className="title-desc">选择更适合你的性别特征，这将影响图腾的整体风格</Text>
          </View>
          <GenderSelector
            value={formData.gender}
            onChange={(value) => handleInputChange("gender", value)}
            themeColors={currentTheme}
          />
        </View>

        <View className="input-section intro-section">
          <View className="section-title">
            <Text className="title-text">个人简介</Text>
            <Text className="title-desc">描述一下你的性格、爱好或期望，这些将融入你的图腾中</Text>
          </View>
          <View className="textarea-container">
            <Textarea
              className="custom-textarea"
              value={formData.introduction}
              onInput={(e) => handleInputChange("introduction", e.detail.value)}
              placeholder="例如：我是一个热爱艺术的人，喜欢探索新事物..."
              maxlength={200}
              style={{
                background: '#ffffff',
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${currentTheme.border}`,
                height: '120px',
              }}
            />
            <Text className="word-count" style={{ color: currentTheme.secondary }}>
              {formData.introduction.length}/200
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const getChineseZodiac = (year: number): string => {
    const zodiacSigns = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    return zodiacSigns[(year - 1900) % 12];
  };

  return (
    <View className="index">
      <View className="step-indicator">
        {[0, 1, 2].map((step) => (
          <View
            key={step}
            className={`step-dot ${currentStep === step ? "active" : ""}`}
            style={{
              background:
                currentStep === step
                  ? currentTheme.primary
                  : currentTheme.surface,
              borderColor: currentTheme.border,
            }}
          />
        ))}
      </View>

      {currentStep === 0 && renderThemeSelection()}
      {currentStep === 1 && renderMbtiTest()}
      {currentStep === 2 && renderBasicInfo()}

      {renderStepButtons()}
    </View>
  );
};

export default Index;
