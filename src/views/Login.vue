<template>
  <div class="page full flex flex-col login" :class="{'show':!isLogin}">
    <mt-header title="登录">
       <mt-button icon="back" slot="left" @click="cancelLogin()">返回</mt-button>
    </mt-header>
    <div class="login-main">
      <mt-field  label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-button size="large" class="btn login-btn"  @click.native="handleLogin()">登录</mt-button>
      <mt-button size="large" class="btn wxlogin-btn" @click.native="handleWxLogin()">一键授权</mt-button>

    </div>
  </div>

</template>
<style>
  .login{
    opacity: 0;
  }
  .login.show{
    opacity: 1;
  }
</style>
<script>

import {LOGIN_SESSION_KEY, LOGIN_RETURN_KEY, LOGIN_WAIT_TEXT, SERVER_ERROR_TEXT } from '@/var'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import util from '@/util'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      isLogin: null
    }
  },
  created () {
    if (this.$route.query.redirect) {
      util.setStorage(LOGIN_RETURN_KEY, this.$route.query.redirect)
    }
    var sid = location.hash.substring(1, window.location.hash.length - 1)
    if (sid) {
      this.$cookies.set(LOGIN_SESSION_KEY, sid)
      this.wxAuth().then(_ => {
        this.handleLoginSuccess()
      }).catch(err => {
        if (err.response && err.response.status == 400) {
          this.wxLogin()
        } else {
          this.handleLoginFail()
        }
      })
    }
    this.intallJSEncrypt()
  },
  mounted () {
    this.isLogin = this.$cookies.get(LOGIN_SESSION_KEY)
  },
  methods: {
    ...mapMutations('auth', ['setAuth']),
    ...mapActions('auth', ['intallJSEncrypt', 'passAuth', 'wxAuth', 'wxLogin']),
    cancelLogin () {
      util.rmStorage(LOGIN_RETURN_KEY)
      this.$router.go(-1)
    },
    handleLogin () {
      if (!this.username || !this.password) {
        this.$toast('用户名密码不正确')
        return
      }
      this.$indicator.open({text: LOGIN_WAIT_TEXT, spinnerType: 'fading-circle'})
      this.passAuth({username: this.username, password: this.password}).then(res => {
        this.$indicator.close()
        this.handleLoginSuccess()
      }).catch(err => {
        this.$indicator.close()
        if (err.code === 2030 || err.code === 4000) {
          this.$toast('用户名密码不正确')
        } else {
          this.$toast(SERVER_ERROR_TEXT)
        }
      })
    },
    handleWxLogin () {
      this.$indicator.open('登录中...')
      util.getStorage(LOGIN_RETURN_KEY)
      this.wxLogin()
    },
    handleLoginSuccess () {
      var returnUrl = util.getStorage(LOGIN_RETURN_KEY)
      if (returnUrl) {
        returnUrl = decodeURIComponent(returnUrl)
      } else {
        returnUrl = '/'
      }

      this.$router.replace(returnUrl)

      // util.rmStorage(LOGIN_RETURN_KEY)
      // this.$router.replace(returnUrl);
    },
    handleLoginFail () {
      this.$toast('登录失败')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  .login-main{
    flex: 1;
    width: 750px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    padding-right: 15px;
    color: #26a2ff;
    .btn{
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .login-btn{
      border:solid 1px #26a2ff;
      color: #26a2ff;
      background:#ffffff;
    }
    .wxlogin-btn{
      background-color: #28a745;
      background-image: linear-gradient(-180deg, #34d058 0%, #28a745 90%);
      color:#ffffff;
    }
  }
</style>
