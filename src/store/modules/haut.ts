import { defineStore } from 'pinia'
import { store } from '@/store'
import { Storage } from '@/utils/Storage'
import { HAUT_ACCESS_TOKEN_KEY, HAUT_STORE } from '@/enums/cacheEnum'
import { hautLogin } from '@/apis/haut/user'

interface hautLoginParams {
  num: string,
  password: string
}

export const useHautStore = defineStore({
  id: 'haut',
  state: () => {
    return {
      token: Storage.get(HAUT_ACCESS_TOKEN_KEY, null),
      name: null,
      stu: {},
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: HAUT_STORE,
        storage: localStorage,
        paths: ['name', 'stu']
      }
    ]
  },
  getters: {
    getToken(): string {
      return this.token ?? ''
    },
    getName(): string {
      return this.name ?? 'guest'
    },
    getStu(): any {
      return this.stu
    }
  },
  actions: {
    resetHaut() {
      this.name = null
      this.stu = {}
      this.token = null
      Storage.remove(HAUT_ACCESS_TOKEN_KEY)
    },
    setHautToken(stu: any) {
      this.stu = stu
      this.token = stu.token ?? ''
      this.name = stu.realname ?? 'guest'
      const ex = 7 * 24 * 60 * 60 * 1000
      Storage.set(HAUT_ACCESS_TOKEN_KEY, this.token, ex)
    },
    async login(params: hautLoginParams) {
      try {
        const { code, data } = await hautLogin(params)
        console.log(code, data);
        if (code == 0) this.setHautToken(data)
      } catch (err) {
        return Promise.reject(err)
      }
    }
  },
})

export function useHautStoreWithOut() {
  return useHautStore(store)
}
