import * as ActionsTypes from '../actions/types';


const defaultState = {
    token: '',
    hc360EmployeeId: '',
    loading: false,
    error: null,
};

const loginReducer = (state = defaultState, action) => {

    switch (action.type) {
        case ActionsTypes.LOGIN_PENDING:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ActionsTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                token: action.token,
                hc360EmployeeId: action.hc360EmployeeId
            };
        case ActionsTypes.LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case ActionsTypes.LOGIN_RELOAD:
            return {
                ...state,
                token: '',
                hc360EmployeeId: '',
                loading: false,
                error: null
            };
        default:
            break;
    }
    return state;
}

export default loginReducer;