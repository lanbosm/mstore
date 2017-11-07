 import Vue from 'vue'
 import Vuex from 'vuex'

// import * as actions from './actions'
// import * as mutations from './mutations'

import cart from './modules/cart'
import address from './modules/address'
import api from '../api/index.js'
// Vuex is auto installed on the web
// if (WXEnvironment.platform !== 'Web') {
//   Vue.use(Vuex)
// }


 function test(delay){
   // 20ms 后去 resolve

   var delay=delay||300;
   var msg={msg:"添加成功"};
   return new Promise((resolve,reject) => {
     setTimeout(()=>{ resolve(msg); console.log("getlist"); },delay);
   });
 }

Vue.use(Vuex);
const store = new Vuex.Store({
  state:{
    lanbo:"ssss",
    list:[]
  },
  mutations:{
    saveList(state,data){

        state.list=data;
    }

  },
  actions:{

    //值得注意的是，await必须在async函数的上下文中的。

    //获取商品详情
    async  getDetail({dispatch,commit},value){
      try{

            var data=await api.getShopDetail(value);

            if(data.code==20000){  //这里的20000是业务逻辑 通信还是成功了
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

            if(data.code==20000){  //这里的20000是业务逻辑 通信还是成功了
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

       return test(3000);
     },




  },
  modules: {
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
