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
    
    get Complete(): boolean {
        return this.complete;
    }
    
    constructor(id:number, title:string, description:string, complete:boolean) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.complete = complete;
    }
    
    private id: number;
    private title: string;
    private description: string;
    private complete: boolean;
}