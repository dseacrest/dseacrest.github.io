export default interface ITodoCollection {
    subject: string;
    credit: string;
    todos: ITodo[];
}

export interface ITodo {
    id: string;
    title: string;
    body: string;
}