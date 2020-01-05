<template>
  <div>
    <h1>Shared Checklists</h1>
    <h3>Checklists</h3>
    <ul>
      <li class="text-h6" v-for="(subject, index) in subjects" :key="index">
        <router-link :to="{ name: 'todo', params: {id: subject.recordId}}">
          {{subject.name}}
        </router-link>
      </li>
    </ul>
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
}
</script>

<style scoped lang="scss">
@import '../styles/quasar.variables.scss';
h3 {
  margin: 40px 0 0;
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
