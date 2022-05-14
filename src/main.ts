import { createApp } from 'vue'
import App from './App'
import { setupVuetify } from '@/plugins/vuetify'
import { setupVuetomUI } from '@/plugins/vuetom'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupI18n } from '@/langs'
import { setupGlobal } from '@/plugins'

const app = createApp(App)

function setupPlugins() {
  setupGlobal(app)
}

async function setupApp() {
  setupVuetify(app)
  setupVuetomUI(app)
  setupStore(app)
  await setupI18n(app)
  await setupRouter(app)
  app.mount('#app')
}

setupPlugins()

setupApp()
