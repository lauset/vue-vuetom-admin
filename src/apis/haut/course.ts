import { COURSE, ENTER_CLASSROOM } from './apis'
import { useVuetom } from '@/plugins/vuetom'
import { request, BaseResponse } from '@/utils/request'

export const queryCourse = (token: string) => {
  const url = `${COURSE}?token=${token}&school_host=haut.hnscen.cn`
  return request<any>(
    {
      url,
      method: 'get',
    },
    {
      isMock: false,
      // successMsg: 'Suc',
      // errorMsg: 'Err'
    },
  )
}

export const queryClassRoom = (roomid: string, token: string) => {
  const url = `${ENTER_CLASSROOM}/${roomid}?token=${token}&school_host=haut.hnscen.cn`
  return request<any>({
    url,
    method: 'get',
  })
}
