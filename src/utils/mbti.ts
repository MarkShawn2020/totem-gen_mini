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

const getDimensionTranslation = (dimensionId: string) => {
  const t = i18next.t;
  return {
    id: dimensionId,
    title: t(`mbti.dimensions.${dimensionId}.title`),
    description: t(`mbti.dimensions.${dimensionId}.description`),
    left: {
      letter: t(`mbti.dimensions.${dimensionId}.left.letter`),
      name: t(`mbti.dimensions.${dimensionId}.left.name`),
      traits: t(`mbti.dimensions.${dimensionId}.left.traits`, { returnObjects: true }),
    },
    right: {
      letter: t(`mbti.dimensions.${dimensionId}.right.letter`),
      name: t(`mbti.dimensions.${dimensionId}.right.name`),
      traits: t(`mbti.dimensions.${dimensionId}.right.traits`, { returnObjects: true }),
    },
  };
};

export const getMBTIDimensions = (): MBTIDimension[] => [
  getDimensionTranslation('energy'),
  getDimensionTranslation('source'),
  getDimensionTranslation('decision'),
  getDimensionTranslation('lifestyle'),
];

// 不再导出静态的 MBTI_DIMENSIONS
// 而是在组件中使用 getMBTIDimensions() 获取最新的翻译
