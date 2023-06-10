import ks5 from './kss/ks5'
import ks6 from './kss/ks6'
import ks7 from './kss/ks7'
import ks8 from './kss/ks8'
import { request } from '@/utils/request'

const schoolHost = 'haut.hnscen.cn'

const submitData: any = {
  ...ks5,
  ...ks6,
  ...ks7,
  ...ks8,
}

export const enjoin = (testId: string, token: string) => {
  if (!submitData.hasOwnProperty(testId)) return
  const url = `/exam/v1/user/enjoin`
  const data = {
    school_host: schoolHost,
    token,
    testId,
  }
  return request<any>({
    url,
    method: 'post',
    data,
  })
  // return {"code":0,"msg":"组卷成功，可以开始答题","data":{"order":1},"count":0}
}

export const queryTest = (token: string) => {
  const url = `/exam/v1/user/test?token=${token}&school_host=haut.hnscen.cn&testName=&type=`
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

export const submitTestAnswer = (testId: string, token: string) => {
  if (!submitData.hasOwnProperty(testId)) return
  const url = `/exam/v1/user/submit`
  const data = {
    data: JSON.stringify(submitData[testId]),
    isAuto: 0,
    orderIndex: 1,
    school_host: schoolHost,
    testId,
    token,
  }
  return request<any>({
    url,
    method: 'post',
    data,
  })
  // return {"code":0,"msg":"保存成功","data":null,"count":0}
}
