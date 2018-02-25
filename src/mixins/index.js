/**
 * 共有方法
 */

export default {
  methods: {
    pageBack(){
      this.$router.go(-1);
    },
    pagePush (location,onComplete,onAbort) {
      if (this.$router) {
        this.$root.$refs.app.transitionName='page-push';
        this.$router.push(location,onComplete,onAbort);
      }

    },
    pagePop (location,onComplete,onAbort) {
      if (this.$router) {
          this.$root.$refs.app.transitionName='page-pop';
          this.$router.push(location,onComplete,onAbort);
      }
    },
    appOut(){
      window.location.href="ddh_ios://doClose";
    },
    getRandomNum(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      return(Min + Math.round(Rand * Range));
    }
  }
};
