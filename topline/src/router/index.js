import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/layout.vue'
import Login from '../views/login/login.vue'
// @ 是vuecli中提供的一种特殊路径规则，直接指向src
import Index from '@/views/index/index.vue'
import Article from '@/views/article/article.vue'
import Publish from '@/views/publish/publish.vue'
import Comment from '../views/comment/comment.vue'
import CommentList from '../views/comment-list/indix.vue'
import Account from '../views/account/index.vue'
import Media from '../views/media/media.vue'
import Button from '../components/zujian.vue/Button.vue'
// 进度条
import Nprogress from 'nprogress'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/button',
    name: 'button',
    component: Button
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '/index',
        component: Index
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/publish',
        component: Publish
      },
      {
        path: '/publish/:articleId',
        component: Publish
      },
      {
        path: '/comment',
        component: Comment
      },
      {
        path: '/comment/:articleId',
        component: CommentList,
        props: true
      },
      {
        path: '/account',
        component: Account
      },
      {
        path: '/media',
        component: Media
      }
    ]
  }

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

// 路由拦截器 beforeEach 方法 该方法接受一个函数作为参数
// 参数1：to 表示去哪里的路由信息
// 餐数2：from
// 参数3：next 他是一个方法，用于路由放行
// 具体要做的就是：判断用户的登录状态，有就通过，没有就跳转到登录页
router.beforeEach((to, from, next) => {
  // 进度条开启
  Nprogress.start()
  // console.log('所有页面的访问都要经过这里')
  // 1.如果访问的是登录页，直接放行
  if (to.path === '/login') {
    next()
    return
  }
  // 2.如果是非登录页，才校验token
  // 获取用户token
  const token = window.localStorage.getItem('user-token')
  // 判断是否有token
  if (token) {
    next()
  } else {
    next('/login')
    // 如果在登录页且非登录状态，手动阻止进度条，否则进度条不会停止
    Nprogress.done()
  }
})
// 全局后置钩子--关闭进度条
router.afterEach((to, from) => {
  Nprogress.done()
})

export default router
