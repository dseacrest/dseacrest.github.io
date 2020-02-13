<template>
<div class="o-login">
    <form action="#" @submit.prevent="submit" class="o-login__form">
        <h2>Login</h2>
        <div class="o-login__form__item -email">
            <label for="email">Email</label>
            <div>
            <q-input
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

        <div class="o-login__form__item -password">
            <label for="password" >Password</label>
            <div>
            <q-input
                id="password"
                type="password"
                class="form-control"
                name="password"
                required
                v-model="form.password"
            />
            </div>
        </div>

        <div class="o-login__form__item -button">
            <div>
                <q-btn color="white" type="submit" class="btn btn-primary text-black">Login</q-btn>
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
.o-login {
    display: flex;
    justify-content: center;
    &__form {
        width: 450px;
        &__item {
            padding: 10px;
        }
    }
}
</style>