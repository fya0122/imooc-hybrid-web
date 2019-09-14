import Vue from 'vue'
import Router from 'vue-router'
import main from './views/main.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'imooc', // 默认的不要用路由懒加载，会造成beforeEach一开始走两边的BUG
    component: main
  }, {
    path: '/goodsList',
    name: 'goodsList',
    component: () => import('./views/goodsList.vue')
  }, {
    path: '/goodsDetail',
    name: 'goodsDetail',
    component: () => import('./views/goodsDetail.vue')
  }, {
    path: '/buy',
    name: 'buy',
    component: () => import('./views/buy.vue')
  }, {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue')
  }, {
    path: '/register',
    name: 'register',
    component: () => import('./views/Register.vue')
  }]
})
