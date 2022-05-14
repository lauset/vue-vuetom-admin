import { defineComponent, getCurrentInstance } from 'vue'
import { useSettingStore } from '@/store/modules/settings'
export default defineComponent({
  setup() {
    const settings = useSettingStore()
    const { proxy }: any = getCurrentInstance()
    const changeTheme = () => {
      settings.setBlankTheme(proxy.$vuetify.theme.current === 'dark' ? 'light' : 'dark')
    }
    return () => (
      <v-fade-transition mode='out-in'>
        <v-icon class="text-accent"
          key={'$vuetify.theme.dark'}
          onClick={() => changeTheme()}
        >
          {proxy.$vuetify.theme.current === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'}
        </v-icon>
      </v-fade-transition>
    )
  },
})
