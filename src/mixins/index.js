/**
 * 共有方法
 */
import {LOGIN_SESSION_KEY, LOGIN_RETURN_KEY,SERVER_ERROR_TEXT, USER_INFO_KEY } from '@/var'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  methods: {
    pageBack () {
      this.$router.go(-1)
    },
    pagePush (location, onComplete, onAbort) {
      if (this.$router) {
        this.$root.$refs.app.transitionName = 'page-push'
        this.$router.push(location, onComplete, onAbort)
      }
    },
    pagePop (location, onComplete, onAbort) {
      if (this.$router) {
        this.$root.$refs.app.transitionName = 'page-pop'
        this.$router.push(location, onComplete, onAbort)
      }
    },
    // 错误处理
    handleError (err) {
      console.log(err.code);
      if (err.code === 4010) {
        this.handleTokenNeedEvent()
      } else if (err.code === 4011) {
        this.handleTokenExpEvent()
      } else if (err.code === 4012) {
        this.handleTokenRwEvent()
      } else {
        this.$messagebox.alert(SERVER_ERROR_TEXT)
      }
    },
    handleTokenNeedEvent () {
      this.$messagebox({
        title: '提示',
        message: '你还没有登录哦?',
        showCancelButton: true,
        cancelButtonText: '再看看',
        confirmButtonText: '去登录'
      }).then(res => {
        if (res === 'confirm') {
          this.$router.push('/login')
        }
      })
    },
    // 令牌过期事件
    handleTokenExpEvent () {
      this.$messagebox.alert('访问令牌过期 请重新登录').then(res => {
        this.handleSaveOut()
      })
    },
    // 令牌覆盖事件
    handleTokenRwEvent () {
      this.$messagebox.alert('你的账号再其他设备登录,如不是本人操作,请联系客服').then(res => {
        this.handleSaveOut()
      })
    },
    // 安全退出
    handleSaveOut () {
      this.$cookies.remove(LOGIN_SESSION_KEY)
      this.resetUserInfo()
      location.replace(location.href)
    },
    appOut () {
      window.location.href = 'ddh_ios://doClose'
    },
    getRandomNum (Min, Max) {
      var Range = Max - Min
      var Rand = Math.random()
      return (Min + Math.round(Rand * Range))
    },
    getRect (el) {
      if (el.getBoundingClientRect) {
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
  }
}
