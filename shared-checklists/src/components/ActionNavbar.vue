<template>
    <div class="o-actionNavbar">
        <q-btn class="o-actionNavbar__addChecklist" flat dense @click="addDocumentDialog()" v-if="user.loggedIn">Add Checklist</q-btn>
        <!-- Add Checklist Dialog. -->
		<div class="o-actionNavbar__addDocumentDialog q-pa-md q-gutter-md">
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
import HomePageViewModule from '../store/application/HomePageViewModule';
import AddDocumentDialog from '@/components/AddDocumentDialog.vue';

@Component({
    components: {
        AddDocumentDialog,
    }
})
export default class ActionNavbar extends Vue {
    public addDocumentDialog() {
        HomePageViewModule.loadPromptAddDocumentDialog(true);
    }

    public get user() {
            return this.$store.getters.user;
    }

    public get topics() {
        return HomePageViewModule.documentTopics;
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
    justify-content: flex-end;
    align-items: center;
    padding: 0 16px 10px 30px;
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