import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index/index.vue'
import Login from '../views/login/login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirrect: '/index',
  },
  //登录页
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  //一级路由 主页
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')// 按需加载
  // }
]

const router = new VueRouter({
  routes
})

export default router
