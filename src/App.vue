<template>
  <div id="app">

    <transition  :name="transitionName" @afterLeave="clearTransition"  >
    <!-- <keep-alive> -->
        <router-view class="animated"></router-view>
    <!-- </keep-alive> -->

    </transition>

  </div>
</template>

<script>


  (function(win,doc){
    var h;
    win.addEventListener('resize',function() {
      clearTimeout(h);
      h = setTimeout(setUnitA, 300);
    }, false);
    win.addEventListener('pageshow',function(e) {
      if (e.persisted) {
        clearTimeout(h);
        h = setTimeout(setUnitA, 300);
      }
    }, false);
    var setUnitA=function(){
      doc.documentElement.style.fontSize = doc.documentElement.clientWidth/750 *40 + 'px';
    };
    setUnitA();

  //  win.addEventListener("touchstart", func, {passive: true} );
    win.addEventListener('touchmove',function(e) {
          e.preventDefault();
    },{passive: false});

  })(window,document);

  function isSeries(a,b){
    var res=false;
    if(a.indexOf(b)>=0){
      res=true;
    }
    else if(b.indexOf(a)>=0){
      res=true;
    }
    return res;

  }

export default {
  name: 'app',
  data () {
    return {
          jumpAnime: {},
          historyRoutes: [],
          isAnime:true,
          transitionName:''
    }
  },

  watch: {
			/* ========================================
			 * Apply Slide Transition Effects For
			 * Each Route Switch,Except Some Route That
			 * Don't Need Transition Effect
			 * ========================================= */
			$route(to, from) {

          //noPageAnimation


            //主动不要动画
            if (to.meta.noPageAnimation == from.meta.noPageAnimation==true) {
                this.transitionName='';
                return false;
            }else if(isSeries(to.path,from.path)){ //同系列
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                //   this.transitionName = toDepth < fromDepth ? 'page-pop'  : 'page-push'
                if( toDepth<fromDepth){
                    this.transitionName='page-pop';
                    this.historyRoutes.pop();
                }else{
                    this.transitionName='page-push';
                    this.historyRoutes.push(from.name);
                }
            }else { //不同系列

              if (this.historyRoutes.length > 0 && to.name == this.historyRoutes[this.historyRoutes.length - 1]) {
                this.transitionName = 'page-pop';
                this.historyRoutes.pop();
              } else { //默认push
                if (from.name != null) {
                  this.transitionName = 'page-push';
                  this.historyRoutes.push(from.name);
                }
              }
            }
            //本地存储
            window.localStorage.setItem('historyRoutes',JSON.stringify(this.historyRoutes));
      }
	},
  mounted(){
      //本地读取
      if(window.localStorage.getItem('historyRoutes')){
          this.historyRoutes=JSON.parse(window.localStorage.getItem('historyRoutes'));
      }

  },
  methods:{
    clearTransition() {
      this.isAnime=true;
    //  store.commit('transition/setTransition', '');
      this.transitionName='';
    }
  }
}
</script>

<style lang="scss">


// Page Turn on Transian Effect
.page-push {
  &-enter {
    transform: translate3d(100%, 0, 0);
  }
  &-leave-to {
    transform: translate3d(-20%, 0, 0);
  }
  &-enter-active, &-leave-active  {
    transition: transform .3s ease;
  }
}

// Page Turn Off Transian Effect
.page-pop {
  &-enter {
    transform: translate3d(-20%, 0, 0);
  }
  &-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  &-leave-active {
    z-index: 2;
  }
  &-enter-active, &-leave-active  {
    transition: transform .3s ease;
  }
}

  #app{
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom: 0;
    overflow: hidden;
  }
  .animated{
    position: absolute;
    width: 100%;
  }


</style>
