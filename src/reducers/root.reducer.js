import { combineReducers } from 'redux';
import { dimensionReducer } from './Dimensions.reducer';
import { constantsReducer } from './Constants.reducer';
import { generationReducer } from './Generation.reducer';
import { animationReducer } from './Animation.reducer';

const RootReducer = combineReducers({
    CONSTANTS: constantsReducer,
    dimensions: dimensionReducer,
    generation: generationReducer,
    animation: animationReducer
});

export default RootReducer;