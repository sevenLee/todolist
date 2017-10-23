import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { cloneDeep } from 'lodash'

const todos = (state= [], action) => {
    switch(action.type) {
        case 'CREATE_TODO': {
            return [

                {
                    id: action.id,
                    text: action.text,
                    completed: false
                },
                ...state
            ]
        }
        case 'TOGGLE_TODO': {
            return state.map(todo => {
                if(todo.id === action.id){
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }

                return todo
            })
        }
        case 'EDIT_TODO': {
            return state.map(todo => {
                if(todo.id === action.id){
                    return {
                        ...todo,
                        text: action.text
                    }
                }

                return todo
            })
        }
        case 'DELETE_TODO': {
            return state.filter(todo => {
                if(todo.id === action.id){
                    return false
                }

                return true
            })
        }
        default:
            return state
    }
}

const todoById = (state={}, action) => {
    switch(action.type) {
        case 'CREATE_TODO': {
            state[action.id] = {
                id: action.id,
                text: action.text,
                completed: false
            }

            return state
        }
        case 'TOGGLE_TODO': {
            let newState = cloneDeep(state)
            newState[action.id].completed = !newState[action.id].completed

            return newState
        }
        case 'EDIT_TODO': {
            let newState = cloneDeep(state)
            newState[action.id].text = action.text

            return newState
        }
        case 'DELETE_TODO': {
            let newState = cloneDeep(state)
            delete newState[action.id]

            return newState
        }
        default:
            return state
    }
}

const displayFilter = (state = 'ALL', action) => {
    switch (action.type) {
        case 'SET_DISPLAY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todo = combineReducers({
    todos,
    todoById,
    displayFilter
})

export default todo

export const getDisplayFilter = (state) => state.todo.displayFilter
const getTodos = (state) => state.todo.todos
// const getTodoById = (state) => state.todo.todoById

export const getTodoWithId = (state, props) => {
    return state.todo.todoById[props.id]
}

export const makeGetDisplayTodoList = () => {
    return createSelector(
        [getTodos, getDisplayFilter],
        (todos, displayFilter) => {
            switch(displayFilter){
                case 'ALL': {
                    return todos
                }
                case 'COMPLETED': {
                    return todos.filter(todo => todo.completed)
                }
                case 'UNCOMPLETED': {
                    return todos.filter(todo => !todo.completed)
                }
                default:
                    return todos
            }
        }
    )
}