import { combineReducers } from 'redux';
import employeesDetailReducer from '../reducers/employeesDetailReducer';

const employeesReducer = combineReducers({
    employeesDetailReducer,
})

export default employeesReducer;