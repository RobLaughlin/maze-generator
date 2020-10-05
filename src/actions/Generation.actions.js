import * as ACTIONS from './Generation.types';

export function generate() {
    return {
        type: ACTIONS.START,
        payload: { 
            start: true,
            solve: false
        }
    };
}

export function solve() {
    return {
        type: ACTIONS.SOLVE,
        payload: { 
            start: true,
            solve: true,
        }
    };
}

export function stop() {
    return {
        type: ACTIONS.STOP,
        payload: {
            start: false,
            solve: false,
        }
    }
}

export function changeEntrance(entrance) {
    return {
        type: ACTIONS.ENTRANCE_CHANGED,
        payload: { entrance: entrance }
    }
}

export function setActivity(active) {
    return {
        type: ACTIONS.ACTIVITY_CHANGED,
        payload: { active: active }
    }
}