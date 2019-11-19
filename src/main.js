// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
// import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
Vue.use(ElementUI)

import router from './router'

import 'animate.css'
import './assets/css/reset.css'
import './assets/css/iconfont.css'

import axios from 'axios'
Vue.prototype.$http=axios

import commonCom from './components/common'
for(var i in commonCom){
  Vue.component(i,commonCom[i])
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
