import Vue from 'vue'
// ../node_modules/vue/dist/vue
import VueRouter from 'vue-router'


import Home from './components/tabbar/Home.vue'
import Member from './components/tabbar/Member.vue'
import Shopcar from './components/tabbar/Cart.vue'
import Search from './components/tabbar/Search.vue'
import Newslist from './components/news/NewsList.vue'
import Newsinfo from './components/news/NewsInfo.vue'
import Photolist from './components/photos/PhotoList.vue'
import Photoinfo from './components/photos/PhotoInfo.vue'
import Goodslist from './components/goods/GoodsList.vue'
import Goodsinfo from './components/goods/GoodsInfo.vue'
import Goodsdesc from './components/goods/Goodsdesc.vue'
import Goodscomt from './components/goods/Goodscomment.vue'

Vue.use(VueRouter)


var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/member', component: Member },
        { path: '/shopcar', component: Shopcar },
        { path: '/search', component: Search },
        { path: '/home/newslist', component: Newslist },
        { path: '/home/newsinfo/:id', component: Newsinfo },
        { path: '/home/photolist', component: Photolist },
        { path: '/home/photoinfo/:id', component: Photoinfo },
        { path: '/home/goodslist', component: Goodslist },
        { path: '/home/goodsinfo/:id', component: Goodsinfo, name: 'goodsinfo' },
        { path: '/home/goodsdesc/:id', component: Goodsdesc, name: 'goodsdesc' },
        { path: '/home/goodscomt/:id', component: Goodscomt, name: 'goodscomt' },
    ],
    linkActiveClass: "mui-active" //覆盖默认路由高亮的类，默认的类叫router-link-active => mui-active
})

export default router