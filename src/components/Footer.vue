<template>
  <footer class="footer flex flex-row">
      <div class="footer-item" :class="{'current':current=='/home'||current=='/'}" @touchend="switchItem('home')">
          <i class="iconfont icon-shouye"></i>
          <span class="footer-txt">首页</span>
      </div>
      <div class="footer-item" :class="{'current':current=='/category'}" @touchend="switchItem('category')">
          <i class="iconfont icon-leimupinleifenleileibie"></i>
          <span class="footer-txt">分类</span>
      </div>
      <div class="footer-item" :class="{'current':current=='/cart'}" @touchend="switchItem('cart')">
          <i class="iconfont icon-gouwuche"></i>
          <span class="footer-txt">购物车</span>
      </div>
      <div class="footer-item" :class="{'current':current=='/profile'}" @touchend="switchItem('profile')">
          <i class="iconfont icon-denglu"></i>
          <span class="footer-txt">我的</span>
      </div>
  </footer>
</template>

<style lang="scss" scoped>

.footer{
   width: 750px;
   height: 100px;
   border-top-style :solid;
    border-top-color: #f7f7f7;
   background-color:#ffffff;
   box-shadow: 0px -3px 9px #f7f7f7;
}

.footer-item.current,.footer-item:active,.footer-item:hover{
    color: $primary-color;
}

.footer-item{
  flex: 1;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;

  .footer-txt{
    font-size: 12px;
  }
}

</style>
<script>

import { mapState } from 'vuex'

export default {
  name: 'my-footer',
  props: {

  },
  computed: {
    ...mapState({
      current: state => state.route.path
    })
  },
  created () {

  },
  watch: {

  },
  methods: {

    switchItem (name) {
      this.$router.push(name)
    }

  }
}
</script>
