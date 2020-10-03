import { createStore } from 'redux';
import RootReducer from './reducers/Root.reducer';
import DefaultState from './default.state';

const store = createStore(RootReducer, DefaultState);
export default store;