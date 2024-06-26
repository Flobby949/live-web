import { HomePageUserVO } from '@/api/home'
class Cache {
  TokenKey = 'TOKEN'
  UserInfo = 'USER_INFO'

  getToken = (): string => {
    return localStorage.getItem(this.TokenKey) || ''
  }

  setToken = (value: string) => {
    localStorage.setItem(this.TokenKey, value)
  }

  removeToken = () => {
    localStorage.removeItem(this.TokenKey)
  }

  getUserInfo = (): HomePageUserVO => {
    return JSON.parse(localStorage.getItem(this.UserInfo) || '{}')
  }

  setUserInfo = (value: string) => {
    localStorage.setItem(this.UserInfo, value)
  }

  removeUserInfo = () => {
    localStorage.removeItem(this.UserInfo)
  }
}

export default new Cache()
