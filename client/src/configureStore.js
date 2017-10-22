import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers'
import throttle from 'lodash/throttle'
import { getState, saveState } from '../src/servise/storage'



const configureStore = () => {
    const middlewares = [ thunk ]

    const persistedState = getState()

    /*eslint-disable no-underscore-dangle*/
    const store =  createStore(
        rootReducer,
        persistedState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware( ...middlewares )
    )

    store.subscribe(throttle(() => {
        saveState(store.getState())
    }, 1000));

    return store
}

export default configureStore