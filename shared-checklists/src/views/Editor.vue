<template>
    <div class="o-editor">
        <q-editor
            :fonts="{
                arial: 'Arial',
                arial_black: 'Arial Black',
                courier_new: 'Courier New',
                impact: 'Impact',
                lucida_grande: 'Lucida Grande',
                times_new_roman: 'Times New Roman',
                verdana: 'Verdana'
            }"
            :toolbar="[
                [{
                    label: $q.lang.editor.defaultFont,
                    icon: $q.iconSet.editor.font,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana'
                    ]
                },
                ],
                [
                {
                    label: $q.lang.editor.fontSize,
                    icon: $q.iconSet.editor.fontSize,
                    fixedLabel: true,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7'
                    ]
                }],
                ['bold', 'italic', 'underline'],
                ['left', 'center', 'right', 'justify'],
            ]"
            class="o-editor-qeditor"
            flat
            square
            v-model="checklistBody"
            min-height="70vh"
        />
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop } from 'vue-property-decorator';
import checklists from "../assets/mock-checklists/checklists.json"
import IChecklist from '../models/checklist';

@Component
export default class Editor extends Vue {
    public get checklistBody(): string {
		const checklist: IChecklist | null = checklists.find((checklist: IChecklist) => checklist.id === this.$route.params.id) || null;
		
		if (checklist) {
			return checklist.body;
		} else {
			return "";
		}
	}
}
</script>

<style scoped lang="scss">
@import '../styles/quasar.variables.scss';

.o-editor {
    display: flex;
    justify-content: center;
}

.o-editor-qeditor {
    width: 80%;
    border: 1px solid $accent;
}

</style>
