<template>
  <div class="page full flex flex-col nopage">
    <data-error >
      <mt-button @click="handleClick">点我回去</mt-button>
    </data-error>
  </div>
</template>

<script>
export default {
  name: 'nopage',
  data () {
    return {

    }
  },
  methods: {
    handleClick () {
      this.$router.replace('/home')
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .nopage{
    justify-content: center;
    align-items: center;
  }
</style>
