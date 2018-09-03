// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './style/layout.scss'


//axios
import axios from 'axios'
import VueAxios from 'vue-axios'

//全局使用
Vue.use(VueAxios, axios)


import YDUI from 'vue-ydui'; 
import 'vue-ydui/dist/ydui.rem.css';
Vue.use(YDUI);



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
