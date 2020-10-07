import * as ACTIONS from './Dimensions.types';

export function changeWidth(width, max, min) {
    return {
        type: ACTIONS.WIDTH_CHANGED,
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
        type: ACTIONS.HEIGHT_CHANGED,
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
        type: ACTIONS.DENSITY_CHANGED,
        payload: {
            density: {
                val: density,
                max: max,
                min: min
            }

        }
    }
}

export function setMazeDims(width, height) {
    return {
        type: ACTIONS.MAZEDIMS_CHANGED,
        payload: {
            mazeDims: {
                width: width,
                height: height
            }

        }
    }
}