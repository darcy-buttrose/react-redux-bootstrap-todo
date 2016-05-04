/// <reference path="../../typings/browser.d.ts" />
import * as React from 'react';
import {List} from "immutable";
import {ITask} from "../models/ITask";
import Task from "../models/Task";
import TodoItem from "./TodoItem.react";
import NewTodoItem from "./NewTodoItem.react";

interface ITodoAppProps { }
interface ITodoAppState { nextId:number; todos: List<ITask> }

export default class TodoApp extends React.Component<ITodoAppProps, ITodoAppState> {
    constructor(props) {
        super(props);
        this.state = {
            nextId: 2,
            todos: List<Task>([
                new Task(0,"Yow","Go To Yow"),
                new Task(1,"Home","Go Home")
            ])
        }
    };
    
    onSave(task: ITask) {
        this.setState({
            nextId: this.state.nextId + 1,
            todos: List<Task>(this.state.todos.concat(task))
        });
    }
    
    render() {
        let todoList = this.state.todos.map((task: Task) => {
            return <TodoItem key={task.Id} task={task} />
        });
        return  <div>
                    <div>{todoList}</div>
                    <NewTodoItem nextId={this.state.nextId} onSave={this.onSave.bind(this)} />
                </div>;
    }
}
