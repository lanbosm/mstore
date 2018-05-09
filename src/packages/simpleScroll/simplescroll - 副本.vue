<template>
  <div ref="wrapper">
    <div class="scroll-content" >
        <div ref="scrollContent">
              <slot></slot>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  //   import Loading from './loading.vue'
  // import Bubble from './bubble.vue'

  const COMPONENT_NAME = 'simpleScroll'
  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'

  function getRect(el) {
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
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      tap:{
        type: Boolean,
        default: false
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      listenBeforeScroll: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: ''
      },
      startY: {
        type: Number,
        default: 0
      },
      scrollbar: {
        type: null,
        default: false
      },
      freeScroll: {
        type: Boolean,
          default: false
      }
    },
    data() {
      return {
        beforePullDown: true,
        isRebounding: false,
        isPullingDown: false,
        pulling: false,
        isPullUpLoad: false,
        pullUpDirty: true,
        pullDownStyle: '',
        bubbleY: 0

      }
    },
    computed: {

    },
    created() {
      this.pullDownInitTop = -50

    },
    mounted() {
      setTimeout(() => {

        this.initScroll()
      }, 20)
    },
    methods: {
      initScroll() {



        if (!this.$refs.wrapper) {
          return
        }

        //
        if (this.$refs.scrollContent && this.direction === DIRECTION_V) {

           this.$refs.scrollContent.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
        }



        if (this.$refs.scrollContent && this.direction === DIRECTION_H) {
          this.$refs.scrollContent.style.minWidth = `${getRect(this.$refs.wrapper).width + 1}px`
        }

        let options = {
          probeType: this.probeType,
          click: this.click,
          scrollY: this.freeScroll || this.direction === DIRECTION_V,
          scrollX: this.freeScroll || this.direction === DIRECTION_H,
          scrollbar: this.scrollbar,
          startY: this.startY,
          freeScroll: this.freeScroll
        }
        this.scroll = new this.$BScroll(this.$refs.wrapper, options)


        //finishPullDown
      //  console.log(this.scroll);
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }
        if (this.listenBeforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScrollStart')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },

      destroy() {
        this.scroll.destroy()
      }
    },
    watch: {
      // data() {
      //
      //   setTimeout(() => {
      //     this.forceUpdate(true)
      //   }, this.refreshDelay)
      // }
    }
  }
</script>

<style lang="scss" scoped >
  .scroll-content{

      display: inline-block;
      min-width: 100%;
  }

</style>
