import { ResponseData, request } from '@/utils/request'

// 用户登录参数
export interface UserLoginDto {
  phone: string
  code: string
}

// 用户登录返回结果
export interface UserLoginResult {
  userId: number
  token: string
  isLoginSuccess: boolean
  message: string
}

export interface UserInfo {
  userId: number
  nickName: string
  avatar: string
  trueName: string
  sex: number
  bornDate: Date
  workCity: number
  bornCity: number
  createTime: Date
  updateTime: Date
}

export const userLogin = (dto: UserLoginDto): Promise<ResponseData<UserLoginResult>> => {
  return request.post<ResponseData<UserLoginResult>>('/live-api/user/login', dto).then((response) => response.data)
}

export const userLogout = (): Promise<ResponseData<any>> => {
  return request.post<ResponseData<any>>('/live-api/user/logout').then((response) => response.data)
}

export const getUserInfo = (): Promise<ResponseData<UserInfo>> => {
  return request.get<ResponseData<any>>('/live-api/user/userInfo').then((response) => response.data)
}
