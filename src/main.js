// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import daoStyle from 'dao-style-vue';
import  VeeValidate  from 'vee-validate'
import App from './App'
import router from './router'
import Cookies from 'js-cookie'
import axios from 'axios'
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css';

import 'dao-style-vue/dao-style.js'
import 'dao-style-vue/styles/dao-style.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css'
import Vuerify from 'vuerify'

Vue.config.productionTip = false
Vue.use(daoStyle)
Vue.use(iView)
Vue.use(VeeValidate)
Vue.use(Vuerify)

Vue.use(VueNoty, {
  timeout: 2000,
  progressBar: true,
  layout: 'topCenter',
});
Vue.prototype.$axios = axios.create({
  timeout: 5000,
  withCredentials: true
})

//设置参数到vue.ext_ctx
const queryString = require('query-string')
Vue.prototype.ext_ctx = queryString.parse(location.search)
for (var key in Vue.prototype.ext_ctx) {
  console.log("param from c01 --->  " + key + '=' + Vue.prototype.ext_ctx[key])
  Cookies.set(key, Vue.prototype.ext_ctx[key])
}

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  created: function() {}
})
