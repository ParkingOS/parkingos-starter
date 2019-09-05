<!--
  以车场权限为例
  左边导航栏
  依赖于element ui  [ NavMenu ]
-->
<style lang="scss" scoped>

</style>
<template>
    <el-scrollbar :native="true" wrap-class="scrollbar-wrapper">
        <el-menu
           unique-opened
           text-color="#fff"
           active-text-color="#64C0FF"
           :default-active="$route.path"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
    </el-scrollbar>

</template>
<script>

  export default {
    name:'index',
    data(){

    }
  }
</script>
