<template>
  <div class="page full flex flex-col detail">
    <my-header  ref="header" :title=title class="container-header" :class="{'animated':loadState==1,'glass':headerGlass}">
        <div slot="right">分享</div>
    </my-header>
    <div class="container-main" id="wrapper1"  v-if="loadState==1">
      <ul ref="scrollUl" :class="'container-tab-ul container-tab-show'+tabbarIndex" v-finger:swipe="{ events:{touchStart:swipeTabStart,touchMove:swipeTabMove,touchEnd:swipeTabEnd}}" >
        <div class="container-tab container-tab-1" >
          <div  class="scroll-list" ref="scroll1"  >
            <div class="item-info">
              <div class="item-info-list">
                <div class="item-info-list-row title" >
                  英雄名称 <span>{{productDetail.name}}</span>
                </div>
                <div class="item-info-list-row flex flew-row" >
                  <span class="field price">价格 {{productDetail.price | currency}}</span>
                  <span class="field stock" >库存 {{productDetail.stock}}</span>
                </div>
                <div class="item-info-list-row" >
                  定位： <span class="tag" v-for="role in productDetail.role" :key="role">{{role}}</span>
                </div>
                <div class="item-info-list-row" v-if="productDetail.detailPicList"  v-for="n in productDetail.rd"  :key="n">
                   {{productDetail.desc}}
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="container-tab container-tab-2" ref="scrollTab2" >
          <!--v-if="productDetail.detailPicList"-->
          <div class="scroll-list" ref="scroll2"  >
            <div class="item-pic">
              <ul>
                <li v-for="item in productDetail.detailPicList" :key="item.id">
                  <p>{{productDetail.desc}}</p>
                  <img class="img-responsive" :src="item">
                </li>
              </ul>
            </div>
          </div>
          <!--<data-loading v-else></data-loading>-->
        </div>
        <div class="container-tab container-tab-3">
            <div  ref="scroll3" class="scroll-list"   v-if="productDetail.evaluates">
              <div class="item-evaluate">
                <mt-cell v-for="(item,index) in productDetail.evaluates" :title="item.memo" :key="index" >
                  {{item.star}}
                </mt-cell>
              </div>
            </div>
            <data-loading v-else></data-loading>
        </div>
      </ul>
      <div class="item-banner" ref="banner">
        <img  class="img-responsive" :src='productDetail.banner' />
      </div>
      <div class="container-tab-head" ref="tabbar">
        <div class="detail-tabbar-item" :class="{'active':tabbarIndex==1}" @click="switchTab(1)">
          商品
        </div>
        <div  class="detail-tabbar-item" :class="{'active':tabbarIndex==2}" @click="switchTab(2)">
          详情
        </div>
        <div  class="detail-tabbar-item" :class="{'active':tabbarIndex==3}" @click="switchTab(3)">
          评价
        </div>
        <div class="detail-tabbar-line" :class="'line'+tabbarIndex">
          <div class="slide-line" ref="slideLine"></div>
        </div>
      </div>

    </div>
    <data-loading v-else-if="loadState==0"></data-loading>
    <data-error v-else message="阿狸酱加载不了呜" >
      <mt-button @click="fetchData">再试一次</mt-button>
    </data-error>
    <div class="detail-footer flex flex-row">
      <div class="detail-footer-item favorite">
        <i class="iconfont icon-xing" :class="[favorited?'hasfavorite':'unfavorite']" @click="toFavorite()"></i>
        <span class="footer-txt">关注</span>
      </div>
      <div class="detail-footer-item cart" :class="{'active':totalPushs>0}"  @click="pagePush('/cart')">
        <i class="iconfont icon-gouwuche"></i>
        <span class="footer-txt"  >购物车({{totalPushs}})</span>
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
    .container-header{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99;
      color: #ffffff;
      background-color: transparent;
      border-bottom:none;
      &.animated{
        transition: 500ms;
      }
    }

    .glass{

      background-color: rgba(0,0,0,0.3);
    }
    .container-main{
      flex: 1;
      overflow: hidden;
      flex-direction: column;
      display: flex;
      position: relative;
      .container-tab-ul{
        top: 380px;
        position: absolute;
        bottom: 0;
        width: 2250px;
        display: flex;
        flex-direction: row;
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
        position: absolute;
      }
      .container-tab-1{
        top:0;
        bottom: 0;
        left: 0px;

      }
      .container-tab-2{
        top:0;
        bottom: 0;
        left:750px;

      }
      .container-tab-3{
        top:0;
        bottom: 0;
        left:1500px;

      }
    }

    .scroll-list{
      background-color: #ffffff;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      backface-visibility: hidden;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      will-change: transform;

    }

    .container-tab-head {

      width: 750px;
      height: 80px;
      display: flex;
      flex-direction: row;
      border-radius: 5px;
      position: absolute;
      top: 300px;
      background-color: #f6f8fa;
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
          left: 0px;
          background-color: $primary-color;
          border-radius: 5px;
          transform: translateX(104px);
        }

      }

    }

    .item-banner{
      height: 360px;
      overflow: hidden;
      transform-origin: 50% 0%;
      background-color: #333333;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
    }
    //商品
    .item-info{

      .item-info-list{
        margin-top: $gutter;
        .item-info-list-row{
          &.title{
            font-size: 18px;
          }
          padding-left: $gutter; padding-right: $gutter;
          padding-top: $gutter;
          padding-bottom: $gutter;
          .tag{
            @include padding(5px,10px,5px,10px);
            background-color: $primary-color;
            color: #ffffff;
            border-radius: 5px;
            margin-left: $gutter;
          }
          .price{
              font-size: 16px;
              align-self: flex-start;
          }
          .stock{
              color: $gray-dark;
              display: flex;
              justify-content:  flex-end;

          }
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
        .unfavorite{
           color: $gray-default;
        }
        .hasfavorite{
          color: $pink;
        }
      }
      &.cart{
        flex: 1;
        &.active{
         color: $pink;
        }
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

import {WAIT_TEXT, SERVER_ERROR_TEXT} from '@/var'
import AlloyTouch from 'AlloyTouch'
import Transform from '@/packages/css3transform'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'detail',
  data () {
    return {
      loadState: 0,
      title: '详情',
      tabbarIndex: 1,
      productDetail: {},
      id: null,
      quantity: 1,
      favorited: false,
      activeScroll: [],
      scrollY: 0,
      headerGlass: false,
      keepHeader: 0,
      minTransalteY: 0,
      press: false
    }
  },
  created () {
    this.id = this.$route.params.id
    this.fetchData()
  },
  computed: {
    ...mapGetters('cart', ['totalPushs'])
  },
  mounted () {

  },
  watch: {

    tabbarIndex (val) {
      var scroll = this.$refs[`scroll${val}`]
      var find = false
      this.activeScroll.forEach(ele => {
        if (ele.target === scroll) {
          find = true
        }
      })
      if (!find) {
        this.$nextTick(_ => {
          console.log('添加')
          this.activeScroll.push(this.initScroll(scroll))
        })
      }
    }

  },
  methods: {
    ...mapActions('cart', ['cartPush']),
    swipeTabStart (e, el) {
       this.press = false
    },
    swipeTabMove (e, el) {
      e.preventDefault()
      if (this.loadState != 1) {
        return
      }
      var canSwipeX = e.swipeAxis === 'X'
      if (!canSwipeX) {
        return false
      }

      var maxScrollLeft = this.getRect(el).width
      var scrollLeft = this.getRect(el).left
      var lineLeft = this.getRect(this.$refs.slideLine).left
      var tabWidth = this.getRect(this.$refs.scrollUl).width / 3

      // 牵引力
      scrollLeft += e.deltaX * 1

      // console.log(lineLeft)
      // 牵引力
      lineLeft -= e.deltaX * 0.3

      // 添加反阻力
      if (scrollLeft > 0) {
        scrollLeft -= (e.deltaX * 0.8)
      } else if (Math.abs(scrollLeft) > maxScrollLeft * 0.8) {
        scrollLeft -= (e.deltaX * 0.8)
      }
      // 添加反阻力
      if (lineLeft < 52) {
        lineLeft += (e.deltaX * 0.3)
      } else if (Math.abs(lineLeft) > 302) {
        lineLeft += (e.deltaX * 0.3)
      }

      this.$animate.setCSS(el, {'transform': `translate(${scrollLeft}px,0px)`})
      this.$animate.setCSS(this.$refs.slideLine, {'transform': `translate(${lineLeft}px,0px)`})

      if (e.distanceX < -30 && !this.press) {
        this.press = true
        this.tabbarIndex++
        this.tabbarIndex = this.tabbarIndex < 3 ? this.tabbarIndex : 3
      } else if (e.distanceX > 30 && !this.press) {
        this.press = true
        this.tabbarIndex--
        this.tabbarIndex = this.tabbarIndex < 1 ? 1 : this.tabbarIndex
      }

    },
    swipeTabEnd (e, el) {
      e.preventDefault()
      if (this.loadState !== 1) {
        return
      }
      this.press = false
      this.switchTab()
    },
    switchTab (n) {
      var tabWidth = this.getRect(this.$refs.scrollUl).width / 3
      var tabUnit = tabWidth / 3
      var lineleft = tabUnit / 2 - this.getRect(this.$refs.slideLine).width / 2

      if (n) {
        this.tabbarIndex = n
      }
      if (this.tabbarIndex === 3) {
        this.$animate.bufferTransition(this.$refs.scrollUl, {'transform': `translate(-${tabWidth * 2}px,0px)`})
        this.$animate.bufferTransition(this.$refs.slideLine, {'transform': `translate(${tabUnit * 2 + lineleft}px,0px)`})
      } else if (this.tabbarIndex === 2) {
        this.$animate.bufferTransition(this.$refs.scrollUl, {'transform': `translate(-${tabWidth}px,0px)`})
        this.$animate.bufferTransition(this.$refs.slideLine, {'transform': `translate(${tabUnit * 1 + lineleft}px,0px)`})
      } else {
        this.$animate.bufferTransition(this.$refs.scrollUl, {'transform': `translate(0px,0px)`})
        this.$animate.bufferTransition(this.$refs.slideLine, {'transform': `translate(${tabUnit * 0 + lineleft}px,0px)`})
      }
    },
    getMin (target) {
      var min = -1 * this.getRect(target)['height'] + this.getRect(this.$refs.scrollUl)['height']
      if (min > 0) { min = 0 };
      return min
    },
    initScroll (target) {
      var target = target
      var self = this

      const banner = this.$refs.banner
      const tabBar = this.$refs.tabbar

      const keepHeader = this.keepHeader || this.getRect(tabBar).top - this.getRect(this.$refs.header.$el).height
      this.keepHeader = keepHeader

      const minTransalteY = this.minTransalteY || this.getRect(banner).height - this.getRect(tabBar).top
      this.minTransalteY = minTransalteY

      const bannerH = this.getRect(this.$refs.banner).height

      Transform(target, true)
      Transform(banner, true)
      Transform(tabBar, true)

      return new AlloyTouch({
        touch: target.parentNode, // 反馈触摸的dom
        vertical: true, // 不必需，默认是true代表监听竖直方向touch
        target: target, // 运动的对象
        property: 'translateY', // 被滚动的属性
        sensitivity: 1, // 不必需,触摸区域的灵敏度，默认值为1，可以为负数
        factor: 1, // 不必需,默认值是1代表touch区域的1px的对应target.y的1
        min: this.getMin(target), // 不必需,滚动属性的最小值
        bindSelf: false,
        maxSpeed: 2,
        initialValue: this.scrollY,
        max: 0, // 不必需,滚动属性的最大值
        touchMove (e, pageY) {
          if (this.y2 == null) return
          if (this.y2 <= 0 && pageY <= this.min) {
            this.to(this.min)
          }
          // if (this.y2 > window.innerHeight - 1) {
          //   this.to(0)
          // }
        },
        change (v) {
          // 毛玻璃特效
          if (v < -keepHeader) {
            self.headerGlass = true
            banner.firstChild.style.webkitFilter = 'blur(4px)'
          } else {
            self.headerGlass = false
            banner.firstChild.style.webkitFilter = 'none'
          }

          let translateY = Math.max(-keepHeader, v)
          self.scrollY = translateY

          let scale = 1
          const percent = Math.abs(v / bannerH)
          if (v > 0) {
            scale = 1 + percent
          } else {
            scale = 1
          }
          if (translateY > minTransalteY) {
            banner.scaleY = banner.scaleX = scale - minTransalteY / bannerH
          } else {
            banner.scaleY = banner.scaleX = 1
          }
          tabBar.translateY = translateY
          if (translateY < 0) { // 上拉
            banner.translateY = translateY
          } else {
            banner.translateY = 0
          }
          // 通知其他组件我滚动了
          self.activeScroll.forEach((ele, index) => {
            if (ele.target !== target) {
              ele.target.translateY = self.scrollY
            }
          })
        },
        animationEnd: function (value) {
          // console.log(value);
        }
      })
    },
    fetchData () {
      this.$store.dispatch('getDetail', this.id).then(res => {
        this.productDetail = res.data.productDetail
        this.loadState = 1
        // setTimeout(_ => {
        this.$nextTick(_ => {
          this.activeScroll.push(this.initScroll(this.$refs.scroll1))
        })
        // }, 500)
      }).catch(err => {
        console.log(err)
        this.loadState = 2
        if (err.code === 4040) {
          this.$toast('不存在该商品')
        } else {
          this.$toast(SERVER_ERROR_TEXT)
        }
      })
    },
    addCart () {
      this.cartPush({
        id: this.productDetail.id,
        cid: this.productDetail.cid,
        pingpai: this.productDetail.pingpai,
        name: this.productDetail.name,
        spec: '史诗皮肤',
        price: this.productDetail.price,
        quantity: 1,
        image: this.productDetail.url})

      this.$toast({ message: '添加成功',
        position: 'bottom',
        duration: 1000})
      // this.addCart()
    },
    toFavorite () {
      let message = '关注成功'

      if (this.favorited) {
        message = '取消成功'
        this.favorited = false
      } else {
        this.favorited = true
      }
      this.$toast({message,
        position: 'bottom',
        duration: 1000})
    },
    buyNow () {
      this.$indicator.open({text: WAIT_TEXT, spinnerType: 'fading-circle'})
      this.$store.dispatch('order/singleBuy', {id: this.id, quantity: this.quantity}).then(res => {
        this.$indicator.close()
        this.$router.push(`/orderDetail/${this.id}`)
      }).catch(err => {
        this.$indicator.close()
        this.handleError(err)
      })
    }

  }
}
</script>
