import * as ACTIONS from '../actions/Generation.types';
import produce from 'immer';
import DefaultState from '../default.state';

export const generationReducer = function(state = DefaultState.generation, action) {
    switch (action.type) {
        case ACTIONS.GENERATE_BUTTON_CLICKED:
            return produce(state, newState => { newState.generateBtn = action.payload.generateBtn; });
        case ACTIONS.SOLVE_BUTTON_CLICKED:
            return produce(state, newState => { newState.solveBtn = action.payload.solveBtn; });
        case ACTIONS.SKIP_BUTTON_CLICKED:
            return produce(state, newState => { newState.skipBtn = action.payload.skipBtn; });
        case ACTIONS.EVENTS_CLEARED:
            return produce(state, newState => {
                newState.generateBtn    = action.payload.generateBtn;
                newState.solveBtn       = action.payload.solveBtn;
                newState.skipBtn        = action.payload.skipBtn; 
            });
        case ACTIONS.ACTIVITY_CHANGED:
            return produce(state, newState => { newState.active = action.payload.active; });
        case ACTIONS.ENTRANCE_CHANGED:
            return produce(state, newState => { newState.entrance = action.payload.entrance; });
        default:
            return state;
    }
}