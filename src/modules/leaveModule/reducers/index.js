import { combineReducers } from 'redux';
import createNewLeaveRequestReducer from './createNewLeaveRequestReducer';
import getLeaveRequestTypeReducer from './getLeaveRequestTypeReducer';
import getLeaveRequestForApprovalReducer from './getLeaveRequestForApprovalReducer';
import getListLeaveRequestReducer from './getListLeaveRequestReducer';


const laeveReducer = combineReducers({
    getLeaveRequestTypeReducer,
    createNewLeaveRequestReducer,
    getLeaveRequestForApprovalReducer,
    getListLeaveRequestReducer,
});

export default laeveReducer;