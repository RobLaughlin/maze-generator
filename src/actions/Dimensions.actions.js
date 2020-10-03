import * as ACTIONS from './Dimensions.types';

export function changeWidth(width, max, min) {
    return {
        type: ACTIONS.UPDATE_WIDTH,
        payload: {
            width: {
                max: max,
                min: min,
                val: width
            }
        }
    }
}

export function changeHeight(height, max, min) {
    return {
        type: ACTIONS.UPDATE_HEIGHT,
        payload: {
            height: {
                max: max,
                min: min,
                val: height
            }
        }
    }
}

export function changeDensity(density, max, min) {
    return {
        type: ACTIONS.UPDATE_DENSITY,
        payload: {
            density: {
                val: density,
                max: max,
                min: min
            }

        }
    }
}