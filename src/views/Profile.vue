<template>
  <div class="page full flex flex-col proile">
    <my-header title="个人中心" class="header">
      <div slot="left"></div>
    </my-header>
    <div class="proile-main flex flex-col">
      <simple-scroll  v-if="!loading"  class="scroll-list"  direction="vertical">
         <div class="item_content flex">
            <div class="item_left">
              <img :src="userInfo.headimgurl">
            </div>
            <div class="item_right ">
                <p class="item_name">昵称 {{userInfo.nickname}}</p>
                <p>性别 {{userInfo.sex | sex}}</p>
                <p>城市 {{userInfo.city}}</p>
                <mt-button class="exit" @click.native="handleExit()">安全退出</mt-button>
            </div>

         </div>
        <div class="item_list flex-row flex">
          <div @click="pagePush('/point')">
            <p><span class="font-15">{{assets.points}}</span>分</p>
            <p class="font-15">积分</p>
          </div>
          <div @click="pagePush('/coupons')">
            <p><span class="font-15">{{assets.tickets}}</span>张</p>
            <p class="font-15">票券</p>
          </div>
          <div @click="pagePush('/balance')">
            <p><span class="font-15">{{assets.balances}}</span>元</p>
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
            <p class="gray order_describe"></p>
          </div>
          <div class="item_order_right gray">
            {{addressDiscribe}} >
          </div>
        </div>
        </simple-scroll>
        <data-loading v-else></data-loading>
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
  .proile-main{
    margin-top: $gutter;
    flex: 1;
    background-color: #ffffff;
  }
  .exit{
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 12px;
    background-color: #55b5ef;
    background-image: linear-gradient(-180deg, #66d9ef 0%, #57a1ef 90%);
    color:#ffffff;
  }
  .item_content{height: 160px;overflow: hidden;width: 750px;}
  .item_left{width: 120px;height: 120px;overflow: hidden;border-radius: 120px;margin-left: 40px;margin-top: 20px;float: left}
  .item_left img{width: 120px;height: 120px;overflow: hidden;border-radius: 120px;}
  .item_right{ flex:1; height: 160px;color: #666;font-size: 12px;margin-left: 50px;}
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

import {LOGIN_SESSION_KEY, LOGIN_RETURN_KEY, USER_INFO_KEY, SERVER_ERROR_TEXT } from '@/var'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import api from '@/api'

export default {
  name: 'profile',
  data () {
    return {
      loading: true,
      assets: {
        points: 0,
        tickets: 0,
        balances: 0
      },
      addressDiscribe: '公司地址'
    }
  },
  computed: {
    ...mapState(['token']),
    ...mapGetters(['userInfo'])
  },
  created () {
    if (this.token) {
      api.getProfile(this.token).then(res => {
        this.loading = false
        this.setUserInfo(res.data.wechat)
        this.assets.points = res.data.assets.points
        this.assets.tickets = res.data.assets.tickets
        this.assets.balances = res.data.assets.points
      }).catch(err => {
        this.handleError(err);
      })
    }
  },
  methods: {
    ...mapMutations(['setUserInfo', 'resetUserInfo']),
    handleExit () {
      this.$messagebox({
        title: '提示',
        message: '确定退出?',
        showCancelButton: true
      }).then(res => {
        if (res === 'confirm') {
          this.handleSaveOut()
        }
      })
    }

  }
}
</script>
