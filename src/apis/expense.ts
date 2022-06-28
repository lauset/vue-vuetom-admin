import { request } from '@/utils/request'

const EX_API = '/ex/expense'

export const query = (username: string, day: string) => {
  const url = `${EX_API}/${username}/${day}`
  return request<any>({
    url,
    method: 'get',
  })
}

export const add = (data: { username: string; day: string; info: object }) => {
  return request<any>({
    url: EX_API,
    method: 'post',
    data,
  })
}

export const del = (data: { username: string; day: string; _id: string }) => {
  return request<any>({
    url: EX_API,
    method: 'delete',
    data,
  })
}
