import * as types from '../Redux - Action Creators/actionTypes';

const initialState = [];

export function insertDataReducer(state = initialState, action){
switch(action.type){
    case types.LOAD_BOOKS_DATA_SUCCESS:
        return action.booksRecords;
    default:
        return [];
    }
}