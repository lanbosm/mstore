<template>
    <div class="full flex flex-col invoice_next">
        <mt-header title="开具发票" class="header">
          <mt-button class="btn" icon="back" @click='pageBack()' slot="left"></mt-button>
        </mt-header>
        <div class="item_content">
            <div class="item_list">
                  <div class="font-14 item_left ">抬头类型</div>
                  <div class="font-12 item_right item_type">
                        <div :class="{'active':tabIndex==0}" @click="tabIndex=0"><i class="iconfont icon-dot" :class="{'active':tabIndex==0}"></i> <span>公司抬头</span></div>
                        <p class="mg-l-30" :class="{'active':tabIndex==1}" @click="tabIndex=1"><i class="iconfont icon-dot " :class="{'active':tabIndex==1}"></i> <span>个人/非企业单位</span></p>
                  </div>
            </div>
            <div class="item_list">
                  <div class="font-14 item_left">发票抬头</div>
                  <div class="font-12 item_input">
                          <input class="input" type="text" placeholder="请填写发票抬头">
                    </div>
            </div>
            <div class="item_list">
                  <div class="font-14 item_left">纳税人</div>
                  <div class="font-12 item_input">
                          <input class="input" type="text" placeholder="请填写发票抬头">
                    </div>
            </div>
            <div class="item_list">
                  <div class="font-14 item_left">发票内容</div>
                  <div class="font-12 item_input">
                        <p>固定的商品名称</p>
                    </div>
            </div>
            <div class="item_list">
                  <div class="font-14 item_left">发票金额</div>
                  <div class="font-12 item_input">
                      <!--  <p>199.9元</p>-->
                    <p><span class="sum">199.9</span>元</p>
                  </div>
            </div>
            <div class="item_list">
                  <div class="font-14 item_left">开户行及账户</div>
                  <div class="font-12 item_input">
                          <input class="input" type="text" placeholder="填写开户行银行及账号">
                    </div>
            </div>
            <div class="item_list">
                  <div class="font-14 item_left">地址、电话</div>
                  <div class="font-12 item_input">
                          <input class="input" type="text" placeholder="请输入公司地址、个人电话">
                    </div>
            </div>
            <div class="item_list">
                  <div class="font-14 item_left">电子邮件</div>
                  <div class="font-12 item_input">
                          <input class="input" type="text" placeholder="用于向您发送电子行程单">
                    </div>
            </div>
            <div class="item_list">
                  <div class="font-14 item_left">备注说明</div>
                  <div class="font-12 item_input">
                          <input class="input" type="text" placeholder="请填写备注说明">
                    </div>
            </div>
         </div>
         <div class="item_submit" @click='showPop()'>
              提交
         </div>
         <actionpop ref="Pop" :title="title" :height="height">
              <div class="action_content">
                   <p class="font-12">1. 根据国家税务总局公告2015年第84号的规定，增值税
                      电子普通发票的开票方和受票方需要纸质发票的， 可以
                      自行打印增值税电子普通发票的版式文件，其法律效力、
                      基本用途、基本使用规定等与税务机关监制的增值税普
                      通发票相同。</p>
                      <p class="font-12">2.商品中的折扣券金额不支持开具发票，订单中的发生使用消费券、余额、积分等，不支持开具发票。</p>
                      <p class="font-12">3.电子发票将在您提交后的30分钟左右，发送至您提供
                        的电子邮箱中，请注意查收。</p>
              </div>
         </actionpop>
    </div>
</template>

<style lang="scss" scoped>
      .header{background-color: #fff;color: #000;border-bottom: 1px solid #eee;height: 100px !important}
      .item_list{height: 100px;line-height: 100px;border-bottom: 1px solid #eee;padding: 0 30px;display: flex;background-color: #fff;}
      .item_left{width: 250px;}
      input::-webkit-input-placeholder{color: $gray-dark;}
      .item_submit{position: absolute;bottom: 0;left: 0;width: 750px;height: 100px;background-color: $orange;line-height: 100px;text-align: center;font-size: 16px;color: #fff;}
      .item_type{display: flex;}
      .item_type i{color: $gray-minor;
          &.active{
          color:$primary-color
        }
      }
      .item_type p{
        color: $gray-minor;
        &.active{
          color: $black-main
        }
      }
      .action_content{padding: 0 20px;color: $gray-minor}
      .action_content p{margin-top: 30px;line-height: 30px;}
      .sum{color: #FFCD00;font-size: 12px;}
</style>
<script>
import actionpop from '../packages/action_sheet/action_sheet.vue'
export default {
    name:'invoice_next',
    data(){
      return{
         tabIndex:0,
         state:false,
         title:'开票说明',
         status:0,
         height:'300',
      }
    },
    components:{
      actionpop,
    },
    created(){

    },
    watch:{
        // tabIndex(val){
        //      alert(val)
        //   }
    },
    methods:{
       showPop(){
           this.$refs.Pop.show();   //这里写判断逻辑后在执行它
       }
    },
    computed:{

    },
}
</script>
