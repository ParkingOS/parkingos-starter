// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import {router} from './router/index';
import './libs/axiosService';
import qs from 'qs';
import QRCode from 'qrcode';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import 'parkingos-ui/lib/parkingos-ui.css'
import '@/styles/index.scss'
import scroll from 'vue-seamless-scroll';
import math from 'mathjs';
import common from './libs/common';
Vue.use(scroll);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$qs = qs;
Vue.prototype.$math = math;
Vue.prototype.QRCode=QRCode;
Vue.prototype.common=common;
//封面图片以及logo图片
Vue.prototype.$atlas = require('./libs/config').parkingOs;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
