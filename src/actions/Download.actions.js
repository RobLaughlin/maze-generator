import * as ACTIONS from './Download.types';

export function downloadClicked(click) {
    return {
        type: ACTIONS.DOWNLOAD_CLICKED,
        payload: {
            clicked: click 
        }
    }
}