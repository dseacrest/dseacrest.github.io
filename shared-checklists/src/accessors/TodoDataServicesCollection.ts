import {FireStoreDataServices} from '@/helpers/FireStoreDataServices';
import ITodoCollection from '@/models/todoCollection';

export class TodoDataServicesCollection{

    dataServices: FireStoreDataServices;
    constructor(){
        this.dataServices = new FireStoreDataServices();
    }

    Add(todo: ITodoCollection){
        var data = JSON.parse(JSON.stringify(todo));  
        return this.dataServices.addRecord(data, "tasks");
    }

    Delete(recordId: string){
        return this.dataServices.deleteRecord(recordId, "tasks");
    }

    Update(todo: ITodoCollection, recordId: string) {
        var data = JSON.parse(JSON.stringify(todo));  
        return this.dataServices.updateRecord(data, "tasks", recordId);
    }

    GetAll() {
        return this.dataServices.getAll("tasks", DocToTodoRecordMap);
    }

    GetRecord(recordId: string) {
        return this.dataServices.getRecord(recordId, "tasks", DocToTodoRecordMap);
    }

    GetUniqueSubjects() {
        const tasks = this.GetAll();

    }
}

export function DocToTodoRecordMap(doc: any): ITodoCollection {
    var rowData = doc.data();
    var record: ITodoCollection = {
        subject: rowData.subject,
        credit: rowData.credit,
        todos: rowData.todos,
    };

    return record;
}