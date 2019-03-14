
import * as types from './actionTypes';

export function loadingIconStatus(status){
    return{
        type: types.LOADING_ICON_STATUS,
        status
    }
    
}

export function updateLoadingIconStatus(status = false){
    return function(dispatch){
        return dispatch(loadingIconStatus(status));
    }
}