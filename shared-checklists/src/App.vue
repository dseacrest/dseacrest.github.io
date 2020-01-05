<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/upload">Upload</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import '/styles/quasar.variables.scss';

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dark;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $secondary;

    &.router-link-exact-active {
      color: $accent;
    }
  }
}
</style>
