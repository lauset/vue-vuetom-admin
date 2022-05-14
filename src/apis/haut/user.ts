import { LOGIN } from "./apis"
import { request } from "@/utils/request"

export const hautLogin = (data: {
  num: string,
  password: string,
  device: string,
  school_host: string,
  token: string
}) => {
  data.device = 'app'
  data.school_host = 'haut.hnscen.cn'
  data.token = ''
  const url = `${LOGIN}`
  return request<any>({
    url,
    method: 'post',
    data
  },{
    isMock: false,
  })
}
