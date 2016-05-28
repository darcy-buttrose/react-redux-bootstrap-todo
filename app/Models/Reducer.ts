/// <reference path="../../typings/index.d.ts" />

import { combineReducers } from 'redux';
import {IAction} from "./IAction";
import {Keys} from "./Keys";
import {Observable} from "@reactivex/rxjs";
import {Map,List} from "immutable";
import {ITask} from "./ITask";
import Task from "./Task";
import {IState} from "./IState";

var initialState: IState = {
        nextId: 0,
        todos: List<ITask>()
};

const reducer = combineReducers({
        nextId: nextIdReducer,
        todos: todosReducer
});

export default reducer;

function nextIdReducer(state:number,action:IAction):number {
        switch(action.key) {
                case Keys.AddTodo:
                        return state + 1;
        }
        return state;
}

function todosReducer(state:List<ITask>, action:IAction):List<ITask> {
        switch(action.key) {
                case Keys.AddTodo:
                        return List<ITask>(state.concat([action.payload]))
                case Keys.CompleteTodo:
                        return List<ITask>(state.map((task:ITask) => {
                                if (task.Id === action.payload.Id) {
                                        return new Task(
                                                task.Id,
                                                task.Title,
                                                task.Description,
                                                action.payload.Complete
                                        );
                                } else {
                                        return task;
                                }
                        }));
                case Keys.RemoveTodo:
                        return List<ITask>(state.filter((task:ITask) => {
                                return task.Id !== action.payload.Id;
                        }))
        }                                 
        return state;
}