<template>
  <div id="app">
    <navbar></navbar>
    <actionnavbar></actionnavbar>
    <main class="py-4">
        <router-view></router-view>
    </main>
  </div>
</template>

<script>
import navbar from "./components/Navbar.vue";
import actionnavbar from "./components/ActionNavbar.vue";
export default {
  components: {
    navbar,
    actionnavbar,
  }
};
</script>

<style lang="scss">
@import '/styles/quasar.variables.scss';

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dark;
}
</style>
