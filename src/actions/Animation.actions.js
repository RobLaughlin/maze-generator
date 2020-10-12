import * as ACTIONS from './Animation.types';

export function setFramerate(val) {
    return {
        type: ACTIONS.FRAMERATE_CHANGED,
        payload: {
            framerate: val
        }
    }
}