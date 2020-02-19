<template>
    <q-dialog v-model="prompt" persistent>
        <q-card class="o-whyDialog" style="min-width: 350px; padding: 10px;">
            <q-card-section>
                <div class="o-whyDialog__title">Getting Started</div>
            </q-card-section>

            <q-card-section>
                <div class="text-body">You need to quickly complete complex tasks and consume new information fast.</div>
            </q-card-section>
           
            <q-card-section>
                <div class="text-body">Here's how it works:</div>
                <ul>
                    <li>Use the 'Topic Filter' to select areas of interest.</li>
                    <li>Click the 'Checklist' mode to Help you complete tasks.</li>
                    <li>Click the 'Notecards' mode to study any of the topics.</li>
                    <li>Click the 'Quiz' mode to challenge your knowledge. </li>
                    <li>Click 'Add Checklist' to add your own data.</li>
                </ul>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Click to Begin"  @click="closeWhyDialog()"/>
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
}
</style>