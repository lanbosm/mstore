<template>
  <div class="wrap">
    <h3>提款页面</h3>
    <mt-tab-container v-model="active" :swipeable="true">
      <mt-tab-container-item id="tab-container1">
        <ul>
          <li v-for="n in 10">
             item1-{{n }}
         </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <ul>
          <li v-for="n in 10">
            item2-{{n }}
         </li>
        </ul>
      </mt-tab-container-item>
      <!--<mt-tab-container-item id="tab-container3">-->
        <!--<mt-cell v-for="1 in 7" title="tab-container 3"></mt-cell>-->
      <!--</mt-tab-container-item>-->
    </mt-tab-container>

    <div class="footer">
      <mt-button type="primary"   @click.native="handleClick" size="large">primary</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wallet',
  data () {
    return {
      max:10,
      active:"tab-container1"
    }
  },
  methods:{
    handleClick(){
        alert("你点击了我");
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>




h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.wrap{
  background: pink;
}
</style>
