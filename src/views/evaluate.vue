<template>
     <div class="page full flex flex-col evaluate">
       <mt-header title="商品评价" class="header">
         <mt-button class="btn" icon="back" @click='pageBack()' slot="left"></mt-button>
       </mt-header>
       <div class="item_content">
            <ul class="item_ul">
              <li class="item_li">
                  <i class="iconfont icon-gouwudai"></i>
                  <div class="item_order">
                       <p class="item_name font-14">卫龙辣条 大片袋装</p>
                       <p class="item_num font-12">1000毫克*2</p>
                  </div>
              </li>
            </ul>
       </div>
       <div class="evaluate_msg">
           <textarea class="font-12" rows="5" placeholder="请输入评价信息"></textarea>
       </div>
       <div class="item_core">
         <p class="sppraise">
              <i class="iconfont icon-xing"></i>
              <i class="iconfont icon-xing"></i>
              <i class="iconfont icon-xing"></i>
              <i class="iconfont icon-xing"></i>
              <i class="iconfont icon-xing"></i>
          </p>
          <p class="mg-t-20">星级评价</p>
       </div>
       <div class="item_btn">
            发表评价
       </div>
     </div>
</template>

<style lang="scss" scoped>
      .header{background:none;color:$black-main;height: 100px;border-bottom: 1px solid #eee;}
      .item_content{background-color: #fff;}
      .item_li{display: flex;margin: 0 30px;;border-bottom: 1px solid #eee;padding: 10px 0;}
      .item_li i{line-height: 100px;color:$gray-minor;}
      .item_li p{margin-top: 15px;margin-left: 30px;}
      .item_num{color: $gray-minor}
      .evaluate_msg{margin: 30px 30px;color: $gray-minor;}
      textarea ::-webkit-placeholder{color: $gray-minor}
      textarea {text-indent: 10px;padding: 20px 10px;;width: 100%;}
      .item_btn{position: absolute;bottom: 0;left: 0;width: 750px;height: 100px;background-color: $orange;line-height: 100px;text-align: center;font-size: 16px;color: #fff;}
      .sppraise i{color: $gray-minor;font-size: 30px;}
      .item_core{text-align: center;margin-top: 20px;}
</style>

<script>
export default {
  name:'evaluate',
  data(){
    return{

    }
  }
}
</script>
