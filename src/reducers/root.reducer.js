import { combineReducers } from 'redux';
import { dimensionReducer } from './Dimensions.reducer';

const RootReducer = combineReducers({
    dimensions: dimensionReducer
});

export default RootReducer;