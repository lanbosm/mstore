<template>
  <div class="page full flex flex-col nopage">
      text
      <search-bar></search-bar>
    <mt-button @click="handleClick">点我回去</mt-button>
  </div>
</template>

<script>
  import SearchBar from "../components/SearchBar";
export default {
  components: {SearchBar}, name: 'text',
  data () {
    return {

    }
  },
  methods:{
    handleClick(){
       this.$router.replace('/home');
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
