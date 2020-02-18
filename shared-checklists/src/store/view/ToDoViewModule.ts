import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators';
import Store from '@/store';
import ITodoCollection, {ITodo} from '@/models/todoCollection';
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';

@Module({namespaced: true, name: 'ToDoViewModule', dynamic: true, store: Store})
class ToDoViewModule extends VuexModule {
   
}

export default getModule(ToDoViewModule);
