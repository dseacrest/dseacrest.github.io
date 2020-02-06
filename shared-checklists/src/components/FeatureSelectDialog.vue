<template>
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="featureDialogActive">
            <q-card class="o-featureDialog">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6"></div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup @click="closeDialog()" />
                </q-card-section>

                <q-card-section class="q-pt-none o-featureDialog__content">
                    <div class="o-featureDialog__content__notecards">
                        <q-btn @click="openNotecards()" color="primary" size="48px" icon="tab" class="o-featureDialog__content__notecards__icon"/>
                        <div class="o-featureDialog__content__notecards__text">Study Cards</div>
                    </div>
                    <div class="o-featureDialog__content__todo">
                        <q-btn @click="openTodo()" color="primary" size="48px" icon="done" class="o-featureDialog__content__todo__icon"/>
                        <div class="o-featureDialog__content__todo__text">Checklists</div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang='ts'>
import {Vue, Component, Prop, PropSync} from 'vue-property-decorator';
import ChecklistViewModule from '@/store/application/ChecklistViewModule';
import router from '@/router/index';

@Component
export default class FeatureSelectDialog extends Vue {

    public openTodo() {
        ChecklistViewModule.closeFeatureDialog();
        router.push({name: 'todo', params: {id: this.documentId}})
    }

    public openNotecards() {
        ChecklistViewModule.closeFeatureDialog();
        router.push({name: 'notecards', params: {id: this.documentId}})
    }

    public get featureDialogActive() {
        return ChecklistViewModule.featureDialogActive;
    };

    public get documentId() {
        return ChecklistViewModule.documentId;
    }

    public closeDialog() {
        ChecklistViewModule.closeFeatureDialog();
    } 
}
</script>

<style lang="scss">

.o-featureDialog {
    width: 400px;
    &__title {

    }
    &__content {
        display: flex;
        justify-content: space-evenly;
        &__notecards {
            margin-top: 20px;
            &__text {
                font-size: 1.50em;
                text-align: center;
                margin-top: 10px;
            }
        }
        &__todo {
            margin-top: 20px;
            &__text {
                font-size: 1.50em;
                text-align: center;
                margin-top: 10px;
            }
        }
    }
}
</style>