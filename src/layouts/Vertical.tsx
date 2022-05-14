import {
  defineComponent,
  computed,
  reactive,
  getCurrentInstance,
} from 'vue'
import { useSettingStore } from '@/store/modules/settings'
import VerticalMenu from './menu/VerticalMenu'
import ThemeSwitcher from './common/ThemeSwitcher'
import LoginBtn from '../components/LoginBtn'
import { useHautStore } from '@/store/modules/haut'
export default defineComponent({
  components: {
    'vertical-menu': VerticalMenu,
    'theme-switcher': ThemeSwitcher,
    'login-btn': LoginBtn
  },
  setup() {
    const { proxy }: any = getCurrentInstance()
    const haut = useHautStore()
    const settings = useSettingStore()
    const theme = computed(() => settings.getBlankTheme)
    const name = haut.getName
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
            href="https://github.com/lauset/vue-vuetom-admin"
            target="_blank"
            rel="nofollow"
          >
            <v-icon class="ms-6 me-4 text-secondary">
              mdi-github
            </v-icon>
          </a>
          <theme-switcher></theme-switcher>
          <div style={['padding: 0 1rem;']}>Haut: {name}</div>
        </div>
      </div>
    </v-app-bar>
        <v-main>
          <div class="app-content-container boxed-container pa-6">
            <router-view />
            <login-btn></login-btn>
            {/* <slot></slot> */}
          </div>
        </v-main>
      </v-app>
    )
  },
})
