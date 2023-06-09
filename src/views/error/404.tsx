import { useTheme } from 'vuetify'

export default defineComponent({
  setup() {
    const { proxy }: any = getCurrentInstance()
    const theme = useTheme()
    onMounted(() => {
      // TODO ???
      // alert(proxy.$t('welcome'))
    })
    return () => (
      <>
        <div>
          <img
            height='100'
            class='absolute bottom-0'
            src={proxy.getAssetsImg(
              `other/misc-mask-${theme.global.name.value}.png`,
            )}
          />
          <div class='text-center px-5 pt-20'>
            <h2 class='text-2xl font-weight-semibold text--primary d-flex align-center justify-center'>
              <span class='me-2'>Page Not Found</span>
              <v-icon color='warning'>mdi-alert</v-icon>
            </h2>
            <div class='flex justify-center'>
              <v-img
                max-width='420'
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
