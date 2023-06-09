import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import type { App } from 'vue'

const pinia = createPinia()
pinia.use(piniaPersist)

export function setupStore(app: App<Element>) {
  app.use(pinia)
}

export { pinia as store }
