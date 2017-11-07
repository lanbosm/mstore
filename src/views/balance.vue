<template>
    <div class="page full flex flex-col balance">
      <mt-header title="余额" class="header">
        <mt-button class="btn" icon="back" @click='pageBack()' slot="left"></mt-button>
        <mt-button class="btn" slot="right" @click='pagePush("/balance/list")'>余额明细</mt-button>
      </mt-header>
      <div class="item_content">
          <div class="item_img">
             <img src="../assets/images/balance.png" alt="">
          </div>
          <div class="item_main">
               <p class="font-18">我的余额</p>
               <p class="item_p"><span class="font-16">￥</span><span class="font-24">{{balance}}</span></p>
          </div>
      </div>
    </div>
</template>
<style lang="scss" scoped>
       .header{background:none;color:$black-main;height: 100px}
       .item_content{margin-top: 120px;}
       .item_img{width: 300px;margin: 0 auto;}
       .item_img img{display: block;width: 100%}
       .item_main{text-align:center;margin-top: 80px;}
       .item_main span{color: $orange;}
       .item_p{margin-top: 20px;}
</style>
<script>
import { mapState,mapGetters ,mapMutations, mapActions } from 'vuex';
export default {
  data(){
    return{
      balance:'533.01'
    }
  },
  created(){

  },
  mounted(){

  },
  computed:{
    ...mapState('cart', {
      list:state=>state.list
    }),
    ...mapGetters('cart', ['totalPrice'])
  },
  methods:{

  }
}
</script>
