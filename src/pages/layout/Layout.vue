<template>
    <div class="app-wrapper">

      <headerbar />
      <sidebar class="sidebar-container"/>
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
        }
    }
</script>

<style scoped>

</style>
