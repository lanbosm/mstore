<template>
  <div class="page full flex flex-col">
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

            <div class="item_li">
              <div class="item_left">
                <i class="iconfont icon-jifen"></i>
                <div>
                  <span class="s_text">积分</span>
                </div>
              </div>
              <div class="item_right">
                <p>积分(200)</p>
                <p class="item_price">-￥20</p>
              </div>
            </div>

            <div class="item_li">
              <div class="item_left">
                <i class="iconfont icon-yue"></i>
                <div>
                  <span class="s_text">余额</span>
                </div>
              </div>
              <div class="item_right">
                <p>余额(16)</p>
                <p class="item_price">-￥16</p>
              </div>
            </div>

            <div class="item_li">
              <div class="item_left">
                <i class="iconfont icon-yue"></i>
                <div>
                  <span class="s_text">实际付款</span>
                </div>
              </div>
              <div class="item_right">
                <p>免运费</p>
                <p class="item_price">￥80</p>
              </div>
            </div>

            <div class="item_li">
              <div class="item_left">
                <i class="iconfont icon-yue"></i>
                <div>
                  <span class="s_text">无备注</span>
                </div>
              </div>

            </div>

            <div class="line-margin">
            </div>

            <div class="item_sn">
              <p class="item_order font-14">付款方式</p>
              <p class="item_num font-12">微信付款80元</p>
            </div>

            <div class="line-margin">
            </div>

            <div class="item_sn">
              <div >
                <p class="item_order font-14">到店向商家出示订单码</p>
              </div>

              <div class="item_sn_bottom">
                <p class="item_num">订单号:1524525552224455445455</p>
                <p class="item_status">等待发货</p>

              </div>
            </div>


              </simple-scroll>
          </div>
          <div class="orderBtn">
               <div class="btn_left">
                    联系商家
               </div>
               <div class="btn_right">
                  确认收货
               </div>
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
.line-margin{background-color:#eee;height: 20px }
.item_content{background:$gray-minor }
.item_li,.item_top{position: relative;;background: #fff;;height: 120px;;display: flex;margin: 0 30px;;border-bottom: 1px solid #eee;padding: 10px 0;justify-content: space-between;overflow: hidden;}
.item_li i{line-height: 100px;color:$gray-minor;}
.item_top i{line-height: 100px;color:$gray-minor;}
.item_top p{margin-top: 15px;margin-left: 30px;}
.item_li p{margin-top: 15px;margin-left: 30px;}
.item_num{color: $gray-minor}
.item_price{color: $orange}
.item_left{display: flex;}
.item_sn{padding: 0 30px;line-height: 80px;}
.item_sn_bottom{display: flex;justify-content: space-between;}
.item_status{color: $orange}
.orderBtn{position: absolute;bottom: 0;left: 0;width: 750px;height: 100px;line-height: 100px;text-align: center;font-size: 16px;color: #fff;display: flex}
.orderBtn div{flex: 1;text-align: center;}
.btn_left{background: $orange}
.btn_right{background: $red}
.s_text{line-height: 100px;text-align: center;font-size: 14px;margin-left: 30px}

</style>
<script>
    export default {
      name:'orderDetail',
      data(){
        return{
          title:'订单详情'
        }
      }
    }
</script>
