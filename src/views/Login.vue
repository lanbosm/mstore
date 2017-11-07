<template>
  <div class="wrap">
    <div class="container-fluid">

      <logo></logo>
      <p class="text-center">完善资料</p>
    </div>
    <div class="container-fluid">
      <mt-field  placeholder="Input username" v-model="userName"></mt-field>
      <mt-field  placeholder="Input username" v-model="contactName"></mt-field>
      <mt-field  placeholder="Input tel" type="tel" v-model="contactPhone"></mt-field>

    </div>
    <div class="container-fluid footer pa">
      <mt-button type="primary"   @click.native="handleClick" size="large">确定</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      userName:'',
      contactName:'',
      contactPhone:''
    }
  },
  methods:{
    handleClick(){
        this.pagePush('/home');
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  .wrap{
    height: 100%;
    background: #fff;
  }
  .footer{
    bottom: 20px;
  }
</style>
