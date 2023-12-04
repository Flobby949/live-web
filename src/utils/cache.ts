class Cache {
  TokenKey = 'TOKEN'

  getToken = (): string => {
    return localStorage.getItem(this.TokenKey) || ''
  }

  setToken = (value: string) => {
    localStorage.setItem(this.TokenKey, value)
  }

  removeToken = () => {
    localStorage.removeItem(this.TokenKey)
  }
}

export default new Cache()
