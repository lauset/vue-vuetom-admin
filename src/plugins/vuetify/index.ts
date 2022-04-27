import vuetify from './vuetify'
import { loadFonts } from './webfontloader'
import type { App } from 'vue'

export function setupVuetify(app: App<Element>) {
  loadFonts()
  app.use(vuetify)
}

export default {}
