<template>
  <div class="page full flex flex-col dataEmpty">

  </div>
</template>

<script>
export default {
  name: 'dataEmpty',
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

  .dataEmpty{
     background:url('//origin.dorodoro-lab.com/static/images/dataempty.jpg') repeat-y ;
     background-size: 100%;
     background-position: 50% 50%;
  }
</style>
