const REQ_FAIL = '请求异常，可以多试几次'
const REQ_UNREQ = '接口无法访问了'
const REQ_TIMEOUT = '请求超时'
const REQ_UNCONNECT = '无法连接到服务器'
const REQ_CANCEL = '取消请求'

const R = {
  REQ_FAIL,
  REQ_UNREQ,
  REQ_TIMEOUT,
  REQ_UNCONNECT,
  REQ_CANCEL,
}

export const REQ = { ...R }

export default R
