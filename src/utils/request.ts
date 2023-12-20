import axios, { AxiosInstance } from 'axios'
import router from '@/router'
import { userStore } from '@/store'

export interface ResponseData<T> {
  success: boolean
  data: T
  message: string
}

export interface PageRespVO<T> {
  list: T[]
  hasNext: boolean
}

export enum API_PREFIX {
  LIVE_API = '/live-api',
  BANK_API = '/live-bank-api'
}

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API as string, // api base_url
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在这里可以添加认证信息头部等
    const store = userStore()
    if (store?.token) {
      config.headers.Authorization = store.token
    }
    // 追加时间戳，防止 GET 请求缓存
    if (config.method?.toUpperCase() === 'GET') {
      config.params = { ...config.params, t: new Date().getTime() }
    }
    console.log(config)
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    console.log(response.data)
    return response
  },
  (error) => {
    console.log(error)
    // 构造一个error对象
    const err = {
      data: {
        success: false,
        data: null,
        message: ''
      }
    }
    // 处理响应错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除 token 信息并跳转到首页
          userStore().removeToken()
          router.push('/')
          // 弹框提示重新登录
          err.data.message = '登录已过期，请重新登录'
          break
        default:
          err.data.message = '系统异常，请稍后再试'
          break
      }
    }
    return err
  }
)

export { request }
