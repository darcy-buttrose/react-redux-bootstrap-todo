/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import {List} from "immutable";
import {ITask} from "../Models/ITask";
import Task from "../Models/Task";
import TodoItem from "./TodoItem.react";
import NewTodoItem from "./NewTodoItem.react";
import {IState} from "../Models/IState";
import {connect} from "react-redux";

interface ITodoAppProps { }
interface ITodoAppState { nextId:number; todos: List<ITask> }

class TodoApp extends React.Component<ITodoAppProps, ITodoAppState> {
    constructor(props) {
        super(props);
        this.state = {
            nextId: 0,
            todos: List<Task>([
            ])
        }
    };
    
    render() {
        let todoList = this.state.todos.map((task: Task) => {
            return <TodoItem key={task.Id} task={task} />
        });
        return  (<section id="main">
                    <ul id="todo-list">{todoList}</ul>
                    <NewTodoItem nextId={this.state.nextId} />
                </section>);
    }
}

const mapStateToProps = (state: IState) => {
    return {
        todos: state.todos
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

const ConnectedTodoApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoApp);

export default ConnectedTodoApp as TodoApp;