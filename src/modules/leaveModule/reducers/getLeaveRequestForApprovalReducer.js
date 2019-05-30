import * as ActionsTypes from '../actions/type';
import * as Contants from '../constants/index';
import _ from 'lodash';



const defaultState = {
    loading1: false,
    loading2: true,
    loading3: false,
    loading4: false,
    error1: '',
    error2: '',
    error3: '',
    error4: '',
    DataList: [],
};

const getLeaveRequestForApprovalReducer = (state = defaultState, action) => {
    switch (action.type) {

        case ActionsTypes.GET_LEAVE_REQUEST_FOR_APPROVAL_PENDING:
            return {
                ...state,
                loading1: true,
                error: ''
            };
        case ActionsTypes.GET_LEAVE_REQUEST_FOR_APPROVAL_SUCCESS:
            return {
                ...state,
                loading2: (action.DataList && action.DataList.length < Contants.PAGE_SIZE) ? false : true,
                loading1: false,
                error: '',
                DataList: action.DataList
            };
        case ActionsTypes.GET_LEAVE_REQUEST_FOR_APPROVAL_ERROR:
            return {
                ...state,
                loading1: false,
                error: action.error
            };
        case ActionsTypes.LOAD_MORE_LEAVE_REQUEST_FOR_APPROVAL_PENDING:
            return {
                ...state,
                error2: null,
            };
        case ActionsTypes.LOAD_MORE_LEAVE_REQUEST_FOR_APPROVAL_SUCCESS:
            console.log(action.DataList)
            return {
                ...state,
                loading2: (action.DataList && action.DataList.length < Contants.PAGE_SIZE) ? false : true,
                error2: null,
                DataList: [...state.DataList, ...action.DataList],
            };
        case ActionsTypes.LOAD_MORE_LEAVE_REQUEST_FOR_APPROVAL_ERROR:
            return {
                ...state,
                loading2: false,
                error2: action.error,
            };
        case ActionsTypes.APPROVE_LEAVE_REQUEST_PENDING:
            return {
                ...state,
                loading3: true,
                error3: null
            };
        case ActionsTypes.APPROVE_LEAVE_REQUEST_SUCCESS:
            var newData = state.DataList.filter(e => e.ID != action.ID)
            return {
                ...state,
                DataList: newData,
                loading3: false,
                error3: null
            };
        case ActionsTypes.APPROVE_LEAVE_REQUEST_ERROR:
            return {
                ...state,
                loading3: false,
                error3: action.error
            };
        case ActionsTypes.REJECT_LEAVE_REQUEST_PENDING:
            return {
                ...state,
                loading4: true,
                error4: null
            };
        case ActionsTypes.REJECT_LEAVE_REQUEST_SUCCESS:
            var newData = state.DataList.filter(e => e.ID != action.ID)
            return {
                ...state,
                DataList: newData,
                loading4: false,
                error4: null
            };
        case ActionsTypes.REJECT_LEAVE_REQUEST_ERROR:
            return {
                ...state,
                loading4: false,
                error4: action.error
            };
        default:
            break;
    }
    return state;
};

export default getLeaveRequestForApprovalReducer;

