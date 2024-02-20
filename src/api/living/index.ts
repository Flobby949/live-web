import { ResponseData, request, PageRespVO, API_PREFIX } from '@/utils/request'

const LIVING = API_PREFIX.LIVE_API + '/living'

export interface LivingRoomInitVO {
  roomId: number
  anchorId: number
  anchorName: string
  anchorImg: string
  roomName: string
  isAnchor: boolean
  userId: number
  avatar: string
  nickName: string
  defaultBgImg: string
  redPacketConfigCode: string
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

export const livingInfo = (roomId: number, skip = false): Promise<ResponseData<LivingRoomInitVO>> => {
  return request
    .post<ResponseData<LivingRoomInitVO>>(
      LIVING + `/anchor-config?roomId=${roomId}`,
      {},
      {
        headers: {
          SKIP_VALID: skip
        }
      }
    )
    .then((response) => response.data)
}

export const livingListByPage = (req: liveListPageDTO): Promise<ResponseData<PageRespVO<LivingRoomInfoVO>>> => {
  return request
    .post<ResponseData<PageRespVO<LivingRoomInfoVO>>>(LIVING + '/query-page', req)
    .then((response) => response.data)
}

export const userConnectLiving = (roomId: number): Promise<ResponseData<any>> => {
  return request.post<ResponseData<any>>(LIVING + `/online-pk`, { roomId: roomId }).then((response) => response.data)
}

export const prepareRedPacket = (roomId: number): Promise<ResponseData<any>> => {
  return request
    .post<ResponseData<any>>(LIVING + `/prepare-redPacket?roomId=${roomId}`)
    .then((response) => response.data)
}

export interface StartRedPacketDTO {
  anchorId: number
  userId: number
  redPacketConfigCode: string
}

export const startRedPacket = (dto: StartRedPacketDTO): Promise<ResponseData<any>> => {
  return request.post<ResponseData<any>>(LIVING + `/start-redPacket`, { ...dto }).then((response) => response.data)
}

export interface RedPacketReceiveVO {
  price: number
  status: number
}

export const getRedPacket = (code: string): Promise<ResponseData<RedPacketReceiveVO>> => {
  return request
    .post<ResponseData<RedPacketReceiveVO>>(LIVING + `/getRedPacket?code=${code}`)
    .then((response) => response.data)
}
