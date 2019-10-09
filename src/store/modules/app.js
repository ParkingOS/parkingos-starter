import parkingosCommon from 'parkingos-common'; //公共common
const common = parkingosCommon.COMMON;

const app = {
  state:{
    menuList:[],
    openedsArr:[],
    tableMaxHeight:'auto',
  },
  mutations:{
// 接受前台数组，刷新菜单
    updateMenuList(state, routes) {
      state.menuList = routes;
    },
    refreshView(state){
      let routes = sessionStorage.getItem('menuList');
      if(routes){
        routes = JSON.parse(routes);
        state.menuList = routes;
      }
    },
    defaultOpeneds(state,item){
      let currentItem = [];
      if(item.indexOf(',')>0){
        currentItem = item.split(',');
      }else{
        currentItem = [item]
      }
      state.openedsArr = currentItem;
    },
    updateTableMaxHeight(state){
      var currentHeight = document.getElementById('consoleCurrentHeight');
      var _height = currentHeight.offsetHeight;
      if(_height != undefined){
        state.tableMaxHeight = common.gwh() - (148+_height)
      }else{
        state.tableMaxHeight = common.gwh() - 300;
      }

    }
  }
};
export default app;
