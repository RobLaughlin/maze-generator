import * as ACTIONS from '../actions/Dimensions.types';
import produce from 'immer';
import DefaultState from '../default.state';

export const dimensionReducer = function(state = DefaultState.dimensions, action) {
    switch (action.type) {
        case ACTIONS.UPDATE_WIDTH:
            return produce(state, newState => { 
                newState.width.val = action.payload.width.val;
                newState.width.max = (action.payload.width.max !== undefined) ? action.payload.width.max : newState.width.max;
                newState.width.min = (action.payload.width.min !== undefined) ? action.payload.width.min : newState.width.min;
            });
        case ACTIONS.UPDATE_HEIGHT:
            return produce(state, newState => { 
                newState.height.val = action.payload.height.val;
                newState.height.max = (action.payload.height.max !== undefined) ? action.payload.height.max : newState.height.max;
                newState.height.min = (action.payload.height.min !== undefined) ? action.payload.height.min : newState.height.min;
            });
        case ACTIONS.UPDATE_DENSITY:
            return produce(state, newState => { 
                newState.density.val = action.payload.density.val;
                newState.density.max = (action.payload.density.max !== undefined) ? action.payload.density.max : newState.density.max;
                newState.density.min = (action.payload.density.min !== undefined) ? action.payload.density.min : newState.density.min;
            });
        default:
            return state;
    }
}