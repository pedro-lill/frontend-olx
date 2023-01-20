import { combineReducers } from 'redux';
import userReducer from './Reducers/userReducers';


export default combineReducers({
    user: userReducer
});
