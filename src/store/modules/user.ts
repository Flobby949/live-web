import { defineStore } from 'pinia'
import cache from '@/utils/cache'

export const userStore = defineStore('userStore', {
  state: () => ({
    // 用户信息
    user: {
      id: '',
      nickname: '',
      avatar: ''
    },
    // 登录 token
    token: cache.getToken(),
    isLogin: false
  }),
  actions: {
    setToken(val: string) {
      this.token = val
      this.isLogin = true
      cache.setToken(val)
    },
    logout() {
      this.token = ''
      this.isLogin = false
      cache.removeToken()
    }
  }
})
