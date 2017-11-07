<template>
  <div class="searchBar flex flew-row">
      <div class="searchBar-left" @click="appOut()">
          <a class="btn">&times;</a>
      </div>
      <div class="searchBar-right">

          <i class="iconfont icon-moni_sousuo bgcolor" ></i>
          <input class="searchBar-input"  type="text" :placeholder="placeholder" v-model="searchStr" @keyup.enter="handleSearch" />
      </div>

  </div>

</template>

<style lang="scss" scoped>
  .searchBar{
        width: 750px;
        background-color: #fff;color: $black-main;border-bottom: 1px solid #eee;height: 100px;
        .searchBar-left{
           width: 60px;
           display: flex;
           justify-content: center;
           align-items: center;
           font-size: 16px;
           color: $text-color;
        }
        .searchBar-right{
            flex: 1;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 15px 20px;

            background: #e7e7e7;
            .searchBar-input{

               flex: 1;
               color: #666666;

            }
        }
    }
  .btn{
    color: #000;
    font-size: 34px;
    padding-left: 20px;
  }
  .bgcolor
  {
    color: $text-light-color;
    margin-left:20px ;
  }


</style>
<script>

  import { mapState } from 'vuex'

  export default {
    name: 'searchBar',
    props: {

    },
    data(){
      return {
        searchStr:'',
        placeholder:'搜索商品或品牌'
      }
    },
    computed:{

    },
    created(){

    },
    watch: {


    },
    methods:{

      handleSearch(){

        if(this.searchStr==''){
           alert('请输入搜索商品');
        }
        this.$emit('search',this.searchStr);
        this.searchStr='';
      },


    }
  };
</script>
