<template>
  <div class="page full flex flex-col" >
    <mt-header title="精品推荐" class="header">
      <mt-button  class="btn" icon="back" @click='pageBack()' slot="left"></mt-button>
    </mt-header>
    <div class="category-tab-list">
      <div  class="category-tab-scroll" v-if="moredata.length>0">
        <scroll  ref="scroll" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" @pullingDown="onPullingDown" @pullingUp="onPullingUp">

          <div class="listView" >
            <duo-pin-box class="more-item" v-for="(item, index) in moredata" :key="index" @itemClick="itemClick" :goShop="false">

            </duo-pin-box>
            <!--<div class="more-item" v-for="item in moredata" >-->
            <!--<div class="itemcontainer">-->
            <!--<img  src='https://cbu01.alicdn.com/img/ibank/2017/956/024/4137420659_1475529779.120x120xz.jpg'>-->
            <!--<div class="bar">-->
            <!--<p>去拼购</p>-->
            <!--<p>¥ 199</p>-->
            <!--</div>-->
            <!--<div class="product top font-12">-->
            <!--<p>阿迪达斯</p>-->
            <!--<p>15人拼单</p>-->
            <!--</div>-->
            <!--<div class="product font-12">-->
            <!--<p>魔法高跟鞋</p>-->
            <!--<p>已拼1.1万件</p>-->
            <!--</div>-->
            <!--</div>-->

            <!--</div>-->
          </div>


        </scroll>

      </div>
      <data-loading v-else></data-loading>

    </div>
  </div>
</template>
<style lang="scss" scoped>
  .header{background-color: #fff;color: #000;border-bottom: 1px solid #eee;height: 100px}
  .more-item {
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    width: 710px;
    height: 455px;




  }
  .category-tab-list {
    width: 750px;
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;

    .category-tab-scroll {
      width: 710px;
      flex: 1;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      justify-content: center;
      display: flex;

    }
    .listView{
      width: 710px;
      display: flex;
      flex-direction: column;
      overflow: hidden;

    }



  }

  .category-right{
    flex: 1;
    padding-left: $gutter;
    padding-right: $gutter;
    padding-top: $gutter;
    padding-bottom: $gutter;

    .category-list-sub{
      margin-top: $gutter;
      .sub-title{
        font-weight:bold;
      }
      .sub-list{
        background-color: #ffffff;
        display: flex;
        flex-wrap: wrap ;

        .sub-item{
          width: 170px;
          height: 200px;
          .sub-item-box{
            span{
              padding-top: $gutter;display: flex;
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
    name:'recommend',
    data () {
      return {
        moredata:[],
        scrollbar: false,
        scrollbarFade: true,
        pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 40,
        pullUpLoad: true,
        pullUpLoadThreshold: 90,
        pageMore:0,   //更多部分的数据
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
        this.moredata=res.moredata;
      });
    },
    methods:{

      itemClick: function () {

        alert('商品点击');
      } ,//商品点击

      fetchData(){

        var newlist = {
          moredata:[]
        };



        let i=0;
        while(i<8){ //模拟8条数据


          newlist.moredata.push({
            url:'/static/images/etanru.jpg',
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

      onPullingDown() {

        this.pageMore=0;


        this.fetchData().then((res) => {
          if (res) {
            this.moredata=res.moredata;
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

            console.log(this.moredata.length);
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

