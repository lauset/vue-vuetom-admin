import { defineComponent, computed, ref, reactive } from 'vue'
import MenuGroup from './MenuGroup'
import MenuLink from './MenuLink'
import './VerticalMenu.scss'

export default defineComponent({
  name: 'VerticalMenu',
  isDrawerOpen: {
    type: Boolean,
    default: null,
  },
  setup(props) {
    const icons = {
      mdiHomeOutline: 'mdi-home-outline',
      mdiAlphaTBoxOutline: 'mdi-alpha-t-box-outline',
      mdiEyeOutline: 'mdi-eye-outline',
      mdiCreditCardOutline: 'mdi-credit-card-outline',
      mdiTable: 'mdi-table',
      mdiFileOutline: 'mdi-file-outline',
      mdiFormSelect: 'mdi-form-select',
      mdiAccountCogOutline: 'mdi-account-cog-outline',
    }
    const isDrawerOpen = true
    return () => (
      <>
        <v-navigation-drawer
          value={isDrawerOpen}
          app
          floating
          width='260'
          class='app-navigation-menu'
          right={'$vuetify.rtl'}
          onInput={val => $emit('update:is-drawer-open', val)}
        >
          <div class='vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2'>
            <router-link
              to='/'
              class='d-flex align-center text-decoration-none'
            >
              {/* <v-img
                src={() => {getAssetsImg('logos/logo01.png')}}
                max-height='30px'
                max-width='30px'
                alt='logo'
                contain
                eager
                class='app-logo me-3'
              ></v-img> */}
              <v-slide-x-transition>
                <h2 class='app-title text-primary'>Vuetom</h2>
              </v-slide-x-transition>
            </router-link>
          </div>
          <v-list expand shaped class='vertical-nav-menu-items pr-5'>
            <MenuLink
              title='Dashboard'
              to={{ name: 'Welcome' }}
            ></MenuLink>
            <MenuLink
              title='Account Settings'
              to={{ name: 'Account' }}
              icon={icons.mdiAccountCogOutline}
            ></MenuLink>
            {/* <MenuGroup
              title='Pages'
              icon={icons.mdiFileOutline}
              v-slots={{
                default: () => (
                  <>
                  <h3>333</h3>
                    <MenuLink
                      title='Login'
                      to={{ name: 'pages-login' }}
                      target='_blank'
                    ></MenuLink>
                    <MenuLink
                      title='Register'
                      to={{ name: 'pages-register' }}
                      target='_blank'
                    ></MenuLink>
                    <MenuLink
                      title='Error'
                      to={{ name: 'error-404' }}
                      target='_blank'
                    ></MenuLink>
                  </>
                ),
              }}
            ></MenuGroup> */}
            {/* <!-- <nav-menu-section-title title="USER INTERFACE"></nav-menu-section-title> --> */}
            {/* <MenuLink
              title='Typography'
              to={{ name: 'typography' }}
              icon={icons.mdiAlphaTBoxOutline}
            ></MenuLink> */}
            {/* <MenuLink
        title="Icons"
        :to="{ name: 'icons' }"
        :icon="icons.mdiEyeOutline"
      ></MenuLink> */}
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
