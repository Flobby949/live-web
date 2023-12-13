import { ResponseData, request, PageRespVO } from '@/utils/request'

const LIVING = '/living'

export interface LivingRoomInitVO {
  roomId: number
  anchorId: number
  anchorImg: string
  roomName: string
  isAnchor: boolean
}

export interface LivingRoomInfoVO {
  id?: number
  type?: number
  roomName?: string
  anchorId?: number
  watchNum?: number
  goodNum?: number
  covertImg?: string
}

export interface liveListPageDTO {
  page: number
  pageSize: number
  type?: number
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

export const livingListByPage = (req: liveListPageDTO): Promise<ResponseData<PageRespVO<LivingRoomInfoVO>>> => {
  return request
    .post<ResponseData<PageRespVO<LivingRoomInfoVO>>>(LIVING + '/query-page', req)
    .then((response) => response.data)
}