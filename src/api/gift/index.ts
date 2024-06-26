import { ResponseData, request, API_PREFIX } from '@/utils/request'

const GIFT = API_PREFIX.LIVE_API + '/gift'

export interface GiftConfigVO {
  giftId: number
  giftName: string
  price: number
  status: number
  coverImgUrl: string
  svgaUrl: string
  createTime: Date
}

export interface GiftSendDTO {
  giftId: number
  roomId: number
  senderUserId: number
  receiverId: number
  type: number
}

export const listGift = (): Promise<ResponseData<GiftConfigVO[]>> => {
  return request.get<ResponseData<GiftConfigVO[]>>(GIFT + `/list`).then((response) => response.data)
}

export const send = (req: GiftSendDTO): Promise<ResponseData<any>> => {
  return request.post<ResponseData<any>>(GIFT + `/send`, req).then((response) => response.data)
}
