import DefaultState from '../default.state';
import * as ACTIONS from '../actions/Animation.types';
import produce from 'immer';

export const animationReducer = function(state=DefaultState.animation, action) {
    switch (action.type) {
        case ACTIONS.FRAMERATE_CHANGED:
            return produce(state, newState => { 
                newState.framerate.val = action.payload.framerate 
            });
        case ACTIONS.ANIMATION_ENABLED:
        case ACTIONS.ANIMATION_DISABLED:
            return produce(state, newState => { 
                newState.enabled = action.payload.enabled
            });
        default:
            return state;
    }
}