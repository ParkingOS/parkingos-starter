// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import '@/styles/common-variables.scss'
import App from './App'
import {router} from './router/index';
import axios from 'axios'
import qs from 'qs';
import QRCode from 'qrcode';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import 'parkingos-ui/lib/parkingos-ui.css'
import '@/styles/index.scss'
import scroll from 'vue-seamless-scroll';
import math from 'mathjs'
Vue.use(scroll);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$qs = qs;
Vue.prototype.$axios=axios;
Vue.prototype.$math = math;
Vue.prototype.QRCode=QRCode;

/**
 * 分环境引用不同的请求接口
 * 分环境引有不同的权限
 * 挂载到vue prototype 下
 */

import parkingosCommon from 'parkingos-common'; //公共common
const common = parkingosCommon.COMMON;
common.setBaseUrl('http://test.bolink.club/cloud');
let ApiUrl = {
  path:'http://test.bolink.club/cloud',
  path2:'https://test.bolink.club',
  server:'http://test.bolink.club',
  bolinkPath:'https://beta.bolink.club/web'
};
let Authority = undefined;

if (process.env.NODE_ENV == 'production') { //生产环境走的地址
  axios.defaults.baseURL = 'http://yun.bolink.club/cloud';
  ApiUrl = {
    path:'http://yun.bolink.club/cloud',
    path2:'https://yun.bolink.club',
    server:'http://yun.bolink.club',
    bolinkPath:'https://s.bolink.club/web',
    percision:2
  };
  Authority = parkingosCommon.CONSTYUN //开发完，替换成parkingosCommon.CONSTYUN
}else{
  axios.defaults.baseURL = 'http://test.bolink.club/cloud';
  ApiUrl = {
    path:'http://test.bolink.club/cloud',
    path2:'https://test.bolink.club',
    server:'http://test.bolink.club',
    bolinkPath:'https://beta.bolink.club/web',
    percision:5
  };
  Authority = parkingosCommon.CONSTEST //开发完，替换成parkingosCommon.CONSTEST
}

Vue.prototype.$ApiUrl= ApiUrl;
Vue.prototype.$Authority = Authority;

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
