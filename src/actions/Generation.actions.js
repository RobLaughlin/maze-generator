import * as ACTIONS from './Generation.types';

export function generate() {
    return {
        type: ACTIONS.GENERATE_BUTTON_CLICKED,
        payload: {
            generate: true,
            active: true
        }
    };
}

export function solve() {
    return {
        type: ACTIONS.SOLVE_BUTTON_CLICKED,
        payload: {
            active: true,
            solve: true 
        }
    };
}

export function skip() {
    return {
        type: ACTIONS.SKIP_BUTTON_CLICKED,
        payload: { 
            skip: true,
            active: false
         }
    }
}

export function stop() {
    return {
        type: ACTIONS.GENERATION_HALTED,
        payload: {
            generate: false,
            active: false,
            solve: false,
            skip: false
        }
    }
}

export function clearHandlers() {
    return {
        type: ACTIONS.EVENTS_RECEIVED,
        payload: {
            generate: false,
            solve: false,
            skip: false
        }
    }
}

export function changeEntrance(entrance) {
    return {
        type: ACTIONS.ENTRANCE_CHANGED,
        payload: { entrance: entrance }
    }
}