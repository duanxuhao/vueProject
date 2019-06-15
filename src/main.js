import Vue from 'vue'

// import VueRouter from 'vue-router'
// Vue.use(VueRouter)

// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'

import app from './App.vue'
import './lib/mui/sass/mui.scss'
import './lib/mui/examples/hello-mui/css/icons-extra.css'


// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button)

// Vue.use(Lazyload);

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import router from './router.js'

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true

import moment from 'moment'
// 定义全局过滤器
Vue.filter('dataFormat', function(dataStr, pattern = "YYYY-MM-DD hh:mm:ss") {
    return moment(dataStr).format(pattern)
})
import Vuex from 'vuex'
Vue.use(Vuex)
    // 进入页面则从本地存储中把购物车的数据读出来
var cart = JSON.parse(localStorage.getItem("cart") || "[]")
var store = new Vuex.Store({
    state: { //this.$store.state.***
        cart: cart //购物车商品数据，{id：，count:,price:,selected:true,}
    },
    mutations: { //this.$store.commit('**')
        addToCart(state, goodsInfo) { //点击加入购物车，保存到store中的cart上
            // 已有则之更新数据，否则push到cart
            var flag = false //假设在购物车中没有找到对应的商品
            state.cart.some(item => {
                if (item.id == goodsInfo.id) {
                    item.count += parseInt(goodsInfo.count)
                    flag = true
                    return true
                }
            })
            if (!flag) {
                state.cart.push(goodsInfo)
            }
            // 当更新数据之后，将数据存储扫localestorage
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        updateGoodsinfo(state, goodsInfo) {
            // 修改购物车商品数量
            state.cart.some(item => {
                if (item.id == goodsInfo.id) {
                    item.count = parseInt(goodsInfo.count)
                    return true
                }
            })
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        delGoods(state, id) {
            state.cart.some((item, i) => {
                if (item.id == id) {
                    state.cart.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        updateGoodsSelected(state, info) {
            state.cart.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                    return true
                }
            })
            localStorage.setItem("cart", JSON.stringify(state.cart))
        }
    },
    getters: { //this.$store.getters.**
        getAllCount(state) {
            var c = 0
            state.cart.forEach(item => {
                if (item.selected) {
                    c += item.count
                }
            })
            return c
        },
        getGoodsCount(state) {
            var o = {}
            state.cart.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}
            state.cart.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            var p = { count: 0, amount: 0 }
            state.cart.forEach(item => {
                if (item.selected) {
                    p.count += item.count
                    p.amount += parseInt(item.price) * parseInt(item.count)
                }
            })
            return p
        }
    }
})

var vm = new Vue({
    el: "#app",
    render: function(craeteElement) {
        return craeteElement(app)
    },
    router,
    store
})