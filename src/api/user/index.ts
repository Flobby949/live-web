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

export const userLogin = (dto: UserLoginDto): Promise<ResponseData<UserLoginResult>> => {
  return request.post<ResponseData<any>>('/live-api/user/login', dto).then((response) => response.data)
}
