<template>
  <div class="dataError" ref="outContainer">
    <simple-scroll class="full" direction="vertical" >
      <!--<div class="content full flex flex-col">-->
      <div class="content flex flex-col justify-center align-center" ref="innerContainer">
        <div class="error-img"></div>
        <p class="error-msg">{{this.message}}</p>
        <slot></slot>
      </div>

      <!--</div>-->
    </simple-scroll>
  </div>
</template>

<script>
export default {
  name: 'dataError',
  data () {
    return {

    }
  },
  props: {
    message: {
      type: String,
      default: '阿狸 出错啦'
    }
  },
  created () {
  },
  mounted () {
    this.$refs.innerContainer.style.height = this.getRect(this.$refs.outContainer).height + 'px'
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .dataError{
    flex: 1;
    width: 750px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .content{
      height: 667px;
      padding-left:$gutter;
      padding-right: $gutter;

    }
  }
  .error-img{
    width: 320px;
    height: 320px;
    background: url("../assets/images/error.png");
    background-size: cover;
  }

  .error-msg {
    margin-top:$gutter*2;
    margin-bottom:$gutter*2;
    font-weight: bold;
    font-size: $font-large-size;
  }
</style>
