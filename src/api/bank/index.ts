import { ResponseData, request, API_PREFIX } from '@/utils/request'

const PAY_NOTIFY = API_PREFIX.BANK_API + '/pay-notify'

const BANK = API_PREFIX.LIVE_API + '/bank'

export interface PayProductItemVO {
  id: number
  name: string
  coinNum: number
}

export interface PayProductVO {
  currentBalance: number
  productList: PayProductItemVO[]
}

export interface productReqDTO {
  productId: number
  paySource: number
  payChannel: number
}

export interface ProductRespVO {
  orderId: string
}

export const payProductList = (type: number, skip = false): Promise<ResponseData<PayProductVO>> => {
  return request
    .get<ResponseData<PayProductVO>>(BANK + `/list/${type}`, {
      headers: {
        SKIP_VALID: skip
      }
    })
    .then((response) => response.data)
}

export const pay = (req: productReqDTO): Promise<ResponseData<ProductRespVO>> => {
  return request.post<ResponseData<ProductRespVO>>(BANK + '/pay', req).then((response) => response.data)
}
