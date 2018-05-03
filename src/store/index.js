import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import cart from './modules/cart'
import order from './modules/order'
import address from './modules/address'
import api from '../api/index.js'
// Vuex is auto installed on the web
// if (WXEnvironment.platform !== 'Web') {
//   Vue.use(Vuex)
// }
import {TOKEN_KEY, USER_INFO_KEY} from '@/var.js'
import util from '@/util'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {

    list: [],
    userInfo: {},
    token: null

  },
  getters: {
    userInfo: state => {
      var info
      if (!util.isEmptyObject(state.userInfo)) {
        info = state.userInfo
      } else if (util.getStorage(USER_INFO_KEY)) {
        info = util.getStorage(USER_INFO_KEY)
      } else {
        info = {
          'nickname': '匿名用户'
        }
      }
      return info
    }
  },
  mutations: {
    setToken (state, value) {
      state.token = value
      util.setStorage(TOKEN_KEY, value)
    },
    setUserInfo (state, data) {
      // 内存存一份
      state.userInfo = data
      // 本地存储也映射份
      util.setStorage(USER_INFO_KEY, state.userInfo)
    },
    resetUserInfo (state, data) {
      state.userInfo = {}
      state.token = null
      util.rmStorage(USER_INFO_KEY)
      util.rmStorage(TOKEN_KEY)
    }
  },
  actions: {

    // 值得注意的是，await必须在async函数的上下文中的。
    async  syncLocal ({dispatch, commit}, value) {
      if (util.getStorage(TOKEN_KEY)) {
        commit('setToken', util.getStorage(TOKEN_KEY))
      }
      if (util.getStorage(USER_INFO_KEY)) {
        commit('setUserInfo', util.getStorage(USER_INFO_KEY))
      }
    },
    // 获取商品详情
    async  getDetail ({dispatch, commit}, value) {
      try {
        var data = await api.getShopDetail(value)

        if (data.code === 2000) { // 这里的20000是业务逻辑 通信还是成功了
          return Promise.resolve(data)
        } else {
          return Promise.reject(data)
        }
      } catch (e) { // 捕捉错误信息
        return Promise.reject(e)
      }
    }
  },
  modules: {
    auth,
    cart,
    order,
    address
    // address: {
    //   namespaced: true,
    //   state: {
    //     transitionName: '',
    //     action: []
    //   },
    //   mutations: {
    //     getAddress(state, transition) {
    //       console.log('获取地址列表');
    //       //store.commit('nanami/konami');
    //       // state.transitionName = transition;
    //     }
    //   }
    // }
  }
// route switch object
})

export default store
