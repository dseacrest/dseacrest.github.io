import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators';
import Store from '@/store';

@Module({namespaced: true, name: 'ChecklistViewModule', dynamic: true, store: Store})
class ChecklistViewModule extends VuexModule {
    public featureDialogActive: boolean = false;
    public documentId: string = '';
    
    @Mutation
    public setFeatureDialog(active: boolean) {
        this.featureDialogActive = active;
    }

    @Mutation
    public setDocumentId(documentId: string) {
        this.documentId = documentId;
    }

    @Action
    public async closeFeatureDialog() {
        this.setFeatureDialog(false);
    }

    @Action
    public async openFeatureDialog(documentId: string) {
        this.setDocumentId(documentId);
        this.setFeatureDialog(true);
    }
}

export default getModule(ChecklistViewModule);
