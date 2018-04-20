// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mixins from './mixins'
import myHtml from './html.js'
import Mint from './mintUi';
import store from './store'
import * as filters from './filters'



//主css样式
import './scss/style.scss';

//导入阿狸
import util from '@/util';

import { sync } from 'vuex-router-sync'


import BScroll from 'better-scroll'
import VueCookies from 'vue-cookies'

import vueTouch from "./packages/touch"

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

//使用自定义图标
util.initIconFont();

// //使用Mint
Vue.use(Mint);

//全局我定义的组件标签
Vue.use(myHtml);

//全局方法
Vue.mixin(mixins);

//滚动
Vue.prototype.$BScroll=BScroll;
Vue.prototype.$cookies=VueCookies;



Vue.use(vueTouch);


Vue.config.productionTip = false;

// Vue.component('fallback', resolve => resolve(require('./components/fallback')));


router.beforeEach(({meta, path,fullPath}, from, next)=> {

   const {auth = true} =  meta      // meta代表的是to中的meta对象，path代表的是to中的path对象  
   var isLogin=Boolean(Vue.prototype.$cookies.get('wechatkey'));;
  //https://router.vuejs.org/zh-cn/advanced/meta.html
  if (auth  &&  !isLogin  &&  path !== '/login') {
     location.replace('/login?redirect='+encodeURIComponent(fullPath));
     //next({ path: '/login', query: { redirect: fullPath }})   //  跳转到login页面  
  }else {
    next()   // 进行下一个钩子函数  
   }

})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App ref="app"/>',
  components: { App }
})
