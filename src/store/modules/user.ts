import { defineStore } from 'pinia'
import cache from '@/utils/cache'
import { HomePageUserVO } from '@/api/home'

export const userStore = defineStore('userStore', {
  state: () => ({
    // 用户信息
    user: cache.getUserInfo(),
    // 登录 token
    token: cache.getToken(),
    isLogin: !!cache.getToken()
  }),
  actions: {
    setToken(val: string) {
      this.token = val
      this.isLogin = true
      cache.setToken(val)
    },
    removeToken() {
      this.token = ''
      this.isLogin = false
      cache.removeToken()
    },
    saveUserInfo(info: HomePageUserVO) {
      this.user = info
      cache.setUserInfo(JSON.stringify(info))
    },
    logout() {
      this.token = ''
      this.isLogin = false
      this.user = {} as HomePageUserVO
      cache.removeToken()
      cache.removeUserInfo()
    }
  }
})
