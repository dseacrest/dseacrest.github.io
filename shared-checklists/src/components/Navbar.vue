<template>
    <div id="nav">
        <h5 v-if="user.loggedIn">
            <router-link to="/">Home</router-link> |
            <router-link to="/upload" v-if="user.data.uid === `yPeXhzXz9GSUoEJktjsZnDsIokG3`">Upload</router-link><span v-if="user.data.uid === `yPeXhzXz9GSUoEJktjsZnDsIokG3`"> | </span>
            <a class="nav-link" @click.prevent="signOut">Sign out</a>
        </h5>
        <h5 v-else>
            <router-link to="/">Home</router-link> |
            <router-link to="/login">Login</router-link> |
            <router-link to="/register">Register</router-link>
        </h5>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import { mapGetters } from "vuex";
import firebase from "firebase";

@Component
export default class NavBar extends Vue {

  public get user() {
		return this.$store.getters.user;
  }
  
  public signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.replace({
          name: "home"
        });
      });
  }
};
</script>

<style lang="scss">
@import '@/styles/quasar.variables.scss';

h5 a {
    text-decoration: none;
}

#nav {
  padding: 20px;

  a {
    font-weight: bold;
    color: $secondary;

    &.router-link-exact-active {
      color: $accent;
    }
  }
}
</style>