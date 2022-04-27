import {
  defineComponent,
  computed,
  reactive,
  getCurrentInstance,
} from 'vue'
import { useSettingStore } from '@/store/modules/settings'
import VerticalMenu from './menu/VerticalMenu'
import ThemeSwitcher from './common/ThemeSwitcher'
export default defineComponent({
  components: {
    'vertical-menu': VerticalMenu,
    'theme-switcher': ThemeSwitcher
  },
  setup() {
    const { proxy }: any = getCurrentInstance()
    const settings = useSettingStore()
    const theme = computed(() => settings.getBlankTheme)
    return () => (
      <v-app theme={theme.value}>
        <vertical-menu></vertical-menu>
        {/* <v-app-bar color='grey-lighten-2' name='app-bar' class='justify-center'>
          <div class='d-flex justify-center align-center w-100'></div>
        </v-app-bar> */}
        <v-app-bar
      app
      flat
      absolute
      color="transparent"
    >
      <div class="boxed-container w-full">
        <div class="d-flex align-center mx-6">
          <v-spacer></v-spacer>
          <a
            href="https://github.com/themeselection/materio-vuetify-vuejs-admin-template-free"
            target="_blank"
            rel="nofollow"
          >
            <v-icon class="ms-6 me-4 text-secondary">
              mdi-github
            </v-icon>
          </a>
          <theme-switcher></theme-switcher>
        </div>
      </div>
    </v-app-bar>
        <v-main>
          <v-card class='rounded-lg h-auto ma-6 pa-6'>
            <router-view />
          </v-card>
        </v-main>
      </v-app>
    )
  },
})
