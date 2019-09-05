<!--
  以车场权限为例
  左边导航栏
  依赖于element ui  [ NavMenu ]
-->

<template>
  <el-scrollbar :native="true" wrap-class="scrollbar-wrapper">

    <el-menu
      unique-opened
      :collapse-transition="true"
      text-color="#fff"
      active-text-color="#64C0FF"
      :default-active="$route.path"
      :router="true"
      class="parkingos-menu"
    >
      <el-submenu index="/data">
        <template slot="title">
          <span>数据中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/dataCenter_Park">数据中心</el-menu-item>
          <el-menu-item index="/dataCenter_RemoteOpening">车道监控</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
      <el-submenu index="/orderManage">
        <template slot="title">
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/orderManage_Orders">订单记录</el-menu-item>
          <el-menu-item index="/orderManage_Poles">抬杆记录</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
    </el-menu>
  </el-scrollbar>

</template>
<script>

  export default {
    name:'Sidebar',
    data(){
      return {

      }
    }
  }
</script>
