import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers'

const configureStore = () => {
    const middlewares = [ thunk ]

    /*eslint-disable no-underscore-dangle*/
    return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware( ...middlewares )
    )
}

export default configureStore