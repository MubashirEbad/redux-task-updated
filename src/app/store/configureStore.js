import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../Redux - Reducers/index';

export default function configureStore(initialState){
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    )
}