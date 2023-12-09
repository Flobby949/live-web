import { defineStore } from 'pinia'
import cache from '@/utils/cache'
import { UserInfo } from '@/api/user'

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
    saveUserInfo(info: UserInfo) {
      this.user = info
      cache.setUserInfo(JSON.stringify(info))
    },
    logout() {
      this.token = ''
      this.isLogin = false
      this.user = {} as UserInfo
      cache.removeToken()
      cache.removeUserInfo()
    }
  }
})
