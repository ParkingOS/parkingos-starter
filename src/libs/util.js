import { parkRouter } from "../router/subAuth/parkRouter";
import { cityRouter } from "../router/subAuth/cityRouter";
import { unionRouter } from "../router/subAuth/unionRputer";
import { shopRouter } from "../router/subAuth/shopRouter";
import { serverRouter } from "../router/subAuth/serverRouter";
import {adminRouter} from "../router/subAuth/adminRouter";

let util = {};
util.title = function (title) {
  title = title || '智慧停车云';
  window.document.title = title;
};
//获取登录的角色
util.judgeLoginRoleAuth = function(vm,user){
  let currentAuthObj = {};
  let currentAuth = vm.$Authority;

  let roleIdObj = currentAuth.ROLE_ID;
  let roleIdItem = user.oid;
  let currentLoginRole = undefined;
  for(let item in roleIdObj){
    if(roleIdObj[item] === roleIdItem ){
      currentLoginRole = item;
    }
  }

  if(currentLoginRole === 'PARK'){
    currentAuthObj = {
      'currentLoginRole':currentLoginRole,
      'authIdObj':currentAuth.AUTH_ID,
      'showItemConst':currentAuth.showParkItem_const,
      'currentRouter':parkRouter,
    }
  }else if(currentLoginRole === 'UNION'){
    currentAuthObj = {
      'currentLoginRole':currentLoginRole,
      'authIdObj':currentAuth.AUTH_ID_UNION,
      'showItemConst':currentAuth.showUnionItem_const,
      'currentRouter':unionRouter,
    }
  }else if(currentLoginRole === 'CITY'){
    currentAuthObj = {
      'currentLoginRole':currentLoginRole,
      'authIdObj':currentAuth.AUTH_ID_CITY,
      'showItemConst':currentAuth.showCityItems_const,
      'currentRouter':cityRouter,
    }
  }else if(currentLoginRole === 'SHOP'){
    currentAuthObj = {
      'currentLoginRole':currentLoginRole,
      'authIdObj':currentAuth.AUTH_ID_SHOP,
      'showItemConst':currentAuth.showShopItem_const,
      'currentRouter':shopRouter,
    }
  }else if(currentLoginRole === 'SERVER'){
    currentAuthObj = {
      'currentLoginRole':currentLoginRole,
      'authIdObj':currentAuth.AUTH_ID_SERVER,
      'showItemConst':currentAuth.showServerItems_const,
      'currentRouter':serverRouter,
    }
  }else if(currentLoginRole === 'BOSS'){
    currentAuthObj = {
      'currentLoginRole':currentLoginRole,
      'authIdObj':undefined,
      'showItemConst':undefined,
      'currentRouter':adminRouter,
    }
  }

  else{
    return false;
  }

  return currentAuthObj
};
util.pageShow = function(authlist,pageNo){
  for(let i of authlist){
    if(pageNo === i.auth_id){
      return true;
    }
  }
  return false;
};
//获取当前的权限列表
util.getCurrentAuth = function(vm){
  let user = sessionStorage.getItem('user');
  if(user){
    user = JSON.parse(user);
  }else{
    alert('请先登录');
    return false;
  }
  let authList = user['authlist'];

  let currentAuthObj = util.judgeLoginRoleAuth(vm,user);
  let currentAuthIdObj = undefined;
  let currentShowItem = undefined;
  if(currentAuthObj){
    currentAuthIdObj = currentAuthObj.authIdObj;
    currentShowItem = currentAuthObj.showItemConst;
  }

//  便历重置变量状态
  for(let item in currentShowItem){
    for(let authid in currentAuthIdObj){
      if(authid === item){
        currentShowItem[item] =  util.pageShow(authList,currentAuthIdObj[authid]);
      }
    }
  }

  return  currentAuthObj;
};
//更新路由json数据
util.assembleObj = function (currentShowItem,routerItem){
  //先判断单项有没有[mate]
  if(routerItem.meta){
    //便历权限列表
    for(let item in currentShowItem.showItemConst){
      //路由权限和权限列表进行对比
      if(routerItem.meta.authority && routerItem.meta.authority === item ){
        if(currentShowItem.showItemConst[item]){
          routerItem.meta.hidden = false;
          if(routerItem.children && routerItem.children.length>0){
            for(let childrenItem of routerItem.children){
              util.assembleObj(currentShowItem,childrenItem)
            }
          }
        }else{
          routerItem.meta.hidden = true;
        }
      }
    }
  }
  return routerItem;
};
util.routerFilter = function(currentRouter){
  let currentArr = JSON.parse(JSON.stringify(currentRouter));
  let itemFilter = currentArr.filter(item=>{return  item.meta.hidden == false})

  if(itemFilter &&itemFilter.length>0){
    for(let item of itemFilter){
      if(item.children && item.children.length > 0){
        item.children = item.children.filter(item=> item.meta.hidden == false)
      }
    }
  }else{
    return [];
  }
  return itemFilter;
};
//初始化页面路由
util.initRouter = function (vm) {
  //获取当前的路由权限
  let currentShowItem = util.getCurrentAuth(vm);
  for(let routerItem of currentShowItem.currentRouter){
    util.assembleObj(currentShowItem,routerItem)
  }

  sessionStorage.setItem('showParkItem',JSON.stringify(currentShowItem.showItemConst));
  let itemFilter = util.routerFilter(currentShowItem.currentRouter);
  if(itemFilter&&itemFilter.length>0){
    sessionStorage.setItem('menuList',JSON.stringify(itemFilter));
    vm.$store.commit('updateMenuList',itemFilter);
  }else{
    alert('无此权限');
    return false;
  }
  return itemFilter;
};

export default util;
