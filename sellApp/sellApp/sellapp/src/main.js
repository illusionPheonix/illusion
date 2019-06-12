import Vue from 'vue'
import App from './App.vue'  //路由挂载

import router from './router' //路由列表

import iView from 'iview';
import 'iview/dist/styles/iview.css'; 

import VueLazyload from 'vue-lazyload' //图片懒加载
Vue.use(VueLazyload)

import store from './store/store'

Vue.use(iView);




Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store    //store:store
}).$mount('#app')
