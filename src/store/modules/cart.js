//购物车的子模块

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
    list: [],
    orderList:[

    ]
  },
  getters: {
     totalPrice: state => {
       var sum=0;
        state.list.forEach((ele,index)=>{
            sum+=Number(ele.price);
        })
       return sum;
     }

  },
  mutations: {
    cartSet(state, list){
      console.log(list);
      state.list=list;
    },
    cartPush(state,item){
      state.user = info
    }
  },
  actions: {
      async getCartList({dispatch,commit},value){

        try{
              var mockList= [{name:'商品1号',pid:1,price:1000,quantity:1},
              {name:'商品2号',pid:2,price:2000,quantity:1},
              {name:'商品3号',pid:3,price:3000,quantity:1},
                {name:'商品3号',pid:3,price:3000,quantity:1},
              ];

              var list=await remoteData(mockList,3000);
              //data.code=20000
              if(!list){throw new Error('获取失败');}

              commit('cartSet',list);
           }catch (e){

              return await Promise.resolve(e);
        }





      //  return test(3000);
     },

  }
}
