<template>
    <div class="o-navbar">
        <div class="o-navbar__logo" >
            <router-link to="/">Checklists</router-link>
        </div>
        <div class="o-navbar__loggedIn" v-if="user.loggedIn">
            <a class="nav-link" @click.prevent="signOut">Sign out</a>
        </div>
        <div class="o-navbar__loggedOut"  v-else>
            <router-link to="/login">Login</router-link> |
            <router-link to="/register">Register</router-link>
        </div>
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

.o-navbar {
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 30px;
    background-image: url("../assets/header.png");
    &__logo {
        font-size: 2em;
        font-weight: bold;
        color: white;
    }
    &__loggedIn {
        font-size: 1.5em;
    }
    &__loggedOut {
        font-size: 1.5em;
    }
    background-color: $primary;
    a {
        text-decoration: none;
        color: white;

        &.router-link-exact-active {
        color: secondary;
        }
    }
}
</style>