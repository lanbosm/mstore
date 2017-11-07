<template>
    <div class="page full flex flex-col pointList">
      <mt-header title="积分明细" class="header">
        <mt-button class="btn" icon="back" @click='pageBack()' slot="left"></mt-button>
      </mt-header>
      <div class="item_content">
         <scroll ref="scroll" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
                <ul class="item_ul">
                  <li class="item_li" v-for='(item,index) in data'>
                      <p>购买商品</p>
                      <p>+13</p>
                  </li>
                </ul>
         </scroll>
      </div>
    </div>
</template>
<style lang="scss" scoped>
    .header{background-color: #fff;color: $black-main;border-bottom: 1px solid #eee;height: 100px}
    .btn{color: #000}
    .item_content{
      width: 750px;
      flex: 1;
      overflow: hidden;
      position: relative;
    }
    .item_li{
      height: 100px;
      line-height: 100px;
      display: flex;
      justify-content:space-between;
      padding: 0 30px;
      border-bottom: 1px solid #eee;
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
};
var count = 0;
var page=0;
export default {
  name:'pointList',
  data(){
    return{
      scrollbar: false,
      scrollbarFade: true,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 40,
      pageMore:0,
      data: [],
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
  // this.onPullingDown();
    // alert(111);
    console.log(111);
    this.fetchData().then(res=>{
        this.data=res.data;
    });
  },
  mounted(){

  },
  methods:{
    scrollTo() {
      this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime, 'linear')
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
    },
    fetchData(){
      var list={
         data:[
           {detail:'购买商品',pay:'-10'},
           {detail:'购买帽子',pay:'-20'},
           {detail:'购买商品',pay:'-10'},
           {detail:'购买帽子',pay:'-20'},
           {detail:'购买商品',pay:'-10'},
           {detail:'购买帽子',pay:'-20'},
         ],
         moredata:[]
      }
      let i=0;
      while(i<8){ //模拟8条数据
        list.moredata.push({
            detail:'购买商品',
            pay:'-10'
        });
        i++;
      }
      this.pageMore++;
      if(this.pageMore>3){
        list.moredata=[];
      }
      return remoteData(list, 600);
    }

  }

}
</script>
