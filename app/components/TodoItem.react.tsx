/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import {List} from "immutable";
import {ITask} from "../Models/ITask";
import Task from "../Models/Task";
import {connect} from "react-redux";
import {IState} from "../Models/IState";
import {completeTodo, removeTodo} from "../Models/Actions";

interface ITodoItemProps { task: ITask }
interface ITodoItemState { task: ITask }

class TodoItem extends React.Component<ITodoItemProps,ITodoItemState> {
    constructor(props) {
        super(props);
        this.state = {
            task: props.task
        }
    }
    
    private onCompleteChanged(event) {
        console.log('-- onCompleteChanged start => ' + JSON.stringify(event.target.checked));
        // publish({
        //     key: Keys.CompleteTodo,
        //     payload: {
        //         Id: this.state.task.Id,
        //         Complete: event.target.checked
        //     }
        // });
    }
    
    private onDelete(event) {
        console.log('-- onDelete start => ');
        // publish({
        //     key: Keys.RemoveTodo,
        //     payload: {
        //         Id: this.state.task.Id
        //     }
        // });
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
        return  (<li>
                    <div className="view">
                        <input className="toggle" type='checkbox' checked={this.state.task.Complete} onChange={this.onCompleteChanged.bind(this)} />
                        <label>{this.state.task.Title} - {this.state.task.Description}</label>
                        <button className="destroy" onClick={this.onDelete.bind(this)} />
                    </div>
                </li>);
    }
}

const mapStateToProps = (state: IState) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCompleteChanged: (payload: any) => {
            dispatch(completeTodo(payload));
        },
        onDelete: (payload:any) => {
            dispatch(removeTodo(payload));
        }
    }
};

const ConnectedTodoItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoItem);

export default ConnectedTodoItem as TodoItem;