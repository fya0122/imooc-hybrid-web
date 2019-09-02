import Vue from 'vue'
import Router from 'vue-router'
import main from './views/main.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'imooc',
    component: main
  }, {
    path: '/goodsList',
    name: 'goodsList',
    component: () => import('./views/goodsList.vue')
  }, {
    path: '/goodsDetail',
    name: 'goodsDetail',
    component: () => import('./views/goodsDetail.vue')
  }]
})
