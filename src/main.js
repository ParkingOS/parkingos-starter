// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';

import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs';
import 'element-ui/lib/theme-chalk/index.css';
import 'parkingos-ui/lib/parkingos-ui.css'
import '@/styles/index.scss'
Vue.use(ElementUI);
Vue.prototype.$axios=axios;
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
