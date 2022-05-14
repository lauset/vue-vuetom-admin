declare namespace VTAdmin {
  type CompType = 'blank' | 'vertical' | ''
}

declare namespace REQ {
  type Options = {
    method: string
    body: object
    form: object
    formData: object
    json: Boolean
    headers: any
    agent: undefined
    format: string
    timeout: number
    response_timeout: number
    jsonpCallback: string
  }
  type Err = {} | null
  type Resp = {
    body: any
    raw: any
  }
  type Body = any
  type HttpPro = {
    isCancelled: boolean
    promise?: Promise<any> | undefined | null
    cancelFn?: ((reason?: any) => void) | undefined | null
    cancelHttp?: (() => true | undefined) | undefined | null
    requestObj?: any
  }
}
