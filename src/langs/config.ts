export type LocaleType = keyof typeof localeMap

export const localeMap = {
  zh_CN: 'zh',
  en_US: 'en',
} as const

export const localeList = [
  {
    lang: localeMap.en_US,
    label: 'English',
    icon: '🇺🇸',
    title: 'Language',
  },
  {
    lang: localeMap.zh_CN,
    label: '简体中文',
    icon: '🇨🇳',
    title: '语言',
  },
] as const
