<template>
  <div class="page full flex flex-col category">
      <search-bar refs="searchBar" @search="handleSearch"></search-bar>
      <div class="category-main flex flex-col ">
        <div class="category-tab-top">
          <simple-scroll  ref="categoryBarScroll"  class="category-tab-bar"  direction="horizontal">
            <ul>
              <li class="nav" :class="{'active':categoryIndex==index}" v-for="index in 10" :key="index" @click= "categoryIndex=index">
                分类{{index}} <div class="dian"></div>
              </li>
            </ul>
          </simple-scroll>

        </div>
        <div class="category-tab-list">
            <div  class="category-tab-scroll" v-if="moredata.length>0">
              <scroll  ref="scroll" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
                  <ul>
                    <li class="more-item" v-for="item in moredata" @click="pagePush({ path: `/detail/${item.id}`})">
                        <div class="dl">
                          <div class="dt">
                              <img class="img-responsive" :src='item.url'/>
                          </div>
                          <div class="dd">
                              <div class="p">
                                   <span>沙娜娜</span>
                              </div>
                              <div class="p">
                                  <span class="price">￥700</span>
                              </div>
                          </div>
                        </div>
                    </li>
                  </ul>
              </scroll>

            </div>
            <data-empty v-else></data-empty>

        </div>
      </div>

      <my-footer></my-footer>
  </div>
</template>

<style lang="scss" scoped>

  .img-responsive{
    width: 100%;
  }

  .category-main{
    flex: 1;
    background-color: #e5e5e5;

  }


  .category-tab-top{

      width: 750px;
      height: 120px;
      overflow:  hidden;
      position: relative;

      .category-tab-bar{
        width: 750px;
        height: 80px;
        margin-top: 20px;
        background: #ffffff;
        white-space: nowrap;
        overflow:  hidden;
      }

      ul {
          display: flex;
          height: 80px;
          flex-direction: row;

          .nav{
            width: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: $gutter;
            background: #ffffff;
            position:relative;
            color: $text-light-color;
            &.active{

                .dian{
                  position: absolute;
                  width: 10px;
                  height: 10px;
                  background-color: $primary-color;
                  border-radius: 30px;
                  left:40px;
                  top:35px;
                }
                color: $text-color;

            }
          }

      }
  }



  .category-tab-list{
      width: 750px;
      flex:1;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;

      .category-tab-scroll{
          width: 720px;
          flex:1;
          flex-direction: column;
          overflow: hidden;
          position: relative;
      }

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
  name: 'category',
  data () {
    return {
      categoryIndex:1,
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
  beforeRouteUpdate(){


    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'

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
  watch: {
    categoryIndex(){

      //this.$refs.scroll.scrollTo(0, 40, 600);

      this.fetchData().then(res=>{
          this.moredata=res.moredata;
          this.pageMore=0;


          setTimeout(_=>{
            this.$refs.scroll.forceUpdate();
          },600)

      });
    }
  },
  methods:{
    handleSearch(){
        alert(333);
    },
    handleDetail(id){

        this.pagePush({ path: `/detail/${id}`});

    },
    fetchData(){



          var newlist = {
            moredata:[]
          };



          let i=0;
          while(i<8){ //模拟8条数据

            var id=this.getRandomNum(1,4);
            newlist.moredata.push({
                url:this.categoryIndex==1?'//static.dorodoro-lab.com/static/images/mt1.jpg':'//static.dorodoro-lab.com/static/images/mt2.jpg',
                price:1000*i,
                pingpai:'商品品牌',
                desc:'商品品描述2商品品描述2商品品描述2商品品描述2商品品描述2',
                id:id

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
