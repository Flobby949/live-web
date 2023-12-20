import { ResponseData, request, API_PREFIX } from '@/utils/request'

const IM_API = API_PREFIX.LIVE_API + '/im'

export interface ImConfigVO {
  token: string
  wsImServerAddress: string
  tcpImServerAddress: string
}

export const getImConfig = (): Promise<ResponseData<ImConfigVO>> => {
  return request.get<ResponseData<ImConfigVO>>(IM_API + '/config').then((response) => response.data)
}
