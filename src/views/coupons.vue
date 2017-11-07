<template>
    <div class="page full flex flex-col coupons">
      <!--头部-->
      <mt-header title="票券" class="header">
        <mt-button class="btn" icon="back" @click='pageBack()' slot="left"></mt-button>
      </mt-header>
      <!--导航-->
      <div class="item_nav">
          <div class="item_tab" :class="{'active':tabbarIndex==0}" @click="tabbarIndex=0">
            <p class="font-12">抵用券(2)</p>
          </div>
          <div class="item_tab" :class="{'active':tabbarIndex==1}"  @click="tabbarIndex=1">
             <p class="font-12">通用券(1)</p>
          </div>
          <div class="item_tab" :class="{'active':tabbarIndex==2}"  @click="tabbarIndex=2">
             <p class="font-12">水票(1)</p>
          </div>
          <div class="item-tabbar-line" :class="'line'+tabbarIndex">
                <div class="slide-line"></div>
          </div>
      </div>
      <!--列表-->
      <div class="item_content">
         <scroll ref="scroll"  :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
            <ul class="item_ul">
               <li class="item_li" v-for="(item,index) in data">
                  <div class="item_left font-16" :class="'item_'+tabbarIndex" v-if='tabbarIndex!=2'>
                       {{item.couponsType}}
                  </div>
                  <div class="item_right" v-if='tabbarIndex!=2'>
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
              transform: translateX(140px);
          }

          &.line1 .slide-line{
              transform: translateX(390px);
          }

          &.line2 .slide-line{
              transform: translateX(640px);
          }
      }
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
  name:'coupons',
  data(){
    return{
      firstAnime:true,
      tabbarIndex:0,
      scrollbar: false,
      scrollbarFade: true,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 40,
      pageMore:0,
      data: [],
      moredata:[]
    }
  },
  filters: {
    time: function (value) {
      return new Date(value).toLocaleString().replace(/:\d{1,2}$/,' ')
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
  watch:{
    tabbarIndex(){
      this.$refs.scroll.scrollTo(0, 40, 600);
      this.fetchData().then(res=>{
          this.data=res.data;
          this.pageMore=0;
          this.moredata=[];
          this.bannerIndex=0;
          setTimeout(_=>{
            this.$refs.scroll.forceUpdate();
          },600)

      });
    }
  },
  created(){
  // this.onPullingDown();
    // alert(111);
    this.fetchData().then(res=>{
        this.data=res.data;
    });
    console.log(111);
  },
  mounted(){

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
          var list1={
            data:[
              {couponsType:'通用券',price:100,shop:'点点人事',shopDiscribe:'无限制条件',time:'2017-10-11'},
              {couponsType:'通用券',price:100,shop:'点点人事',shopDiscribe:'无限制条件',time:'2017-10-11'},
              {couponsType:'通用券',price:100,shop:'点点人事',shopDiscribe:'无限制条件',time:'2017-10-11'},
            ],
            moredata:[]
          };
          var list2={
            data:[
                {couponsType:'湖北品有限公司经销商专用水票',couponsNum:'壹桶(1L)',shop:'点点人事',shopId:'00253452'},
                {couponsType:'  上海申美饮料食品有限公司经销商专用水票',couponsNum:'壹桶(1L)',shop:'点点人事',shopId:'00253452'},
                {couponsType:'  上海申美饮料食品有限公司经销商专用水票',couponsNum:'壹桶(1L)',shop:'点点人事',shopId:'00253452'},
                {couponsType:'  上海申美饮料食品有限公司经销商专用水票',couponsNum:'壹桶(1L)',shop:'点点人事',shopId:'00253452'},
            ],
            moredata:[]
          };
            let newlist=eval('list'+this.tabbarIndex);
            return remoteData(newlist, 600);
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

  }

}
</script>
