import i18next from 'i18next';

export interface MBTIDimension {
  id: string
  title: string
  description: string
  left: {
    letter: string
    name: string
    traits: string[]
  }
  right: {
    letter: string
    name: string
    traits: string[]
  }
}

const getDimensionTranslation = (dimensionId: string): MBTIDimension => {
  const t = i18next.t;
  const dimension = t(`mbti.dimensions.${dimensionId}`, { returnObjects: true }) || {};
  const options = dimension.options || {};
  
  // 定义默认值
  const defaultTraits = ['...', '...', '...', '...'];
  
  const getLeftOptions = () => {
    switch(dimensionId) {
      case 'energySource':
        return {
          letter: 'E',
          name: options.extrovert?.name || 'Extrovert',
          traits: options.extrovert?.traits || defaultTraits,
        };
      case 'informationGathering':
        return {
          letter: 'S',
          name: options.sensing?.name || 'Sensing',
          traits: options.sensing?.traits || defaultTraits,
        };
      case 'decisionMaking':
        return {
          letter: 'T',
          name: options.thinking?.name || 'Thinking',
          traits: options.thinking?.traits || defaultTraits,
        };
      default:
        return {
          letter: 'J',
          name: options.judging?.name || 'Judging',
          traits: options.judging?.traits || defaultTraits,
        };
    }
  };

  const getRightOptions = () => {
    switch(dimensionId) {
      case 'energySource':
        return {
          letter: 'I',
          name: options.introvert?.name || 'Introvert',
          traits: options.introvert?.traits || defaultTraits,
        };
      case 'informationGathering':
        return {
          letter: 'N',
          name: options.intuition?.name || 'Intuition',
          traits: options.intuition?.traits || defaultTraits,
        };
      case 'decisionMaking':
        return {
          letter: 'F',
          name: options.feeling?.name || 'Feeling',
          traits: options.feeling?.traits || defaultTraits,
        };
      default:
        return {
          letter: 'P',
          name: options.perceiving?.name || 'Perceiving',
          traits: options.perceiving?.traits || defaultTraits,
        };
    }
  };

  return {
    id: dimensionId,
    title: dimension.title || dimensionId,
    description: dimension.description || '',
    left: getLeftOptions(),
    right: getRightOptions(),
  };
};

export const getMBTIDimensions = (): MBTIDimension[] => [
  getDimensionTranslation('energySource'),
  getDimensionTranslation('informationGathering'),
  getDimensionTranslation('decisionMaking'),
  getDimensionTranslation('lifestyle'),
];

// 不再导出静态的 MBTI_DIMENSIONS
// 而是在组件中使用 getMBTIDimensions() 获取最新的翻译
