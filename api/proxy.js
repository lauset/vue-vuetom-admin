// 该服务为 vercel serve跨域处理
const { createProxyMiddleware } = require('http-proxy-middleware')

const URL_HAUT = 'https://api.jinkex.com'
const URL_EXPRESS = 'http://139.224.217.197:3002'

const PRE_HAUT1 = '/edu'
const PRE_HAUT2 = '/exam'
const PRE_EXPRESS = '/ex'

module.exports = (req, res) => {
  let target = ''
  // 代理目标地址 target 替换为你跨域请求的服务器 如： http://baidu.com
  if (req.url.startsWith(PRE_HAUT1) || req.url.startsWith(PRE_HAUT2)) {
    target = URL_HAUT
  } else if (req.url.startsWith(PRE_EXPRESS)) {
    target = URL_EXPRESS
  }
  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/backend`
      // 例如 /backend/user/login 将被转发到 http://backend-api.com/user/login
      '^/ex/': '/',
    },
  })(req, res)
}
