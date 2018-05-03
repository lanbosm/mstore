/**
 * Created by Administrator on 2017/10/23.
 */
// 订单模块
import api from '../../api/index.js'
import util from '@/util'

export default {
  namespaced: true,
  state: {
    orderSn: '',
    orderlist: []
  },
  getters: {
    tokend (state, getters, rootState, rootGetters) {
      return rootState.token
    },
    defaultAddress: state => {
      // return '12';
      // var sum=0;
      // state.list.forEach((ele,index)=>{
      //   sum+=Number(ele.price);
      // })
      // return sum;
      // getTodoById: (state, getters) => (id) => {

      // }
    }

  },
  mutations: {
    pushItem (state, value) {
      // 内存一份
      state.orderlist.push(value)
    },
    removeItem (state, value) {
      // 内存一份
      var index = 0
      state.orderlist.splice(index, 1)
      // 本地一份
      // util.setStorage('mtoken', value)
    }
  },
  actions: {

    // 直接购买
    async singleBuy ({state, dispatch, rootState, commit}, payload) {
      commit('pushItem', payload)
      try {
        var data = await api.orderBuild(state.orderlist[0], 'single', rootState.token)
        if (data.code === 2000) {
          return Promise.resolve(data)
        } else {
          return Promise.reject(data)
        }
      } catch (e) { // 捕捉错误信息
        return Promise.reject(e)
      }
    },

    // 购物车购买
    async cartBuy ({dispatch, commit}, value) {
      try {
        var data = await api.orderBuild(value, 'cart')

        if (data.code == 2000) { // 这里的20000是业务逻辑 通信还是成功了
          return Promise.resolve(data)
        } else {
          return Promise.reject(data)
        }
      } catch (e) { // 捕捉错误信息
        return Promise.reject(e)
      }
    },
    // 撤销
    async rollbackOrder () {

    }
  }
}
