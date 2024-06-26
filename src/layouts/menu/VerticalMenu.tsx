import MenuGroup from './MenuGroup'
import MenuLink from './MenuLink'
import { useSettingStore } from '@/store/modules/settings'
import './VerticalMenu.scss'

export default defineComponent({
  name: 'VerticalMenu',
  isDrawerOpen: {
    type: Boolean,
    default: null,
  },
  setup() {
    const { proxy }: any = getCurrentInstance()
    const icons = {
      mdiHomeOutline: 'mdi-home-outline',
      mdiAlphaTBoxOutline: 'mdi-alpha-t-box-outline',
      mdiEyeOutline: 'mdi-eye-outline',
      mdiCreditCardOutline: 'mdi-credit-card-outline',
      mdiTable: 'mdi-table',
      mdiFileOutline: 'mdi-file-outline',
      mdiFormSelect: 'mdi-form-select',
      mdiAccountCogOutline: 'mdi-account-cog-outline',
      mdiHeli: 'mdi-helicopter',
      mdiDashboard: 'mdi-certificate-outline',
    }
    const settings = useSettingStore()
    const show = computed({
      get() {
        return settings.getMenuShow
      },
      set(newVal) {
        settings.setMenuShow(newVal)
      },
    })
    const logoSrc = proxy.getAssetsImg('logos/logo01.png')
    return () => (
      <>
        <v-navigation-drawer
          v-model={show.value}
          app
          floating
          width='260'
          class='app-navigation-menu'
        >
          <div class='vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2'>
            <router-link
              to='/'
              class='d-flex align-center text-decoration-none'
            >
              <v-img
                src={logoSrc}
                max-height='30px'
                max-width='30px'
                min-height='30px'
                min-width='30px'
                alt='logo'
                contain
                eager
                class='app-logo me-3'
              ></v-img>
              <v-slide-x-transition>
                <h2 class='app-title text-primary'>Vuetom</h2>
              </v-slide-x-transition>
            </router-link>
          </div>
          <v-list expand shaped class='vertical-nav-menu-items pr-5'>
            <MenuLink
              title='Dashboard'
              to={{ name: 'Welcome' }}
              icon={icons.mdiDashboard}
            ></MenuLink>
            <MenuLink
              title='Account Settings'
              to={{ name: 'Account' }}
              icon={icons.mdiAccountCogOutline}
            ></MenuLink>
            <MenuGroup
              title='Pages'
              icon={icons.mdiFileOutline}
              v-slots={{
                default: () => (
                  <>
                    <MenuLink
                      icon=''
                      title='Demo1'
                      to={{ name: 'Demo1' }}
                    ></MenuLink>
                    <MenuLink
                      icon=''
                      title='Demo2'
                      to={{ name: 'Demo2' }}
                    ></MenuLink>
                    <MenuLink
                      icon=''
                      title='Error Page'
                      to={{ name: 'Err404' }}
                    ></MenuLink>
                  </>
                ),
              }}
            ></MenuGroup>
            <div class='vt-line'></div>
            <MenuLink
              title='Course'
              to={{ name: 'Course' }}
              icon={icons.mdiAlphaTBoxOutline}
            ></MenuLink>
            <MenuLink
              title='Vuetom'
              to={{ name: 'Vuetom' }}
              icon={icons.mdiHeli}
            ></MenuLink>
            <MenuLink
              title='Expense'
              to={{ name: 'Expense' }}
              icon={icons.mdiAlphaTBoxOutline}
            ></MenuLink>
          </v-list>
          {/* <a
      href="https://themeselection.com/products/materio-vuetify-vuejs-admin-template"
      target="_blank"
      rel="nofollow"
    >
      <!-- <v-img
        :src="
          require(`@/assets/images/pro/upgrade-banner-${
            $vuetify.theme.dark ? 'dark' : 'light'
          }.png`)
        "
        alt="upgrade-banner"
        transition="scale-transition"
        class="upgrade-banner mx-auto"
        max-width="230"
      ></v-img> -->
    </a> */}
        </v-navigation-drawer>
      </>
    )
  },
})
