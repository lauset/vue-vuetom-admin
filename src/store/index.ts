import { createPinia } from 'pinia'
import type { App } from 'vue'
import piniaPluginPersist from 'pinia-plugin-persist'

const pinia = createPinia()

pinia.use(piniaPluginPersist)

export function setupStore(app: App<Element>) {
  app.use(pinia)
}

export { pinia as store }
