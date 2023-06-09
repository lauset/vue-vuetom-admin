import { useTheme } from 'vuetify'
import { useRouter } from './hooks/router'
import { useSettingStore } from './store/modules/settings'

export default defineComponent({
  components: {
    blank: defineAsyncComponent(() => import('./layouts/Blank')),
    vertical: defineAsyncComponent(() => import('./layouts/Vertical')),
  },
  setup() {
    const comp = ref('blank')
    const theme = useTheme()
    const { route } = useRouter()
    const settings = useSettingStore()
    const resolveLayout = computed(() => {
      // return comp.value
      return route.value.meta.layout ?? settings.getLayout
    })
    theme.global.name.value = settings.getBlankTheme
    return () => (
      <>
        {/* <button onClick={() => (comp.value = 'blank')}>Blank</button>
        <button onClick={() => (comp.value = 'vertical')}>Vertical</button> */}
        {/* <router-view /> */}
        {h(resolveComponent(resolveLayout.value))}
      </>
    )
  },
})
