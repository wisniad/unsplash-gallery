/*
 * src/store.js
 * With initialState
*/
import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



export default () => {
    const store = createStore(
        combineReducers({
            rootReducer
        }),
        composeEnhancers(
            applyMiddleware(thunk),
        )
    );
    return store;
};