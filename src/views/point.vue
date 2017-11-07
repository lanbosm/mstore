<template>
  <div class="page full flex flex-col point">
    <mt-header title="积分" class="header">
      <mt-button class="btn" icon="back" @click='pageBack()' slot="left"></mt-button>
      <mt-button class="btn" slot="right" @click='pagePush("/point/list")'>明细</mt-button>
    </mt-header>
    <div class="item_content">
         <div class="item_top">
           <p class="font-24">{{point}}<span class="font-12">积分</span></p>
         </div>
         <div class="item_discribe">
             <p class="font-12">
               当你购买自己喜爱的物品时，便会得到相应的积分 <br>
               积分在你付款购买时，可以抵用现金哦 <br>
               用心，每次都会有收获的
             </p>
         </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
      .header{background:none;color:#fff;height: 100px}
      .point{background: url('../assets/images/bg.jpg') center center no-repeat;background-size: cover;}
      .item_content{color: #fff;text-align: center;margin-top: 240px;}
      .item_discribe{line-height: 1.5;margin-top: 60px;color: $gray-light}
      .btn{font-size: 12px;}
</style>
<script>

  import { mapState,mapGetters ,mapMutations, mapActions } from 'vuex';

  export default {
    name: 'point',
    data () {
      return {
        loading:true,
        cartList:[],
        point:100,
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
