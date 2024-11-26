export default {
  basicInfo: {
    title: '基本情報',
    description: 'あなたの基本情報を入力してください。これらの情報はあなただけのトーテムを生成するために使用されます',
    name: {
      label: '名前',
      required: '*',
      description: 'トーテムに表示したい名前',
      placeholder: '名前を入力してください'
    },
    birthYear: {
      label: '生年',
      required: '*',
      description: 'あなたの生年はトーテムの核となる要素に影響を与えます'
    },
    gender: {
      label: 'ジェンダー傾向',
      required: '*',
      description: 'あなたに最も適したジェンダー特性を選択してください。これはトーテムの全体的なスタイルに影響を与えます',
      options: {
        yin: {
          label: '陰',
          description: '優しい / 控えめ / 優雅'
        },
        neutral: {
          label: '中立',
          description: 'バランス / 調和 / 中庸'
        },
        yang: {
          label: '陽',
          description: '力強い / 開放的 / 進取的'
        }
      }
    },
    bio: {
      label: '自己紹介',
      required: '*',
      description: 'あなたの性格、趣味、または願望を描写してください。これらはトーテムに組み込まれます',
      placeholder: '例：私はアートが大好きで、新しいことを探求するのが好きです...'
    }
  },
  mbti: {
    result: 'あなたのMBTIタイプ：',
    dimensions: {
      energySource: {
        title: 'エネルギー源',
        description: 'あなたはどこからエネルギーや動機を得る傾向がありますか？',
        options: {
          extrovert: {
            name: '外向型',
            traits: [
              '外部世界からエネルギーを得る',
              '社交的な交流を楽しむ',
              '話してから考える傾向',
              'グループ活動を好む'
            ]
          },
          introvert: {
            name: '内向型',
            traits: [
              '一人の時間からエネルギーを得る',
              '深い思考を楽しむ',
              '考えてから話す傾向',
              '一人または小グループを好む'
            ]
          }
        }
      },
      informationGathering: {
        title: '情報収集',
        description: 'どのような種類の情報に注目する傾向がありますか？',
        options: {
          sensing: {
            name: '感覚型',
            traits: [
              '具体的な詳細に注目',
              '実体験を重視',
              '目に見えるものを信じる',
              '現在に焦点を当てる'
            ]
          },
          intuition: {
            name: '直感型',
            traits: [
              '全体的なパターンに注目',
              '将来の可能性を重視',
              '直感的な感覚を信じる',
              '未来を見据える'
            ]
          }
        }
      },
      decisionMaking: {
        title: '意思決定',
        description: '決定を下す際、何をより重視しますか？',
        options: {
          thinking: {
            name: '思考型',
            traits: [
              '論理的分析に基づく',
              '客観性を追求',
              '真実を重視',
              '因果関係に注目'
            ]
          },
          feeling: {
            name: '感情型',
            traits: [
              '価値観と感情に基づく',
              '他者の感情を考慮',
              '調和を重視',
              '影響を重視'
            ]
          }
        }
      },
      lifestyle: {
        title: '生活スタイル',
        description: 'どのような生活リズムを好みますか？',
        options: {
          judging: {
            name: '判断型',
            traits: [
              '計画と組織化を好む',
              '確実性を求める',
              'タスクを迅速に完了',
              'ルールに従う'
            ]
          },
          perceiving: {
            name: '知覚型',
            traits: [
              '柔軟性と開放性を保つ',
              '適応力が高い',
              '状況に応じて対応',
              '可能性を探る'
            ]
          }
        }
      }
    }
  },
  steps: {
    theme: {
      title: "テーマ選択",
      description: "お好みの色調を選んでください"
    },
    mbti: {
      title: "性格診断",
      description: "あなたのMBTI性格タイプを見つけましょう"
    },
    basic: {
      title: "基本情報",
      description: "お名前と生年をお聞かせください"
    }
  },
  themes: {
    dark: {
      name: "墨玉",
      description: "落ち着きと内向"
    },
    blue: {
      name: "青磁",
      description: "清らかと優美"
    },
    red: {
      name: "朱砂",
      description: "情熱と活力"
    },
    green: {
      name: "翡翠",
      description: "生命力と躍動"
    },
    purple: {
      name: "紫玉",
      description: "高貴と典雅"
    }
  },
  common: {
    navigation: {
      prev: '前へ',
      next: '次へ',
      generate: 'トーテムを生成'
    },
    pages: {
      home: 'ホーム'
    }
  }
};
