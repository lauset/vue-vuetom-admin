import vuetify from './vuetify'
import type { App } from 'vue'

export function setupVuetify(app: App<Element>) {
  app.use(vuetify)
}

export default {}
