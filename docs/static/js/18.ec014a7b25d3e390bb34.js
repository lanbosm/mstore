webpackJsonp([18],{"/hfh":function(t,a,e){"use strict";a.a={name:"category",data:function(){return{tabbarIndex:1,productDetail:{},id:null,quantity:1}},created:function(){this.id=this.$route.params.id,this.fetchData()},mounted:function(){},watch:{tabbarIndex:function(t){var a=this;this.$nextTick(function(e){a.$refs["scroll"+t].refresh()})}},methods:{fetchData:function(){var t=this;this.$store.dispatch("getDetail",this.id).then(function(a){t.productDetail=a.productDetail}).catch(function(t){console.log(t)})},addCart:function(){this.$toast({message:"添加成功",position:"bottom",duration:1e3})},buyNow:function(){var t=this;this.$store.dispatch("singleBuy",{id:this.id,quantity:this.quantity}).then(function(a){t.$router.replace("/orderDetail/"+t.id)}).catch(function(a){t.$messagebox.alert("出错了")})}}}},"/pee":function(t,a,e){"use strict";function i(t){e("EAWg")}Object.defineProperty(a,"__esModule",{value:!0});var n=e("/hfh"),A=e("N4iA"),l=e("VU/8"),o=i,r=l(n.a,A.a,!1,o,"data-v-32b0927a",null);a.default=r.exports},EAWg:function(t,a,e){var i=e("Tl1X");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("rjj0")("1e870c5a",i,!0)},N4iA:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"page full flex flex-col detail"},[e("my-header2",[e("div",{staticClass:"detail-tabbar"},[e("div",{staticClass:"detail-tabbar-item",class:{active:1==t.tabbarIndex},on:{click:function(a){t.tabbarIndex=1}}},[t._v("\n        商品\n      ")]),t._v(" "),e("div",{staticClass:"detail-tabbar-item",class:{active:2==t.tabbarIndex},on:{click:function(a){t.tabbarIndex=2}}},[t._v("\n        详情\n      ")]),t._v(" "),e("div",{staticClass:"detail-tabbar-item",class:{active:3==t.tabbarIndex},on:{click:function(a){t.tabbarIndex=3}}},[t._v("\n        评价\n      ")]),t._v(" "),e("div",{staticClass:"detail-tabbar-line",class:"line"+t.tabbarIndex},[e("div",{staticClass:"slide-line"})])]),t._v(" "),e("div",{attrs:{slot:"right"},slot:"right"},[t._v("分享")])]),t._v(" "),e("div",{staticClass:"container-main"},[e("ul",{class:"container-tab-ul container-tab-show"+t.tabbarIndex},[e("div",{staticClass:"container-tab container-tab-1"},[t.productDetail.banner?e("simple-scroll",{ref:"scroll1",staticClass:"scroll-list",attrs:{direction:"vertical"}},[e("div",{staticClass:"item-info"},[e("div",{staticClass:"item-info-banner"},[e("img",{staticClass:"img-responsive",attrs:{src:t.productDetail.banner}})]),t._v(" "),e("div",{staticClass:"item-info-list"},[e("div",{staticClass:"item-info-list-row"},[t._v("\n                价格 "),e("span",[t._v(t._s(t._f("currency")(t.productDetail.price)))])]),t._v(" "),e("div",{staticClass:"item-info-list-row"},[t._v("\n                发货地 "+t._s(t.productDetail.city)+"\n              ")]),t._v(" "),t._l(20,function(a){return e("div",{key:a,staticClass:"item-info-list-row"},[t._v("\n                一些商品的内容"+t._s(a)+"\n              ")])})],2)])]):e("data-empty")],1),t._v(" "),e("div",{staticClass:"container-tab container-tab-2 "},[t.productDetail.detailPicList?e("simple-scroll",{ref:"scroll2",staticClass:"scroll-list",attrs:{direction:"vertical"}},[e("div",{staticClass:"item-pic"},[e("ul",t._l(t.productDetail.detailPicList,function(a){return e("li",[e("p",[t._v("\n                  大家在发言中结合自身实际工作提出建议。施芝鸿委员提出，要积极投身到新时代新的伟大进军，努力在新时代展现新气象、新作为；郑建邦常委代表民革中央发言建议，要按照中共十九大有关部署，加快西北地区发展，推动区域协调发展；徐辉常委代表民盟中央发言提出，明确教育战略定位，贯彻“以人民为中心”的发展思想，继续深化教育改革，加快推进教育现代化；李谠常委代表民建中央发言提出，确立清洁能源优先发展战略，加强清洁能源高端装备研发制造，提高清洁能源消纳能力，鼓励清洁能源企业参与“一带一路”能源合作；蔡达峰常委代表民进中央发言表示，\n                ")]),t._v(" "),e("img",{staticClass:"img-responsive",attrs:{src:a}})])}))])]):e("data-empty")],1),t._v(" "),e("div",{staticClass:"container-tab container-tab-3"},[e("div",{staticClass:"item-evaluate"},[t.productDetail.evaluates?e("simple-scroll",{ref:"scroll3",staticClass:"scroll-list",attrs:{direction:"vertical"}},t._l(t.productDetail.evaluates,function(a){return e("mt-cell",{key:a.star,attrs:{title:a.memo}},[t._v("\n              "+t._s(a.star)+"\n            ")])})):e("data-empty")],1)])])]),t._v(" "),e("div",{staticClass:"detail-footer flex flex-row"},[t._m(0),t._v(" "),e("div",{staticClass:"detail-footer-item cart",on:{click:function(a){t.pagePush("/cart")}}},[e("i",{staticClass:"iconfont icon-gouwuche"}),t._v(" "),e("span",{staticClass:"footer-txt"},[t._v("购物车")])]),t._v(" "),e("div",{staticClass:"detail-footer-item addCart",on:{click:function(a){t.addCart()}}},[e("span",{staticClass:"footer-txt"},[t._v("加入购物车")])]),t._v(" "),e("div",{staticClass:"detail-footer-item buyNow",on:{click:function(a){t.buyNow()}}},[e("span",{staticClass:"footer-txt"},[t._v("立即购买")])])])],1)},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"detail-footer-item favorite"},[e("span",{staticClass:"footer-txt"},[t._v("关注")])])}],A={render:i,staticRenderFns:n};a.a=A},Tl1X:function(t,a,e){a=t.exports=e("FZ+f")(!0),a.push([t.i,'.detail .detail-tabbar[data-v-32b0927a]{width:12rem;height:2rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;border-radius:5px;position:relative}.detail .detail-tabbar .detail-tabbar-item[data-v-32b0927a]{color:gray;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-flex:1;-ms-flex:1;flex:1}.detail .detail-tabbar .detail-tabbar-item.active[data-v-32b0927a]{color:#000}.detail .detail-tabbar .detail-tabbar-line[data-v-32b0927a]{position:absolute;left:0;right:0;bottom:0;height:.125rem}.detail .detail-tabbar .detail-tabbar-line .slide-line[data-v-32b0927a]{width:1rem;height:.125rem;position:absolute;left:-1rem;background-color:#53a2e3;-webkit-transition:all .1s;transition:all .1s;border-radius:5px}.detail .detail-tabbar .detail-tabbar-line.line1 .slide-line[data-v-32b0927a]{-webkit-transform:translateX(2.5rem);transform:translateX(2.5rem)}.detail .detail-tabbar .detail-tabbar-line.line2 .slide-line[data-v-32b0927a]{-webkit-transform:translateX(6.5rem);transform:translateX(6.5rem)}.detail .detail-tabbar .detail-tabbar-line.line3 .slide-line[data-v-32b0927a]{-webkit-transform:translateX(10.5rem);transform:translateX(10.5rem)}.detail .container-main[data-v-32b0927a]{-ms-flex:1;flex:1;-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column}.detail .container-main .container-tab-ul[data-v-32b0927a],.detail .container-main[data-v-32b0927a]{-webkit-box-flex:1;overflow:hidden;-webkit-box-direction:normal;display:-webkit-box;display:-ms-flexbox;display:flex}.detail .container-main .container-tab-ul[data-v-32b0927a]{position:relative;-ms-flex:1;flex:1;width:56.25rem;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row;-webkit-transition:all .3s;transition:all .3s}.detail .container-main .container-tab-ul.container-tab-show1[data-v-32b0927a]{-webkit-transform:translateX(0);transform:translateX(0)}.detail .container-main .container-tab-ul.container-tab-show2[data-v-32b0927a]{-webkit-transform:translateX(-18.75rem);transform:translateX(-18.75rem)}.detail .container-main .container-tab-ul.container-tab-show3[data-v-32b0927a]{-webkit-transform:translateX(-37.5rem);transform:translateX(-37.5rem)}.detail .container-main .container-tab[data-v-32b0927a]{width:18.75rem;-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative}.detail .container-main .container-tab-1[data-v-32b0927a],.detail .container-main .container-tab-2[data-v-32b0927a],.detail .container-main .container-tab-3[data-v-32b0927a]{top:0;left:0}.detail .scroll-list[data-v-32b0927a]{top:0;right:0;left:0;bottom:0;position:absolute;overflow:hidden}.detail .item-info .item-info-banner[data-v-32b0927a]{height:7.5rem;overflow:hidden}.detail .item-info .item-info-list[data-v-32b0927a]{margin-top:.375rem}.detail .item-info .item-info-list .item-info-list-row[data-v-32b0927a],.detail .item-pic[data-v-32b0927a]{padding:.375rem}.detail .item-pic .nopic[data-v-32b0927a]{width:18.75rem;height:10rem;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;display:-webkit-box;display:-ms-flexbox;display:flex}.detail .item-pic image[lazy=loading][data-v-32b0927a]{width:18.75rem;height:7.5rem;background-image:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSI+CiAgPHBhdGggb3BhY2l0eT0iLjI1IiBkPSJNMTYgMCBBMTYgMTYgMCAwIDAgMTYgMzIgQTE2IDE2IDAgMCAwIDE2IDAgTTE2IDQgQTEyIDEyIDAgMCAxIDE2IDI4IEExMiAxMiAwIDAgMSAxNiA0Ii8+CiAgPHBhdGggZD0iTTE2IDAgQTE2IDE2IDAgMCAxIDMyIDE2IEwyOCAxNiBBMTIgMTIgMCAwIDAgMTYgNHoiPgogICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGZyb209IjAgMTYgMTYiIHRvPSIzNjAgMTYgMTYiIGR1cj0iMC44cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CiAgPC9wYXRoPgo8L3N2Zz4K";margin:auto}.detail-footer[data-v-32b0927a]{position:relative;height:2.5rem;border-top-style:solid;border-top-color:#e0e0e0}.detail-footer .detail-footer-item[data-v-32b0927a]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.detail-footer .detail-footer-item.cart[data-v-32b0927a],.detail-footer .detail-footer-item.favorite[data-v-32b0927a]{-webkit-box-flex:1;-ms-flex:1;flex:1}.detail-footer .detail-footer-item.addCart[data-v-32b0927a]{-webkit-box-flex:2;-ms-flex:2;flex:2;background-color:#ecc655;color:#fff;font-size:14px}.detail-footer .detail-footer-item.buyNow[data-v-32b0927a]{-webkit-box-flex:2;-ms-flex:2;flex:2;background-color:#f54646;color:#fff;font-size:14px}',"",{version:3,sources:["I:/mstore/src/views/Detail.vue"],names:[],mappings:"AAQA,wCACE,YAAa,AACb,YAAa,AACb,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,8BAA+B,AAC/B,6BAA8B,AAC1B,uBAAwB,AACpB,mBAAoB,AAC5B,kBAAmB,AACnB,iBAAmB,CACpB,AACD,4DACI,WAAY,AACZ,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,mBAAoB,AAChB,WAAY,AACR,MAAQ,CACnB,AACD,mEACM,UAAa,CAClB,AACD,4DACI,kBAAmB,AACnB,OAAQ,AACR,QAAS,AACT,SAAU,AACV,cAAiB,CACpB,AACD,wEACM,WAAY,AACZ,eAAiB,AACjB,kBAAmB,AACnB,WAAY,AACZ,yBAA0B,AAC1B,2BAA8B,AAC9B,mBAAsB,AACtB,iBAAmB,CACxB,AACD,8EACM,qCAAsC,AAC9B,4BAA8B,CAC3C,AACD,8EACM,qCAAsC,AAC9B,4BAA8B,CAC3C,AACD,8EACM,sCAAuC,AAC/B,6BAA+B,CAC5C,AACD,yCAEM,WAAY,AACR,OAAQ,AAEhB,4BAA6B,AAEzB,0BAA2B,AACvB,qBAAuB,CAIhC,AACD,oGAZE,mBAAoB,AAGpB,gBAAiB,AAEjB,6BAA8B,AAG9B,oBAAqB,AACrB,oBAAqB,AACrB,YAAc,CAkBf,AAhBD,2DACI,kBAAmB,AAGf,WAAY,AACR,OAAQ,AAChB,eAAgB,AAIhB,8BAA+B,AAE3B,uBAAwB,AACpB,mBAAoB,AAC5B,2BAA8B,AAC9B,kBAAsB,CACzB,AACD,+EACM,gCAAiC,AACzB,uBAAyB,CACtC,AACD,+EACM,wCAAyC,AACjC,+BAAiC,CAC9C,AACD,+EACM,uCAAwC,AAChC,8BAAgC,CAC7C,AACD,wDACI,eAAgB,AAChB,mBAAoB,AAChB,WAAY,AACR,OAAQ,AAChB,iBAAmB,CACtB,AASD,8KACI,MAAO,AACP,MAAQ,CACX,AACD,sCAEE,MAAO,AACP,QAAS,AACT,OAAQ,AACR,SAAU,AACV,kBAAmB,AACnB,eAAiB,CAClB,AACD,sDACE,cAAe,AACf,eAAiB,CAClB,AACD,oDACE,kBAAqB,CACtB,AAOD,2GACE,eAAuB,CAIxB,AACD,0CACI,eAAgB,AAChB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,oBAAqB,AACrB,oBAAqB,AACrB,YAAc,CACjB,AACD,uDACI,eAAgB,AAChB,cAAe,AACf,kmBAAmmB,AACnmB,WAAa,CAChB,AACD,gCACE,kBAAmB,AACnB,cAAe,AACf,uBAAwB,AACxB,wBAA0B,CAC3B,AACD,oDACI,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,4BAA6B,AAC7B,6BAA8B,AAC1B,0BAA2B,AACvB,sBAAuB,AAC/B,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,kBAAoB,CAC/B,AAMD,sHACM,mBAAoB,AAChB,WAAY,AACR,MAAQ,CACrB,AACD,4DACM,mBAAoB,AAChB,WAAY,AACR,OAAQ,AAChB,yBAA0B,AAC1B,WAAe,AACf,cAAgB,CACrB,AACD,2DACM,mBAAoB,AAChB,WAAY,AACR,OAAQ,AAChB,yBAA0B,AAC1B,WAAe,AACf,cAAgB,CACrB",file:"Detail.vue",sourcesContent:["\n@charset \"UTF-8\";\n/* ==================================================\r\n * \t\t\t \t\t 全局Sass变量\r\n * \t这里简单介绍下CSS的布局，这里采用主流的Flexbox,\r\n *  在高度上采取固定Px，宽度自适应, 在布局上有参考下\r\n *  Framework7 的布局,在一些宽度上采用rem来优化多终端的适应\r\n * ================================================= */\n.detail .detail-tabbar[data-v-32b0927a] {\n  width: 12rem;\n  height: 2rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  border-radius: 5px;\n  position: relative;\n}\n.detail .detail-tabbar .detail-tabbar-item[data-v-32b0927a] {\n    color: gray;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n.detail .detail-tabbar .detail-tabbar-item.active[data-v-32b0927a] {\n      color: black;\n}\n.detail .detail-tabbar .detail-tabbar-line[data-v-32b0927a] {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    height: 0.125rem;\n}\n.detail .detail-tabbar .detail-tabbar-line .slide-line[data-v-32b0927a] {\n      width: 1rem;\n      height: 0.125rem;\n      position: absolute;\n      left: -1rem;\n      background-color: #53a2e3;\n      -webkit-transition: all 100ms;\n      transition: all 100ms;\n      border-radius: 5px;\n}\n.detail .detail-tabbar .detail-tabbar-line.line1 .slide-line[data-v-32b0927a] {\n      -webkit-transform: translateX(2.5rem);\n              transform: translateX(2.5rem);\n}\n.detail .detail-tabbar .detail-tabbar-line.line2 .slide-line[data-v-32b0927a] {\n      -webkit-transform: translateX(6.5rem);\n              transform: translateX(6.5rem);\n}\n.detail .detail-tabbar .detail-tabbar-line.line3 .slide-line[data-v-32b0927a] {\n      -webkit-transform: translateX(10.5rem);\n              transform: translateX(10.5rem);\n}\n.detail .container-main[data-v-32b0927a] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  overflow: hidden;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.detail .container-main .container-tab-ul[data-v-32b0927a] {\n    position: relative;\n    overflow: hidden;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    width: 56.25rem;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-transition: all 300ms;\n    transition: all 300ms;\n}\n.detail .container-main .container-tab-ul.container-tab-show1[data-v-32b0927a] {\n      -webkit-transform: translateX(0);\n              transform: translateX(0);\n}\n.detail .container-main .container-tab-ul.container-tab-show2[data-v-32b0927a] {\n      -webkit-transform: translateX(-18.75rem);\n              transform: translateX(-18.75rem);\n}\n.detail .container-main .container-tab-ul.container-tab-show3[data-v-32b0927a] {\n      -webkit-transform: translateX(-37.5rem);\n              transform: translateX(-37.5rem);\n}\n.detail .container-main .container-tab[data-v-32b0927a] {\n    width: 18.75rem;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    position: relative;\n}\n.detail .container-main .container-tab-1[data-v-32b0927a] {\n    top: 0;\n    left: 0;\n}\n.detail .container-main .container-tab-2[data-v-32b0927a] {\n    top: 0;\n    left: 0;\n}\n.detail .container-main .container-tab-3[data-v-32b0927a] {\n    top: 0;\n    left: 0;\n}\n.detail .scroll-list[data-v-32b0927a] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  position: absolute;\n  overflow: hidden;\n}\n.detail .item-info .item-info-banner[data-v-32b0927a] {\n  height: 7.5rem;\n  overflow: hidden;\n}\n.detail .item-info .item-info-list[data-v-32b0927a] {\n  margin-top: 0.375rem;\n}\n.detail .item-info .item-info-list .item-info-list-row[data-v-32b0927a] {\n    padding-left: 0.375rem;\n    padding-right: 0.375rem;\n    padding-top: 0.375rem;\n    padding-bottom: 0.375rem;\n}\n.detail .item-pic[data-v-32b0927a] {\n  padding-left: 0.375rem;\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  padding-right: 0.375rem;\n}\n.detail .item-pic .nopic[data-v-32b0927a] {\n    width: 18.75rem;\n    height: 10rem;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.detail .item-pic image[lazy=loading][data-v-32b0927a] {\n    width: 18.75rem;\n    height: 7.5rem;\n    background-image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSI+CiAgPHBhdGggb3BhY2l0eT0iLjI1IiBkPSJNMTYgMCBBMTYgMTYgMCAwIDAgMTYgMzIgQTE2IDE2IDAgMCAwIDE2IDAgTTE2IDQgQTEyIDEyIDAgMCAxIDE2IDI4IEExMiAxMiAwIDAgMSAxNiA0Ii8+CiAgPHBhdGggZD0iTTE2IDAgQTE2IDE2IDAgMCAxIDMyIDE2IEwyOCAxNiBBMTIgMTIgMCAwIDAgMTYgNHoiPgogICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGZyb209IjAgMTYgMTYiIHRvPSIzNjAgMTYgMTYiIGR1cj0iMC44cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CiAgPC9wYXRoPgo8L3N2Zz4K';\n    margin: auto;\n}\n.detail-footer[data-v-32b0927a] {\n  position: relative;\n  height: 2.5rem;\n  border-top-style: solid;\n  border-top-color: #e0e0e0;\n}\n.detail-footer .detail-footer-item[data-v-32b0927a] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.detail-footer .detail-footer-item.favorite[data-v-32b0927a] {\n      -webkit-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1;\n}\n.detail-footer .detail-footer-item.cart[data-v-32b0927a] {\n      -webkit-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1;\n}\n.detail-footer .detail-footer-item.addCart[data-v-32b0927a] {\n      -webkit-box-flex: 2;\n          -ms-flex: 2;\n              flex: 2;\n      background-color: #ecc655;\n      color: #ffffff;\n      font-size: 14px;\n}\n.detail-footer .detail-footer-item.buyNow[data-v-32b0927a] {\n      -webkit-box-flex: 2;\n          -ms-flex: 2;\n              flex: 2;\n      background-color: #f54646;\n      color: #ffffff;\n      font-size: 14px;\n}\n"],sourceRoot:""}])}});