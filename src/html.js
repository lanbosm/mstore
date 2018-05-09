
// 内部组件
import logo from '@/components/Logo.vue'
import footer from '@/components/Footer.vue'
import header from '@/components/Header.vue'
import searchBar from '@/components/SearchBar.vue'
import dataLoading from '@/components/DataLoading.vue'
import dataError from '@/components/DataError.vue'
import checkBox from '@/components/CheckBox.vue'
import duoPinBox from '@/components/duoPinBox.vue'
// 第三方组件
import scroll from '@/packages/scroll/scroll.vue'
import simplescroll from '@/packages/simpleScroll/simplescroll.vue'

const install = function(Vue, config = {}) {

  if (install.installed) return;

  Vue.component(logo.name,logo);

  Vue.component(footer.name,footer);
  Vue.component(header.name,header);
  Vue.component(searchBar.name,searchBar);
  Vue.component(dataLoading.name,dataLoading);
  Vue.component(dataError.name,dataError );
  Vue.component(checkBox.name,checkBox);
  Vue.component(scroll.name,scroll);
  Vue.component(simplescroll.name,simplescroll);
  Vue.component(duoPinBox.name,duoPinBox);

  // Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
  // Vue.$toast = Vue.prototype.$toast = Toast;
  // Vue.$indicator = Vue.prototype.$indicator = Indicator;
};

// auto install 游览器环境下自动安装 e
if (typeof window !== 'undefined' && window.Vue) {
     install(window.Vue);
}

//vue.install

export default  {install};
