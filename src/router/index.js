import Vue from 'vue'
import VueRouter from 'vue-router'
import { routers } from './router'
import axios from 'axios';
import store from '../store';
Vue.use(VueRouter);

const RouterConfig = {
  routes:routers
};


/**
 *
 * @date 20190404
 * @author: cyz
 * @describe:百度流量统计
 */

var _hmt = _hmt || [];
window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?c7e225d3f79576d85cfd59703506510f";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();


export const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {

  //把页面推送给百度统计
  if (_hmt) {
    if (to.path) {
      // eslint-disable-next-line
      _hmt.push(['_trackPageview', '/#' + to.fullPath]);
    }
  }

  //NProgress.start();
  let state = store.state.app.screenPower;
  if (to.path == '/loginCloud') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/loginCloud') {
    next({ path: '/loginCloud' });
  }
  else if(!(from.path == '/') && to.path == '/dataScreen'){
    next({ path: '/loginCloud' });
  }
  else {
    if((from.path == '/') && to.path == '/dataScreen'){
      axios.get('/bigscreen/getstate',{params:{
          'comid':sessionStorage.getItem('comid')
        }}).then((response)=> {
        if(response.status == 200){
          let data = response.data;
          if(data.state ==0){
            next({ path: '/loginCloud' });
          }else{next();}
        }
      }).catch((error)=>{
        alert('请求错误')
      })
    }else{
      next();
    }

  }
});
router.afterEach((to) => {
  window.scrollTo(0, 0);
});

