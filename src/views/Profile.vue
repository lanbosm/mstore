<template>
  <div class="page full flex flex-col proile">
    <mt-header title="个人中心" class="header"></mt-header>
    <div class="proile-main flex flex-col">
      <simple-scroll   class="scroll-list"  direction="vertical">
         <div class="item_content">
            <div class="item_left">
              <img :src="portrait">
            </div>
            <div class="item_right">
                <p class="item_name">{{userName}}</p>
                <p>工号:{{workNum}}</p>
                <p>{{part}}</p>
            </div>
         </div>
        <div class="item_list flex-row flex">
          <div @click="pagePush('/point')">
            <p><span class="font-15">{{point}}</span>分</p>
            <p class="font-15">积分</p>
          </div>
          <div @click="pagePush('/coupons')">
            <p><span class="font-15">{{coupons}}</span>张</p>
            <p class="font-15">票券</p>
          </div>
          <div @click="pagePush('/balance')">
            <p><span class="font-15">{{balance}}</span>元</p>
            <p class="font-15">余额</p>
          </div>
        </div>
        <div class="item_order flex flex-row" @click="pagePush('/orderList')">
          <div class="item_order_left">
            <p class="font-16 order">我的订单</p>
            <p class="gray order_describe">订单的记录都在这呢</p>
          </div>
          <div class="item_order_right gray">
            查看所有订单 >
          </div>
        </div>
        <div class="item_order flex flex-row" @click="pagePush('/address')">
          <div class="item_order_left">
            <p class="font-16 order">地址信息</p>
            <p class="gray order_describe">{{name}} {{phone}}</p>
          </div>
          <div class="item_order_right gray">
            {{addressDiscribe}} >
          </div>
        </div>
        </simple-scroll>
      </div>

    <!--<div class="cart-top">-->
      <!--地址-->
    <!--</div>-->
    <!--<div class="cart-main flex flex-row ">-->
        <!--<mt-button  @click="pagePush('/address')" >前往地址</mt-button>-->
    <!--</div>-->
    <my-footer></my-footer>
  </div>
</template>

<style lang="scss" scoped>
  .scroll-list{
    flex: 1;
    background: #ffffff;
    overflow:  hidden;
    display: flex;
    flex-direction: column;}
  .header{background-color: #fff;color: #000;border-bottom: 1px solid #eee;height: 100px}
  .proile-main{
    margin-top: $gutter;
    flex: 1;
    background-color: fff;
  }
  .item_content{height: 160px;overflow: hidden;width: 750px;}
  .item_left{width: 120px;height: 120px;overflow: hidden;border-radius: 120px;margin-left: 40px;margin-top: 20px;float: left}
  .item_left img{width: 120px;height: 120px;overflow: hidden;border-radius: 120px;}
  .item_right{float: left;display: flex;justify-content: center; flex-flow: column;height: 160px;color: #666;font-size: 12px;margin-left: 50px;}
  .item_right p{line-height: 40px;}
  .item_name{font-size: $gutter;color: #000;}
  .item_list{margin-top: 40px;}
  .item_list div{flex: 1;text-align: center;color:$gray-minor;}
  .item_list div span{color:$yellow-base}
  .item_list p{margin-top: 10px;}
  .item_order{margin-top: 70px;justify-content:space-between;}
  .gray{color: #999;}
  .item_order_left{margin-left: 30px;}
  .item_order_right{margin-right: 30px;display: flex;align-items: flex-end;}
  .order_describe{padding-top: 10px;}
  .order{color: $gray-dark}
</style>
<script>

  import { mapState,mapGetters ,mapMutations, mapActions } from 'vuex';

  export default {
    name: 'profile',
    data () {
      return {
        loading:true,
        cartList:[],
        userName:'悟空',
        workNum:'1254232',
        portrait:'/static/images/test.jpg',
        part:'市场部',
        point:100,
        coupons:10,
        balance:10,
        name:'李小白',
        phone:15253545122,
        addressDiscribe:'公司地址'
      }
    },
    computed: {
      ...mapState('cart', {
        list:state=>state.list
      }),
      ...mapGetters('cart', ['totalPrice'])
    },
    created(){

      this.getCartList().then(res=>{

        this.loading=false;
        console.log(this.list);
        console.log(this.totalPrice);
        //
      })
    },
    methods:{
      ...mapActions('cart', ['getCartList']),
      handleDetail(id){

        this.pagePush({ path: `/detail/${id}`});

      },
      addList(){

        this.$store.dispatch('addList',this.value).then(res=>{

          console.log(this.$store.state);
          this.$messagebox.alert(res.msg);
        }).catch(res=>{

          this.$messagebox.alert('出错了');
        })

      },

      nana(){


        return new Promise(resolve => {
          setTimeout(() => {
            resolve("es8");
          }, 2000);
        });

      },
      handleClick(){

        this.back('/login');
      },
      handleClick2(){

        this.pagePush('/wallet');
      },
      handleAddressPage(){
          console.log(this)
         // this.$router.push('/address')
      }

    }
  }
</script>
