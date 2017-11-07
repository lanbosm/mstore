/**
 * Created by Administrator on 2017/10/23.
 */
//地址模块

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
    list:[
      {'aid':1,'adree':'qibao',isDefault:false},
      {'aid':2,'adree':'bao',isDefault:true},
    ]
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
   addressGetList(state, list){
      console.log(list);
      state.list=list;
    },
    addressSetList(state,list){
      state.list=list;
    },
    addressDelete(state,list){
      state.list=list;
    }
  },
  actions: {
    async getAddressList({dispatch,commit},value){
      try{
        var mockList= [{'aid':1,'adree':'qibao',isDefault:false},
          {'aid':2,'adree':'bao',isDefault:true},
        ];

        var list=await remoteData(mockList,1000);
        //data.code=20000
        if(!list){throw new Error('获取失败');}

        commit('addressGetList',list);
      }catch (e){

        return await Promise.resolve(e);
      }//  return test(3000);
    },


  }
}
