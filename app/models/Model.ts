/// <reference path="../../typings/browser.d.ts" />
import {Keys} from "../Intents/Keys";
import {IAction} from "../Intents/IAction"
import {intent$} from "../Intents/Intent";
import {Observable} from "@reactivex/rxjs";
import {Map,List} from "immutable";
import {ITask} from "./ITask";
import Task from "./Task";

var initialState: List<ITask> = List<Task>();

var state$ : Observable<List<ITask>> = intent$
        .scan<List<ITask>>((state,action) => applyAction(state,action),initialState);

function applyAction(state:List<ITask>, action:IAction):List<ITask> {
    var task:ITask = action.payload;
    switch (action.key) {
        case Keys.AddTodo :
            return List<Task>(state.concat(task));
        case Keys.UpdateTodo :
            return state.merge([task]);
        default:
            return state;
    }
}

export default state$;