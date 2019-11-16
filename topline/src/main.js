import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// 注意：第三方包中的具体文件不需要写文件路径，
import 'nprogress/nprogress.css'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
