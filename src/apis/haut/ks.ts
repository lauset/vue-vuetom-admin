import { request } from '@/utils/request'

const schoolHost = 'haut.hnscen.cn'

const submitData: any = {
  // testId
  '4758': [
    { praxiseId: 56067, value: '4' },
    { praxiseId: 55983, value: '1' },
    { praxiseId: 56025, value: '4' },
    { praxiseId: 56068, value: '4' },
    { praxiseId: 55984, value: '1' },
    { praxiseId: 56026, value: '4' },
    { praxiseId: 56069, value: '3' },
    { praxiseId: 55985, value: '1' },
    { praxiseId: 56027, value: '4' },
    { praxiseId: 56070, value: '3' },
    { praxiseId: 55986, value: '2' },
    { praxiseId: 56028, value: '3' },
    { praxiseId: 56071, value: '3' },
    { praxiseId: 55987, value: '3' },
    { praxiseId: 56029, value: '1' },
    { praxiseId: 56072, value: '3' },
    { praxiseId: 55988, value: '1' },
    { praxiseId: 56030, value: '2' },
    { praxiseId: 56073, value: '3' },
    { praxiseId: 55989, value: '1' },
    { praxiseId: 56031, value: '4' },
    { praxiseId: 56074, value: '1' },
    { praxiseId: 55990, value: '2' },
    { praxiseId: 56032, value: '1' },
    { praxiseId: 56075, value: '1' },
    { praxiseId: 55991, value: '1' },
    { praxiseId: 56033, value: '1' },
    { praxiseId: 56076, value: '2' },
    { praxiseId: 55992, value: '2' },
    { praxiseId: 56034, value: '3' },
    { praxiseId: 56090, value: '3' },
    { praxiseId: 56047, value: '3' },
    { praxiseId: 56099, value: '1' },
    { praxiseId: 56015, value: '1' },
    { praxiseId: 56057, value: '1' },
    { praxiseId: 56100, value: '1' },
    { praxiseId: 56016, value: '1' },
    { praxiseId: 56058, value: '1' },
    { praxiseId: 56101, value: '1' },
    { praxiseId: 56017, value: '-1' },
    { praxiseId: 56059, value: '1' },
    { praxiseId: 56102, value: '1' },
  ],
  '4759': [
    { praxiseId: 159510, value: '2' },
    { praxiseId: 159511, value: '4' },
    { praxiseId: 159512, value: '1' },
    { praxiseId: 159513, value: '2' },
    { praxiseId: 159514, value: '3' },
    { praxiseId: 159515, value: '3' },
    { praxiseId: 159516, value: '4' },
    { praxiseId: 159517, value: '1' },
    { praxiseId: 159518, value: '4' },
    { praxiseId: 159519, value: '3' },
    { praxiseId: 159520, value: '3' },
    { praxiseId: 159521, value: '4' },
    { praxiseId: 159522, value: '4' },
    { praxiseId: 159523, value: '2' },
    { praxiseId: 159524, value: '3' },
    { praxiseId: 159525, value: '2' },
    { praxiseId: 159526, value: '4' },
    { praxiseId: 159527, value: '4' },
    { praxiseId: 159528, value: '1' },
    { praxiseId: 159529, value: '4' },
    { praxiseId: 159530, value: '[1,3]' },
    { praxiseId: 159531, value: '[4,2,1,3]' },
    { praxiseId: 159532, value: '[1,3,4]' },
    { praxiseId: 159533, value: '[1,2]' },
    { praxiseId: 159534, value: '[1,4,3]' },
    { praxiseId: 159535, value: '[2,3,4]' },
    { praxiseId: 159536, value: '[2,3,4,1]' },
    { praxiseId: 159537, value: '[1,2,4]' },
    { praxiseId: 159538, value: '[1,2,3,4]' },
    { praxiseId: 159539, value: '[2,1]' },
    { praxiseId: 159540, value: '-1' },
    { praxiseId: 159541, value: '1' },
    { praxiseId: 159542, value: '1' },
    { praxiseId: 159543, value: '-1' },
    { praxiseId: 159544, value: '-1' },
    { praxiseId: 159545, value: '-1' },
    { praxiseId: 159546, value: '1' },
    { praxiseId: 159547, value: '1' },
    { praxiseId: 159548, value: '1' },
    { praxiseId: 159549, value: '1' },
  ],
  '4760': [
    { praxiseId: 5660, value: '3' },
    { praxiseId: 5702, value: '4' },
    { praxiseId: 5744, value: '3' },
    { praxiseId: 5661, value: '2' },
    { praxiseId: 5703, value: '4' },
    { praxiseId: 5745, value: '4' },
    { praxiseId: 5662, value: '3' },
    { praxiseId: 5704, value: '4' },
    { praxiseId: 5746, value: '1' },
    { praxiseId: 5663, value: '3' },
    { praxiseId: 5705, value: '3' },
    { praxiseId: 5747, value: '2' },
    { praxiseId: 5664, value: '1' },
    { praxiseId: 5706, value: '2' },
    { praxiseId: 5748, value: '4' },
    { praxiseId: 5665, value: '4' },
    { praxiseId: 5707, value: '3' },
    { praxiseId: 5749, value: '4' },
    { praxiseId: 5666, value: '4' },
    { praxiseId: 5708, value: '2' },
    { praxiseId: 5750, value: '2' },
    { praxiseId: 5667, value: '1' },
    { praxiseId: 5709, value: '2' },
    { praxiseId: 5751, value: '4' },
    { praxiseId: 5668, value: '3' },
    { praxiseId: 5710, value: '2' },
    { praxiseId: 5752, value: '1' },
    { praxiseId: 5669, value: '4' },
    { praxiseId: 5711, value: '2' },
    { praxiseId: 5753, value: '2' },
    { praxiseId: 5670, value: '3' },
    { praxiseId: 5712, value: '4' },
    { praxiseId: 5692, value: '-1' },
    { praxiseId: 5734, value: '1' },
    { praxiseId: 5776, value: '-1' },
    { praxiseId: 5693, value: '1' },
    { praxiseId: 5735, value: '1' },
    { praxiseId: 5777, value: '1' },
    { praxiseId: 5694, value: '1' },
    { praxiseId: 5736, value: '1' },
    { praxiseId: 5778, value: '1' },
    { praxiseId: 5695, value: '1' },
  ],
}

export const enjoin = (testId: string, token: string) => {
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
  const url = `exam/v1/user/submit`
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
