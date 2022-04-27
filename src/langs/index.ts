import { type App } from 'vue'
import { createI18n } from 'vue-i18n'
import { localeMap } from './config'
import type { LocaleType } from './config'
import { useLocaleStoreWithOut } from '@/store/modules/lang'

export const loadLocalePool: LocaleType[] = []

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale)
}

export function setLoadLocalePool(cb: (loadLocalePool: LocaleType[]) => void) {
  cb(loadLocalePool)
}

async function createI18nOptions() {
  const localeStore = useLocaleStoreWithOut()
  const locale = localeStore.getLocale
  const defaultLocal = await import(`./lang/${locale}.ts`)
  const message = defaultLocal.default?.message ?? {}

  setHtmlPageLang(locale)
  setLoadLocalePool(loadLocalePool => {
    loadLocalePool.push(locale)
  })

  return {
    locale,
    legacy: false,
    fallbackLocale: localeMap.zh_CN,
    messages: {
      [locale]: message as { [key: string]: string },
    },
    globalInjection: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
  }
}

export const getI18n = (async () => createI18n(await createI18nOptions()))()

export let i18n: Awaited<typeof getI18n>

getI18n.then(res => (i18n = res))

export async function setupI18n(app: App) {
  await getI18n
  app.use(i18n)
}
