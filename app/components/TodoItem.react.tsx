/// <reference path="../../typings/browser.d.ts" />
import * as React from 'react';
import {List} from "immutable";
import {ITask} from "../Models/ITask";
import Task from "../Models/Task";
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
        publish({
            key: Keys.CompleteTodo,
            payload: {
                Id: this.state.task.Id,
                Complete: event.target.checked
            }
        });
    }
    
    private onDelete(event) {
        console.log('-- onDelete start => ');
        publish({
            key: Keys.RemoveTodo,
            payload: {
                Id: this.state.task.Id
            }
        });
    }
    
    _updateState(props : ITodoItemProps) {
        console.log('-- _updateState => ' + JSON.stringify(props));
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
        if (this.state.task !== nextProps.task) {
            this._updateState(nextProps);
        }
    }

    render() {
        return  <li>
                    <input type='checkbox' checked={this.state.task.Complete} onChange={this.onCompleteChanged.bind(this)} />
                    {this.state.task.Title} - {this.state.task.Description}
                    <button className='destroy' onClick={this.onDelete.bind(this)}></button>
                </li>;
    }
}