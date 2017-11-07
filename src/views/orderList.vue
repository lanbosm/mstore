<template>
    <div class="page full flex flex-col coupons">
      <!--头部-->
      <mt-header title="我的订单" class="header">
        <mt-button class="btn" icon="back" @click='pageBack()' slot="left"></mt-button>
        <mt-button class="btn"  slot="right" @click='pagePush("/invoice")'>开发票</mt-button>
      </mt-header>
      <!--导航-->
      <div class="item_nav">
          <div class="item_tab" :class="{'active':tabbarIndex==0}" @click="tabbarIndex=0">
            <p class="font-12">全部</p>
          </div>
          <div class="item_tab" :class="{'active':tabbarIndex==1}"  @click="tabbarIndex=1">
             <p class="font-12">待付款</p>
          </div>
          <div class="item_tab" :class="{'active':tabbarIndex==2}"  @click="tabbarIndex=2">
             <p class="font-12">待发货</p>
          </div>
          <div class="item_tab" :class="{'active':tabbarIndex==3}"  @click="tabbarIndex=3">
             <p class="font-12">待收货</p>
          </div>
          <div class="item_tab" :class="{'active':tabbarIndex==4}"  @click="tabbarIndex=4">
             <p class="font-12">待评价</p>
          </div>
          <div class="item-tabbar-line" :class="'line'+tabbarIndex">
                <div class="slide-line"></div>
          </div>
      </div>
      <!--列表-->
      <div class="item_content">
          <scroll ref="scroll" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
              <ul class="item_ul">
                 <li class="item_li" v-for="(item,index) in data" @click="pagePush('/orderDetail/'+item.sn)">
                    <div class="item_li_top">
                        <div class="item_order  font-12">
                            订单号：{{item.sn}}
                        </div>
                        <div class="item_status  font-12">
                            <span>{{item.status}}</span> >
                        </div>
                    </div>
                    <div class="item_li_content mg-t-20">
                        <div class="item_img" :style="{backgroundImage:'url('+item.orderImg+')'}">
                            <!-- <img src="/static/images/test.jpg" alt=""> -->
                        </div>
                        <div class="item_discribe mg-l-30">
                             <p class="font-16 item_name mg-t-10">{{item.orderName}}</p>
                             <p class="font-14 item_num mg-t-20">规格：<span>{{item.spec}}</span></p>
                             <p class="font-14 item_pay mg-t-20">支付：<span>{{item.orderPrice}}</span>元</p>
                             <div class="item_btn" v-if='item.status=="已送达"'>
                                <p class="font-14 item_confirm">确认收货</p>
                             </div>
                             <div class="item_btn" v-if='item.status=="收货成功"'>
                                <p class="font-14 item_confirm">商品评价</p>
                             </div>
                             <div class="item_btn" v-if='item.status=="已过期"'>
                                <p class="font-14 item_confirm">删除订单</p>
                             </div>
                             <div class="item_btn" v-if='item.status=="待评价"' @click="pagePush('/evaluate/'+item.sn)">
                                <p class="font-14 item_confirm">商品评价</p>
                             </div>
                        </div>
                    </div>
                 </li>
              </ul>
          </scroll>
      </div>
    </div>
</template>

<style lang="scss" scoped>
    .header{background-color: #fff;color: #000;border-bottom: 1px solid #eee;height: 100px}
    .item_content{
      width: 750px;
      flex: 1;
      overflow: hidden;
      position: relative;
    }
    .item_nav{
      display: flex;
      width: 750px;
      height: 80px;
      flex-direction: row;
      position:relative;
      margin-bottom: 40px;
      .item_tab{
         flex: 1;
         display: flex;
         align-items: center;
         justify-content: center;
         color: $text-light-color;
         &.active{
             color: $text-dark-color;
         }
      }
      .item-tabbar-line{
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0px;
          height: 5px;

          .slide-line{
              width: 40px;
              height: 5px;
              position: absolute;
              left: -40px;
              background-color: $primary-color;
              transition: all 100ms;
              border-radius: 5px;

          }

          &.line0 .slide-line{
              transform: translateX(95px);
          }
          &.line1 .slide-line{
              transform: translateX(245px);
          }

          &.line2 .slide-line{
              transform: translateX(395px);
          }
          &.line3 .slide-line{
              transform: translateX(545px);
          }
          &.line4 .slide-line{
              transform: translateX(695px);
          }
      }
    }
    .item_ul{}
    .item_li{padding: 30px 30px;border-bottom: 1px solid #eee;}
    .item_li_top{display: flex;justify-content: space-between;color:$text-light-color}
    .item_status span{color: $yellow-active}
    .item_li_content{display:flex;}
    .item_discribe{flex: 1}
    .item_img{width: 200px;height: 200px;background-position: center;background-repeat: no-repeat;border-radius: 5px;background-size: cover;}
    .item_name{color: $black-main; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 460px;height: 40px;}
    .item_num{color:$text-light-color}
    .item_pay{color: $text-light-color}
    .item_pay span{color: $black-main}
    .item_btn{display: flex;justify-content: flex-end;}
    .item_confirm{color:$yellow-active;border: 1px solid $yellow-active;height: 40px;width: 140px;text-align:center;border-radius: 5px;line-height: 40px;}

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
  name:'orderList',
  data(){
    return{
      tabbarIndex:0,
      scrollbar: false,
      scrollbarFade: true,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 40,
      data:[],
      pageMore:0,
      moredata:[]
    }
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
  created(){
    this.fetchData().then(res=>{
       this.data=res.data
    })
  // this.onPullingDown();
    // alert(111);
    console.log(111);
  },
  mounted(){

  },
  watch:{
    tabbarIndex(){
      this.$refs.scroll.scrollTo(0, 40, 600);
      this.fetchData().then(res=>{
          this.data=res.data;
          this.pageMore=0;
          this.moredata=[];
          setTimeout(_=>{
            this.$refs.scroll.forceUpdate();
          },600)

      });
    }
  },
  methods:{
    fetchData(){
       var list0={
         data:[
           {sn:'845643513556464534351',status:'等待收货',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
           {sn:'845643513556464534351',status:'已送达',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
           {sn:'845643513556464534351',status:'收货成功',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
           {sn:'845643513556464534351',status:'已过期',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
           {sn:'845643513556464534351',status:'等待收货',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
         ],
         moredata:[]
       };
       var list1={
         data:[
           {sn:'845643513556464534351',status:'待付款',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
           {sn:'845643513556464534351',status:'待付款',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
           {sn:'845643513556464534351',status:'待付款',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
           {sn:'845643513556464534351',status:'待付款',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
           {sn:'845643513556464534351',status:'待付款',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
         ],
         moredata:[]
       };
       var list2={
         data:[
           {sn:'845643513556464534351',status:'待发货',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
           {sn:'845643513556464534351',status:'待发货',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
         ],
         moredata:[]
       };
       var list3={
         data:[
           {sn:'845643513556464534351',status:'待收货',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
           {sn:'845643513556464534351',status:'待收货',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
         ],
         moredata:[]
       };
       var list4={
         data:[
           {sn:'845643513556464534351',status:'待评价',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
           {sn:'845643513556464534351',status:'待评价',orderImg:'/static/images/test.jpg',orderName:'毛衣',spec:'一件（XL码）*2',orderPrice:'300'},
         ],
         moredata:[]
       };
       this.pageMore++;
       if(this.pageMore>3){
         this.moredata=[];
       };
       let newlist=eval('list'+this.tabbarIndex);
       return remoteData(newlist, 600);
    },
    scrollTo() {
      this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime, 'linear')
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
  }


}
</script>
