import { ResponseData, request } from '@/utils/request'

const LIVING = '/living'

export interface LivingRoomInitVO {
  roomId: number
  anchorId: number
  anchorImg: string
  roomName: string
  isAnchor: boolean
}

export const startLiving = (type: number): Promise<ResponseData<any>> => {
  return request.post<ResponseData<any>>(LIVING + `/start-living?type=${type}`).then((response) => response.data)
}

export const closeLiving = (roomId: number): Promise<ResponseData<any>> => {
  return request.post<ResponseData<any>>(LIVING + `/close-living?roomId=${roomId}`).then((response) => response.data)
}

export const livingInfo = (roomId: number): Promise<ResponseData<LivingRoomInitVO>> => {
  return request
    .post<ResponseData<LivingRoomInitVO>>(LIVING + `/anchor-config?roomId=${roomId}`)
    .then((response) => response.data)
}
