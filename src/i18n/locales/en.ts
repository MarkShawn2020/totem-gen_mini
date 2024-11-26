export default {
  basicInfo: {
    title: 'Basic Information',
    description: 'Please fill in your basic information, which will be used to generate your unique totem',
    name: {
      label: 'Name',
      required: '*',
      description: 'The name you want to display in your totem',
      placeholder: 'Please enter your name'
    },
    birthYear: {
      label: 'Birth Year',
      required: '*',
      description: 'Your birth year will influence the core elements of your totem'
    },
    gender: {
      label: 'Gender Inclination',
      required: '*',
      description: 'Choose the gender characteristics that suit you best, this will affect the overall style of your totem',
      options: {
        yin: {
          label: 'Yin',
          description: 'Gentle / Reserved / Elegant'
        },
        neutral: {
          label: 'Neutral',
          description: 'Balanced / Harmonious / Moderate'
        },
        yang: {
          label: 'Yang',
          description: 'Firm / Open / Progressive'
        }
      }
    },
    bio: {
      label: 'Personal Bio',
      required: '*',
      description: 'Describe your personality, hobbies, or aspirations, these will be incorporated into your totem',
      placeholder: 'For example: I am an art enthusiast who loves exploring new things...'
    }
  },
  mbti: {
    result: 'Your MBTI Type:',
    dimensions: {
      energySource: {
        title: 'Energy Source',
        description: 'Where do you tend to get your energy and motivation from?',
        options: {
          extrovert: {
            name: 'Extrovert',
            traits: [
              'Gains energy from external world',
              'Enjoys social interactions',
              'Tends to speak before thinking',
              'Prefers group activities'
            ]
          },
          introvert: {
            name: 'Introvert',
            traits: [
              'Gains energy from solitude',
              'Enjoys deep thinking',
              'Tends to think before speaking',
              'Prefers solitude or small groups'
            ]
          }
        }
      },
      informationGathering: {
        title: 'Information Gathering',
        description: 'What type of information do you tend to focus on?',
        options: {
          sensing: {
            name: 'Sensing',
            traits: [
              'Focuses on concrete details',
              'Values real experience',
              'Believes in what is seen',
              'Focuses on the present'
            ]
          },
          intuition: {
            name: 'Intuition',
            traits: [
              'Focuses on overall patterns',
              'Values future possibilities',
              'Trusts intuitive feelings',
              'Looks to the future'
            ]
          }
        }
      },
      decisionMaking: {
        title: 'Decision Making',
        description: 'What do you rely on more when making decisions?',
        options: {
          thinking: {
            name: 'Thinking',
            traits: [
              'Based on logical analysis',
              'Seeks objectivity',
              'Values truth',
              'Focuses on cause and effect'
            ]
          },
          feeling: {
            name: 'Feeling',
            traits: [
              'Based on values and feelings',
              'Considers others\' feelings',
              'Values harmony',
              'Focuses on impact'
            ]
          }
        }
      },
      lifestyle: {
        title: 'Lifestyle',
        description: 'What kind of life rhythm do you prefer?',
        options: {
          judging: {
            name: 'Judging',
            traits: [
              'Likes planning and organizing',
              'Seeks certainty',
              'Completes tasks promptly',
              'Follows rules'
            ]
          },
          perceiving: {
            name: 'Perceiving',
            traits: [
              'Stays flexible and open',
              'Highly adaptable',
              'Responds to circumstances',
              'Explores possibilities'
            ]
          }
        }
      }
    }
  },
  steps: {
    theme: {
      title: "Theme Selection",
      description: "Choose your preferred color style"
    },
    mbti: {
      title: "Personality Test",
      description: "Discover your MBTI personality type"
    },
    basic: {
      title: "Basic Information",
      description: "Tell us your name and birth year"
    }
  },
  themes: {
    dark: {
      name: "Ink Jade",
      description: "Steady and Reserved"
    },
    blue: {
      name: "Celadon",
      description: "Pure and Elegant"
    },
    red: {
      name: "Cinnabar",
      description: "Passionate and Dynamic"
    },
    green: {
      name: "Emerald",
      description: "Vibrant and Lively"
    },
    purple: {
      name: "Amethyst",
      description: "Noble and Classic"
    }
  },
  common: {
    navigation: {
      prev: 'Previous',
      next: 'Next',
      generate: 'Generate Totem'
    },
    pages: {
      home: 'Home'
    }
  }
};
