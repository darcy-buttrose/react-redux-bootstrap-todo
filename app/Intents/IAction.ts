/// <reference path="../../typings/browser.d.ts" />
import {Keys} from "./Keys";
import {List} from "immutable";
import {ITask} from "../models/ITask";

export interface IAction {
    key : Keys;
    payload: ITask;
}