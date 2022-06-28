import { number } from '.pnpm/@intlify+core-base@9.1.10/node_modules/@intlify/core-base'
import { COURSE, ENTER_CLASSROOM } from './apis'
import zy7 from './zys/zy7'
import zy6 from './zys/zy6'
import zy5 from './zys/zy5'
import { request, BaseResponse } from '@/utils/request'

const submitItems: any = {
  ...zy5,
  ...zy6,
  ...zy7,
}

const handlePreId = (id: string, type: number): string => {
  let lastId = ''
  const lastArr = []
  switch (id) {
    // lv7
    case '1318/450':
      lastArr[0] = '63775'
      lastArr[1] = '63776'
      lastArr[2] = '63777'
      break
    case '2746/749':
      lastArr[0] = '83486'
      lastArr[1] = '83487'
      lastArr[2] = '83488'
      break
    case '5110/2307':
      lastArr[0] = '195986'
      lastArr[1] = '195987'
      lastArr[2] = '195988'
      break
    // lv6 计算机网络技术
    case '636/490':
      lastArr[0] = '51549'
      lastArr[1] = '51550'
      lastArr[2] = '51551'
      break
    // lv6 微机原理
    case '1049/491':
      lastArr[0] = '58829'
      lastArr[1] = '59038'
      lastArr[2] = '58831'
      break
    // lv6 互联网应用开发
    case '4275/1447':
      lastArr[0] = '150337'
      lastArr[1] = '150338'
      lastArr[2] = '150339'
      break
    // lv5 数据库原理与应用
    case '801/469':
      lastArr[0] = '58681'
      lastArr[1] = '58682'
      lastArr[2] = '58683'
      break
    // lv5 软件工程
    case '613/470':
      lastArr[0] = '58825'
      lastArr[1] = '58826'
      lastArr[2] = '58936'
      break
    // lv5 单片机及应用
    case '502/471':
      lastArr[0] = '59252'
      lastArr[1] = '59253'
      lastArr[2] = '59254'
      break
  }
  lastId = lastArr[type - 1]
  if (lastId === '') return ''
  return `${id}/submit/${lastId}`
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
  const resId = handlePreId(id, type)
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
