// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './style/layout.scss'
//缓存方法
import './commonJs/storageMethods'
//自定义指令
import './commonJs/customDirective'

//axios
import axios from 'axios'
import VueAxios from 'vue-axios'

//全局使用
Vue.use(VueAxios, axios)


import YDUI from 'vue-ydui'; 
import 'vue-ydui/dist/ydui.rem.css';
Vue.use(YDUI);


//Material
// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.css'
// Vue.use(VueMaterial);


Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
