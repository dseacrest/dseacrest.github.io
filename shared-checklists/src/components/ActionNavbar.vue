<template>
    <div class="o-actionNavbar">
        <div class="o-actionNavbar__adminLoggedIn" v-if="user.data.uid === adminId">
            <q-btn class="o-actionNavbar__adminLoggedIn__btn" flat dense @click="addDocumentDialog()">Add Checklist</q-btn>
        </div>
        <div class="o-actionNavbar__adminLoggedOut"  v-else>
            
        </div>

        <!-- Todo: Put in component. -->
		<div class="o-actionNavbar__addDocumentDialog q-pa-md q-gutter-md">
			<q-dialog v-model="prompt" persistent>
			<q-card style="min-width: 400px; padding: 10px;">
				<q-card-section>
				    <div class="text-h6">When You're...</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
				    <q-input dense v-model="documentName" autofocus @keyup.enter="prompt = false" />
				</q-card-section>

                <q-card-section>
				    <div class="text-h6">Topic</div>
				</q-card-section>

                <q-card-section class="q-pt-none">
				    <q-input dense v-model="documentTopic" @keyup.enter="prompt = false" />
				</q-card-section>

                <q-card-section>
				    <div class="text-h6">Credit</div>
				</q-card-section>

                <q-card-section class="q-pt-none">
				    <q-input dense v-model="documentCredit" @keyup.enter="prompt = false" />
				</q-card-section>

				<q-card-actions align="right" class="text-primary">
				<q-btn flat label="Cancel" v-close-popup />
				<q-btn flat label="Add Checklist" v-close-popup @click="addDocument()"/>
				</q-card-actions>
			</q-card>
			</q-dialog>
		</div>

    </div>


</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import { mapGetters } from "vuex";
import firebase from "firebase";
import "../registerServiceWorker";
import Routes from '@/router/index';
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';
import ITodoCollection, {ITodo} from '@/models/todoCollection';
import router from '@/router/index';

@Component
export default class ActionNavbar extends Vue {
    public prompt = false;
    public documentName = 'Untitled';
    public documentCredit = '-';
    public documentTopic = 'Other';
    public adminId = process.env.VUE_APP_FIREBASE_ADMIN;

	public get user() {
		return this.$store.getters.user;
	}

    public addDocumentDialog() {
        this.prompt = true;
    }

    public addDocument() {
        let todoDataService = new TodoDataServicesCollection();
        this.prompt = true;
        let newDocument: ITodoCollection = {
            id: '',
            subject: this.documentName,
            credit: this.documentCredit,
            topic: this.documentTopic,
            todos: [{id: '', title:'', body:''}],
        }
        todoDataService.Add(newDocument).then((id:any) => {
            this.$router.replace({
                path: '/todo/' + id,
            });
        })
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
    padding: 0 16px 0 30px;
    background-color: $secondary;

    &__addDocumentDialog {
        padding: 60px;
    }
    &__logo {
        font-size: 2em;
        font-weight: bold;
        color: white;
    }
    &__adminLoggedIn {
        font-size: 1.5em;
        &__btn {
            margin-left: 10px;
        }
    }
    &__adminLoggedOut {
        font-size: 1.5em;
    }
    a {
        text-decoration: none;
        color: white;

        &.router-link-exact-active {
        color: $secondary;
        }
    }
}
</style>