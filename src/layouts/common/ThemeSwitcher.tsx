import { useTheme } from 'vuetify'
import { useSettingStore } from '@/store/modules/settings'

export default defineComponent({
  setup() {
    const theme = useTheme()
    const settings = useSettingStore()
    const toggleTheme = () => {
      theme.global.name.value = theme.global.current.value.dark
        ? 'light'
        : 'dark'
      settings.setBlankTheme(theme.global.name.value)
    }
    return () => (
      <v-fade-transition mode='out-in'>
        <v-icon class='text-accent' onClick={toggleTheme}>
          {theme.name.value === 'dark'
            ? 'mdi-weather-sunny'
            : 'mdi-weather-night'}
        </v-icon>
      </v-fade-transition>
    )
  },
})
