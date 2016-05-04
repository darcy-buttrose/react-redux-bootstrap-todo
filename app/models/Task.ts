import {ITask} from "./ITask";

export default class Task implements ITask {
    get Id(): number {
        return this.id;
    }
    
    get Title(): string {
        return this.title
    }
    
    get Description(): string {
        return this.description;
    }
    
    constructor(id:number, title:string, description:string) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
    
    private id: number;
    private title: string;
    private description: string;
}