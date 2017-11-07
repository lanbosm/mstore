<template>

  <mt-header  :title="title" class="header">
    <mt-button class="btn" icon="back" @click='pageBack()' slot="left">back</mt-button>

    <div slot="title"></div>
    <div slot="right">
          <slot name="right" > </slot>
    </div>


     <!-- <mt-button class="btn" icon="more" slot="right"></mt-button> -->
  </mt-header>
</template>

<style lang="scss" scoped>
  .header{background-color: #fff;color: $black-main;border-bottom: 1px solid #eee;height: 100px}
  .btn{color: #000}


</style>
<script>

  import { mapState } from 'vuex'

  export default {
    name: 'my-header',
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
