import * as ActionsTypes from '../actions/type';

const defaultState = {
    loading: false,
    error: '',
    data: []
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
            return {
                ...state,
                loading: false,
                error: '',
                data: action.data

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