import { ResponseData, request, API_PREFIX } from '@/utils/request'

const IM_API = API_PREFIX.LIVE_API + '/im'

export interface ImConfigVO {
  token: string
  wsImServerAddress: string
  tcpImServerAddress: string
}

// 入参skip，默认值为false，表示不跳过校验
export const getImConfig = (skip = false): Promise<ResponseData<ImConfigVO>> => {
  // 带请求头的请求
  return request
    .get<ResponseData<ImConfigVO>>(IM_API + '/config', {
      headers: {
        SKIP_VALID: skip
      }
    })
    .then((response) => response.data)
}
