import * as ActionsTypes from '../actions/type';

const defaultState = {
    loading: false,
    error: ''
};

const createNewLeaveRequestReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionsTypes.CREATE_NEW_LEAVE_REQUEST_PENDING:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ActionsTypes.CREATE_NEW_LEAVE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ActionsTypes.CREATE_NEW_LEAVE_REQUEST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            break;
    }
    return state;
};

export default createNewLeaveRequestReducer;