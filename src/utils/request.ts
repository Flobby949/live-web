import axios, { AxiosInstance } from 'axios'

export interface ResponseData<T> {
  success: boolean
  data: T
  message: string
}

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API as string, // api base_url
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在这里可以添加认证信息头部等
    // config.headers.Authorization = 'Your Auth Token';
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
    return response
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error)
  }
)

export { request }
