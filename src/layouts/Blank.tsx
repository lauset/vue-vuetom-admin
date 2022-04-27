import { defineComponent, computed, reactive, getCurrentInstance, defineAsyncComponent } from 'vue'
import { useSettingStore } from '@/store/modules/settings' 
export default defineComponent({
  setup() {
    const { proxy }: any = getCurrentInstance()
    const settings = useSettingStore()
    const theme = computed(() => settings.getBlankTheme)
    return () => (
      <v-app theme={theme.value}>
        <v-main>
          <router-view></router-view>
        </v-main>
      </v-app>
    )
  },
})
