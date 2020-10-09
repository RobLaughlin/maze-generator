import * as ACTIONS from './Generation.types';

export function generate() {
    return {
        type: ACTIONS.GENERATE_BUTTON_CLICKED,
        payload: { 
            generateBtn: true
        }
    };
}

export function solve() {
    return {
        type: ACTIONS.SOLVE_BUTTON_CLICKED,
        payload: { 
            solveBtn: true,
        }
    };
}

export function skip() {
    return {
        type: ACTIONS.SKIP_BUTTON_CLICKED,
        payload: { 
            skipBtn: true
        }
    }
}

export function clearHandlers() {
    return {
        type: ACTIONS.EVENTS_CLEARED,
        payload: {
            generateBtn: false,
            solveBtn: false,
            skipBtn: false
        }
    }
}

export function active(activity) {
    return {
        type: ACTIONS.ACTIVITY_CHANGED,
        payload: {
            active: activity
        }
    }
}

export function changeEntrance(entrance) {
    return {
        type: ACTIONS.ENTRANCE_CHANGED,
        payload: { entrance: entrance }
    }
}