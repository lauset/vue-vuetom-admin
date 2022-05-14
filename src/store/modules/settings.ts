import { defineStore } from 'pinia'
import { SETTING_KEY } from '@/enums/cacheEnum'
import { store } from '@/store'
import { Storage } from '@/utils/Storage'

/** Theme Value */
export type ThemeName = 'light' | 'dark'

/** Default Config */
export type SettingState = {
  blankTheme: ThemeName
  navTheme: ThemeName
  layout: 'blank' | 'vertical' | 'horizontal'
  // production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
}

export const defaultConfig: SettingState = {
  blankTheme: 'light',
  navTheme: 'dark',
  layout: 'vertical',
  // production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
}

let localThemeConfig: Partial<SettingState> = {}
try {
  localThemeConfig = JSON.parse(Storage.get(SETTING_KEY, '{}'))
  const { blankTheme } = localThemeConfig
  blankTheme && useSettingPinia().setBlankTheme(blankTheme)
} catch {
  localThemeConfig = {}
}

export const useSettingStore = defineStore({
  id: 'theme',
  state: (): SettingState => ({
    ...defaultConfig,
    ...localThemeConfig,
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: SETTING_KEY,
        storage: localStorage
      }
    ]
  },
  getters: {
    getBlankTheme(): ThemeName {
      return this.blankTheme
    },
    getLayout(): string {
      return this.layout
    },
  },
  actions: {
    setBlankTheme(theme: ThemeName) {
      this.blankTheme = theme
      const darkClass = 'v-theme--dark'
      if (theme === 'dark') document.documentElement.classList.add(darkClass)
      else document.documentElement.classList.remove(darkClass)
      Storage.set(SETTING_KEY, this.$state)
    },
  },
})

// Need to be used outside the setup
export function useSettingPinia() {
  return useSettingStore(store)
}
