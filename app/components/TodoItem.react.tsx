/// <reference path="../../typings/browser.d.ts" />
import * as React from 'react';
import {List} from "immutable";
import {ITask} from "../models/ITask";
import Task from "../models/Task";

interface ITodoItemProps { task: ITask }
interface ITodoItemState { task: ITask }

export default class TodoItem extends React.Component<ITodoItemProps,ITodoItemState> {
    constructor(props) {
        super(props);
        this.state = {
            task: props.task
        }
    }
    
  _updateState(props : ITodoItemProps) {
    this.setState({
        task: props.task
    });
  }

  componentDidMount() {
    this._updateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._updateState(nextProps);
  }

    render() {
        return  <div>{this.state.task.Id} - {this.state.task.Title} - {this.state.task.Description}</div>;
    }
}