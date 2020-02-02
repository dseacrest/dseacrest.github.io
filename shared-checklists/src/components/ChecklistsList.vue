<template>
    <div class="o-checklist">
        <div class="o-checklist__header">
            <q-icon name="tab" class="o-checklist__header__notecards"/><span>   Study Cards   </span>
            <q-icon name="done" class="o-checklist__header__checklists"/><span>   Checklists   </span>
        </div>
        <div class="o-checklist__list">
            <q-card bordered class="my-card" v-for="(topic, index) in topics" :key="index">
                <q-card-section>
                    <div class="o-checklist__list__topic text-h6">{{topic}}</div>
                </q-card-section>
            <q-separator inset />
                <q-card-section v-for="(document, index) in matchingTopics(topic)" :key="index">
                    {{document.subject}} |
                    <router-link :to="{ name: 'notecards', params: {id: document.id}}">
                        <q-icon name="tab" class="o-checklist__list__notecardsIcon"/>
                    </router-link> |
                    <router-link :to="{ name: 'todo', params: {id: document.id}}">
                        <q-icon name="done" class="o-checklist__list__todoIcon"/>
                    </router-link>
                </q-card-section>
            </q-card>
        </div>
        <h3>Credits</h3>
        <ul>
        <div>Students and Faculty at <a href="https://www.nebrwesleyan.edu/" title="NWU">Nebraska Wesleyan University</a>.</div>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import IDocument from '@/models/document';
import ITodoCollection from '@/models/todoCollection';
import firebase from 'firebase';
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';
import router from '@/router/index';

@Component
export default class ChecklistsList extends Vue {
    public documents: ITodoCollection[] = [];
    public adminId = process.env.VUE_APP_FIREBASE_ADMIN;

    public get topics(): string[] {
        let topicList = [
        "Service",
        "Finance",
        "Fundraise",
        "UI/UX",
        "Efficiency",
        "Pitch",
        "Human Resources",
        "Coding",
        "Grit",
        "Innovators",
        "Sales & Marketing",
        "Personal Growth",
        "Organizational Growth",
        "Data",
        "Real Estate",
        ]
        let adminList = [
            ...topicList,
            "Pending"
        ]
        if (this.user.data && this.user.data.uid === this.adminId) {
            return adminList;
        } else {
            return topicList;
        }
    }

    public matchingTopics(topic: string) {
        return this.documents.filter(document => document.topic === topic);
    }

    public get user() {
        return this.$store.getters.user;
    }

    beforeMount() {
        firebase.auth().onAuthStateChanged(() => {
            this.loadData();
        })
    }
  
    public loadData() {
        let todoDataService = new TodoDataServicesCollection();
        todoDataService.GetAll().then((listData:any) => {
            this.documents = listData;
        });
    }

}
</script>

<style scoped lang="scss">
@import '../styles/quasar.variables.scss';
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


        &__icon {
            width: 32px;
            height: 32px;
        }
        
        &__topic {
        color: $primary;
        }
        
        &__notecardsIcon {
        color: $primary;
        }
        
        &__todoIcon {
        color: $accent;
        }
    }
}
.my-card {
  max-width: 500px;
  min-width: 500px;
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
  color: $accent;
}
</style>
