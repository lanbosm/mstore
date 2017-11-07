<template>
  <div class="page full flex flex-col">
      <my-header :title="title"></my-header>
      <!--列表-->
      <div class="item_content">
         <scroll ref="scroll"  :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
            <ul class="item_ul">
               <li class="item_li" v-for="(item,index) in data">
                 <!--暂时用假的 根据真数据的票券类型去判断  -->
                  <div class="item_left font-16" :class="'item_'+tabbarIndex">
                       {{item.couponsType}}
                  </div>
                  <div class="item_right">
                      <div class="item_right_top">
                           <div class="item_money">
                               <p class="font-12">￥<span class="font-20">{{item.price}}</span></p>
                           </div>
                           <div class="item_store">
                               <p class="font-14">{{item.shop}}</p>
                               <p class="font-14 item_active margin-t-10">{{item.shopDiscribe}}</p>
                           </div>
                      </div>
                      <div class="item_right_bottom">
                          <div class="item_describe font-12">
                              分享至微信好友所得票券
                          </div>
                          <div class="item_time font-12">
                              {{item.time | time}}
                          </div>
                      </div>
                  </div>
                  <div class="item_right" v-if='tabbarIndex==2'>
                      <div class="item_right_top">
                           <div class="item_place">
                              {{item.couponsType}}
                           </div>
                           <div class="item_vote">
                                使用水票
                           </div>
                      </div>
                      <div class="item_water">
                          <div class="item_water_tickt font-18 pd-l-30">
                               {{item.couponsNum}}
                          </div>
                          <div class="item_time font-12 pd-r-30">
                               {{item.shopId}}
                          </div>
                      </div>
                  </div>
               </li>
            </ul>
         </scroll>
      </div>
      <div class="paybtn font-14"  @click='pageBack()'>
          不使用票券
      </div>
  </div>
</template>


<style lang="scss" scoped>
      .item_content{
        width: 750px;
        flex: 1;
        overflow: hidden;
        position: relative;
      }
      .item_ul{width: 680px;  margin: 0 auto;}
      .item_li{
        height: 200px;
        box-shadow:  0  0 5px 5px #eee;
        margin-top: 30px;
      }
      .item_left{;color: #fff;;width: 60px;text-align: center;height:100%;justify-content: center;align-items: center;display: flex;float: left;}
      .item_right{overflow: hidden;height: 200px;padding: 0 20px;}
      .item_right_top{display: flex;justify-content: space-between;padding: 30px 0;
          .item_money{
            display: flex;
            color: $yellow-active;
            align-items: flex-end;
          }
       }
       .item_0{background: $yellow-active;}
       .item_1{background: $red;}
       .item_active{color: $text-light-color}
       .item_store p{text-align: right;}
       .item_right_bottom{border-top: 1px solid #eee;display: flex;justify-content: space-between;height: 72px;line-height: 72px;}
       .item_right_bottom div{color:$text-light-color }
       .item_vote{width: 150px;height: 60px;border-radius: 10px;border: 1px solid $yellow-active;text-align: center;line-height: 60px;color: $yellow-active}
       .item_water{display: flex;justify-content: space-between;height: 72px;line-height: 72px;}
       .item_water_tickt{color:$yellow-active; }
       .item_place{width: 300px;}
       .paybtn{position: absolute;bottom: 0;left: 0;width: 750px;height: 100px;line-height: 100px;text-align: center;color: $black-main;}
</style>
<script>
function remoteData(data, delay) {
  // 20ms 后去 resolve
  var delay = delay || 300;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};
var count = 0;
var page=0;
    export default {
      name:'couponsList',
      data(){
        return{
          title:'使用票券',
          tabbarIndex:0,
          scrollbar: false,
          scrollbarFade: true,
          pullDownRefresh: true,
          pullDownRefreshThreshold: 90,
          pullDownRefreshStop: 40,
          pullUpLoad: true,
          pullUpLoadThreshold: 40,
          data: [],
          moredata:[]
        }
      },
      filters: {
        time: function (value) {
          return new Date(value).toLocaleString().replace(/:\d{1,2}$/,' ')
        }
      },
      created(){
        this.fetchData().then(res=>{
            this.data=res.data;
        });
      },
      computed: {
        scrollbarObj: function() {
          return this.scrollbar ? {
            fade: this.scrollbarFade
          } : false
        },
        pullDownRefreshObj: function() {
          return this.pullDownRefresh ? {
            threshold: parseInt(this.pullDownRefreshThreshold),
            stop: parseInt(this.pullDownRefreshStop)
          } : false
        },
        pullUpLoadObj: function() {
          return this.pullUpLoad ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {
              more: this.pullUpLoadMoreTxt,
              noMore: this.pullUpLoadNoMoreTxt
            }
          } : false
        }
      },
      methods:{
         fetchData(){
           var list0={
             data:[
               {couponsType:'抵用券',price:399,shop:'优衣库',shopDiscribe:'满1000元可用',time:'2017-10-11'},
               {couponsType:'抵用券',price:399,shop:'优衣库',shopDiscribe:'满1000元可用',time:'2017-10-11'},
               {couponsType:'抵用券',price:399,shop:'优衣库',shopDiscribe:'满1000元可用',time:'2017-10-11'},
               {couponsType:'抵用券',price:399,shop:'优衣库',shopDiscribe:'满1000元可用',time:'2017-10-11'}
             ],
             moredata:[]
           };
             return remoteData(list0, 600);
         },
         onPullingUp() {
           this.fetchData().then((res) => {
             if (res.moredata.length > 0) {
               this.moredata  = [...res.moredata,...this.moredata];
               this.$nextTick(_=>{
                 this.$refs.scroll.forceUpdate(true);
               });
             } else {
               this.$nextTick(_=>{
                 this.$refs.scroll.forceUpdate()
               });
             }
           })
         },
         onPullingDown(){
           this.pageMore=0;
           this.moredata=[];
           this.fetchData().then((res) => {
             if (res) {
               this.data=res.data;
               this.$refs.scroll.forceUpdate(true);
             } else {
               this.$refs.scroll.forceUpdate()
             }
           })
         }

      },
      watch:{

      },

    }
</script>
