

//引入核心模块
import Vue from 'vue'
import VueRouter from 'vue-router'

//工程全局注册，把此组件内包含的所有内容注册为全局，后面使用时，无需再次引入
//直接使用标签名即可
Vue.use(VueRouter)

//引入 子组件
import Item from './pages/Item.vue'


export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Item //商品
        },
        {
            path: '/evaluate',
            component: ()=>import('./pages/Evaluate.vue') //评价
        },
        {//懒加载
            path: '/merchant',
            component: ()=>import('./pages/Merchant.vue') //商家
        }
    ]
        
})