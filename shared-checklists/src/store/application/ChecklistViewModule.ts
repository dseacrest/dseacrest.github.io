import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators';
import Store from '@/store';

@Module({namespaced: true, name: 'ChecklistViewModule', dynamic: true, store: Store})
class ChecklistViewModule extends VuexModule {
    public featureDialogActive: boolean = false;
    public documentId: string = '';
    public documentName: string = '';
    public documentTopic: string = '';
    
    @Mutation
    public setFeatureDialog(active: boolean) {
        this.featureDialogActive = active;
    }

    @Mutation
    public setDocumentId(documentId: string) {
        this.documentId = documentId;
    }

    @Mutation
    public setDocumentName(documentName: string) {
        this.documentName = documentName;
    }

    @Mutation
    public setDocumentTopic(documentTopic: string) {
        this.documentTopic = documentTopic;
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

    @Action
    public async loadDocumentName(documentName: string) {
        this.setDocumentName(documentName);
    }

    @Action
    public async loadDocumentTopic(documentTopic: string) {
        this.setDocumentTopic(documentTopic);
    }
}

export default getModule(ChecklistViewModule);
