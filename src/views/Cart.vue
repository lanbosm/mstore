<template>
  <div class="page full flex flex-col cart">
      <my-header title="购物袋">
          <div slot="right" @click="handleEdit">编辑</div>
      </my-header>
      <div class="cart-main">

          <simple-scroll  ref="categoryBarScroll"  class="cart-list"  direction="vertical">
            <ul class="brand-list">
              <li class="brand-item" v-for="cart in cartList" >
                  <div class="brand-title">
                      <div class="item-left">
                            <check-box :item="cart.brand" @change="selectBrand"></check-box>
                      </div>
                      <div class="item-right">
                            <span class="text">{{cart.brand.name}}</span>
                      </div>
                  </div>
                  <div class="item-list">

                          <div class="item" v-for="item in cart.brand.items" >
                              <div class="item-bg">
                                    <div class="item-del-btn" @click="handleDelete($event)">
                                        删除
                                    </div>
                              </div>
                              <div class="item-fg" v-finger:swipeMove="swipeItem" >
                                   <div class="item-left">
                                        <check-box :item="item" ></check-box>
                                  </div>
                                  <div class="item-right"   >
                                        <div class="item-img" @click="pagePush('/detail/'+item.id)">
                                            <img  class="img-responsive" :src="item.image" />
                                        </div>
                                        <div class="item-txt item-itemName">
                                              {{item.name}}
                                        </div>
                                        <div class="item-txt item-itemDesc">
                                              {{item.desc}}
                                        </div>
                                        <div class="item-txt item-spec">
                                              {{item.desc}}
                                        </div>
                                        <div class="item-txt item-price">
                                              {{item.price | currency}}
                                        </div>
                                  </div>
                              </div>
                          </div>

                  </div>
              </li>
            </ul>
          </simple-scroll>
          <div class="cart-bom-bar">
               <div class=" col col1">
                  <check-box ref="allselect" @change="selectAll"></check-box>全选
               </div>
                <div class="col col2">合计:{{totalPrice2 | currency}}</div>
                <div class="col col3" @click="pagePush('/pay')"> 结算({{totalBuys}})</div>
          </div>
      </div>

      <my-footer></my-footer>
  </div>
</template>

<style lang="scss" scoped>

  .cart-top{
      width: 750px;
      height: 120px;
      line-height: 120px;
  }



  .cart-main{
    flex: 1;
    width: 750px;

    height: 500px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;

        .cart-list{
          flex: 1;
          background: #ffffff;
          overflow:  hidden;
          display: flex;
          flex-direction: column;

          ul {
            display: flex;
            flex-direction: column;

              .brand-item{


                display: flex;
                flex-direction: column;
                position:relative;


                .brand-title{
                    height: 80px;
                    display: flex;
                    flex-direction: row;
                    justify-content:flex-start;
                    align-items: center;
                    .item-left,.item-right{
                      height: 80px;
                      display: flex;
                      align-items: center;
                    }
                    .text{margin-left: 20px; font-size: 14px;}
                }
              }

              .item-list{
                  display: flex;
                 flex-direction: column;
                  .item{

                      // padding-left: 20px;
                      // padding-right: 20px;

                      height: 200px;
                      position: relative;
                      .item-bg{
                          @include grid-fill(0) ;
                          display: flex;
                          flex-direction: row;
                          .item-del-btn{
                              width: 160px;
                              top: 0;
                              bottom: 0;
                              right: 0;
                              position: absolute;
                              background-color: #ff5b00;
                              justify-content: center;
                              align-items: center;
                              display: flex;
                              color: #ffffff;
                          }
                      }
                      .item-fg{
                        background-color: #ffffff;

                        @include grid-fill(0) ;
                        display: flex;
                        transform: translateX(0px);
                        flex-direction: row;
                        @at-root .item-left{
                            width: 80px;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                        }
                        @at-root .item-right{
                            flex: 1;
                            display: flex;
                            position: relative;

                            .item-img{
                               position: absolute;
                               top:10px;
                               left: 20px;
                               @include photo(180px,180px);
                            }

                            .item-txt{
                              position: absolute;
                              left: 240px;
                              width: 360px;
                              @include font-ellipsis;
                            }
                            .item-itemName {
                              top:15px;
                            }
                            .item-itemDesc{

                              top:60px;
                            }
                            .item-spec{
                              color: $text-light-color;
                              top:105px;
                            }
                            .item-price{

                              top:150px;
                            }

                        }
                      }

                  }



              }

          }

        }


        .cart-bom-bar{
            width: 750px;
            height: 100px;
            display: flex;
            flex-direction: row;
            border-top-style :solid;
            border-top-color: #f7f7f7;
            .col{
               flex:1;
               display: flex;
               justify-content: center;
               align-items: center;
               font-size: 14px;
               &.col3{
                  color: #ffffff;
                  background-color: $orange
               }
            }


        }






  }



</style>
<script>

import { mapState,mapGetters ,mapMutations, mapActions } from 'vuex';

export default {
  name: 'cart',
  data () {
    return {
      loading:true,
      cartList:[],
      allchecked:true


    }
  },
  computed: {
    totalPrice2(){
          var sum=0
          this.cartList.forEach((ele,index)=>{

                ele.brand.items.forEach((ele2,index2)=>{
                    if(ele2.checked){
                      sum+=Number(ele2.price);
                    }
                })
          })
          return sum;
    },
    totalBuys(){
          var sum=0
          this.cartList.forEach((ele,index)=>{

                ele.brand.items.forEach((ele2,index2)=>{
                    if(ele2.checked){
                      sum+=1;
                    }
                })
          })
          return sum;
    },
    ...mapState('cart', {
        list:state=>state.list
    }),
    ...mapGetters('cart', ['totalPrice']),
    ...mapGetters('address',['defaultAddress'])
  },
  created(){
      //console.log(this.defaultAddress);
    this.fetchData();
  },
  methods:{
    ...mapActions('cart', ['getCartList']),
    fetchData(){

      this.loading=true;
      var mdata=[

        {
          "brand":{
            id:1,
            name:"阿迪达斯",
            items:[
              {id:1,name:"靴子",desc:"这是描述这是描述这",spec:"黑色 1双",price:"300",quantity:1,image:'//static.dorodoro-lab.com/static/images/prod1.jpg'}
            ]
          }
        },
        {
          "brand":{
              id:2,
              name:"优衣库",
              items:[
                {id:2,name:"衣服",spec:"蓝白色 1双",desc:"这是描述这是描述这是描述",price:"1000",quantity:1,image:'//static.dorodoro-lab.com/static/images/mt1.jpg'},
                {id:2,name:"衣服",desc:"这是描述这是描述这是描述",spec:"蓝白色 1双",price:"1000",quantity:1,image:'//static.dorodoro-lab.com/static/images/mt1.jpg'},
                {id:2,name:"衣服",spec:"蓝白色 1双",desc:"这是描述这是描述这是描述",price:"1000",quantity:1,image:'//static.dorodoro-lab.com/static/images/mt1.jpg'},
                {id:3,name:"衣服",desc:"这是描述这是描述这是描述",spec:"蓝白色 1双",price:"1000",quantity:1,image:'//static.dorodoro-lab.com/static/images/prod2.jpg'},
                {id:3,name:"衣服",spec:"蓝白色 1双",desc:"这是描述这是描述这是描述",price:"1000",quantity:1,image:'//static.dorodoro-lab.com/static/images/prod2.jpg'},
                {id:3,name:"衣服",desc:"这是描述这是描述这是描述",spec:"蓝白色 1双",price:"1000",quantity:1,image:'//static.dorodoro-lab.com/static/images/prod2.jpg'},
                {id:3,name:"衣服",spec:"蓝白色 1双",desc:"这是描述这是描述这是描述",price:"1000",quantity:1,image:'//static.dorodoro-lab.com/static/images/mt2.jpg'},
                {id:4,name:"衣服",desc:"这是描述这是描述这是描述",spec:"蓝白色 1双",price:"1000",quantity:1,image:'//static.dorodoro-lab.com/static/images/mt2.jpg'},
                {id:4,name:"衣服",spec:"蓝白色 1双",desc:"这是描述这是描述这是描述",price:"1000",quantity:1,image:'//static.dorodoro-lab.com/static/images/prod4.jpg'},
                {id:4,name:"衣服",desc:"这是描述这是描述这是描述",spec:"蓝白色 1双",price:"1000",quantity:1,image:'//static.dorodoro-lab.com/static/images/prod4.jpg'}
              ]
          }
        }

      ]
      //this.getCartList().then(res=>{

        this.loading=false;
        this.cartList=mdata;
       // console.log(this.cartList);
        //
    //  }).catch(_=>{
        //  alert('wangluoshnsh')
      //})

    },

    addList(){

        this.$store.dispatch('addList',this.value).then(res=>{

          console.log(this.$store.state);
          this.$messagebox.alert(res.msg);
        }).catch(res=>{

          this.$messagebox.alert('出错了');
        })

    },

    swipeItem(e,item){
            // if(this.$refs.categoryBarScroll.scroll.moved){
            //   return false;
            // }
            //weeex不支持！！
            //如果少于40就不移动
            // if(Math.abs(e.deltaX)<5){
            //     return false;
            // }
            console.log(this.$refs.categoryBarScroll.scrolling);
            var d=e.distanceX;
            //d修正
            if(d<-120){
                d=-120;
            }
            item.style.transition="none"
            if(d>0){d=0; item.style.transition="all 100ms linear"}

            item.style.transform='translateX('+d+'px)';
    },
    handleEdit(){

        alert('编辑');

    },
    handleDelete(ss){
        console.log(ss);
        alert('删除');
    },
    selectItem(item){
          console.log(item);
    },
    selectBrand(brand){


        let checked = brand.checked?brand.checked:false;

        brand.items.forEach((ele,index)=>{
            this.$set(ele,'checked',checked);
            this.selectItem(ele);
        })


    },
    selectAll(){

        var checked=this.$refs.allselect.checked; //this.allchecked

			  this.cartList.forEach((ele, index)=>{
				   this.$set(ele.brand,'checked',checked);
				   this.selectBrand(ele.brand);
			  });

    },
    handleClick2(){

        this.pagePush('/wallet');
    }

  }
}
</script>
