import VuetomUI from 'vuetom-ui'
import { createVuetom } from 'vuetom'
import datePlugin from 'vuetom/esm/plugin/date'
import { App } from 'vue'
import { setupVuetomMsg } from '@/utils/request'
import 'vuetom-ui/dist/vuetom-ui.css'

const vuetom = createVuetom()

export const useVuetom = (params: any) => {
  const { date } = params || {}
  if (date) vuetom.use(datePlugin)
  return vuetom
}

export const setupVuetomUI = (app: App) => {
  app.use(VuetomUI)
  setupVuetomMsg(app)
}