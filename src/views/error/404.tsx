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
        <h3>404</h3>
      </>
    )
  },
})
