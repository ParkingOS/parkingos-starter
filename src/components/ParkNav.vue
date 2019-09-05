<!--
  以车场权限为例
  左边导航栏
  依赖于element ui  [ NavMenu ]
-->
<style lang="scss" scoped>
  .parking-menu-wrapper{
    width: 160px;
  }
</style>
<template>
  <el-aside class="parking-menu-wrapper">
    <el-scrollbar :native="true">
      <div style="height: 500px">
        <el-menu class="parkingos-menu"
                 unique-opened
                 text-color="#fff"
                 active-text-color="#64C0FF"
                 :default-active="highlightIndex"
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
      </div>
    </el-scrollbar>
  </el-aside>

</template>
<script>
  export default {
    data(){
      return {
        highlightIndex:''
      }
    }
  }
</script>
