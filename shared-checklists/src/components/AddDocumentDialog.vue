<template>
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
                <q-select
                    v-model="documentTopic"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    :options="options"
                >
                    <template v-slot:no-option>
                    <q-item>
                        <q-item-section class="text-grey">
                        No results
                        </q-item-section>
                    </q-item>
                    </template>
                </q-select>
            </q-card-section>

            <q-card-section>
                <div class="text-h6">Credit</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input dense v-model="documentCredit" @keyup.enter="prompt = false" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" @click="closeAddDocumentDialog()" />
            <q-btn flat label="Add Checklist" @click="addDocument()"/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
import {Vue, Prop, Component} from 'vue-property-decorator'
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';
import HomeViewModule from '../store/view/HomeViewModule';
import ITodoCollection, {ITodo} from '@/models/todoCollection';


@Component
export default class AddDocumentDialog extends Vue {
    public documentName = 'Untitled';
    public documentCredit = '-';
    public documentTopic = 'Other';
    public adminId = process.env.VUE_APP_FIREBASE_ADMIN;

	public get user() {
		return this.$store.getters.user;
    }
    
    public get prompt() {
        return HomeViewModule.promptAddDocumentDialog;
    }

    public get options() {
        return HomeViewModule.documentTopics;
    }

    public closeAddDocumentDialog() {
        HomeViewModule.loadPromptAddDocumentDialog(false);
    }

    public addDocument() {
        let todoDataService = new TodoDataServicesCollection();
        let newDocument: ITodoCollection = {
            id: '',
            subject: this.documentName,
            credit: this.documentCredit,
            topic: this.documentTopic,
            todos: [{id: this.todoIdGenerator(), title:'', body:''}],
            userId: this.user.data.uid,
        }
        todoDataService.Add(newDocument).then((id:any) => {
            this.$router.replace({
                path: '/todo/' + id,
            });
        })
        this.$gtag.event('documentAdded', {event_category: `${this.documentName} in ${this.documentTopic} was added.).`, event_label: '', value: 0} );
        HomeViewModule.loadPromptAddDocumentDialog(false);
    }

	public todoIdGenerator(): string {
        return (Math.floor(Math.random() * 1000000) + 1000000).toString();
	}
}
</script>

<style lang="scss">
</style>