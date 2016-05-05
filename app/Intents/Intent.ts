/// <reference path="../../typings/browser.d.ts" />
import {Keys} from "./Keys";
import {IAction} from "./IAction";
import {Subject} from "@reactivex/Rxjs";
import {Map} from "immutable";

var subject: Subject<IAction> = new Subject<IAction>();
function publish(action: IAction) : void {
    subject.next(action);
}

export {
    subject as intent$,
    publish
}