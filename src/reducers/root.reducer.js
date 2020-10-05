import { combineReducers } from 'redux';
import { dimensionReducer } from './Dimensions.reducer';
import { constantsReducer } from './Constants.reducer';
import { generationReducer } from './Generation.reducer';

const RootReducer = combineReducers({
    CONSTANTS: constantsReducer,
    dimensions: dimensionReducer,
    generation: generationReducer
});

export default RootReducer;