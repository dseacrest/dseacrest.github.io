<template>
    <div class="o-register">
        <form action="#" @submit.prevent="submit" class="o-register__form">
        <h2>Register</h2>
        
        <div class="o-register__form__item -name">
            <label for="name">Name</label>
            <div>
            <q-input
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

        <div class="o-register__form__item -email">
            <label for="email">Email</label>
            <div>
            <q-input
                id="email"
                type="email"
                class="o-register__formItem__formControl -email"
                name="email"
                value
                required
                v-model="form.email"
            />
            </div>
        </div>

        <div class="o-register__form__item -password">
            <label for="password">Password</label>
            <div>
            <q-input
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
            <q-btn color="white" type="submit" class="btn btn-primary text-black">Register</q-btn>
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
.o-register {
    display: flex;
    justify-content: center;
    &__form {
        width: 350px;
        &__item {
            padding: 10px;
        }
    }
}
</style>