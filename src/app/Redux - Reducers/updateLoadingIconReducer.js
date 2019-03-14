
import * as types from '../Redux - Action Creators/actionTypes';

export function updateLoadingIconStatus(state = false, action) {
    switch (action.type) {
        case types.LOADING_ICON_STATUS:
            return action.status;
            
        default:
            return false;
    }
}