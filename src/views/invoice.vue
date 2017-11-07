<template>
    <div class="page full flex flex-col coupons">
        <mt-header title="开具发票" class="header">
          <mt-button class="btn" icon="back" @click='pageBack()' slot="left"></mt-button>
        </mt-header>
        <div class="item_content">
             <ul class="item_ul">
                 <li class="item_li">
                     <div class="item_left">
                             <span class="list-checkbox"><input type="checkbox" /> <i></i> </span>
                     </div>
                     <div class="item_right mg-l-30">
                           <div class="item_img" style="background-image:url('/static/images/test.jpg')"></div>
                           <div class="item_discribe mg-l-30">
                                <p class="font-16 item_name mg-t-10">来自东方的法术T恤 冬暖…</p>
                                <p class="font-14 item_num mg-t-20">规格：一件（XL码）*2</p>
                                <p class="font-14 item_pay mg-t-20">支付：<span>245.1</span>元</p>
                           </div>
                     </div>
                 </li>
             </ul>
        </div>
        <div class="item_next" @click="pagePush('/invoice/next')">
            下一步
        </div>
    </div>
</template>

<style lang="scss" scoped>
     .header{background-color: #fff;color: #000;border-bottom: 1px solid #eee;height: 100px}
     .item_li{border-bottom: 1px solid #eee;padding: 30px 30px;display: flex;}
     .item_left{display: flex;justify-content: center;align-items: center;}
     .item_right{display: flex;}
     .item_name{color: $black-main; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 360px;height: 40px;}
     .item_num{color:$text-light-color}
     .item_pay{color: $text-light-color}
     .item_pay span{color: $black-main}
     .item_img{width: 200px;height: 200px;overflow: hidden;background-position: center;background-repeat: no-repeat;border-radius: 5px;background-size: cover;}
     .list-checkbox {
       /*margin-top:@gutter;*/
       /*margin-right:@gutter;*/
        //  margin-left:30px ;
         width: 40px;
         height: 40px;
         overflow: hidden;
         display: inline-block;
         border-radius: 50%;
         border: solid 1px #cccccc;
         position: relative;


         &.inner-checkbox{
            margin-top:0;
            /*top:@gutter/2;*/
            /*margin-left:@gutter/2;*/
            width: 40px;
            height: 40px;
            overflow: hidden;
          }
         i{
           width: 100%;
           height:100%;
           overflow: hidden;
           position: absolute;
           pointer-events: none;
           top:0;
           left:0;

         }
         i:after{
           box-sizing: content-box;
           content: "";
           border: 2px solid #fff;
           border-left: 0;
           border-top: 0;
           height: $gutter;
           left: 12px;
           position: absolute;
           top: 5px;
           transform: rotate(45deg) scaleY(0);
           width: 10px;
           transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
           transform-origin: center;
         }
         input[type=checkbox]{
           position: absolute;
           width: 100%;
           height:100%;
           opacity:0;
           margin: 0;
           outline:none;
           display: inline-block;
         }

         input[type=checkbox]:checked +i{
           background:$yellow-base;
           border-radius: 50%;
         }
         input[type=checkbox]:checked +i:after {
           transform: rotate(45deg) scaleY(1);
         }
     }
     .item_next{position: absolute;bottom: 0;left: 0;width: 750px;height: 100px;background-color: $orange;line-height: 100px;text-align: center;font-size: 16px;color: #fff;}
</style>
<script>
export default {
     name:'invoice',
     data(){
       return{

       }
     }
  }
</script>
