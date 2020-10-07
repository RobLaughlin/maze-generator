import * as ACTIONS from '../actions/Generation.types';
import produce from 'immer';
import DefaultState from '../default.state';

export const generationReducer = function(state = DefaultState.generation, action) {
    switch (action.type) {
        case ACTIONS.GENERATE_BUTTON_CLICKED:
            return produce(state, newState => { 
                newState.active = action.payload.active;
            });
        case ACTIONS.SOLVE_BUTTON_CLICKED:
            return produce(state, newState => { 
                newState.solve = action.payload.solve; 
                newState.active = action.payload.active;
            });
        case ACTIONS.SKIP_BUTTON_CLICKED:
            return produce(state, newState => { 
                newState.skip = action.payload.skip;
                newState.active = action.payload.active;
            });
        case ACTIONS.GENERATION_HALTED:
            return produce(state, newState => {
                newState.active = action.payload.active;
                newState.skip = action.payload.skip;
                newState.generate = action.payload.generate;
                newState.solve = action.payload.solve;
            });
        case ACTIONS.ENTRANCE_CHANGED:
            return produce(state, newState => { newState.entrance = action.payload.entrance; });
        default:
            return state;
    }
}