<template>
  <div>
    <h2>Checklists</h2>
    <div class="o-checklist-list">
      <q-card bordered class="my-card" v-for="(topic, index) in topics" :key="index">
        <q-card-section>
          <div class="text-h6">{{topic}}</div>
          <div class="text-subtitle2">Subtitle</div>
        </q-card-section>

      <q-separator inset />

        <q-card-section v-for="(subject, index) in matchingSubjects(topic)" :key="index">
          {{subject.name}} |
          <router-link :to="{ name: 'notecards', params: {id: subject.recordId}}">
            <q-icon name="tab"/>
          </router-link>
          |
          <router-link :to="{ name: 'todo', params: {id: subject.recordId}}">
            <q-icon name="done"/>
          </router-link>
        </q-card-section>
      </q-card>
    </div>
    <h3>Credits</h3>
    <ul>
      <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import documents from '@/assets/documents.json';
import IDocument from '../models/document';

@Component
export default class ChecklistsList extends Vue {
  public subjects: IDocument[] = documents;

  public get topics(): string[] {
    const topiclist: string[] = [];
    documents.map((subject:IDocument) => {
      topiclist.push(subject.topic);
    })
    return [...new Set(topiclist)];
  }

  public matchingSubjects(topic: string) {
    return this.subjects.filter(subject => subject.topic === topic);
  }

}
</script>

<style scoped lang="scss">
@import '../styles/quasar.variables.scss';

.o-checklist-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
}
.my-card {
  max-width: 300px;
  min-width: 300px;
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
