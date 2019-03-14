import { combineReducers }from 'redux';
import { insertDataReducer } from '../Redux - Reducers/booksDataReducer';
import { updateLoadingIconStatus } from '../Redux - Reducers/updateLoadingIconReducer';

const rootReducer = combineReducers({
    insertDataReducer,
    updateLoadingIconStatus
});


export default rootReducer;