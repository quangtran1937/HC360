import * as ActionsTypes from '../actions/type';
import * as Contants from '../constants/index';
import _ from 'lodash';



const defaultState = {
    page : 1,
    rowIndex : null,
    flatListReady : false,
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

const getListLeaveRequestReducer = (state = defaultState, action) => {
    switch (action.type) {

        case ActionsTypes.GET_LIST_LEAVE_REQUEST_PENDING:

            return {
                ...state,
                loading1: true,
                error: ''
            };
        case ActionsTypes.GET_LIST_LEAVE_REQUEST_SUCCESS:
        // console.log(action.DataList)
            return {
                ...state,
                page : 1,
                rowIndex : null,
                flatListReady : false,
                loading1: false,
                loading2: (action.DataList && action.DataList.length < Contants.PAGE_SIZE) ? false : true,
                error: '',
                DataList: action.DataList
            };
        case ActionsTypes.GET_LIST_LEAVE_REQUEST_ERROR:
            return {
                ...state,
                loading1: false,
                error: action.error
            };


        case ActionsTypes.UPDATE_ROW_INDEX_LIST_LEAVE_REQUEST:
            return {
                ...state,
                rowIndex : action.rowIndex
            };

        case ActionsTypes.UPDATE_FLATLIST_READY_LIST_LEAVE_REQUEST:
            return {
                ...state,
                flatListReady : action.val
            };

        case ActionsTypes.LOAD_MORE_LIST_LEAVE_REQUEST_PENDING:
            return {
                ...state,
                error2: null,
                page : state.page + 1
            };
        case ActionsTypes.LOAD_MORE_LIST_LEAVE_REQUEST_SUCCESS:
            return {
                ...state,
                loading2: (action.DataList && action.DataList.length < Contants.PAGE_SIZE) ? false : true,
                error2: null,
                DataList: [...state.DataList, ...action.DataList],
            };
        case ActionsTypes.LOAD_MORE_LIST_LEAVE_REQUEST_ERROR:
            return {
                ...state,
                loading2: false,
                error2: action.error,
            };
        default:
            break;
    }

    return state;
};



export default getListLeaveRequestReducer;

