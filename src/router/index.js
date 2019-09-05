import Vue from 'vue'
import Router from 'vue-router'

import LoginCloud from '@/pages/LoginCloud';
import Layout from '@/pages/layout/Layout'
import { DataCenterPark, RemoteOpening, OrderManageOrders, OrderManageOrderDetail, OrderManagePoles } from 'parkingos-ui'
Vue.use(Router);

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path:'/',
      component:LoginCloud
    },
    {
      path: '/',
      component: Layout,
      children:[{
        path:'dataCenter_Park',
        component:DataCenterPark,
      },{
        path:'dataCenter_RemoteOpening',
        component:RemoteOpening,
      },]
    },
    {
      path: '/',
      component: Layout,
      children:[{
        path:'orderManage_Orders',
        component:OrderManageOrders,
      },{
        path:'orderManage_OrderDetail',
        component:OrderManageOrderDetail,
      },{
        path:'orderManage_Poles',
        component:OrderManagePoles,
      },]
    },
  ]
})
