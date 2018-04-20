/**
 * Created by Administrator on 2017/10/23.
 */
//授权模块
import api from '../../api/index.js'

function remoteData(data,delay){
  // 20ms 后去 resolve
  var delay=delay||300;
  return new Promise((resolve,reject) => {
    setTimeout(()=>{ resolve(data);},delay);
  });
}


export default {
  namespaced: true,
  state: {
    authing:false
  },
  getters: {
     defaultAddress: state => {
       // return '12';
      // var sum=0;
      // state.list.forEach((ele,index)=>{
      //   sum+=Number(ele.price);
      // })
      // return sum;
      // getTodoById: (state, getters) => (id) => {
        return state.list.find( address => address.isDefault === true)
      // }
    }

  },
  mutations: {

  },
  actions: {
    async wxAuth({dispatch,commit},value){

      try{
        var url=await api.wxLogin();

        //location.href=url;
        location.replace(url);

      }catch (e){
        return await Promise.resolve(e);
      }
    },
    async getUserInfo({dispatch,commit},value){

      var {info}=await api.getUserInfo(value);

       commit('setUserInfo',info,{ root: true });

    }


  }
}
