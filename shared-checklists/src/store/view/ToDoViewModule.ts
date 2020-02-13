import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators';
import Store from '@/store';
import ITodoCollection, {ITodo} from '@/models/todoCollection';
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';

@Module({namespaced: true, name: 'ToDoViewModule', dynamic: true, store: Store})
class ToDoViewModule extends VuexModule {
    public document: ITodoCollection = {
		id: '',
		subject: '',
		credit: '',
		topic: '',
        todos: [],
        userId: '',
	};
    public tasks: ITodo[] = [];
    
    @Mutation
    public setDocument(document: ITodoCollection) {
        this.document = document;
    }

    @Mutation
    public setTasks(tasks: ITodo[]) {
        this.tasks = tasks;
    }

    @Action
    public async loadDocument(documentId: string) {
        let todoDataService = new TodoDataServicesCollection();
        todoDataService.GetRecord(documentId).then((listData:any) => {
            this.setDocument(listData);
            this.setTasks(listData.todos);
        });
    }
}

export default getModule(ToDoViewModule);
