/// <reference path="../../typings/index.d.ts" />
import {Map,List} from "immutable";
import {ITask} from "./ITask";
export interface IState {
    nextId : number;
    todos: List<ITask>;
}