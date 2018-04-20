import axios from 'axios'
import qs from 'querystring'


const baseURL = (process.env.NODE_ENV === 'production')
    ? 'http://dorodoro-lab.com:8088/mockjsdata/2/'
    :'http://dorodoro-lab.com:8088/mockjsdata/2/';

const authURL="http://ngrok.dorodoro-lab.com";
//const authUrl="http://localhost:3002";
let platform='web';
// settings

axios.defaults.timeout = 5000

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'  //post是表单提交


//axios.defaults.baseURL = 'http://ngrok.dorodoro-lab.com';
axios.defaults.withCredentials=true;
axios.defaults.baseURL = baseURL;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(config.method  === 'post'){
       config.data = qs.stringify(config.data);
    }

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export function httpGet (url, params = {}) {

  return new Promise((resolve, reject) => {

    if(platform=='web'){
      axios.get(url, params).then(res => {

        resolve(res.data)

      }).catch((error) => {

        reject(error)

      })
    }else{
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

export function httpPost (url, params = {}) {

  return new Promise((resolve, reject) => {

    axios.post(url, params).then(res => {

      resolve(res.data)

    }).catch((error) => {

      reject(error)

    })

  })

}


export default {
  //微信授权
  wxLogin(){
    var scope='snsapi_userinfo';
    var backUrl=encodeURIComponent(location.href);
    return `${authURL}/cgi-bin/wechat/login?scope=${scope}&backUrl=${backUrl}`;

  },
  //微信获取用户信息
  getUserInfo(){
     return httpGet(`${authURL}/cgi-bin/wechat/oauth2`);
  },
  // 商品详情展示信息
  getShopDetail (id) {

    return httpGet(`product/${id}?id=${id}`)

  },



  // 订单建立
  orderBuild (value,type) {
    if(type=='single'){ //单买
      return httpPost(`product/buy`,value)
    }else{
      //TODO 完善
      return httpPost(`product/buyCart`,value)
    }

  }
}
