/// <reference path="../../typings/browser.d.ts" />
import {Keys} from "../Intents/Keys";
import {IAction} from "../Intents/IAction"
import {intent$} from "../Intents/Intent";
import {Observable} from "@reactivex/rxjs";
import {Map,List} from "immutable";
import {ITask} from "./ITask";
import Task from "./Task";
import {IState} from "./IState";

var initialState: IState = {
        nextId: 0,
        todos: List<ITask>()
};

var state$ : Observable<IState> = intent$
        .scan<IState>((state,action) => applyAction(state,action),initialState);

function applyAction(state:IState, action:IAction):IState {
        switch(action.key) {
                case Keys.AddTodo:
                        return {
                                nextId: state.nextId + 1,
                                todos: List<ITask>(state.todos.concat([action.payload]))
                        }
                case Keys.CompleteTodo:
                        return {
                                nextId: state.nextId,
                                todos: List<ITask>(state.todos.map((task:ITask) => {
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
                                }))
                        }
                case Keys.RemoveTodo:
                        return {
                                nextId: state.nextId,
                                todos: List<ITask>(state.todos.filter((task:ITask) => {
                                        return task.Id !== action.payload.Id;
                                }))
                        }
        }                                 
        return state;
}

export default state$;