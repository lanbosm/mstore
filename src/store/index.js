 import Vue from 'vue'
 import Vuex from 'vuex'

import auth from './modules/auth'
import cart from './modules/cart'

import address from './modules/address'
import api from '../api/index.js'
// Vuex is auto installed on the web
// if (WXEnvironment.platform !== 'Web') {
//   Vue.use(Vuex)
// }
import {USER_INFO_KEY} from '@/var.js'
import util from '@/util';


Vue.use(Vuex);
const store = new Vuex.Store({
  state:{

    list:[],
    userInfo:{},

  },
  getters: {
    userInfo: state => {
      var info;
      if(!util.isEmptyObject(state.userInfo)){
          info = state.userInfo;
      }else if(util.getStorage(USER_INFO_KEY)){
          info = util.getStorage(USER_INFO_KEY);
      }else{
          info={
              "nickname":"匿名用户"
          }
      }
      return info
    }
  },
  mutations:{

    saveList(state,data){
        state.list=data;
    },
    setUserInfo(state,data){
         //内存存一份
         state.userInfo=data;
         //本地存储也映射份
         util.setStorage(USER_INFO_KEY,state.userInfo);
    },
    resetUserInfo(state,data){
          state.userInfo={};
          util.rmStorage(USER_INFO_KEY);
    }


  },
  actions:{

    //值得注意的是，await必须在async函数的上下文中的。

    //获取商品详情
    async  getDetail({dispatch,commit},value){
      try{

            var data=await api.getShopDetail(value);

            if(data.code==2000){  //这里的20000是业务逻辑 通信还是成功了
               return Promise.resolve(data);
             }
            else{
              return Promise.reject(data);
            }
      } catch (e){ //捕捉错误信息

            return  Promise.reject(e);
      }
    },

    //单件购买
    async singleBuy({dispatch,commit},value){
      try{

            var data=await api.orderBuild(value,'single');

            if(data.code==2000){  //这里的20000是业务逻辑 通信还是成功了
               return Promise.resolve(data);
             }
            else{
              return Promise.reject(data);
            }
      } catch (e){ //捕捉错误信息
            return  Promise.reject(e);
      }
    },


    //测试
    async  addList({dispatch,commit},value){
        // commit('gotData', await getData())
      await dispatch('getList')

       commit("saveList",value);

       return u.testPromise(3000,{msg:'添加成功'});
     },




  },
  modules: {
    auth,
    cart,
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
