import { type App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const outsideLayout: Array<any> = []
const whiteNameList: Array<any> = []

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/vertical',
    name: 'VerticalLayout',
    redirect: '/dashboard/welcome',
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/layouts/Vertical'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/dashboard/welcome',
    name: 'Welcome',
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/views/dashboard/Welcome.vue'),
    meta: {
      title: '欢迎页',
    },
  },
  {
    path: '/user/account',
    name: 'Account',
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/views/user/Account.vue'),
    meta: {
      title: '账号设置',
    },
  },
  {
    path: '/404',
    name: 'Err404',
    component: () => import('@/views/error/404'),
    meta: {
      layout: 'blank',
    },
  },
  ...outsideLayout,
]

export const router = createRouter({
  history: createWebHashHistory(''),
  routes,
})

// reset router
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name } = route
    if (name && !whiteNameList.some(n => n === name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export async function setupRouter(app: App) {
  // 创建路由守卫
  // ...
  app.use(router)
  await router.isReady()
}

export default router
