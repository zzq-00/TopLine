import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import moment from 'moment'
// 注意：第三方包中的具体文件不需要写文件路径，
import 'nprogress/nprogress.css'
import JSONbig from 'json-bigint'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// axios默认使用JSON.parse(data)
// 而这里手动配置使用JSONbig.parse(data)
axios.defaults.transformResponse = [
  function (data, headers) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      // console.log(err)
      return {}
    }
  }
]
// axios拦截器
axios.interceptors.request.use(function (config) {
  // console.log('请求拦截器', config)
  const token = window.localStorage.getItem('user-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
Vue.config.productionTip = false
Vue.use(ElementUI)
// 全局过滤器
// 参数1：过滤器名称
// 参数2：函数
// 调用方法：在模板中{{ 数据 | 过滤器名称}}

Vue.filter('dateFormat', (value) => {
  return moment(value).format('YYYY-MM-DD')
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
