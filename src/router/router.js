import LoginCloud from '@/pages/LoginCloud';
import { MonitorApp,DataScreen} from 'parkingos-ui'
import { adminRouter,adminOtherRouter} from "./subAuth/adminRouter";
import { parkOtherRouter,parkRouter } from "./subAuth/parkRouter";
import { cityRouter,cityOtherRouter } from "./subAuth/cityRouter";
import { unionRouter,unionOtherRouter } from "./subAuth/unionRputer";
import { serverRouter,serverOtherRouter } from "./subAuth/serverRouter";
import { shopRouter } from "./subAuth/shopRouter";

export const loginRouter = {
  path:'/loginCloud',
  name:'login',
  meta:{
    title:'Login - 登录'
  },
  component:LoginCloud
};
export const appRouter = {

};
export const fullRouter = [
  {
    path:'/monitorApp',
    title:'中央监控',
    name:'monitorApp',
    component:MonitorApp
  },
  {
    path:'/dataScreen',
    title:'数据大屏',
    name:'数据大屏',
    component:DataScreen
  },
];


export const routers = [
  loginRouter,
    parkOtherRouter,
    ...fullRouter,
    ...parkRouter,
     ...cityRouter,
  cityOtherRouter,
  ...unionRouter,
  unionOtherRouter,
  ...shopRouter,
  ...serverRouter,
  serverOtherRouter,
  ...adminRouter,
  adminOtherRouter
];
