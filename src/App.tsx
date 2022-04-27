import { defineComponent, computed, ref, h, getCurrentInstance, defineAsyncComponent, resolveComponent } from 'vue'
import { useRouter } from './hooks/router'
import { useSettingStore } from './store/modules/settings'

export default defineComponent({
  components: {
    blank: defineAsyncComponent(() => import('./layouts/Blank')),
    vertical: defineAsyncComponent(() => import('./layouts/Vertical'))
  },
  setup() {
    let comp = ref('blank')
    const { route } = useRouter()
    const settings = useSettingStore()
    const resolveLayout = computed(() => {
      // if (route.value.name === null) return null
      return (route.value.meta.layout ?? settings.getLayout)
    })
    return () => (
      <>
        {/* <button onClick={() => comp.value = 'blank'}>Blank</button>
        <button onClick={() => comp.value = 'vertical'}>Vertical</button> */}
        {/* <router-view /> */}
        {
          h(resolveComponent(resolveLayout.value))
        }
      </>
    )
  },
})
