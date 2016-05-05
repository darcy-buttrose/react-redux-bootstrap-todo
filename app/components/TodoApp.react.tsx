/// <reference path="../../typings/browser.d.ts" />
import * as React from 'react';
import {List} from "immutable";
import {ITask} from "../models/ITask";
import Task from "../models/Task";
import TodoItem from "./TodoItem.react";
import NewTodoItem from "./NewTodoItem.react";
import state$ from "../Models/Model";

interface ITodoAppProps { }
interface ITodoAppState { nextId:number; todos: List<ITask> }

export default class TodoApp extends React.Component<ITodoAppProps, ITodoAppState> {
    constructor(props) {
        super(props);
        this.state = {
            nextId: 0,
            todos: List<Task>([
            ])
        }
        
        state$.subscribe((state:List<ITask>) => {
            this.setState({
                nextId: state.size + 1,
                todos: state
            })
        });
    };
    
    render() {
        let todoList = this.state.todos.map((task: Task) => {
            return <TodoItem key={task.Id} task={task} />
        });
        return  <div>
                    <div>{todoList}</div>
                    <NewTodoItem nextId={this.state.nextId} />
                </div>;
    }
}
