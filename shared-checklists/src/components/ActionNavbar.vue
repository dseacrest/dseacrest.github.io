<template>
<div>
    <div class="o-actionNavbar">
        <q-btn class="o-actionNavbar__back" flat dense @click="navigateBack()" v-if="user.loggedIn">Back</q-btn>
        <q-btn class="o-actionNavbar__addChecklist" flat dense @click="addDocumentDialog()" v-if="user.loggedIn">Add Checklist</q-btn>
    </div>
    <!-- Add Checklist Dialog. -->
    <div class="o-actionNavbar__addDocumentDialog">
        <AddDocumentDialog />
    </div>
</div>

</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import { mapGetters } from "vuex";
import firebase from "firebase";
import "../registerServiceWorker";
import Routes from '@/router/index';
import router from '@/router/index';
import HomeViewModule from '@/store/view/HomeViewModule';
import AddDocumentDialog from '@/components/AddDocumentDialog.vue';

@Component({
    components: {
        AddDocumentDialog,
    }
})
export default class ActionNavbar extends Vue {
    public addDocumentDialog() {
        HomeViewModule.loadPromptAddDocumentDialog(true);
    }

    public navigateBack() {
        router.go(-1);
    }

    public get user() {
            return this.$store.getters.user;
    }

    public get topics() {
        return HomeViewModule.documentSearchTopics;
    }

};
</script>

<style lang="scss">
@import '@/styles/quasar.variables.scss';

.q-pt-none {
    margin-bottom: 20px;
}

.o-actionNavbar {
    display: flex;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px 10px 100px;
    background-color: $secondary;
    a {
        text-decoration: none;
        color: white;

        &.router-link-exact-active {
        color: $secondary;
        }
    }
}
</style>