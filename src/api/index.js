import axios from 'axios'
import qs from 'querystring'

import devAPI from './api.dev.config'
import prodAPI from './api.prod.config'
import util from '@/util'

let server = devAPI
if (process.env.NODE_ENV === 'production') {
  server = prodAPI
}

axios.defaults.baseURL = server.API_URL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // post是表单提交
axios.defaults.timeout = server.REQ_DELAY

let platform = 'web'

/**
 * 注意 这里的error 是axios 继承原始error出来的  error.response  如果想更改error的信息 请务必也要这么做
 */
class ServerError extends Error {
  constructor (error) {
    super()

    this.message = error.message
    this.code = error.code
    if (error.response) {
      this.response = error.response.data
      this.message = error.response.data.message
      this.code = error.response.data.code
    }
  }
}

class ClientError extends Error {
  constructor (code, message, response) {
    super()
    this.code = code
    this.message = message
    this.response = response
  }
}

/**
 *  请求拦截器 如果post 对数据进行序列化
 */
function interceptorsOfRequest (req) {
  if (req.method === 'post') {
    req.data = qs.stringify(req.data)
  }

  return Promise.resolve(req)
}

/**
 *  响应拦截器
 */
function interceptorsOfResponse (res) {
  return Promise.resolve(res)
}
/**
 *  拦截器错误
 */
function interceptorsOfError (error) {
  return Promise.reject(error)
}
// 添加请求拦截器
axios.interceptors.request.use(interceptorsOfRequest, interceptorsOfError)

// 添加响应拦截器
axios.interceptors.response.use(interceptorsOfResponse, interceptorsOfError)

/**
 * get请求
 * @param url
 * @param query
 * @returns {Promise<any>}
 */
export function httpGet (url, query = {}, config = {}) {
  return new Promise((resolve, reject) => {
    if (platform === 'web') {
      axios.get(url, {params: query, ...config}).then(res => {
        resolve(res.data)
      }).catch((error) => {
        reject(new ServerError(error))
      })
    } else {
      // stream.fetch({
      //   method: 'GET',
      //   url: `${baseURL}/${url}`,
      //   type: 'json'
      // }, (response) => {
      //   if (response.status == 200) {
      //     resolve(response.data)
      //   }
      //   else {
      //     reject(response)
      //   }
      // }, () => {})
    }
  })
}

/**
 * post请求
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function httpPost (url, data = {}, query = {}, auth) {
  var headers = auth ? {'Authorization': auth} : {}
  return new Promise((resolve, reject) => {
    axios.post(url, data, {params: query, headers}).then(res => {
      resolve(res.data)
    }).catch((error) => {
      reject(new ServerError(error))
    })
  })
}

export default {
  get publicKey () {
    return server.PUBLIC_KEY
  },
  get ServerError () {
    return ServerError()
  },
  // 密码登录
  passLogin (value) {
    return httpPost(`account/login`, value)
  },
  // 微信登录
  wxLogin () {
    var scope = 'snsapi_userinfo'
    var backUrl = encodeURIComponent(location.href)
    return `${server.OPEN_URL}/wechat/login?scope=${scope}&backUrl=${backUrl}`
  },
  // 微信获取用户信息
  wxUserInfo () {
    return httpGet(`${server.OPEN_URL}/wechat/oauth2`, null, {withCredentials: true})
  },
  // 商品分类
  getCategory (query) {
    return httpGet(`/category`, query)
  },
  // 商品详情展示信息
  getShopDetail (id) {
    return httpGet(`/product/${id}`)
  },
  // 个人信息
  getProfile (auth) {
    return httpGet(`/account/profile`, null, {headers: {'Authorization': auth}})
  },
  // 订单建立
  orderBuild (payload, type, auth) {
    if (auth) {
      return httpPost(`/product/buy`, payload, null, auth)
    } else {
      return util.testPromiseResolve(300, new ClientError(4010, '此接口需要认证服务'))
    }

    // if (type === 'single') { // 单买
    //   return httpPost(`product/buy`, payload)
    // } else {
    //
    //   return httpPost(`product/buyCart`, payload)
    // }
  }
}
