/**
 * Created by Darcy on 29/05/2016.
 */
import {connect} from 'react-redux';
import TodoApp from '../components/TodoApp.react';
import {IState} from "../Models/IState";
import {completeTodo, removeTodo, addTodo} from "../Models/Actions";

const mapStateToProps = (state: IState) => {
    return {
        nextId: state.nextId,
        todos: state.todos
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCompleteChanged: (payload: any) => {
            dispatch(completeTodo(payload));
        },
        onDelete: (payload:any) => {
            dispatch(removeTodo(payload));
        },
        onSave: (payload:any) => {
            dispatch(addTodo(payload));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoApp)