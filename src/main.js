// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import vuex from 'vuex';
import rem from '@/assets/js/rem'
// import landscape from '@/assets/js/landscape'
import iconfont from '@/assets/style/iconfont.css'
import common from '@/assets/style/common.css'
import layer from 'vue-layer'
import VueDND from 'awe-dnd'
 
Vue.use(VueDND)
Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  vuex,
  components: { App },
  template: '<App/>'
})
