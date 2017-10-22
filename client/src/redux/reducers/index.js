import {combineReducers} from 'redux'
import todo from './todo'

const appReducer = combineReducers({
    todo
})

const rootReducer = (state, action) => {
    switch(action.type) {
        case 'RESET_STATES':
            let  newState = {}
            newState = {
                ...state,
                todo: {}
            }
            return appReducer(newState, action)
        default:
            return appReducer(state, action)
    }
}

export default rootReducer