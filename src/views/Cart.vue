<template>
  <div class="page full flex flex-col cart">
      <my-header title="购物车">
          <div slot="right" @click="handleEdit">编辑</div>
      </my-header>

      <div class="cart-main" v-if="cartList.length>0">
          <simple-scroll  ref="categoryBarScroll"  :lock="ddd" class="cart-list"  direction="vertical" >
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
                          <transition-group name="list"  tag="ul">
                            <div class="item list-item"  :key="item.id"  v-for="(item,index) in cart.brand.items" >
                                <div class="item-bg">
                                      <div class="item-del-btn" @click="handleDelete(cart.brand.items,index)">
                                          删除
                                      </div>
                                </div>
                                <div class="item-fg" v-finger:swipe="{ events:{touchStart:swipeItemStart,touchMove:swipeItemMove,touchEnd:swipeItemEnd},item: item ,index:index}">
                                     <div class="item-left">
                                          <check-box :item="item" @change="selectItem" ></check-box>
                                    </div>
                                    <div class="item-right">
                                          <div class="item-img" @click="pagePush('/detail/'+item.id)">
                                              <img  class="img-responsive" :src="item.image" />
                                          </div>
                                          <div class="item-txt item-itemName">
                                                {{item.name}}
                                          </div>
                                          <div class="item-txt item-itemDesc">
                                                数量 * {{item.quantity}}
                                          </div>
                                          <div class="item-txt item-spec">
                                                {{item.desc}}
                                          </div>
                                          <div class="item-txt item-price">
                                                {{item.price * item.quantity | currency}}
                                          </div>
                                    </div>
                                </div>
                            </div>
                          </transition-group>

                  </div>
              </li>
            </ul>
          </simple-scroll>
          <div class="cart-bom-bar">
               <div class=" col col1">
                  <check-box ref="allselect" @change="selectAll"></check-box>全选
               </div>
                <div class="col col2">合计:{{totalPrice | currency}}</div>
                <div class="col col3" @click="pagePush('/pay')"> 结算({{totalBuys}})</div>
          </div>
      </div>
      <data-error message="空空如也" v-else>
        <mt-button @click="pagePush('/category')">去购物</mt-button>
      </data-error>
      <my-footer></my-footer>
  </div>
</template>

<style lang="scss" scoped>

  .list-leave-to{
    opacity: 0;
    height: 0 !important;
    overflow: hidden;
  }
  .list-leave-active,.list-move {
    transition: all 300ms;

  }
  .cart-top{
      width: 750px;
      height: 120px;
      line-height: 120px;
  }

  .cart-main{
    flex: 1;
    width: 750px;
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
                      height: 200px;
                      display: flex;
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

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'cart',
  data () {
    return {
      loading: true,
      allchecked: true,
      ddd: false
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['totalPrice', 'totalBuys']),
    ...mapGetters('address', ['defaultAddress'])
  },
  created () {
    // console.log(this.defaultAddress);
    this.fetchData()
  },
  methods: {
    ...mapActions('cart', ['getCartList', 'editPush']),
    fetchData () {
      this.loading = true
    },
    swipeItemStart (e, el, item) {
      if (el.classList.contains('moved')) {
        return false
      }
      [].forEach.call(document.querySelectorAll('.moved'), li => (this.$animate.elasticTransition(li, {'transform': `translate(0px,0px)`}, function () {
        li.classList.remove('moved')
      })))
      el.classList.add('moved')
    },
    swipeItemEnd (e, el, item) {
      this.ddd = false
      var target = 0
      if (e.distanceX < -80) {
        target = -80
      }

      this.$animate.bufferTransition(el, {'transform': `translate(${target}px,0px)`}, function () {
        if (target === 0) {
          el.classList.remove('moved')
        }
      })
    },
    swipeItemMove (e, el, item) {
      // console.log(e.swipeAxis)
      if (e.swipeAxis === 'X') {
        this.ddd = true
      }
      if (e.swipeAxis === 'Y') {
        return
      }
      var maxScrollLeft = el.getBoundingClientRect().width
      var scrollLeft = el.getBoundingClientRect().left

      // 牵引力
      scrollLeft += e.deltaX
      if (scrollLeft > 0) {
        scrollLeft -= (e.deltaX * 0.8)
      } else if (scrollLeft < -80) {
        // 添加反阻力
        scrollLeft -= (e.deltaX * 0.8)
      }

      this.$animate.setCSS(el, {'transform': `translate(${scrollLeft}px,0px)`})
    },
    handleEdit () {
      alert('编辑')
    },
    handleDelete (items, index) {
      this.$messagebox({
        title: '确认删除吗',
        message: ' ',
        showCancelButton: true
      }).then(res => {
        if (res === 'confirm') {
          items.splice(index, 1)
          this.cartList.forEach((ele2, index2) => {
            if (ele2.brand.items.length == 0) {
              this.cartList.splice(index2, 1)
            }
          })
        }
      })
    },
    selectItem (item) {
      console.log(item)
      this.editPush(item)
    },
    selectBrand (brand) {
      let checked = brand.checked ? brand.checked : false

      brand.items.forEach((ele, index) => {
        this.$set(ele, 'checked', checked)
        this.selectItem(ele)
      })
    },
    selectAll () {
      var checked = this.$refs.allselect.checked // this.allchecked
			  this.cartList.forEach((ele, index) => {
				   this.$set(ele.brand, 'checked', checked)
				   this.selectBrand(ele.brand)
			  })
    },
    handleClick2 () {
      this.pagePush('/wallet')
    }

  }
}
</script>
