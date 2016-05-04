import * as React from 'react';
import {List} from "immutable";
import {ITask} from "../models/ITask";
import Task from "../models/Task";

interface INewTodoItemProps { nextId: number; onSave: Function }
interface INewTodoItemState { task: ITask; onSave: Function }

export default class TodoItem extends React.Component<INewTodoItemProps,INewTodoItemState> {
    constructor(props: INewTodoItemProps) {
        super(props);
        this.state = {
            task: new Task(props.nextId,'',''),
            onSave: props.onSave
        }
    }

    changeTitle(event) {
        this.setState({
            task: new Task(
                this.state.task.Id,
                event.target.value,
                this.state.task.Description
                ),
            onSave: this.state.onSave
        })
    }

    changeDescription(event) {
        this.setState({
            task: new Task(
                this.state.task.Id,
                this.state.task.Title,
                event.target.value
                ),
            onSave: this.state.onSave
        })
    }

    onSave() {
        this.state.onSave(this.state.task);
    }

    _updateState(props : INewTodoItemProps) {
        this.setState({
            task: new Task(props.nextId, '', ''),
            onSave: this.state.onSave
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
                    <input type='text' value={this.state.task.Title} placeholder='Title' onChange={this.changeTitle.bind(this)} />
                    <input type='text' value={this.state.task.Description} placeholder='Description' onChange={this.changeDescription.bind(this)} />
                    <button onClick={this.onSave.bind(this)}>Add</button>
                </div>;
    }
}
