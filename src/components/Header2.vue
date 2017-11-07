<template>

  <div   class="header">
    <!-- <mt-button class="btn" icon="back" @click='pageBack()' slot="left">back</mt-button> -->

    <div class="left">
          <slot name="left">
            <div @click="pageBack()">
              <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
            </div> </slot>
    </div>
    <div class="cen">
        <slot></slot>
    </div>
    <div class="right" slot="right">
          <slot name="right" >分享</slot>
    </div>


     <!-- <mt-button class="btn" icon="more" slot="right"></mt-button> -->
  </div>
</template>

<style lang="scss" scoped>
  .header{
      background-color: #fff;
      color: $black-main;
      border-bottom: 1px solid #eee;
      height: 100px;
      display: flex;
      flex-direction: row;


      .cen{
          flex:1;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      .left{
          width: 100px;

          display: flex;
          justify-content: center;
          align-items: center;
      }
      .right{
          width: 100px;

          display: flex;
          justify-content: center;
          align-items: center;
      }
  }
  .btn{color: #000}


</style>
<script>

  import { mapState } from 'vuex'

  export default {
    name: 'my-header2',
    props: {
        title: {
          type: String,
          default: "我是标题"
        },
    },
    computed:{
      ...mapState({
        current: state => state.route.path
      })
    },
    created(){

    },
    watch: {


    },
    methods:{

      switchItem(name){

        this.$router.replace(name);
      }

    }
  };
</script>
