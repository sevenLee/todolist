import { combineReducers } from 'redux'
// import { createSelector } from 'reselect'

const todos = (state= [], action) => {
    switch(action.type) {
        case 'CREATE_TODO': {
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
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
