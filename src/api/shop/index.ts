import { ResponseData, request, API_PREFIX } from '@/utils/request'

const SHOP = API_PREFIX.LIVE_API + '/shop'

export interface SkuInfoVO {
  skuId: number
  skuPrice: number
  skuCode: string
  name: string
  iconUrl: string
  originalIconUrl: string
  remark: string
}

export const listSkuInfo = (roomId: number): Promise<ResponseData<SkuInfoVO[]>> => {
  return request
    .get<ResponseData<SkuInfoVO[]>>(SHOP + '/listSkuInfo?roomId=' + roomId)
    .then((response) => response.data)
}

export const skuDetail = (skuId: number): Promise<ResponseData<SkuInfoVO>> => {
  return request
    .post<ResponseData<SkuInfoVO>>(SHOP + '/detail', {
      skuId
    })
    .then((response) => response.data)
}

export const addCart = (skuId: number, roomId: number): Promise<ResponseData<boolean>> => {
  return request
    .post<ResponseData<boolean>>(SHOP + '/addCar', {
      skuId,
      roomId
    })
    .then((response) => response.data)
}

export interface skuInfoDTO {}

export interface ShopCarItemRespVO {
  skuInfoDTO: SkuInfoVO
  count: number
}

export interface ShopCarRespVO {
  userId: number
  roomId: number
  shopCarItemRespVOS: ShopCarItemRespVO[]
}

export const getCarInfo = (roomId: number): Promise<ResponseData<ShopCarRespVO>> => {
  return request
    .post<ResponseData<ShopCarRespVO>>(SHOP + '/getCarInfo', {
      roomId
    })
    .then((response) => response.data)
}

export interface SkuPrepareOrderVO {
  carItemRespList: ShopCarItemRespVO[]
  totalPrice: number
  orderId: number
}

export const prepareOrder = (roomId: number): Promise<ResponseData<SkuPrepareOrderVO>> => {
  return request
    .post<ResponseData<SkuPrepareOrderVO>>(SHOP + '/prepareOrder?roomId=' + roomId)
    .then((response) => response.data)
}

export const payNow = (orderId: number): Promise<ResponseData<boolean>> => {
  return request.post<ResponseData<boolean>>(SHOP + '/payNow?orderId=' + orderId).then((response) => response.data)
}
