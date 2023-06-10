import { COURSE, ENTER_CLASSROOM } from './apis'
import zy6 from './zys/zy6'
import zy7 from './zys/zy7'
import zy8 from './zys/zy8'
import { request, BaseResponse } from '@/utils/request'

const submitItems: any = {
  ...zy6,
  ...zy7,
  ...zy8,
}

export const query = (id: string, token: string) => {
  const url = `${ENTER_CLASSROOM}/${id}?token=${token}&school_host=haut.hnscen.cn`
  return request<any>(
    {
      url,
      method: 'get',
    },
    {
      isMock: false,
    },
  )
}

export const submitAnswer = (id: string, type: number, token: string) => {
  const resId = id
  if (resId === '') return
  const url = `${ENTER_CLASSROOM}/${resId}`
  const data = {
    school_host: 'haut.hnscen.cn',
    token,
    items: JSON.stringify(submitItems[resId]),
  }
  console.log(url, data)
  return request<any>({
    url,
    method: 'post',
    data,
  })
  // return {"code":0,"msg":"OK","data":null,"count":0}
}

/**
 * 完成数
 * /edu/v1/classroom/1318/450
 * res.data.chapter[last].children -> c
 *
 * c.rec.praxise_has_count 总共
 * c.rec.praxise_correct_count 正确
 * c.rec.praxise_submit_count 剩余提交次数
 *
 */
