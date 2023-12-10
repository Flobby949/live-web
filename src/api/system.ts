import { ResponseData, request } from '@/utils/request'

// 发送短信验证码
export const sendVerifyCode = (phone: string): Promise<ResponseData<any>> => {
  return request.post<ResponseData<any>>(`/msg/send?phone=${phone}`).then((response) => response.data)
}
