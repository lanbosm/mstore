<template>
  <div class="page full flex flex-col detail">
    <my-header2>
      <div class="detail-tabbar">
        <div class="detail-tabbar-item" :class="{'active':tabbarIndex==1}" @click="tabbarIndex=1">
          商品
        </div>
        <div  class="detail-tabbar-item" :class="{'active':tabbarIndex==2}" @click="tabbarIndex=2">
          详情
        </div>
        <div  class="detail-tabbar-item" :class="{'active':tabbarIndex==3}" @click="tabbarIndex=3">
          评价
        </div>
        <div class="detail-tabbar-line" :class="'line'+tabbarIndex">
          <div class="slide-line"></div>
        </div>
      </div>
      <div slot="right">分享</div>
    </my-header2>

    <div class="container-main">
      <ul :class="'container-tab-ul container-tab-show'+tabbarIndex" >
        <div class="container-tab container-tab-1" >
          <simple-scroll ref="scroll1" class="scroll-list"  direction="vertical" v-if="productDetail.banner">
            <div class="item-info">
              <div class="item-info-banner">
                <img  class="img-responsive" :src='productDetail.banner' />
              </div>
              <div class="item-info-list">
                <div class="item-info-list-row" >
                  价格 <span>{{productDetail.price | currency}}</span>
                </div>
                <div class="item-info-list-row" >
                  发货地 {{productDetail.city}}
                </div>
                <div class="item-info-list-row"  v-for="n in 20"  :key="n">
                  一些商品的内容{{n}}
                </div>
              </div>
            </div>
          </simple-scroll>
          <data-empty v-else></data-empty>
        </div>
        <div class="container-tab container-tab-2 " >
          <simple-scroll   ref="scroll2" class="scroll-list"  direction="vertical" v-if="productDetail.detailPicList">
            <div class="item-pic">
              <ul>
                <li v-for="item in productDetail.detailPicList">
                  <p>
                    大家在发言中结合自身实际工作提出建议。施芝鸿委员提出，要积极投身到新时代新的伟大进军，努力在新时代展现新气象、新作为；郑建邦常委代表民革中央发言建议，要按照中共十九大有关部署，加快西北地区发展，推动区域协调发展；徐辉常委代表民盟中央发言提出，明确教育战略定位，贯彻“以人民为中心”的发展思想，继续深化教育改革，加快推进教育现代化；李谠常委代表民建中央发言提出，确立清洁能源优先发展战略，加强清洁能源高端装备研发制造，提高清洁能源消纳能力，鼓励清洁能源企业参与“一带一路”能源合作；蔡达峰常委代表民进中央发言表示，
                  </p>
                  <img class="img-responsive" :src="item">
                </li>
              </ul>
            </div>
          </simple-scroll>
          <data-empty v-else></data-empty>
        </div>
        <div class="container-tab container-tab-3">
          <div class="item-evaluate">
            <simple-scroll  ref="scroll3" class="scroll-list"  direction="vertical" v-if="productDetail.evaluates">
              <mt-cell v-for="item in productDetail.evaluates" :title="item.memo" :key="item.star" >
                {{item.star}}
              </mt-cell>
            </simple-scroll>
            <data-empty v-else></data-empty>
          </div>
        </div>
      </ul>
    </div>



    <div class="detail-footer flex flex-row">
      <div class="detail-footer-item favorite">
        <span class="footer-txt">关注</span>
      </div>
      <div class="detail-footer-item cart" @click="pagePush('/cart')">
        <i class="iconfont icon-gouwuche"></i>
        <span class="footer-txt" >购物车</span>
      </div>
      <div class="detail-footer-item addCart" @click="addCart()">

        <span class="footer-txt">加入购物车</span>
      </div>
      <div class="detail-footer-item buyNow" @click="buyNow()">
        <span class="footer-txt">立即购买</span>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>

  .detail{
    .detail-tabbar {

      width: 480px;
      height: 80px;
      display: flex;
      flex-direction: row;
      border-radius: 5px;
      position: relative;

      .detail-tabbar-item {
        color: $text-light-color;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;

        &.active{
          color: $text-dark-color;
        }
      }
      .detail-tabbar-line{
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

        &.line1 .slide-line{
          transform: translateX(100px);
        }

        &.line2 .slide-line{
          transform: translateX(260px);
        }

        &.line3 .slide-line{
          transform: translateX(420px);
        }
      }

    }


    .container-main{
      flex: 1;
      overflow: hidden;
      flex-direction: column;
      display: flex;
      .container-tab-ul{
        position: relative;
        overflow: hidden;
        flex: 1;
        width: 2250px;
        display: flex;
        flex-direction: row;
        transition: all 300ms;
        &.container-tab-show1{

          transform: translateX(0);

        }
        &.container-tab-show2{

          transform: translateX(-750px);

        }
        &.container-tab-show3{

          transform: translateX(-1500px);

        }
      }
      .container-tab{
        width: 750px;
        flex:1;
        position: relative;
      }
      .container-tab-1{
        top:0;
        left: 0px;

      }
      .container-tab-2{
        top:0;
        left:0px;

      }
      .container-tab-3{
        top:0;
        left:0px;

      }
    }


    .scroll-list{
      @include grid-fill(0) ;
      position: absolute;
      overflow: hidden;
    }

    //商品
    .item-info{

      .item-info-banner{
        height: 300px;
        overflow: hidden;
      }

      .item-info-list{
        margin-top: $gutter;
        .item-info-list-row{
          padding-left: $gutter; padding-right: $gutter;
          padding-top: $gutter;
          padding-bottom: $gutter;
        }
      }
    }

    //详情
    .item-pic{
      @include padding($gutter,$gutter,$gutter,$gutter);
      .nopic{
        width: 750px;
        height: 400px;
        align-items: center;
        justify-content: center;
        display: flex;
      }

      image[lazy=loading] {
        width: 750px;
        height: 300px;
        background-image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSI+CiAgPHBhdGggb3BhY2l0eT0iLjI1IiBkPSJNMTYgMCBBMTYgMTYgMCAwIDAgMTYgMzIgQTE2IDE2IDAgMCAwIDE2IDAgTTE2IDQgQTEyIDEyIDAgMCAxIDE2IDI4IEExMiAxMiAwIDAgMSAxNiA0Ii8+CiAgPHBhdGggZD0iTTE2IDAgQTE2IDE2IDAgMCAxIDMyIDE2IEwyOCAxNiBBMTIgMTIgMCAwIDAgMTYgNHoiPgogICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGZyb209IjAgMTYgMTYiIHRvPSIzNjAgMTYgMTYiIGR1cj0iMC44cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CiAgPC9wYXRoPgo8L3N2Zz4K';
        margin: auto;
      }

    }

    .item-evaluate{


    }
  }



  .detail-footer{

    position: relative;
    height: 100px;
    border-top-style: solid;
    border-top-color: #e0e0e0;

    .detail-footer-item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &.favorite{
        flex: 1;
      }
      &.cart{
        flex: 1;
      }
      &.addCart{
        flex: 2;
        background-color: #ecc655;
        color: #ffffff;
        font-size: 14px;
      }
      &.buyNow{
        flex: 2;
        background-color: #f54646;
        color: #ffffff;
        font-size: 14px;
      }
    }

  }
</style>
<script>

  export default {
    name: 'category',
    data () {
      return {
        tabbarIndex:1,
        productDetail:{},
        id:null,
        quantity:1
      }
    },
    created(){


      this.id=this.$route.params.id;
      this.fetchData();

    },
    mounted(){


    },
    watch:{

      tabbarIndex(val){


        this.$nextTick(_=>{

          this.$refs[`scroll${val}`].refresh();
        });

      }

    },
    methods:{
      fetchData(){

        this.$store.dispatch('getDetail',this.id).then(res=>{
          this.productDetail=res.productDetail;
        }).catch(res=>{
          console.log(res);
        })


      },
      addCart(){
        this.$toast({ message: '添加成功',
          position: 'bottom',
          duration: 1000});

      },
      buyNow(){

        this.$store.dispatch('singleBuy',{id:this.id,quantity:this.quantity}).then(res=>{


          this.$router.replace(`/orderDetail/${this.id}`)

        }).catch(res=>{

          this.$messagebox.alert('出错了');
        })

      }

    }
  }
</script>
