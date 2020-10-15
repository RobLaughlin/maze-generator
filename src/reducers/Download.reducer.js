
import * as ACTIONS from '../actions/Download.types';
import produce from 'immer';
import DefaultState from '../default.state';

export const downloadReducer = function(state = DefaultState.download, action) {
    switch (action.type) {
        case ACTIONS.DOWNLOAD_CLICKED:
            return produce(state, newState => { newState.clicked = action.payload.clicked });
        default:
            return state; 
    }
}