import { ResponseData, request, API_PREFIX } from '@/utils/request'

const HOME_PAGE = API_PREFIX.LIVE_API + '/home-page'

export interface HomePageUserVO {
  userId: number
  nickName: string
  avatar: string
  sex: number
  isVip: boolean
}

export const getHomePageUserInfo = (): Promise<ResponseData<HomePageUserVO>> => {
  return request.get<ResponseData<any>>(HOME_PAGE + '/user-info').then((response) => response.data)
}
