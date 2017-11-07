<template>
  <div class="more-item"  @click="click" >
    <div class="itemcontainer">
      <div class="image"></div>
      <div class="bar" v-show="goShop">
        <p>去拼购</p>
        <p>¥ 199</p>
      </div>
      <div class="product top font-12">
        <p>阿迪达斯</p>
        <p>15人拼单</p>
      </div>
      <div class="product font-12">
        <p>魔法高跟鞋</p>
        <p>已拼1.1万件</p>
      </div>
    </div>

  </div>

</template>

<style lang="scss" scoped>

  .more-item {
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    /*width: 355px;*/
    /*height: 455px;*/
    position: relative;
    overflow: hidden;



  }
  .itemcontainer{
    position: absolute;
    top:30px;
    right:10px;
    left:10px;
    bottom:0px;
    overflow: hidden;

  }
  .itemcontainer .image{
    display: block;
    margin-left: 0px;
    margin-right: 0px;
    height: 335px;
    border-radius: 4px;
    background-size: cover;
    background-image: url('https://cbu01.alicdn.com/img/ibank/2017/956/024/4137420659_1475529779.120x120xz.jpg');
    background-repeat: no-repeat;
  }
  .bar{
    position: absolute;
    top:255px ;
    left: 0px;
    right:0px;
    height: 80px;
    background-color: rgba(255,255,255,0.5);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

  }
  .bar p:first-child
  {
    color: white;
    margin-left:10px ;
    padding: 10px 20px;
    background-color: black;
  }
  .bar p:last-child
  {
    color: $yellow-active;
    margin-right:10px ;


  }
  .product{

    margin-left: 0px;
    margin-right: 0px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: rgb(177,177,177);
  }
  .top{
    margin-top: 20px;
  }
</style>
<script>



  export default {
    name: 'duoPinBox',
    props: {
      width: {
        type: Number,
        default: (355) ,

      },
      height: {
        type: Number,
        default: (455) ,

      },
      item:{
         type:Object
      },
      goShop:{
        type:Boolean,
        default: true ,

      }
    },
    data(){

        return {

        }
    },
    methods:{

      click: function () {
        this.$emit(
            'itemClick'
        )
      }
    }
  };
</script>
