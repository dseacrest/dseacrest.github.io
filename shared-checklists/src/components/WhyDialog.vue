<template>
    <q-dialog v-model="prompt" persistent>
        <q-card class="o-whyDialog" style="min-width: 350px; padding: 10px;">
            <q-card-section>
                <div class="o-whyDialog__title text-primary">About</div>
            </q-card-section>

            <q-card-section>
                <div class="text-body">This site is designed for entrepreneurs, business owners, and do-gooders who need to learn and grow quickly.</div>
            </q-card-section>
           
            <q-card-section>
                <div class="text-body">Inside you'll find checklists, lessons, vocabulary, questions, tricks, steps, and theories of business to help you on your way.</div>
            </q-card-section>

            <q-card-section>
                <div class="text-body">You'll find a wide variety of information organized in topics.  Use the searchbar to quick filter by topic or search for a particular document.</div>
            </q-card-section>

            <q-card-section>
                <div class="text-body">The data is provided in three formats based on your preferred learning style:</div>
                <ul>
                    <li>Click the 'Quiz' mode to challenge your knowledge. </li>
                    <li>Click the 'Checklist' mode to help you complete tasks.</li>
                    <li>Click the 'Notecards' mode to study any of the documents.</li>
                </ul>
            </q-card-section>

            <q-card-section>
                <div class="text-body">You can even add your own private checklists by clicking the "Add Checklist" button.</div>
            </q-card-section>

            <q-card-section>
                <div class="text-body">Devon</div>
            </q-card-section>

            <q-card-actions align="right" class="o-whyDialog__beginButton text-primary">
                <q-btn flat label="Click to Begin" @click="closeWhyDialog()"/>
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
export default class WhyDialog extends Vue {

    public get prompt() {
        return HomeViewModule.promptWhyDocumentDialog;
    }

    public closeWhyDialog() {
        HomeViewModule.loadPromptWhyDocumentDialog(false);
    }
	
}
</script>

<style lang="scss">

.o-whyDialog {
    &__title {
        font-size: 3em;
    }
    &__beginButton {
        padding: 10px;
    }
}
</style>