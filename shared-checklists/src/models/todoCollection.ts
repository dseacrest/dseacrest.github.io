export default interface ITodoCollection {
    id: string;
    subject: string;
    credit: string;
    description: string;
    topic: string;
    todos: ITodo[];
    userId: string;
}

export interface ITodo {
    id: string;
    title: string;
    body: string;
}