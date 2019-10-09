<!--
  以车场权限为例
  左边导航栏
  依赖于element ui  [ NavMenu ]
-->
<style lang="scss" scoped>

</style>
<!--
  以车场权限为例
  左边导航栏
  依赖于element ui  [ NavMenu ]
-->

<template>
  <el-scrollbar :native="true" wrap-class="scrollbar-wrapper">

    <el-menu
      ref="sideMenu"
      unique-opened
      :collapse-transition="true"
      text-color="#fff"
      active-text-color="#64C0FF"
      :default-active="defaultActive"
      class="parkingos-menu"
    >
      <menu-item :menuList="menuList"></menu-item>
    </el-menu>
  </el-scrollbar>

</template>
<script>
  import menuItem from './menuItem'
  export default {
    name: 'my-nav',
    components:{
      'menu-item':menuItem
    },
    props: {
      menuList: {
        type: Array,
        default: function() {
          return []
        }
      }
    },
    data(){
      return {

      }
    },
    computed:{
      defaultActive() {
        let arr = this.$route.path.split('/').reverse();
        if(arr.length === 3){
          return arr[1]
        }else{
          return arr[0]
        }
      }
    },
    mounted(){
    },

    activated(){

    },
    watch: {

    }
  }
</script>
