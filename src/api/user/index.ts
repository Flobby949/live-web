import { ResponseData, request } from '@/utils/request'

const ACCOUNT = '/account'

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

export const userLogin = (dto: UserLoginDto): Promise<ResponseData<UserLoginResult>> => {
  return request.post<ResponseData<UserLoginResult>>(ACCOUNT + '/login', dto).then((response) => response.data)
}

export const userLogout = (): Promise<ResponseData<any>> => {
  return request.post<ResponseData<any>>(ACCOUNT + '/logout').then((response) => response.data)
}
