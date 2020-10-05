import * as ACTIONS from '../actions/Generation.types';
import produce from 'immer';
import DefaultState from '../default.state';

export const generationReducer = function(state = DefaultState.generation, action) {
    switch (action.type) {
        case ACTIONS.START:
        case ACTIONS.STOP:
        case ACTIONS.SOLVE:
            return produce(state, newState => { 
                newState.start = action.payload.start;
                newState.solve = action.payload.solve;
            });
        case ACTIONS.ACTIVITY_CHANGED:
            return produce(state, newState => {
                newState.active = action.payload.active;
            });
        case ACTIONS.ENTRANCE_CHANGED:
            return produce(state, newState => { 
                newState.entrance = action.payload.entrance; 
            });
        default:
            return state;
    }
}