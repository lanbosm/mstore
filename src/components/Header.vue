<template>

  <mt-header  :title="title" class="header">
    <slot name="left">
      <mt-button class="btn" icon="back" @click='pageBack()' slot="left">返回</mt-button>
    </slot>
    <div slot="title"></div>
    <div slot="right">
          <slot name="right" > </slot>
    </div>

     <!-- <mt-button class="btn" icon="more" slot="right"></mt-button> -->
  </mt-header>
</template>

<style lang="scss" scoped>
  .header{background-color: $primary-color;color: #ffffff;border-bottom: 1px solid #eee;height: 100px}


</style>
<script>

import { mapState } from 'vuex'

export default {
  name: 'my-header',
  props: {
    title: {
      type: String,
      default: '我是标题'
    }
  },
  computed: {

  },
  created () {

  },
  watch: {

  },
  methods: {



  }
}
</script>
