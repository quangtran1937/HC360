import { combineReducers } from 'redux';
import settingReducer from '../reducers/settingReducer';
import loginReducer from '../reducers/loginReducer';

const authReducer = combineReducers({
    settingReducer,
    loginReducer
});

export default authReducer;