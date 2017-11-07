import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias:'/home',
      name: 'home',
      component(resolve) {
        require(['@/views/Home'], resolve);
      },
      meta: {
         noPageAnimation: true,
      }
    },
    {
      path: '/category',
      name: 'category',
      component(resolve) {
        require(['@/views/Category'], resolve);
      },
      meta: {
         noPageAnimation: true,
      }
    },
    {
      path: '/profile', //个人中心
      name: 'profile',
      component(resolve) {
        require(['@/views/Profile'], resolve);
      },
      meta: {
        noPageAnimation: true,
      }
    },
    {
      path: '/address', //地址列表
      name: 'address',
      component(resolve) {
        require(['@/views/Address'], resolve);
      },
      meta: {
        noPageAnimation: false,
      }
    },
    {
      path: '/address/add',//添加列表
      name: 'address_add',
      component(resolve) {
        require(['@/views/address_add'], resolve);
      },
      meta: {
        noPageAnimation: true,
      }
    },
    {
      path:'/point', //积分
      name:'point',
      component(resolve){
        require(['@/views/point'],resolve);
      },
      meta: {
        noPageAnimation: false,
      }
    },
    {
      path:'/recommend', //多拼多汇
      name:'recommend',
      component(resolve){
        require(['@/views/recommend'],resolve);
      },
      meta: {
        noPageAnimation: false,
      }
    },
    {
      path:'/discount', //多拼多汇
      name:'discount',
      component(resolve){
        require(['@/views/discount'],resolve);
      },
      meta: {
        noPageAnimation: false,
      }
    },
    {
      path:'/point/list',//积分列表
      name:'pointList',
      component(resovle){
        require(['@/views/pointList'],resovle);
      },
      meta: {
        noPageAnimation: true,
      }
    },
    {
      path:'/balance', //余额
      name:'balance',
      component(resolve){
        require(['@/views/balance'],resolve);
      },
      meta: {
        noPageAnimation: false,
      }
    },
    {
      path:'/balance/list', //余额明细
      name:'balanceList',
      component(resolve){
        require(['@/views/balanceList'],resolve);
      },
      meta: {
        noPageAnimation: true,
      }
    },
    {
      path:'/coupons',  //票券
      name:'coupons',
      component(resolve){
        require(['@/views/coupons'],resolve);
      },
      meta: {
        noPageAnimation: false,
      }
    },
    {
      path:'/conponsList', //使用票券列表
      name:'conponsList',
      component(resolve){
        require(['@/views/couponsList'],resolve);
      },
      meta: {
        noPageAnimation: false,
      }
    },
    {
      path:'/orderList', //订单列表
      name:'orderList',
      component(resolve){
        require(['@/views/orderList'],resolve);
      },
      meta:{
          noPageAnimation: false,
      }
    },
    {
      path:'/orderDetail/:id',
      name:'orderDetail',
      component(resolve){
        require(['@/views/orderDetail'],resolve);
      },
      meta:{
          noPageAnimation: false,
      }
    },
    {
      path:'/invoice', //开具发票
      name:'invoice',
      component(resolve){
        require(['@/views/invoice'],resolve);
      },
      meta:{
          noPageAnimation:true,
      }
    },
    {
      path:'/invoice/next', //开具发票
      name:'invoice_next',
      component(resolve){
        require(['@/views/invoice_next'],resolve);
      },
      meta:{
          noPageAnimation:false,
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component(resolve) {
        require(['@/views/Cart'], resolve);
      },
      meta: {
         noPageAnimation: true,
      }
    },
    {
      path: '/detail/:id', //详情
      name: 'user',
      component(resolve) {
        require(['@/views/Detail'], resolve);
      }
    },
    {
      path:'/pay', //支付
      name:'pay',
      component(resolve){
        require(['@/views/pay'],resolve);
      },
      meta: {
         noPageAnimation: false,
      }
    },
    {
      path:'/evaluate/:id', //评价
      name:'evaluate',
      component(resolve){
        require(['@/views/evaluate'], resolve);
      }
    },
    {
      path: '*',
      name: 'nopage',
      component(resolve) {
        require(['@/views/404'], resolve);
      },
      meta: {
         noPageAnimation: true,
      }
    },
    // {
    //   path: '/login',
    //   name: Login.name,
    //   component: Login
    // },
    // {
    //   path: '/wallet',
    //   name: Wallet.name,
    //   component: Wallet
    // }
  ]
})
