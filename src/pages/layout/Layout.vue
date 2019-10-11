<template>
    <div class="app-wrapper">

      <headerbar :nickname="nickname"  />
      <sidebar :menu-list="menuList" class="sidebar-container"/>
      <app-main />

    </div>
</template>

<script>
  import { Headerbar, Sidebar, AppMain } from "./components";

  export default {
        name: "Layout",
        components: {
          Headerbar,
          Sidebar,
          AppMain
        },
        data(){
          return {

          }
        },
        computed:{
          menuList() {
            return this.$store.state.app.menuList;
          },
          nickname() {
            return this.$store.state.app.nickname;
          }
        },
        mounted(){
          this.$store.commit('refreshView');
        }
    }
</script>

<style scoped>

</style>
