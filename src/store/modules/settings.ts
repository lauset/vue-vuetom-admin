import { defineStore } from 'pinia'
import { SETTING_KEY, DARK_CLASS } from '@/enums/cacheEnum'
import { store } from '@/store'
import { Storage } from '@/utils/Storage'

/** Theme Value */
export type ThemeName = 'light' | 'dark' | string

/** Default Config */
export type SettingState = {
  blankTheme: ThemeName
  navTheme: ThemeName
  layout: 'blank' | 'vertical' | 'horizontal'
  menuShow: boolean
  // production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
}

export const defaultConfig: SettingState = {
  blankTheme: 'dark',
  navTheme: 'dark',
  layout: 'vertical',
  menuShow: true,
  // production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
}

const setDomTheme = (theme: ThemeName | undefined) => {
  if (!theme) return
  if (theme === 'dark') document.documentElement.classList.add(DARK_CLASS)
  else document.documentElement.classList.remove(DARK_CLASS)
}

let localThemeConfig: Partial<SettingState> = {}
try {
  localThemeConfig = Storage.get(SETTING_KEY)
  const { blankTheme } = localThemeConfig
  setDomTheme(blankTheme)
} catch {
  localThemeConfig = {}
  Storage.set(SETTING_KEY, defaultConfig)
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
        storage: localStorage,
      },
    ],
  },
  getters: {
    getBlankTheme(): ThemeName {
      return this.blankTheme
    },
    getLayout(): string {
      return this.layout
    },
    getMenuShow(): boolean {
      return this.menuShow
    },
  },
  actions: {
    setBlankTheme(theme: ThemeName) {
      setDomTheme(theme)
      this.blankTheme = theme
      Storage.set(SETTING_KEY, this.$state)
    },
    setMenuShow(show: boolean) {
      this.menuShow = show
    },
  },
})

// Need to be used outside the setup
export function useSettingPinia() {
  return useSettingStore(store)
}
