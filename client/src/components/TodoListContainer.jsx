import React, {Component} from 'react'
import {connect} from 'react-redux'

import Todo from './Todo'
// import * as todoAction from '../redux/actions/todoAction'

import {makeGetDisplayTodoList} from '../redux/reducers/todo'


const dispatchActions = {
    // createTodo: todoAction.createTodo,
}

class TodoListContainer extends Component {
    render() {
        const {displayTodoList} = this.props

        return (
            <ul className="todoList">
                {
                    displayTodoList.map((todo) =>
                        <Todo
                            key={todo.id}
                            id={todo.id}
                        />
                    )
                }
            </ul>
        )
    }
}

export default connect(
    (state, props) => {
        const getDisplayTodoList = makeGetDisplayTodoList()
        // const getOneRankingIsFetching = makeGetOneRankingIsFetching()

        return {
            displayTodoList: getDisplayTodoList(state, props),

        }
    },
    dispatchActions
)(TodoListContainer)