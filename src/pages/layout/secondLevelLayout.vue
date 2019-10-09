<template>
  <section class="app-main2">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>


  export default {
        name: "secondLevelLayout",
        components: {},
        data(){
          return {

          }
        },
    computed: {
      key() {
        return this.$route.fullPath
      }
    },
        mounted(){
        }
    }
</script>

<style scoped>
  .app-main2 {
    /*84 = navbar + tags-view = 50 +34 */
    min-height: calc(100vh - 61px);
    width: calc(100vw - 160px);
    position: relative;
    right: 0;
    left: 0;
    overflow: hidden;
  }
</style>
