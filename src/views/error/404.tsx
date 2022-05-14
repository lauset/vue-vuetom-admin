import { defineComponent, onMounted, getCurrentInstance } from 'vue'

export default defineComponent({
  setup() {
    const { proxy }: any = getCurrentInstance()
    onMounted(() => {
      // TODO ???
      // alert(proxy.$t('welcome'))
    })
    return () => (
      <>
        <div id='misc'>
          <img
            class='misc-mask'
            height='100'
            src={proxy.getAssetsImg(
              `other/misc-mask-${
                proxy.$vuetify.theme.current == 'dark' ? 'dark' : 'light'
              }.png`,
            )}
          />
          <div class='page-title text-center px-5'>
            <h2 class='text-2xl font-weight-semibold text--primary d-flex align-center justify-center'>
              <span class='me-2'>Page Not Found</span>
              <v-icon color='warning'>mdi-alert</v-icon>
            </h2>
            <div class='misc-character d-flex justify-center'>
              <v-img
                max-width='500'
                src={proxy.getAssetsImg(`other/404-bg.png`)}
              ></v-img>
            </div>
            <v-btn color='primary' to='/index' class='mb-4'>
              Back to home
            </v-btn>
          </div>
        </div>
      </>
    )
  },
})
