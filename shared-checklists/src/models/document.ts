export default interface IDocument {
    recordId: string;
    name: string;
    topic: string;
}

export interface ITopic {
    name: string;
    image: NodeRequire;
}