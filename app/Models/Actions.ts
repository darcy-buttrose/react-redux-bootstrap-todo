/// <reference path="../../typings/index.d.ts" />

import {Keys} from "./Keys";
import {IAction} from "./IAction";

export function addTodo(payload: any): IAction {
    return {
        key: Keys.AddTodo,
        payload
    }
}

export function completeTodo(payload: any): IAction {
    return {
        key: Keys.CompleteTodo,
        payload
    }
}

export function removeTodo(payload: any): IAction {
    return {
        key: Keys.RemoveTodo,
        payload
    }
}