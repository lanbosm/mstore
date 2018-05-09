<template>
  <div class="flex flex-col dataLoading">

  </div>
</template>

<script>
export default {
  name: 'dataLoading',
  data () {
    return {

    }
  },
  methods:{


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .dataLoading{
     flex: 1;
     background: url("../assets/images/loading.jpg");
     background-size: 100%;
     background-repeat: repeat-y;
     background-position: 50% 50%;
  }
</style>
