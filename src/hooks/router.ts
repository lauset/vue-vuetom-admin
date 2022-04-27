// eslint-disable-next-line object-curly-newline
import { getCurrentInstance, reactive, toRefs, watch } from 'vue'

// Thanks: https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1
export const useRouter = () => {
  const { proxy }: any = getCurrentInstance()
  const state = reactive({
    route: proxy.$route,
  })
  watch(
    () => proxy.$route,
    r => {
      state.route = r
    },
  )
  return { ...toRefs(state), router: proxy.$router }
}

export const _ = null
