<template>
    <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px; padding: 10px;">
            <q-card-section>
                <h3>Getting Started</h3>
            </q-card-section>

            <q-card-section>
                <div class="text-body">You need to quickly complete complex tasks and consume new information fast.</div>
            </q-card-section>
           
            <q-card-section>
                <div class="text-body">Here's how it works:</div>
                <ul>
                    <li>Use The Topic Filter to Select Areas of Interest</li>
                    <li>Click The 'Checklist' Button To Help You Complete Tasks</li>
                    <li>Click The 'Notecards' To Study Any of the Checklists</li>
                    <li>Click 'Add Checklist' to Create Your Own Lists & Notecards</li>
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
import HomePageViewModule from '../store/application/HomePageViewModule';
import ITodoCollection, {ITodo} from '@/models/todoCollection';


@Component
export default class WhyDialog extends Vue {

    public get prompt() {
        return HomePageViewModule.promptWhyDocumentDialog;
    }

    public closeWhyDialog() {
        HomePageViewModule.loadPromptWhyDocumentDialog(false);
    }
	
}
</script>

<style lang="scss">
</style>