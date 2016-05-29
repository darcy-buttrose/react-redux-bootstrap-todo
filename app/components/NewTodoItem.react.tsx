/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import {List} from "immutable";
import {ITask} from "../Models/ITask";
import Task from "../Models/Task";
import {connect} from "react-redux";
import {IState} from "../Models/IState";
import {addTodo} from "../Models/Actions";
import {Keys} from "../Models/Keys";

interface INewTodoItemProps { nextId: number, onSave: Function }
interface INewTodoItemState { task: ITask }


const mapStateToProps = (state: IState, ownProps: {nextId: number}) => {
    return {
        nextId: ownProps.nextId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (payload: any) => {
            dispatch(addTodo(payload));
        }
    }
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class NewTodoItem extends React.Component<INewTodoItemProps,INewTodoItemState> {
    constructor(props: INewTodoItemProps) {
        super(props);
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
         this.props.onSave({
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
