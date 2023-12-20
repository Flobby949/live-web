import { ResponseData, request, API_PREFIX } from '@/utils/request'
// 发送短信验证码
export const sendVerifyCode = (phone: string): Promise<ResponseData<any>> => {
  return request
    .post<ResponseData<any>>(`${API_PREFIX.LIVE_API}/msg/send?phone=${phone}`)
    .then((response) => response.data)
}
