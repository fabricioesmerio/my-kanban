export class Task {
    private id: number;
    private title: string;
    private description: string;
    private position: number;
    private listId: number;


    constructor(id: number, title: string, desc: string, position: number, listId: number) {
        this.id = id;
        this.title = title;
        this.description = desc;
        this.position = position;
        this.listId = listId;
    }
}