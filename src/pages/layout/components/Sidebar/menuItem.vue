<template>
  <div>
    <template v-for="item in menuList">
      <el-submenu :index="item.name" v-if="(item.children && item.children.length>1) || (item.children && item.children.length === 1 && !item.onlyOne)" :key="item.name">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item-group>
          <menu-item :menuList="item.children" style="margin-left: 8px"></menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item @click="gotoRoute(item.children[0])" :key="item.children[0].name" :index="item.children[0].name" v-else-if="item.children && item.children.length === 1">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.children[0].title}}</span>
        </template>
      </el-menu-item>
      <el-menu-item @click="gotoRoute(item)" :key="item.name" :index="item.name" v-else>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
    export default {
        name: "menu-item",
        props:{
          menuList: {
            type: Array,
            default: function() {
              return []
            }
          }
        },
        methods:{
          gotoRoute(item){
            // console.log('name--->',item);
            if(item.target === '_blank'){
              let routeData = this.$router.resolve({
                name: item.targetName,
              });
              window.open(routeData.href, '_blank');
            }else{
              this.$router.push({
                path:item.path
              });
            }
          }
        },
    }
</script>

<style scoped>

</style>
