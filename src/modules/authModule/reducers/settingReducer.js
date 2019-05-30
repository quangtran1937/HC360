import * as ActionsTypes from '../actions/types';


const defaultState = {
    loading: false,
    error: null
};

const settingReducer = (state = defaultState, action) => {

    switch (action.type) {
        case ActionsTypes.SETTING_PENDING:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ActionsTypes.SETTING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ActionsTypes.SETTING_ERROR:
            // console.log(action);
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            break;
    }
    return state;
}

export default settingReducer;