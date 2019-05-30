import * as ActionsTypes from '../actions/type';

const defaultState = {
    loading: false,
    error: '',
    data: [],
    firstData : ''
}

const getLeaveRequestTypeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionsTypes.GET_LEAVE_REQUEST_TYPE_PENDING:
            return {
                ...state,
                loading: true,
                error: '',
                data: []

            };
        case ActionsTypes.GET_LEAVE_REQUEST_TYPE_SUCCESS:
            var firstData_val= '';
            if(action.data.length > 0 ){
                firstData_val = action.data[0].LeaveTypeId
            }

            console.log(action.data)
            console.log(action.data.length)
            console.log(firstData_val)
            return {
                ...state,
                loading: false,
                error: '',
                data: action.data,
                firstData : firstData_val

            };
        case ActionsTypes.GET_LEAVE_REQUEST_TYPE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
                data: []
            };
        default:
            break;
    }
    return state;
}

export default getLeaveRequestTypeReducer;