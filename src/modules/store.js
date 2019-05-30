import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from '../modules/authModule/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { middlewares } from '../modules/middlewares';
import leaveReducer from '../modules/leaveModule/reducers';
import employeesReducer from '../modules/employeesModule/reducers';

const rootReducer = combineReducers({
    authReducer,
    leaveReducer,
    employeesReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
