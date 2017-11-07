<template>
  <div class="page full flex flex-col pay">
    <my-header :title="title"></my-header>
    <div class="item_content" style="flex:1; overflow:hidden; display:flex; flex-direction:column;">
        <simple-scroll   class="scroll-list"  direction="vertical">
           <div class="item_top" >
             <div class="item_left">
               <i class="iconfont icon-dizhi"></i>
               <div class="item_order">
                    <p class="item_name font-14">线下到店/自提</p>
                    <p class="item_num font-12">上海市徐虎啊家具啊家具啊家具啊</p>
               </div>
             </div>
             <div class="item_right">
                  <i class="iconfont icon-mjiantou"></i>
             </div>
           </div>
            <ul class="item_ul">
               <li class="item_li">
                 <div class="item_left">
                   <i class="iconfont icon-gouwudai"></i>
                   <div class="item_order">
                        <p class="item_name font-14">卫龙辣条 大片袋装</p>
                        <p class="item_num font-12">1000毫克*2</p>
                   </div>
                 </div>
                 <div class="item_right">
                      <p>商品价格</p>
                      <p class="item_price">￥100</p>
                 </div>
               </li>
            </ul>
            <ul class="item_ul1">
                <li class="item_li">
                  <div class="item_left">
                    <i class="iconfont icon-jifen"><span class="item_point mg-l-30 font-14">积分</span></i>
                  </div>
                  <div class="item_right mg-r-100">
                       <p>使用积分(200)</p>
                       <p class="item_price">-￥20</p>
                  </div>
                  <div class="item_check" style="position:absolute;right:0;">
                       <check-box  @change="selectBrand"></check-box>
                  </div>
                </li>
                <li class="item_li">
                  <div class="item_left">
                    <i class="iconfont icon-yue"><span class="item_point mg-l-30 font-14">余额</span></i>
                  </div>
                  <div class="item_right mg-r-100">
                       <span class="item_span">暂无余额可用</span>
                  </div>
                  <div class="item_check">
                      <check-box  @change="selectBrand"></check-box>
                  </div>
                </li>
                <li class="item_li">
                  <div class="item_left">
                    <i class="iconfont icon-iconquan02"><span class="item_point mg-l-30 font-14">票券</span></i>
                  </div>
                  <div class="item_right" @click="pagePush('/conponsList')">
                       <span class="item_span mg-r-60">暂无可用票券</span>
                       <i class="iconfont icon-mjiantou"></i>
                  </div>
                </li>
                <li class="item_li">
                  <div class="item_left">
                    <i class="iconfont icon-fukuan"><span class="item_point mg-l-30 font-14">实际付款</span></i>
                  </div>
                  <div class="item_order">
                       <p class="item_name font-14">免运费</p>
                       <p class="item_num font-12">￥80</p>
                  </div>
                </li>
                <li class="item_li">
                  <div class="item_left">
                    <i class="iconfont icon-xie"></i>
                    <input class="mg-l-30" type="text" placeholder="给商家留言">
                  </div>
                </li>
            </ul>
            <div class="item_payType">
                <div class="item_type font-16">
                      付款方式
                </div>
                <div class="item_wx">
                   <div class="item_list">
                        <i class="iconfont icon-weixin font-14"></i>
                        <span class="mg-l-30">微信支付</span>
                   </div>
                   <div class="item_pay_check">
                        <check-box  @change="selectBrand"></check-box>
                   </div>
                </div>
                <div class="item_zfb">
                    <div class="item_list">
                        <i class="iconfont icon-zhifubao font-14"></i>
                        <span class="mg-l-30">支付宝支付</span>
                    </div>
                    <div class="item_pay_check">
                         <check-box  @change="selectBrand"></check-box>
                    </div>
                </div>

            </div>
            </simple-scroll>
        </div>
        <div class="paybtn">
            立即支付
        </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll-list{
  flex: 1;
  background: #ffffff;
  overflow:  hidden;
  display: flex;
  flex-direction: column;
  position: relative;

}
.item_content{background:$gray-minor }
.item_li,.item_top{position: relative;;background: #fff;;height: 120px;;display: flex;margin: 0 30px;;border-bottom: 1px solid #eee;padding: 10px 0;justify-content: space-between;overflow: hidden;}
.item_li i{line-height: 100px;color:$gray-minor;}
.item_top i{line-height: 100px;color:$gray-minor;}
.item_top p{margin-top: 15px;margin-left: 30px;}
.item_li p{margin-top: 15px;margin-left: 30px;}
.item_num{color: $gray-minor}
.item_left{display: flex;}
.evaluate_msg{margin: 30px 30px;color: $gray-minor;border: 1px solid #eee;}
textarea ::-webkit-placeholder{color: $gray-minor}
textarea {text-indent: 10px;padding: 20px 10px;;width: 100%;}
input{width: 100%;height: 100%;line-height: 100px;flex: 1}
.item_price{color:$yellow-active;text-align: right;}
.item_point{color: $black-main}
.item_span{line-height: 100px;}
.item_payType{background-color: #fff;margin: 20px 30px;}
.item_check{position: absolute;;right: 0;}
.item_payType div{height: 100px;line-height: 100px;border-bottom: 1px solid #eee;display: flex;justify-content:space-between; }
.paybtn{position: absolute;bottom: 0;left: 0;width: 750px;height: 100px;background-color: $orange;line-height: 100px;text-align: center;font-size: 16px;color: #fff;}
</style>
<script>
import { mapState,mapGetters ,mapMutations, mapActions } from 'vuex';
export default {
  name:'pay',
  data(){
    return{
      title:'确认订单'
    }
  },
  methods:{
    selectBrand() {

    }
  }
}
</script>
