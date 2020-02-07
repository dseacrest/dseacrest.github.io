<template>
<div class="o-login">
  <h2>Login</h2>
  <form action="#" @submit.prevent="submit" class="o-login__form">
    
    <div class="o-login__formItem -email">
      <label for="email">Email</label>
      <div>
        <input
          id="email"
          type="email"
          class="form-control"
          name="email"
          value
          required
          autofocus
          v-model="form.email"
        />
      </div>
    </div>

    <div class="o-login__formItem -password">
      <label for="password" >Password</label>
      <div>
        <input
          id="password"
          type="password"
          class="form-control"
          name="password"
          required
          v-model="form.password"
        />
      </div>
    </div>

    <div class="o-login__formItem -button">
      <div>
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </div>

    <div v-if="error" class="o-login__formItem -error alert alert-danger">{{error}}</div>

  </form>

</div>
</template>

<script lang="ts">
import firebase from "firebase";
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  public form = {
    email: "",
    password: ""
  }
    
  public error = null;
  
  public submit() {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
            this.$router.replace({ name: "home" });
        })
        .catch(err => {
            this.error = err.message;
        });
        this.$gtag.event('login', {event_category: `${this.form.email} logged in.`, event_label: '', value: 0} );

    }
}
</script>

<style lang="scss">
.o-login__formItem {
  margin-bottom: 20px;
}
</style>