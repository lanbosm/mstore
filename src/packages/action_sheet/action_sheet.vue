<template>
  <transition name="picker-fade">
      <div class="item_state" v-show="state==0"  @touchmove.prevent>
            <transition name="picker-move">
                 <div class="item_state_content" v-show="state==0" :style="{height: height + 'px' }">
                      <div class="item_top">
                           <p class="item_title font-16">{{title}}</p>
                           <p class="item_cancel" @click='hide()'>取消</p>
                      </div>
                      <div class="item_content">
                          <slot></slot>
                      </div>
                      <div class="item_btn">
                          确认
                      </div>
                 </div>
            </transition>
      </div>
    </transition>
</template>


<style lang="scss" scoped>
.item_state{
  width: 100%;height: 100%;position: fixed;left: 0;top:0;background: rgba(0, 0, 0, 0.5);
  display: block;
  transition: all 0.3s ease-in-out;
  &.picker-fade-enter, &.picker-fade-leave-active{
      opacity: 0 }
  &.picker-fade-enter-active, &.picker-fade-leave-active{
     transition: all .3s ease-in-out}
}
.item_top{height: 100px;line-height: 100px;border-bottom: 1px solid #eee;position: relative;}
.item_title{text-align: center;}
.item_cancel{position: absolute;right: 0;top:0;padding: 0 20px;color: $orange}

.item_state_content{
  width: 750px;height: 600px;position: absolute;left: 0;bottom: 0;background: #fff;
  &.picker-move-enter, &.picker-move-leave-active{
       transform: translate3d(0, 450px, 0)
     }
 &.picker-move-enter-active, &.picker-move-leave-active{
     transition: all .3s ease-in-out
   }
}
.item_btn{position: absolute;bottom: 0;left: 0;width: 750px;height: 100px;background-color: $orange;line-height: 100px;text-align: center;font-size: 16px;color: #fff;}
</style>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    height:{
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      state: 1,
    }
  },
  methods:{
      hide(){
        this.state=1;
      },
      show(){
        this.state=0;
        this.$emit('showPop',this.state)
      }
  },
}
</script>
