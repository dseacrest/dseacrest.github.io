<template>
    <div class="o-navbar">
        <div class="o-navbar__logo" >
            <a @click="navigateHome()" class="o-navbar__logo__home">Home</a>
            <a @click="navigateWhy()" class="o-navbar__logo__why" v-if="$q.platform.is.desktop">About</a>
            <WhyDocumentDialog />
        </div>
        <div class="o-navbar__loggedIn" v-if="user.loggedIn">
            <div class="o-navbar__loggedIn__filter q-pa-md">
                <div class="q-gutter-md col">
                <q-select
                    :value="model"
                    use-input
                    fill-input
                    hide-selected
                    input-debounce="0"
                    dark
                    color="accent"
                    @filter="filterFn"
                    @input="setModel"
                    label="Search or Filter"
                    :options="options"
                    class="o-navbar__loggedIn__filter__select"
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
import HomeViewModule from '@/store/view/HomeViewModule';
import router from '@/router/index';
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';
import WhyDocumentDialog from '@/components/WhyDialog.vue';
import {Loading} from 'quasar';
import { ITopicFilter } from '../models/document';

@Component({
    components: {
        WhyDocumentDialog,
    }
})
export default class NavBar extends Vue {
    public model: any = null;
    public options: any = HomeViewModule.documentSearchTopics;

    public get user() {
            return this.$store.getters.user;
    }
    
    public navigateHome() {
        HomeViewModule.clearTopicFilter();
        if(!['home'].includes(this.$route.name || '')) {
            router.push({name: 'home'});
        }
    }

    public navigateWhy() {
        HomeViewModule.loadPromptWhyDocumentDialog(true);
    }

    public navigateLogin() {
        router.push({name: 'login'});
    }

    public navigateRegister() {
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

    public setModel(val: any) {
        this.navigateHome();
        this.model = val;
        HomeViewModule.loadTopicFilter(val);
    }

    public filterFn(val: string, update: ((cb: (() => void)) => void), abort: any) {
        update(() => {
            const needle = val.toLocaleLowerCase();
            this.options = HomeViewModule.documentSearchTopics.filter((v) => v.toLocaleLowerCase().indexOf(needle) > -1);
        });
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
            margin-left: 75px;
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
    background-image: url("../assets/logo-mobile.png");
        &__logo {
            font-size: 1.75em;
                &__home {
            margin-left: 15px;
        }
        &__why {
            margin-left: 25px;
        }
        }
        &__loggedIn {
            &__signOut {
                font-size: 1.75em;
            }
            &__filter {
                &__select {
                    width: 250px;
                }
            }
        }
        &__loggedOut {
            font-size: 1.75em;
        }
    }
}

@media (max-width: 700px) {
    .o-navbar {
    background-image: url("../assets/logo-mobile.png");
        &__logo {
            font-size: 1.5em;
                &__home {
            margin-left: 17px;
        }
        &__why {
            margin-left: 15px;
        }
        }
        &__loggedIn {
            &__signOut {
                font-size: 1em;
            }
            &__filter {
                &__select {
                    width: 120px;
                }
            }
        }
        &__loggedOut {
            font-size: 1em;
        }
    }
}
</style>