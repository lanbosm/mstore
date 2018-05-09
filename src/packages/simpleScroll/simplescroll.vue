<template>
  <div ref="wrapper" >
        <div  :class="'simple-scroller-'+direction"  ref="scroller">
              <slot></slot>
        </div>
  </div>
</template>

<script type="text/ecmascript-6">
import AlloyTouch from 'AlloyTouch'
import Transform from '@/packages/css3transform'

const COMPONENT_NAME = 'simpleScroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

function getRect (el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

export default {
  name: COMPONENT_NAME,
  props: {
    lock: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    transform: {
      type: String,
      default: 'translateY'
    },
    attr: {
      type: String,
      default: 'height'
    }
  },
  data () {
    return {
      cur: 0,
      scrollAttr: this.attr,
      scrollTransform: this.transform,
      scrollVertical: true,
      observe: null,
      alloyTouch: null
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
    this.initScroll()
  },
  beforeDestroy () {
    this.observe.disconnect()
  },
  methods: {
    getMin () {
      var min = -1 * getRect(this.$refs.scroller)[this.scrollAttr] + getRect(this.$refs.wrapper)[this.scrollAttr]
      if (min > 0) { min = 0 };
      return min
    },
    initScroll () {
      var self = this

      if (this.direction === DIRECTION_V) {
        this.scrollVertical = true
      }

      if (this.direction === DIRECTION_H) {
        this.scrollTransform = 'translateX'
        this.scrollAttr = 'width'
        this.scrollVertical = false
      }
      Transform(this.$refs.scroller, true)

      this.alloyTouch = new AlloyTouch({
        touch: this.$refs.wrapper, // 反馈触摸的dom
        vertical: this.scrollVertical, // 不必需，默认是true代表监听竖直方向touch
        target: this.$refs.scroller, // 运动的对象
        property: this.scrollTransform, // 被滚动的属性
        sensitivity: 0.6, // 不必需,触摸区域的灵敏度，默认值为1，可以为负数
        factor: 1, // 不必需,默认值是1代表touch区域的1px的对应target.y的1
        min: this.getMin(), // 不必需,滚动属性的最小值
        bindSelf: true,
        preventDefault: true,
        max: 0, // 不必需,滚动属性的最大值
        change (v) {
          // console.log(v)
          if (self.lock) {
            self.alloyTouch.fixed = true
          } else {
            self.alloyTouch.fixed = false
          }
          self.cur = v
        },
        animationEnd: function (value) {
          // console.log(value);
        },
        pressMove: function (evt, value) {
          // console.log(evt.deltaX + "_" + evt.deltaY + "__" + value);
          evt.preventDefault()
        }
      })

      // https://segmentfault.com/a/1190000012787829
      this.observe = new MutationObserver(function (mutations, observe) {
        // console.log(observe);
        if (mutations[0].type === 'childList') {
          self.refresh()
        }
      })
      this.observe.observe(this.$refs.scroller, { childList: true, subtree: true})
    },
    refresh () {
      var min = this.getMin()
      if (min >= this.cur) {
        this.alloyTouch.to(min)
      }
      this.alloyTouch.min = min
    }

  },
  watch: {

  }

}
</script>
<style lang="scss" scoped >
  .simple-scroller-horizontal{
      display: inline-block;
      min-width: 100%;
  }
  .simple-scroller-vertical{
    display: block;
    min-width: 100%;
  }
</style>
