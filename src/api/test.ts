import { ResponseData, request } from '@/utils/request'

export const testSuccess = (): Promise<ResponseData<any>> => {
  return request.get<ResponseData<any>>('/live-api/test/success').then((response) => response.data)
}

export const testError = (): Promise<ResponseData<any>> => {
  return request.get<ResponseData<any>>('/live-api/test/error').then((response) => response.data)
}

export const testException = (): Promise<ResponseData<any>> => {
  return request.get<ResponseData<any>>('/live-api/test/exception').then((response) => response.data)
}
