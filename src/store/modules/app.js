
var gwh = function(_h){
  let h = 0;
  if (window.innerHeight) {
    h = window.innerHeight;
  } else {
    h = document.documentElement.offsetHeight || document.body.clientHeight || 0;
  }

  h = h < _h ? _h : h;
  return parseInt(h);
};
const app = {
  state:{
    screenPower:false,
    menuList:[],
    openedsArr:[],
    tableMaxHeight:'auto',
    nickname:''
  },
  mutations:{
    setScreenPower:function (state,no) {
      state.screenPower = no;
    },
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

      //车场用户名赋值
      let user = sessionStorage.getItem('user');
      user = JSON.parse(user);
      let maxLength1 = user.nickname.length;//管理员名称
      let maxLength2 = user.name.length;
      let sysUserName = maxLength1>10?user.nickname.slice(0,10)+'...':user.nickname;
      let nickname = maxLength2>20?user.name.slice(0,20)+'...':user.name;
      state.nickname = nickname+':'+sysUserName;

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
        state.tableMaxHeight = gwh() - (148+_height)
      }else{
        state.tableMaxHeight = gwh() - 300;
      }

    }
  }
};
export default app;
