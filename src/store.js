import { createStore } from 'redux';
import RootReducer from './reducers/root.reducer';
import DefaultState from './default.state';

const store = createStore(RootReducer, DefaultState);
export default store;