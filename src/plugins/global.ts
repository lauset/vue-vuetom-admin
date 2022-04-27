import { App } from 'vue'

const getAssetsImg = (url: string) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}

export function setupGlobal(app: App) {
  app.config.globalProperties.getAssetsImg = getAssetsImg
}
