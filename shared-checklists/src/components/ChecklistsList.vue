<template>
    <div class="o-checklist">
        <div class="o-checklist__list">
            <q-card class="my-card" v-for="(document, index) in documents" :key="index" flat bordered>
                <q-card-section class="o-checklist__list__content">
                    <q-card-section>
                        <div class="o-checklist__list__content__topic text-overline">{{document.topic}}</div>
                        <div class="o-checklist__list__content__subject text-h5 q-mt-sm q-mb-xs">{{document.subject | truncateSubject}}</div>
                        <div class="o-checklist__list__content__body text-body text-grey">
                            {{document.todos[0].body | truncateBody}}
                        </div>
                        <div class="o-checklist__list__content__access">
                            <q-badge outline color="secondary" label="Public" v-if="document.userId === undefined"/>
                            <q-badge outline color="accent" label="Private" v-else/>
                        </div>
                    </q-card-section>
                </q-card-section>
                <q-separator />
                <q-card-section class="o-checklist__list__actions">
                    <q-card-actions align="right">
                        <q-btn flat color="info"  @click="openQuiz(document)"> Quiz </q-btn>
                        <q-btn flat color="accent"  @click="openChecklist(document)"> Checklist </q-btn>
                        <q-btn flat color="primary"  @click="openNotecard(document)"> Notecards </q-btn>
                    </q-card-actions>
                </q-card-section>
                </q-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import IDocument from '@/models/document';
import ITodoCollection from '@/models/todoCollection';
import firebase from 'firebase';
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';
import router from '@/router/index';
import HomeViewModule from '@/store/view/HomeViewModule';
import {Loading} from 'quasar';
import DocumentModule from '@/store/application/DocumentModule';

@Component({
    filters: {
        truncateSubject(value: string) {
            if (value.length > 40) {
                return value.slice(0, 40) + '...';
            } else {
                return value;
            }
        }, 
        truncateBody(value: string) {
            if (value.length > 110) {
                return value.slice(0, 110) + '...';
            } else {
                return value;
            }
        }
    }
})
export default class ChecklistsList extends Vue {
    public adminId = process.env.VUE_APP_FIREBASE_ADMIN;

    public async openChecklist(document: ITodoCollection) {
        Loading.show()
        await DocumentModule.loadDocument(document.id);
        Loading.hide()
        router.push({name: 'todo', params: {id: document.id}});
        this.$gtag.event('todoClicked', {event_category: `${document.subject} was clicked.`, event_label: `${document.topic}`, value: 0} );
    }

    public async openNotecard(document: ITodoCollection) {
        Loading.show()
        await DocumentModule.loadDocument(document.id);
        Loading.hide()
        router.push({name: 'notecards', params: {id: document.id}})
        this.$gtag.event('notecardClicked', {event_category: `${document.subject} was clicked.`, event_label: `${document.topic}`, value: 0} );
    }

    public async openQuiz(document: ITodoCollection) {
        Loading.show()
        await DocumentModule.loadDocument(document.id);
        Loading.hide()
        router.push({name: 'quiz', params: {id: document.id}})
        this.$gtag.event('quizClicked', {event_category: `${document.subject} was clicked.`, event_label: `${document.topic}`, value: 0} );
    }

    public get documents() {
        if (HomeViewModule.filteredDocuments.length) {
            return (HomeViewModule.filteredDocuments.filter((document) => (document.userId === (this.user.data ? this.user.data.uid : ''))  || document.userId === undefined));
        }
        return HomeViewModule.documents;
    }

    public get user() {
        return this.$store.getters.user;
    }

    beforeMount() {
        firebase.auth().onAuthStateChanged(async () => {
            await HomeViewModule.loadDocuments();
        })
    }
}
</script>

<style scoped lang="scss">
@import '../styles/quasar.variables.scss';
.text-overline {
    color: $tertiary;
}

.o-checklist {
    &__header {
        margin-top: 20px; 
        color: $primary;
        
        &__notecards {
        color: $primary;
        }
        
        &__checklists {
        color: $accent;
        }
    }
  
    &__list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center; 

        &__content {
            height: 78%;
            &__subject {
                padding: 10px;
            }
            &__body {
                padding: 10px;
                min-height: 80px;
            }
            &__access {
                padding: 10px;
            }
        }
    }
}
.my-card {
  max-width: 320px;
  min-width: 320px;
  margin: 20px;
}

h3 {
  margin: 40px 0 20px 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: $primary;
}
</style>
