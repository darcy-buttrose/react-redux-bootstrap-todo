/// <reference path="../../typings/browser.d.ts" />
import * as React from 'react';
import {List} from "immutable";
import {ITask} from "../models/ITask";
import Task from "../models/Task";
import {IAction} from "../Intents/IAction";
import {publish} from "../Intents/Intent";
import {Keys} from "../Intents/Keys";

interface ITodoItemProps { task: ITask }
interface ITodoItemState { task: ITask }

export default class TodoItem extends React.Component<ITodoItemProps,ITodoItemState> {
    constructor(props) {
        super(props);
        this.state = {
            task: props.task
        }
    }
    
    private onCompleteChanged(event) {
        console.log('-- onCompleteChanged start => ' + JSON.stringify(event.target.checked));
        let task = new Task(
                this.state.task.Id,
                this.state.task.Title,
                this.state.task.Description,
                event.target.checked
            );
        console.log('-- onCompleteChanged publish => ' + JSON.stringify(task));
        publish({
            key: Keys.UpdateTodo,
            payload: task
        });
    }
    
    _updateState(props : ITodoItemProps) {
        this.setState({
            task: props.task
        });
    }

    componentDidMount() {
        console.log('-- componentDidMount => ' + JSON.stringify(this.props));
        this._updateState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('-- componentWillReceiveProps => ' + JSON.stringify(nextProps));
        this._updateState(nextProps);
    }

    render() {
        return  <div><input type='checkbox' checked={this.state.task.Complete} onChange={this.onCompleteChanged.bind(this)} />{this.state.task.Title} - {this.state.task.Description}</div>;
    }
}