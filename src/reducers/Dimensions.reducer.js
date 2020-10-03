import * as ACTIONS from '../actions/Dimensions.types';
import produce from 'immer';
import DefaultState from '../default.state';

export const dimensionReducer = function(state = DefaultState, action) {
    switch (action.type) {
        case ACTIONS.UPDATE_WIDTH:
            return produce(state, newState => { newState.width = action.payload.width; });
        case ACTIONS.UPDATE_HEIGHT:
            return produce(state, newState => { newState.height = action.payload.height; });
        case ACTIONS.UPDATE_DENSITY:
            return produce(state, newState => { newState.density = action.payload.density; });
        default:
            return state;
    }
}