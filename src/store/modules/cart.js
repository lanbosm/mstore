// 购物车的子模块
// 订单模块
import api from '../../api/index.js'
import util from '@/util'

export default {
  namespaced: true,
  state: {
    cartList: [
      // {
      //   'brand': {
      //     id: 1,
      //     name: '阿迪达斯',
      //     items: [
      //       {id: 1, name: '靴子', desc: '这是描述这是描述这', spec: '黑色 1双', price: '300', quantity: 1, image: '//origin.dorodoro-lab.com/static/images/prod1.jpg'}
      //     ]
      //   }
      // },
      // {
      //   'brand': {
      //     id: 2,
      //     name: '优衣库',
      //     items: [
      //       {id: 1, name: '衣服', spec: '蓝白色 1双', desc: '这是描述这是描述这是描述', price: '1000', quantity: 1, image: '//origin.dorodoro-lab.com/static/images/mt1.jpg'},
      //       {id: 2, name: '衣服', desc: '这是描述这是描述这是描述', spec: '蓝白色 1双', price: '1100', quantity: 1, image: '//origin.dorodoro-lab.com/static/images/mt1.jpg'},
      //       {id: 3, name: '衣服', spec: '蓝白色 1双', desc: '这是描述这是描述这是描述', price: '1200', quantity: 1, image: '//origin.dorodoro-lab.com/static/images/mt1.jpg'},
      //       {id: 4, name: '衣服', desc: '这是描述这是描述这是描述', spec: '蓝白色 1双', price: '1300', quantity: 1, image: '//origin.dorodoro-lab.com/static/images/prod2.jpg'},
      //       {id: 5, name: '衣服', spec: '蓝白色 1双', desc: '这是描述这是描述这是描述', price: '1400', quantity: 1, image: '//origin.dorodoro-lab.com/static/images/prod2.jpg'},
      //       {id: 6, name: '衣服', desc: '这是描述这是描述这是描述', spec: '蓝白色 1双', price: '1000', quantity: 1, image: '//origin.dorodoro-lab.com/static/images/prod2.jpg'},
      //       {id: 7, name: '衣服', spec: '蓝白色 1双', desc: '这是描述这是描述这是描述', price: '1000', quantity: 1, image: '//origin.dorodoro-lab.com/static/images/mt2.jpg'},
      //       {id: 8, name: '衣服', desc: '这是描述这是描述这是描述', spec: '蓝白色 1双', price: '1000', quantity: 1, image: '//origin.dorodoro-lab.com/static/images/mt2.jpg'},
      //       {id: 9, name: '衣服', spec: '蓝白色 1双', desc: '这是描述这是描述这是描述', price: '1000', quantity: 1, image: '//origin.dorodoro-lab.com/static/images/prod4.jpg'},
      //       {id: 10, name: '衣服', desc: '这是描述这是描述这是描述', spec: '蓝白色 1双', price: '1000', quantity: 1, image: '//origin.dorodoro-lab.com/static/images/prod4.jpg'}
      //     ]
      //   }
      // }
    ],
    buyList: []
  },
  getters: {
    totalPrice (state) {
      var sum = 0
      state.cartList.forEach((ele, index) => {
        ele.brand.items.forEach((ele2, index2) => {
          if (ele2.checked) {
            sum += Number(ele2.price * ele2.quantity)
          }
        })
      })
      return sum
    },
    totalPushs (state) {
      var sum = 0
      state.cartList.forEach((ele, index) => {
        ele.brand.items.forEach((ele2, index2) => {
          sum = sum+ 1 *ele2.quantity
        })
      })
      return sum
    },
    totalBuys (state) {
      var sum = 0
      state.cartList.forEach((ele, index) => {
        ele.brand.items.forEach((ele2, index2) => {
          if (ele2.checked) {
            sum = sum+ 1 *ele2.quantity
          }
        })
      })
      return sum
    }
  },
  mutations: {
    cartSet (state, list) {
      console.log(list)
      state.list = list
    },
    cartPush (state, item) {
      state.user = info
    }
  },
  actions: {
    cartPush ({dispatch, state, commit}, payload) {
      console.log(payload)
      if (state.cartList.length == 0) {
        state.cartList.push({
          'brand': {
            id: payload.cid,
            name: payload.pingpai,
            items: [
              {id: payload.id, name: payload.name, desc: '这是描述这是描述', spec: payload.spec, price: payload.price, quantity: payload.quantity, image: payload.image}
            ]
          }
        })
      } else {
        var find1 = false
        state.cartList.forEach((ele, index) => {
          if (ele.brand.id == payload.cid) {
            find1 = true
            var find2 = false
            ele.brand.items.forEach((ele2, index2) => {
              if (ele2.id == payload.id) {
                find2 = true
                ele2.quantity++
              }
            })
            if (!find2) {
              ele.brand.items.push({
                id: payload.id,
                name: payload.name,
                desc: '这是描述这是描述',
                spec: payload.spec,
                price: payload.price,
                quantity: payload.quantity,
                image: payload.image
              })
            }
          } else {
            state.cartList.push({
              'brand': {
                id: payload.cid,
                name: payload.pingpai,
                items: [
                  {id: payload.id, name: payload.name, desc: '这是描述这是描述', spec: payload.spec, price: payload.price, quantity: payload.quantity, image: payload.image
                  }
                ]
              }
            })
          }
        })
      }
      // {
      //   'brand': {
      //     id: 1,
      //     name: '阿迪达斯',
      //     items: [
      //       {id: 1, name: '靴子', desc: '这是描述这是描述这', spec: '黑色 1双', price: '300', quantity: 1, image: '//origin.dorodoro-lab.com/static/images/prod1.jpg'}
      //     ]
      //   }
      // },

      // state.cartList.push(payload)
    },
    editPush ({dispatch, state, commit}, payload) {
      state.buyList.push(payload)
    },
    async getCartList ({dispatch, commit}, value) {
      try {
        var mockList = [{name: '商品1号', pid: 1, price: 1000, quantity: 1},
          {name: '商品2号', pid: 2, price: 2000, quantity: 1},
          {name: '商品3号', pid: 3, price: 3000, quantity: 1},
          {name: '商品3号', pid: 3, price: 3000, quantity: 1}
        ]

        var list = await remoteData(mockList, 3000)
        // data.code=20000
        if (!list) { throw new Error('获取失败') }

        commit('cartSet', list)
      } catch (e) {
        return await Promise.resolve(e)
      }

      //  return test(3000);
    }

  }
}
