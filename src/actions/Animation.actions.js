import * as ACTIONS from './Animation.types';

export function setFramerate(val) {
    return {
        type: ACTIONS.FRAMERATE_CHANGED,
        payload: {
            framerate: val
        }
    }
}

export function enable() {
    return {
        type: ACTIONS.ANIMATION_ENABLED,
        payload: {
            enabled: true
        }
    }
}

export function disable() {
    return {
        type: ACTIONS.ANIMATION_DISABLED,
        payload: {
            enabled: false
        }
    }
}