/**
 * Created by Administrator on 2017/10/23.
 */
// 授权模块
import api from '../../api/index.js'
import util from '@/util'

var encryptStr = function (password, publicKey) {
  var encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)

  var encrypted = encrypt.encrypt(password)
  return encrypted
}

export default {
  namespaced: true,
  state: {

    JSEncryptInstalled: false
  },
  getters: {
  },
  mutations: {
  },
  actions: {

    async intallJSEncrypt ({state, dispatch, commit}, value) {
      if (!state.JSEncryptInstalled) {
        return new Promise((resolve, reject) => {
          util.loadScript('/static/js/jsencrypt.min.js', _ => {
            state.JSEncryptInstalled = true
            resolve()
          })
        })
      } else {
        console.log('JSEncrypt is installed!')
      }
    },

    async passAuth ({state, dispatch, commit}, value) {
      if (!state.JSEncryptInstalled) {
        await dispatch('intallJSEncrypt')
      }
      var dpw = encryptStr(value.password, api.publicKey)

      try {
        var res = await api.passLogin({username: value.username, dpw: dpw , type: 'own'})

        if (res.code === 2000) {
          commit('setToken', res.token, { root: true })
          return Promise.resolve(res)
        } else {
          throw res
        }
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async wxLogin ({dispatch, commit}, value) {
      try {
        var url = await api.wxLogin()
        location.replace(url)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async wxAuth ({dispatch, commit}, value) {
      var {info} = await api.wxUserInfo(value)
      var {token} = await api.passLogin({...info, type: 'wechat'})
      commit('setToken', token, { root: true })
      // commit('setUserInfo', info, { root: true })
    }
  }
}
