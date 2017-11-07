<template>
  <div class="page full flex flex-col Address">
    <my-header :title="title"></my-header>
    <div class="item_content flex flex-col">
      <ul class="item_ul">
        <li class="item_li">
          <div class="item_left">
            <div class="item_left_input">
              <span class="list-checkbox"><input type="checkbox" /> <i></i> </span>
            </div>
            <div class="item_left_content">
                 <p class="font-16">李小白 15821004227</p>
                 <p class="font-12 margin-t-10 gray">公司地址 <span class="font-12 yellow">当前默认地址</span></p>
                 <p class="font-12 margin-t-10 gray line">上海市浦东新区魔法阵老司机西大院多少路外网的的订单订单</p>
            </div>
          </div>
          <div class="item_right">
            <i class="iconfont icon-bianji"></i>
          </div>
        </li>
        <li class="item_li">
          <div class="item_left">
            <div class="item_left_input">
              <span class="list-checkbox"><input type="checkbox" /> <i></i> </span>
            </div>
            <div class="item_left_content">
              <p class="font-16">李小白 15821004227</p>
              <p class="font-12 margin-t-10 gray">公司地址 <span class="font-12">当前默认地址</span></p>
              <p class="font-12 margin-t-10 gray line">上海市浦东新区魔法阵老司机西大院多少路外网的的订单订单</p>
            </div>
          </div>
          <div class="item_right">
            <i class="iconfont icon-bianji"></i>
          </div>
        </li>
        <li class="item_li">
          <div class="item_left">
            <div class="item_left_input">
              <span class="list-checkbox"><input type="checkbox" /> <i></i> </span>
            </div>
            <div class="item_left_content">
              <p class="font-16">线下到店/自提</p>
              <p class="font-12 margin-t-10 gray line">选择“线下到店”即为自行到店,所购买的商品或相关服务，您将自行到店进行体验、消费或提取</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="item_add" @click="pagePush('/address/add')">
        选择地址信息
    </div>
    <!--的地址选择-->
    <!--<div v-if="loading=='loading'">加载中</div>-->
    <!--<div v-for="(item,index) in list">-->
        <!--<p>{{item.aid}}</p>-->
    <!--</div>-->
    <!--<mt-button @click="sss()">点我回去</mt-button>-->
  </div>

</template>
<style lang="scss" scoped>
     .item_ul{
       overflow: hidden;
       overflow-y: auto;
       -webkit-overflow-scrolling: touch;
       .item_li{
         border-bottom: 1px solid #eee;
         padding-top: 20px;
         padding-bottom: 20px;
         display: flex;
         justify-content:space-between;
        .item_left{display: flex;}
       }
     }
     .item_right{
       margin-right: 30px;
       display: flex;
       align-items: center;
     }
     .item_right i{font-size: 18px;}
     .line{line-height: 35px;}
     .gray{color: $gray-minor}
     .yellow{color: $yellow-base}
     .item_left_content{margin-left:30px;margin-right: 120px }
     .item_left_input{
       display: flex;
       /*flex-direction: column;*/
       align-items: center;
     }
     .item_add{position: absolute;bottom: 0;left: 0;width: 750px;height: 100px;background-color: $orange;line-height: 100px;text-align: center;font-size: 16px;color: #fff;}
     .list-checkbox {
       /*margin-top:@gutter;*/
       /*margin-right:@gutter;*/
       margin-left:30px ;
       width: 40px;
       height: 40px;
       overflow: hidden;
       display: inline-block;
       border-radius: 50%;
       border: solid 1px #cccccc;
       position: relative;


     &.inner-checkbox{
        margin-top:0;
        /*top:@gutter/2;*/
        /*margin-left:@gutter/2;*/
        width: 40px;
        height: 40px;
        overflow: hidden;
      }
     i{
       width: 100%;
       height:100%;
       overflow: hidden;
       position: absolute;
       pointer-events: none;
       top:0;
       left:0;

     }
     i:after{
       box-sizing: content-box;
       content: "";
       border: 2px solid #fff;
       border-left: 0;
       border-top: 0;
       height: $gutter;
       left: 12px;
       position: absolute;
       top: 5px;
       transform: rotate(45deg) scaleY(0);
       width: 10px;
       transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
       transform-origin: center;
     }
     input[type=checkbox]{
       position: absolute;
       width: 100%;
       height:100%;
       opacity:0;
       margin: 0;
       outline:none;
       display: inline-block;
     }

     input[type=checkbox]:checked +i{
       background:$yellow-base;
       border-radius: 50%;
     }
     input[type=checkbox]:checked +i:after {
       transform: rotate(45deg) scaleY(1);
     }

     }


</style>
<script>

  import {mapState,mapMutations, mapActions } from 'vuex';
  export default {
    name: 'Address',
    data(){
      return {
         title:'我的地址',
         loading:false
      }
    },
    computed:{
      ...mapState('address', {
        list:state=>state.list
      }),
    },
    methods:{
      sss(){
        //this.$store.commit('address/getAddress')
        this.getAddress();
      },
      handleClick(){
        this.$router.replace('/home');
      },
      ...mapActions('address', ['getAddressList']),
      fetchData(){
          this.getAddressList()
      }
    },
    created(){
        this.fetchData()
    }
  }
</script>
