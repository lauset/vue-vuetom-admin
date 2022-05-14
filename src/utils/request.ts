import axios, { AxiosRequestConfig } from 'axios'
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum'
import { Storage } from '@/utils/Storage'
import { useUserStore } from '@/store/modules/user'
import { getVuetomMSG } from '@/plugin'
// import {ExclamationCircleOutlined} from '@ant-design/icons'
import { App, getCurrentInstance } from 'vue'
import { HAUT_ACCESS_TOKEN_KEY } from '@/enums/cacheEnum'

let m = () => {}

export const setupVuetomMsg = (app: App) => {
  m = app.config.globalProperties.$msg
}

export interface RequestOptions {
  /** 当前接口权限, 不需要鉴权的接口请忽略， 格式：sys:user:add */
  permCode?: string
  /** 是否直接获取data，而忽略message等 */
  isGetData?: boolean
  /** 请求成功是提示信息 */
  successMsg?: string
  /** 请求失败是提示信息 */
  errorMsg?: string
  /** 是否mock数据请求 */
  isMock?: boolean
}

const UNKNOWN_ERROR = '未知错误，请重试'

/** 真实请求的路径前缀 */
const baseApiUrl = import.meta.env.VITE_BASE_API
/** mock请求路径前缀 */
const baseMockUrl = import.meta.env.VITE_MOCK_API

const service = axios.create({
  // baseURL: baseApiUrl,
  timeout: 6000,
})

service.interceptors.request.use(
  config => {
    
    const token = Storage.get(HAUT_ACCESS_TOKEN_KEY)
    console.log('HAUT_TOKEN', token);
    console.log(config);

    // if (token && config.headers) {
    //   // 请求头token信息，请根据实际情况进行修改
    //   config.headers['Authorization'] = token
    // }
    return config
  },
  error => {
    Promise.reject(error)
  },
)

service.interceptors.response.use(
  response => {
    const res = response.data
    
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200 && res.code !== 0) {

      // mock is desc, haut is msg
      const msg = res.message || res.msg || res.desc || UNKNOWN_ERROR
      m.error('Error Response', { details: msg })

      // Illegal token
      if (res.code === 11001 || res.code === 11002) {
        window.localStorage.clear()
        window.location.reload()
        // to re-login
        // Modal.confirm({
        //   title: '警告',
        //   content: res.message || '账号异常，您可以取消停留在该页上，或重新登录',
        //   okText: '重新登录',
        //   cancelText: '取消',
        //   onOk: () => {
        //     localStorage.clear();
        //     window.location.reload();
        //   }
        // });
      }

      // throw other
      const error = new Error(msg) as Error & {
        code: any
      }
      error.code = res.code
      return Promise.reject(error)
    } else {
      return res
    }
  },
  error => {
    // 处理 422 或者 500 的错误异常提示
    const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR
    m.error('Error Catch', { details: errMsg })
    error.message = errMsg
    return Promise.reject(error)
  },
)

export type Response<T = any> = {
  code: number
  message: string
  data: T
}

export type BaseResponse<T = any> = Promise<Response<T>>

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = async <T = any>(
  config: AxiosRequestConfig,
  options: RequestOptions = {},
): Promise<T> => {
  try {
    const {
      successMsg,
      errorMsg,
      permCode,
      isMock,
      isGetData,
    } = options
    // 如果当前是需要鉴权的接口 并且没有权限的话 则终止请求发起
    // if (permCode && !useUserStore().perms.includes(permCode)) {
    //   return $message.error('你没有访问该接口的权限，请联系管理员！')
    // }
    const fullUrl = `${(isMock ? baseMockUrl : baseApiUrl) + config.url}`
    config.url = fullUrl.replace(/(?<!:)\/{2,}/g, '/')
    const res = await service.request(config)
    console.log('res', res);
    successMsg && m.success('Success', { details: successMsg })
    errorMsg && m.error('Error', { details: errorMsg })
    return isGetData ? res.data : res
  } catch (error: any) {
    return Promise.reject(error)
  }
}
