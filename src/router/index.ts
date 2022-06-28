import { type App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const outsideLayout: Array<any> = []
const whiteNameList: Array<any> = ['Login', 'Err404']

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
    path: '/index',
    redirect: '/dashboard/welcome',
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
    path: '/vuetom',
    name: 'Vuetom',
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/views/dashboard/Vuetom.vue'),
    meta: {
      title: 'Vuetom系列',
    },
  },
  {
    path: '/expense',
    name: 'Expense',
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/views/dashboard/Expense.vue'),
    meta: {
      title: 'Expense报销',
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
    path: '/haut/coruse',
    name: 'Course',
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/views/haut/Course.vue'),
    meta: {
      title: '课程信息',
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
