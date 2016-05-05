/// <reference path="../../typings/browser.d.ts" />
import * as React from 'react';
import {List} from "immutable";
import {ITask} from "../Models/ITask";
import Task from "../Models/Task";
import {IAction} from "../Intents/IAction";
import {publish} from "../Intents/Intent";
import {Keys} from "../Intents/Keys";

interface INewTodoItemProps { nextId: number }
interface INewTodoItemState { task: ITask }

export default class TodoItem extends React.Component<INewTodoItemProps,INewTodoItemState> {
    constructor(props: INewTodoItemProps) {
        super(props);
        this.state = {
            task: new Task(props.nextId,'','', false)
        }
    }

    private onChangeTitle(event) {
        this.setState({
            task: new Task(
                this.state.task.Id,
                event.target.value,
                this.state.task.Description,
                this.state.task.Complete
            )
        })
    }

    private onChangeDescription(event) {
        this.setState({
            task: new Task(
                this.state.task.Id,
                this.state.task.Title,
                event.target.value,
                this.state.task.Complete
            )
        })
    }

    onSave() {
        publish({
            key: Keys.AddTodo,
            payload: this.state.task
        })
    }

    _updateState(props : INewTodoItemProps) {
        this.setState({
            task: new Task(props.nextId, '', '', false)
        });
    }

    componentDidMount() {
        this._updateState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this._updateState(nextProps);
    }

    render() {
        return  <div>
                    <input type='text' value={this.state.task.Title} placeholder='Title' onChange={this.onChangeTitle.bind(this)} />
                    <input type='text' value={this.state.task.Description} placeholder='Description' onChange={this.onChangeDescription.bind(this)} />
                    <button onClick={this.onSave.bind(this)}>Add</button>
                </div>;
    }
}
