<template>
    <div class="o-navbar">
        <div class="o-navbar__logo" >
            <a @click="navigateHome()" class="o-navbar__logo__home">Home</a>
            <a @click="navigateWhy()" class="o-navbar__logo__why">Getting Started</a>
            <WhyDocumentDialog />
        </div>
        <div class="o-navbar__loggedIn" v-if="user.loggedIn">
            <div class="o-navbar__loggedIn__filter q-pa-md">
                <div class="q-gutter-md col">
                <q-select
                    v-model="selectedFilter"
                    use-input
                    hide-selected
                    fill-input
                    dark
                    label="Topic Filter"
                    input-debounce="0"
                    :options="options"
                    class="o-navbar__loggedIn__filter__select"
                    v-if="!['todo', 'notecards'].includes($route.name)"
                >
                    <template v-slot:no-option>
                    <q-item>
                        <q-item-section class="text-grey">
                        No results
                        </q-item-section>
                    </q-item>
                    </template>
                </q-select>
                </div>
            </div>
            <a class="o-navbar__loggedIn__signOut" @click.prevent="signOut">Sign out</a>
        </div>
        <div class="o-navbar__loggedOut"  v-else>
            <a @click="navigateLogin()" class="o-navbar__loggedOut__login">Login</a>
            <a @click="navigateRegister()" class="o-navbar__loggedOut__register">Register</a>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import { mapGetters } from "vuex";
import firebase from "firebase";
import HomePageViewModule from '../store/application/HomePageViewModule';
import router from '@/router/index';
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';
import WhyDocumentDialog from '@/components/WhyDialog.vue';

@Component({
    components: {
        WhyDocumentDialog,
    }
})
export default class NavBar extends Vue {

    public get user() {
            return this.$store.getters.user;
    }
    
    public navigateHome() {
        HomePageViewModule.clearTopicFilter();
        router.push({name: 'home'});
    }

    public navigateWhy() {
        HomePageViewModule.loadPromptWhyDocumentDialog(true);
    }

    public navigateLogin() {
        HomePageViewModule.clearTopicFilter();
        router.push({name: 'login'});
    }

    public navigateRegister() {
        HomePageViewModule.clearTopicFilter();
        router.push({name: 'register'});
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

    public get selectedFilter() {
        return HomePageViewModule.documentTopic;
    }

    public set selectedFilter(value: string) {
        HomePageViewModule.loadTopicFilter(value);
    }

    public get options() {
        return HomePageViewModule.documentTopics;
    }
};
</script>

<style lang="scss">
@import '@/styles/quasar.variables.scss';

.o-navbar {
    display: flex;
    height: 140px;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 30px 0px;
    background-image: url("../assets/header.png");
    &__logo {
        font-size: 1.75em;
        font-weight: bold;
        &__home {
            margin-left: 40px;
            color: $primary;
        }
        &__why {
            margin-left: 65px;
            color: white;
        }
    }
    &__loggedIn {
        display: flex;
        font-weight: bold;
        &__filter {
            &__select {
                width: 450px;   
            }
        }
        &__signOut {
            font-size: 1.75em;
            color: white;   
            align-self: center;
            margin-left: 20px;
        }
    }
    &__loggedOut {
        font-weight: bold;
        font-size: 1.75em;
        color: white;
        & a {
            padding: 10px;
        }
    }
    background-color: $primary;
    a {
        text-decoration: none;

        &.router-link-exact-active {
        color: secondary;
        }
    }
}

@media (max-width: 1100px) {
    .o-navbar {
        &__logo {
            font-size: 1em;
                &__home {
            margin-left: 55px;
        }
        &__why {
            margin-left: 50px;
        }
        }
        &__loggedIn {
            &__signOut {
                font-size: 1em;
            }
            &__filter {
                &__select {
                    width: 100px;
                }
            }
        }
        &__loggedOut {
            font-size: 1em;
        }
    }
}
</style>