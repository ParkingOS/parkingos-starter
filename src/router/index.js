import Vue from 'vue'
import VueRouter from 'vue-router'
import { routers } from './router'
import store from '../store';

Vue.use(VueRouter);

const RouterConfig = {
  routes:routers
};

export const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
  next();
});
router.afterEach((to) => {
  window.scrollTo(0, 0);
});

// import LoginCloud from '@/pages/LoginCloud';
// import Layout from '@/pages/layout/Layout'
// import { DataCenterPark, RemoteOpening, OrderManageOrders, OrderManageOrderDetail, OrderManagePoles } from 'parkingos-ui'
// Vue.use(Router);
//
// export default new Router({
//   scrollBehavior: () => ({ y: 0 }),
//   routes: [
//     {
//       path:'/',
//       component:LoginCloud
//     },
//     {
//       path: '/',
//       component: Layout,
//       children:[{
//         path:'dataCenter_Park',
//         component:DataCenterPark,
//       },{
//         path:'dataCenter_RemoteOpening',
//         component:RemoteOpening,
//       },]
//     },
//     {
//       path: '/',
//       component: Layout,
//       children:[{
//         path:'orderManage_Orders',
//         component:OrderManageOrders,
//       },{
//         path:'orderManage_OrderDetail',
//         component:OrderManageOrderDetail,
//       },{
//         path:'orderManage_Poles',
//         component:OrderManagePoles,
//       },]
//     },
//   ]
// })
