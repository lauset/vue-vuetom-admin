import { type App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const outsideLayout: Array<any> = []
const whiteNameList: Array<any> = ['Login', 'Err404']

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/index',
    redirect: '/dashboard/welcome',
  },
  {
    path: '/vertical',
    name: 'VerticalLayout',
    redirect: '/dashboard/welcome',
    component: () => import('@/layouts/Vertical'),
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
    component: () => import('@/views/dashboard/Welcome.vue'),
    meta: {
      title: '欢迎页',
    },
  },
  {
    path: '/vuetom',
    name: 'Vuetom',
    component: () => import('@/views/dashboard/Vuetom.vue'),
    meta: {
      title: 'Vuetom系列',
    },
  },
  {
    path: '/expense',
    name: 'Expense',
    component: () => import('@/views/dashboard/Expense.vue'),
    meta: {
      title: 'Expense报销',
    },
  },
  {
    path: '/user/account',
    name: 'Account',
    component: () => import('@/views/user/Account.vue'),
    meta: {
      title: '账号设置',
    },
  },
  {
    path: '/haut/coruse',
    name: 'Course',
    component: () => import('@/views/haut/Course.vue'),
    meta: {
      title: '课程信息',
    },
  },
  {
    path: '/other/demo1',
    name: 'Demo1',
    component: () => import('@/views/other/Demo1'),
    meta: {
      title: 'DEMO1',
    },
  },
  {
    path: '/other/demo2',
    name: 'Demo2',
    component: () => import('@/views/other/Demo2'),
    meta: {
      title: 'DEMO2',
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
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/404',
  },
  ...outsideLayout,
]

export const router = createRouter({
  history: createWebHistory(''),
  routes,
})

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
