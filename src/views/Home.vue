<template>
<div class="page full flex flex-col home">
  <search-bar refs="searchBar" @search="handleSearch"></search-bar>
  <div class="home-main">
    <scroll ref="scroll"  :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" @pullingDown="onPullingDown" @pullingUp="onPullingUp">

        <div class="home-top">
            <div class="top-banner-container" v-if='data.topBanner'>
                <img class="img-responsive" :src="data.topBanner.url" />
            </div>
            <data-empty v-else></data-empty>
        </div>
        <!-- home-list start -->
        <div class="home-list">

          <div class="home-banner">

            <div class="banner-container" v-if='data.banner'>
              <div class="banner-slide" :class="'banner-slide'+index" v-for="(item,index) in data.banner" :style="bannerStyle[index]" v-finger:swipe="changeIndex">
                <img class="img-responsive" :src="item.url" />
              </div>
              <div class="banner-title" >
                    <div class="p">{{data.banner[bannerIndex].title}}</div>
                    <div class="p">{{data.banner[bannerIndex].desc}}</div>
                    <div class="p price">{{data.banner[bannerIndex].price | currency }}</div>
                    <span class="right-icon">></span>
              </div>
            </div>
            <data-empty v-else></data-empty>
          </div>

          <div class="home-tabbar">
            <div class="home-tabbar-item" :class="{'active':tabbarIndex==0}" @click="tabbarIndex=0">
              <a>每日上新</a>
            </div>
            <div class="home-tabbar-item" :class="{'active':tabbarIndex==1}"  @click="tabbarIndex=1">
              <a>火热拼购</a>
            </div>
            <div class="home-tabbar-item" :class="{'active':tabbarIndex==2}"  @click="tabbarIndex=2">
              <a>品牌新驻</a>
            </div>
            <div class="home-tabbar-line" :class="'line'+tabbarIndex">
                  <div class="slide-line"></div>
            </div>
          </div>

          <div class="home-session-1">
            <div class="home-session-title" @click="pagePush('/recommend')">
              精选推荐
            </div>
            <simple-scroll v-if="data.homesession1" ref="jingxuanScroll"  class="home-session-con"  direction="horizontal">
                <ul >
                  <li class="jingxuan-item" v-for="index in 4" :key="index">

                    <duo-pin-box class="tuijian"  :goShop="false"  >

                    </duo-pin-box>
                      <!--<div class="dl">-->
                        <!--<div class="dt">-->
                            <!--<img class="img-responsive" :src='data.homesession1[0].url'/>-->
                        <!--</div>-->
                        <!--<div class="dd">-->
                            <!--<div class="p"> <span>{{data.homesession1[0].pingpai}}</span>         <span class="price ">{{data.homesession1[0].price | currency}}</span>-->
                            <!--</div>-->
                            <!--<div class="p">-->
                                 <!--<span>{{data.homesession1[0].desc}}</span>      <span>已购{{data.homesession1[0].buy}}件</span>-->
                            <!--</div>-->
                        <!--</div>-->
                      <!--</div>-->
                  </li>
                </ul>
            </simple-scroll>
            <data-empty v-else></data-empty>
          </div>
          <div class="home-session-2">
            <div class="home-session-title" @click="pagePush('/discount')">
                多拼多惠
            </div>
            <simple-scroll  v-if="data.homesession2" ref="duopingScroll"  class="home-session-con"  direction="horizontal">

              <!--<div class="listView" >-->

                <!--<duo-pin-box class="duopin" v-for="(item, index) in moredata" :key="index" >-->

                <!--</duo-pin-box>-->
                <!---->
              <!--</div>-->

                <ul>
                  <li class="duoping-item" v-for="index in 3" :key="index">
                    <duo-pin-box class="duopin" @click="pagePush('/detail/3')"    >

                    </duo-pin-box>
                    <!--<div class="dl">-->
                      <!--<div class="dt">-->
                        <!--<img class="img-responsive" :src='data.homesession2[0].url'/>-->
                        <!--<span class="ping">去拼购</span>-->
                        <!--<span class="price">{{data.homesession2[0].price | currency}}</span>-->
                      <!--</div>-->
                      <!--<div class="dd">-->
                        <!--<div class="p">-->
                          <!--<span>{{data.homesession2[0].pingpai | currency}}</span>-->
                        <!--</div>-->
                        <!--<div class="p">-->
                          <!--<span>{{data.homesession2[0].desc}}</span>      <span>已购{{data.homesession2[0].buy}}件</span>-->
                        <!--</div>-->
                      <!--</div>-->
                    <!--</div>-->
                  </li>
                </ul>
              </simple-scroll>

            <data-empty v-else></data-empty>
          </div>
          <div class="home-session-3" >
            <div class="home-session-title">
                商家大牌
            </div>
            <simple-scroll v-if="data.homesession3" ref="pinpaiScroll"  class="home-session-con" >
                <ul>
                  <li class="pinpai-item" v-for="index in 8" :key="index">
                      <div class="dl">
                          <img class="img-responsive" :src='data.homesession3[0].url'/>
                      </div>
                  </li>
                </ul>
            </simple-scroll>
            <data-empty v-else></data-empty>
          </div>
          <div class="home-session-4">
            <div class="home-session-title">
                更多
            </div>
            <div class="home-session-con" v-if="moredata.length>0">
              <ul>
                <li class="more-item" v-for="item in moredata" @click="pagePush('/detail/3')" >
                    <div class="dl">
                      <div class="dt">
                          <img class="img-responsive" :src="item.url"/>
                      </div>
                      <div class="dd">
                          <div class="p">
                               <span>{{item.pingpai}}</span>
                          </div>
                          <div class="p">
                               <span>{{item.desc}}</span>
                          </div>
                          <div class="p">
                              <span class="price">{{item.price | currency}}</span>
                          </div>
                      </div>
                    </div>
                </li>
              </ul>
            </div>
            <data-empty v-else></data-empty>

          </div>
        </div>
        <!-- home-list end -->


    </scroll>
  </div>

  <my-footer ref='myfooter'></my-footer>
</div>
</template>

<style lang="scss" scoped>
.img-responsive{
  width: 100%;
}
.searchBar {
    height: 100px;
    line-height: 100px;
    border-bottom-style: solid;
    border-bottom-color: #e0e0e0;
}
.duopin {
  /*display: flex;*/
  /*flex-wrap: wrap;*/
  width: 300px;
  height: 455px;
  position: relative;
  overflow: hidden;
  display: inline-block;



}
.tuijian {
  /*display: flex;*/
  /*flex-wrap: wrap;*/
  width: 500px;
  height: 455px;
  position: relative;
  overflow: hidden;




}
.listView{

  display: flex;
  flex-direction: row;
  /*overflow: hidden;*/
  /*flex-wrap: nowrap;*/

  display: inline-block;
}
.loading-wrapper {
    position: absolute;
    top: 0;
}



.home-main {
    width: 750px;
    flex: 1;
    overflow: hidden;
    position: relative;



    .home-top {
        width: 750px;
        height: 300px;
        position: relative;
        overflow: hidden;
        img{
          width: 100%;
        }
    }

    .home-list {
        position: relative;
        display: flex;
        flex-direction: column;

    }

    //头部导航栏
    .home-tabbar {

        width: 700px;
        height: 80px;
        display: flex;
        flex-direction: row;
        position: absolute;
        top: -20px;
        border-radius: 5px;
        background: #ffffff;
        box-shadow: 0px  0px 3px #999999;
        left:25px;
        .home-tabbar-item {
            color: $text-light-color;
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;

            &.active{
                color: $text-dark-color;
            }
        }
        .home-tabbar-line{
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
                transform: translateX(130px);
            }

            &.line1 .slide-line{
                transform: translateX(360px);
            }

            &.line2 .slide-line{
                transform: translateX(600px);
            }
        }

    }

    //banner
    .home-banner {
        width: 750px;
        height: 520px;

        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: center;

        .banner-container{
            position: absolute;
            left:0;
            right: 0;
            top: 0;
            bottom: 0;
            perspective:200;
            transform-style: preserve-3d;

            .banner-slide {
                width: 640px;
                height: 360px;
                left:55px;
                top:80px;
                border-radius: 5px;
                overflow: hidden;
                position: absolute;
                transition-duration: 400ms;
            }
            .banner-title{
                 width: 600px;
                 height: 140px;
                 background: #ffffff;
                 border-radius: 5px;
                 position: absolute;
                 bottom: 20px;
                 left:80px;
                 overflow: hidden;
                 display: flex;
                 justify-content: center;
                 flex-direction: column;
                 @include padding(30px,20px,30px,0px);
                 box-shadow: 0px  0px 3px #999999;
                 transform: translate3d(0px, 0px,0px);
                 p{
                   @include font-ellipsis;
                 }
                 .right-icon{
                    position: absolute;
                    right:30px;
                 }
            }
        }

    }
    // 商品列表
    .home-session-1{
        width: 750px;
        height: 555px;
        @include padding($gutter,$gutter,$gutter,$gutter);
        position: relative;
        .home-session-title{
            height: 60px;
            font-size: 16px;
            display: flex;
            align-items: center;
        }
        .home-session-con{
            position: relative;
            width: 720px;
            height: 555px;
            overflow:  hidden;
            white-space: nowrap;
            ul {
                .jingxuan-item{
                    width: 500px;
                    height: 340px;

                    background: #ffffff;
                    display: inline-block;
                    position:relative;
                    .dl{
                      @include grid-fill($gutter);
                       display: flex;
                       flex-direction: column;
                       .dt{
                          position: relative;
                          height: 240px;
                          overflow: hidden;
                          justify-content: center;
                          align-items: center;
                          border-radius: 5px;
                          background-color: #cccccc;
                       }
                       .dd{
                          margin-top: 10px;
                          .p{
                             color:$text-light-color;
                             display: flex;
                             justify-content: space-between;
                          }
                       }
                    }

                }
            }
        }
    }
  .home-session-duo{

    position: relative;
    width: 720px;
    height: 455px;
    overflow:  hidden;
    white-space: nowrap;
  }
    // 多拼
    .home-session-2{
        width: 750px;
        height: 555px;
        @include padding($gutter,$gutter,$gutter,$gutter);
        position: relative;
        .home-session-title{
            height: 60px;
            font-size: 16px;
            display: flex;
            align-items: center;
        }
        .home-session-con{
            position: relative;
            width: 720px;
            height: 555px;
            overflow:  hidden;
            white-space: nowrap;
            ul {
                .duoping-item{
                    width: 300px;
                    height: 555px;

                    background: #ffffff;
                    display: inline-block;
                    position:relative;
                    .dl{
                       @include grid-fill($gutter);
                       display: flex;
                       flex-direction: column;
                       .dt{
                          position: relative;
                          height: 240px;
                          overflow: hidden;
                          justify-content: center;
                          align-items: center;
                          border-radius: 5px;
                          background-color: #cccccc;
                          display: flex;
                          .ping{
                             position: absolute;
                             bottom: 10px;
                             left: 10px;
                             background: #333333;
                             padding: 5px;
                             color:  #e0e0e0;
                          }

                          .price{
                             position: absolute;
                             bottom: 10px;
                             right: 10px;
                          }
                       }
                       .dd{
                          margin-top: 10px;
                          .p{
                             color:$text-light-color;
                             display: flex;
                             justify-content: space-between;
                          }
                       }
                    }

                }
            }
        }
    }
    // 商家大牌
    .home-session-3{
      width: 750px;
      height: 400px;
      @include padding($gutter,$gutter,$gutter,$gutter);
      position: relative;
      .home-session-title{
          height: 60px;
          font-size: 16px;
          display: flex;
          align-items: center;
      }
      .home-session-con{
          position: relative;
          width: 720px;
          height: 340px;
          overflow:  hidden;
          ul {

              .pinpai-item{
                width: 180px;
                height: 180px;
                padding: $gutter;

                display: inline-block;
                position:relative;
                .dl{

                    @include grid-fill($gutter);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background-color: #cccccc;
                    overflow: hidden;
                    border-radius: 5px;

                }
              }

          }
      }

    }

    // 商家大牌
    .home-session-4{
      width: 750px;
      min-height: 333px;
      @include padding($gutter,$gutter,$gutter,$gutter);
      position: relative;

      .home-session-title{
          height: 60px;
          font-size: 16px;
          display: flex;
          align-items: center;
      }
      .home-session-con{
          position: relative;
          width: 720px;
          display: flex;
          flex-direction: column;
          ul {
              display: flex;
              flex-wrap: wrap;

              .more-item{
                width: 360px;
                height: 360px;
                padding: $gutter;
                display: inline-block;
                position:relative;
                .dl{
                    @include grid-fill($gutter);
                    display: flex;
                    flex-direction: column;
                    padding-left: $gutter;
                    padding-right: $gutter;
                    padding-top: $gutter;
                    padding-bottom: $gutter;
                    .dt{
                       position: relative;
                       height: 240px;
                       overflow: hidden;
                       justify-content: center;
                       align-items: center;
                       border-radius: 5px;
                       background-color: #cccccc;
                    }
                    .dd{
                       margin-top: 10px;

                       .p{
                          color:$text-light-color;
                          display: flex;
                          justify-content: space-between;
                          span{
                            @include font-ellipsis;
                          }
                       }
                    }

                    overflow: hidden;
                    border-radius: 5px;
                    box-shadow: 0px  0px 3px #999999;
                }
              }

          }
      }
    }


}


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
}


export default {
  name: 'home',
  data() {
    return {
      firstAnime:true,
      scrollbar: false,
      scrollbarFade: true,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 90,
      pageMore:0,   //更多部分的数据
      tabbarIndex:0,

      bannerStyle: [ //banner1的样式
        {

          transform: '  translate3D(0, 0px, 0px)',
          transformOrigin: 'center center',

        },
        {

          transform: '  translate3D(100px, 0px, -85px)',
          transformOrigin: 'center center',

        },
        {

          transform: ' translate3D(-100px, 0px, -85px) ',
          transformOrigin: 'center center',
        }
      ],
      bannerStyleBack:null,
      bannerIndex:0,
      data: {},
      moredata:[]


    }

  },
  created() {
      this.bannerStyleBack=this.bannerStyle;
      this.fetchData().then(res=>{
          this.data=res.data;
      });
  },
  watch: {
    tabbarIndex(){
      this.$refs.scroll.scrollTo(0, 40, 600);

      this.fetchData().then(res=>{
          this.data=res.data;
          this.pageMore=0;
          this.moredata=[];
          this.bannerIndex=0;
          this.bannerStyle=this.bannerStyleBack;
          setTimeout(_=>{
            this.$refs.scroll.forceUpdate();
          },600)

      });
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
  mounted() {


  },
  methods: {
    changeIndex(e) {

      let clone = [...this.bannerStyle];
      if(e.direction=='Right'){
        let move = clone.shift();
        clone.push(move);

        this.bannerIndex=--this.bannerIndex<0?2:this.bannerIndex;

      }else if(e.direction=='Left'){
        let move = clone.pop();
        clone.unshift(move);
        this.bannerIndex=++this.bannerIndex>2?0:this.bannerIndex;
      }


      this.bannerStyle = clone;

    },
    goDiscount: function () {

    },
    fetchData(){
          var newlist1 = {
            data:{
                  topBanner:{
                      url: 'http://img14.360buyimg.com/da/jfs/t7273/185/4202400137/183642/3aad4810/59f7e339N87ff1725.jpg'
                  },
                  banner: [{
                      title: '石头门',
                      desc: '石头门2',
                      url: './mstore/static/images/test.jpg',
                      price:300
                    },
                    {
                      title: '艾瑞莉娅',
                      desc: '刀锋意识刀锋意识',
                      url: './mstore/static/images/arelia.jpg',
                      price:400
                    },
                    {
                      title: '妹子欣赏',
                      desc: '这是一个妹子妹子的图片',
                      url: './mstore/static/images/meizi.jpg',
                      price:500
                    }
                  ],
                  homesession1:[
                      {
                        url:'//img13.360buyimg.com/babel/s100x100_jfs/t10942/193/2267555781/12342/9c76c769/59f32d1aN42908ab2.jpg!q90.webp',
                        pingpai:'商品品牌',
                        price:'99',
                        desc:"商品品描述",
                        buy:'1999'
                      }
                  ],
                  homesession2:[
                      {
                        url:'//img13.360buyimg.com/babel/s100x100_jfs/t10942/193/2267555781/12342/9c76c769/59f32d1aN42908ab2.jpg!q90.webp',
                        pingpai:'商品品牌',
                        price:'99',
                        desc:"商品品描述",
                        buy:'1999'
                      }
                  ],
                  homesession3:[
                      {
                        url:'/static/images/qq.png',
                        pid:18
                      }
                  ]
                },
            moredata:[]
          };

          var newlist2 = {
                data:{},
                  moredata:[]
          }

          var newlist0 = {
            data:{
                  topBanner:{
                      url: 'http://img12.360buyimg.com/babel/jfs/t7930/222/3394858494/73100/c634753c/59f6844dN7c218562.jpg'
                  },
                  banner: [{
                      title: '阿狸',
                      desc: '九尾妖狐',
                      url: './mstore/static/images/ali.jpg',
                      price:300
                    },
                    {
                      title: '艾瑞莉娅',
                      desc: '刀锋意识刀锋意识',
                      url: './mstore/static/images/arelia.jpg',
                      price:400
                    },
                    {
                      title: '妹子欣赏',
                      desc: '这是一个妹子妹子的图片',
                      url: './mstore/static/images/meizi.jpg',
                      price:500
                    }
                  ],
                  homesession1:[
                      {
                        url:'//img12.360buyimg.com/babel/s100x100_jfs/t10927/313/2285325598/11714/e8ce99bf/59f32c53N3109ba1f.jpg!q90.webp',
                        pingpai:'商品品牌',
                        price:'99',
                        desc:"商品品描述",
                        buy:'1999'
                      }
                  ],
                  homesession2:[
                      {
                        url:'//img12.360buyimg.com/babel/s100x100_jfs/t10927/313/2285325598/11714/e8ce99bf/59f32c53N3109ba1f.jpg!q90.webp',
                        pingpai:'商品品牌',
                        price:'99',
                        desc:"商品品描述",
                        buy:'1999'
                      }
                  ],
                  homesession3:[
                      {
                        url:'//img30.360buyimg.com/da/jfs/t11422/180/758247693/53942/2c9b7366/59f7fb4dN3e19c8ab.gif',
                        pid:18
                      }
                  ]
                },
            moredata:[]
          };

          let newlist=eval('newlist'+this.tabbarIndex);

          let i=0;
          while(i<8){ //模拟8条数据


            newlist.moredata.push({
                url:this.tabbarIndex==0?'//img12.360buyimg.com/babel/s100x100_jfs/t10927/313/2285325598/11714/e8ce99bf/59f32c53N3109ba1f.jpg!q90.webp':'//img13.360buyimg.com/babel/s100x100_jfs/t10942/193/2267555781/12342/9c76c769/59f32d1aN42908ab2.jpg!q90.webp',
                price:1000*i,
                pingpai:'商品品牌',
                desc:'商品品描述2商品品描述2商品品描述2商品品描述2商品品描述2'
            });
            i++;
          }

          this.pageMore++;
          //假设有3页数据
          if(this.pageMore>3){newlist.moredata=[];}

          return remoteData(newlist, 600);

    },
    handleSearch(val){
      alert(val);
    },
    onPullingDown() {

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

    }

  }
}
</script>
