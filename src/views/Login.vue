<template>
  <div class="page full flex flex-col login" :class="{'show':!isLogin}">
    <mt-header title="登录">

        <mt-button icon="back" @click="cancelLogin()">返回</mt-button>

    </mt-header>
    <div class="login-main">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
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


import {LOGIN_SESSION_KEY, LOGIN_RETURN_KEY } from '@/var';
import { mapState,mapGetters ,mapMutations, mapActions } from 'vuex';


export default {
  name: 'login',
  data () {
    return {
      username:'',
      password:'',
      isLogin:null
    }
  },
  created(){

    if(this.$route.query.redirect){
        localStorage.setItem(LOGIN_RETURN_KEY,this.$route.query.redirect);
    }
    var sid=location.hash.substring(1,window.location.hash.length-1)
    if(sid){

      this.$cookies.set(LOGIN_SESSION_KEY,sid);

      this.getUserInfo().then(_=>{
          this.handleLoginSuccess();
      }).catch(err=>{
        if(err.response && err.response.status==400){
          this.wxAuth();
        }else{
          this.handleLoginFail();
        }
      });
    }
  },
  mounted(){
    this.isLogin=this.$cookies.get(LOGIN_SESSION_KEY);
  },
  methods:{
    ...mapActions('auth', ['wxAuth','getUserInfo']),
    cancelLogin(){
      localStorage.removeItem(LOGIN_RETURN_KEY);
      this.$router.go(-1);
    },
    handleLogin(){
        if(!this.username|| !this.password) {
          this.$toast('用户名密码不正确');
          return;
        }
       this.$indicator.open('登录中...');
           setTimeout(_=>{
             this.$indicator.close();
             this.$toast('用户名密码不正确');
       },300)
    },
    handleWxLogin(){
        this.$indicator.open('登录中...');
        this.wxAuth();
    },
    handleLoginSuccess(){
         var returnUrl= decodeURIComponent(localStorage.getItem(LOGIN_RETURN_KEY))||'/';
         localStorage.removeItem(LOGIN_RETURN_KEY);
         location.replace(returnUrl);
         //this.$router.replace(returnUrl);
    },
    handleLoginFail(){
           this.$toast('登录失败');
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
