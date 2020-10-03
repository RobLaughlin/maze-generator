import { combineReducers } from 'redux';
import { dimensionReducer } from './Dimensions.reducer';
import { constantsReducer } from './Constants.reducer';

const RootReducer = combineReducers({
    CONSTANTS: constantsReducer,
    dimensions: dimensionReducer
});

export default RootReducer;