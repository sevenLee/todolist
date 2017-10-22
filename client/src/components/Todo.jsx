import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as todoAction from '../redux/actions/todoAction'

import {getTodoWithId} from '../redux/reducers/todo'


const dispatchActions = {
    toggleTodo: todoAction.toggleTodo,
    editTodo: todoAction.editTodo,
}

class Todo extends Component{
    constructor(props) {
        super(props)

        this.state = {
            isEdit: false
        }
    }

    render() {
        const {todo, toggleTodo, id, editTodo} = this.props

        return (
            <li className="todo">
                <div className="todo-content">
                    <div className="todo-header">
                        <span
                            className="action-btn"
                            onClick={() => {
                                if(this.state.isEdit){
                                    editTodo(id, this.editTextNode.value)
                                }

                                this.setState({
                                    isEdit: !this.state.isEdit
                                })
                            }}
                        >
                            {
                                (this.state.isEdit)?
                                    <span>Finish Edit</span>
                                    :
                                    <span>Edit</span>
                            }
                        </span>

                        <span className="delete action-btn pull-right">Delete</span>
                        <span
                            className="action-btn pull-right"
                            onClick={(e) => {
                                toggleTodo(id)
                            }}
                        >
                            {
                                (todo.completed)?
                                    <span className="green">Completed</span>
                                    :
                                    <span className="grey">Mark Completed</span>
                            }
                        </span>
                    </div>

                    {
                        (this.state.isEdit)?
                            <textarea className="todo-text" defaultValue={todo.text} ref={(node) => this.editTextNode = node} />
                            :
                            <div className="todo-text">{todo.text}</div>
                    }
                </div>
            </li>
        )
    }
}

export default connect(
    (state, props) => {
        return {
            todo: getTodoWithId(state, props)

        }
    },
    dispatchActions
)(Todo)