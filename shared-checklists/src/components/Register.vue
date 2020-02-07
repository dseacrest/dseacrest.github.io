<template>
  <div class="o-register">
    <h2>Register</h2>
    <form action="#" @submit.prevent="submit">
      
      <div class="o-register__formItem -name">
        <label for="name">Name</label>
        <div>
          <input
            id="name"
            type="name"
            class="o-register__formItem__formControl -name"
            name="name"
            value
            required
            autofocus
            v-model="form.name"
          />
        </div>
      </div>

      <div class="o-register__formItem -email">
        <label for="email">Email</label>
        <div>
          <input
            id="email"
            type="email"
            class="o-register__formItem__formControl -email"
            name="email"
            value
            required
            autofocus
            v-model="form.email"
          />
        </div>
      </div>

      <div class="o-register__formItem -password">
        <label for="password">Password</label>
        <div>
          <input
            id="password"
            type="password"
            class="o-register__formItem__formControl -password"
            name="password"
            required
            v-model="form.password"
          />
        </div>
      </div>

      <div class="o-register__formItem -button">
          <button type="submit">Register</button>
      </div>

      <div class="o-register__formItem -error alert alert-danger" v-if="error">
        {{error}}
      </div>

    </form>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Register extends Vue {
  public form = {
        name: "",
        email: "",
        password: ""
  }
  public error = null;

  public submit() {
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
            if (data.user) {
            data.user
                .updateProfile({
                displayName: this.form.name
                })
                .then(() => {
                this.$router.replace({ name: "home" });
        })
            }
        })
        .catch(err => {
            this.error = err.message;
        });
        this.$gtag.event('sign_up', {event_category: `${this.form.name} signed up.`, event_label: '', value: 0} );
    }

};
</script>

<style lang="scss">
.o-register__formItem {
  margin-bottom: 20px;
}
</style>