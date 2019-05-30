import { put, takeLatest, call } from 'redux-saga/effects';
import * as ActionsTypes from '../leaveModule/actions/type';
import * as Contants from '../leaveModule/constants/index';
import axios from 'axios';
import { ToastAndroid, AsyncStorage } from 'react-native';
import NavigationService from '../../helpers/NavigationService';
import configs from '../../constants/configs';

function* GET_LIST_LEAVE_REQUEST(action) {
    try {
        const token = yield AsyncStorage.getItem('token');
        const employeeID = yield AsyncStorage.getItem('hc360EmployeeId');
        // console.log(token);
        // console.log(employeeID);
        yield put({ type: ActionsTypes.GET_LIST_LEAVE_REQUEST_PENDING })
        const response = yield axios.get(configs.LIST_LEAVE_REQUEST,
            {
                headers: {
                    'Authorization': token,
                    'EmployeeId': employeeID,
                    'page': action.page,
                    'Pagesize': Contants.PAGE_SIZE
                }
            });

        const DataList = response.data.Data.DataList;
        yield put({
            type: ActionsTypes.GET_LIST_LEAVE_REQUEST_SUCCESS,
            DataList: DataList
        })
    }
    catch (exception) {
        console.log('SAGA ERROR (leaveSagas):', exception);
        yield put({
            type: ActionsTypes.GET_LIST_LEAVE_REQUEST_ERROR,
            error: exception
        })
    }
}

function* LOAD_MORE_LIST_LEAVE_REQUEST(action) {
    try {
        const token = yield AsyncStorage.getItem('token');
        const employeeID = yield AsyncStorage.getItem('hc360EmployeeId');
        yield put({ type: ActionsTypes.LOAD_MORE_LIST_LEAVE_REQUEST_PENDING })
        // console.log(action.page);
        const response = yield axios.get(configs.LIST_LEAVE_REQUEST,
            {
                headers: {
                    'Authorization': token,
                    'EmployeeId': employeeID,
                    'page': action.page,
                    'Pagesize': Contants.PAGE_SIZE
                }
            });
        // console.log(response.data);
        const DataList = response.data.Data.DataList;
        yield put({
            type: ActionsTypes.LOAD_MORE_LIST_LEAVE_REQUEST_SUCCESS,
            DataList: DataList,
        })
    }
    catch (exception) {
        console.log('SAGA ERROR (leaveSagas):', exception);
        yield put({
            type: ActionsTypes.LOAD_MORE_LIST_LEAVE_REQUEST_ERROR,
            error: exception
        })
    }
}

function* GET_LEAVE_REQUEST_TYPE(action) {
    try {
        const token = yield AsyncStorage.getItem('token');
        const employeeId = yield AsyncStorage.getItem('hc360EmployeeId');
        yield put({ type: ActionsTypes.GET_LEAVE_REQUEST_TYPE_PENDING });
        const response = yield axios.get(configs.LIST_LEAVE_REQUEST_TYPE, {
            headers: {
                'Authorization': token,
                'EmployeeId': employeeId
            }
        });
        const data = response.data.Data;
        yield put({
            type: ActionsTypes.GET_LEAVE_REQUEST_TYPE_SUCCESS,
            data: data
        })
    }
    catch (exception) {
        console.log('SAGA ERROR (leaveSagas):', exception);
        yield put({
            type: ActionsTypes.GET_LEAVE_REQUEST_TYPE_ERROR,
            error: response.data.Error
        })
    }
}

function* CREATE_NEW_LEAVE_REQUEST(action) {
            // yield* GET_LIST_LEAVE_REQUEST({page:1});
            // NavigationService.navigate('ListLeaveRequestScreen');
    try {
        const token = yield AsyncStorage.getItem('token');
        const employeeId = yield AsyncStorage.getItem('hc360EmployeeId');
        yield put({ type: ActionsTypes.CREATE_NEW_LEAVE_REQUEST_PENDING });
        const data = 
        {
            EmployeeID: parseInt(employeeId),
            LeaveTypeId: action.LeaveTypeId,
            startDate: action.startDate,
            endDate: action.endDate,
            startTime: action.startTime,
            endTime: action.endTime,
            reliefEmployeeId: action.reliefEmployeeId,
            daysOff: action.daysOff,
            Note: action.Note
        };  

        console.log(data);

        const response = yield axios.post(configs.CREATE_NEW_LEAVE_REQUEST, data , {
                headers: {
                    'Authorization': token
                }
            });
        // console.log(response.data);
        if (response.data.result === 'fail') {
            yield put({
                type: ActionsTypes.CREATE_NEW_LEAVE_REQUEST_ERROR,
                error: response.data.errorMessage
            })
        }
        else {
            yield put({
                type: ActionsTypes.CREATE_NEW_LEAVE_REQUEST_SUCCESS
            })
            // ToastAndroid.show(
            //     'Lưu thành công',
            //     // ToastAndroid.SHORT,
            //     ToastAndroid.BOTTOM
            // )

            yield* GET_LIST_LEAVE_REQUEST({page:1});
            NavigationService.navigate('ListLeaveRequestScreen');
        }
    } catch (exception) {
        console.log('SAGA ERROR (leaveSagas):', exception);
    }
}

function* GET_LEAVE_REQUEST_FOR_APPROVAL(action) {
    try {
        const token = yield AsyncStorage.getItem('token');
        const employeeID = yield AsyncStorage.getItem('hc360EmployeeId');
        yield put({ type: ActionsTypes.GET_LEAVE_REQUEST_FOR_APPROVAL_PENDING })
        const response = yield axios.get(configs.LIST_LEAVE_REQUEST_FOR_APPROVAL,
            {
                headers: {
                    'Authorization': token,
                    'approvalEmployeeId': employeeID,
                    'page': action.page,
                    'Pagesize': Contants.PAGE_SIZE
                }
            });
        console.log(response.data);
        const DataList = response.data.Data.DataList;
        yield put({
            type: ActionsTypes.GET_LEAVE_REQUEST_FOR_APPROVAL_SUCCESS,
            DataList: DataList
        })
    }
    catch (exception) {
        console.log('SAGA ERROR (leaveSagas):', exception);
        yield put({
            type: ActionsTypes.GET_LEAVE_REQUEST_FOR_APPROVAL_ERROR,
            error: exception
        })
    }
}

function* LOAD_MORE_LEAVE_REQUEST_FOR_APPROVAL(action) {
    try {
        const token = yield AsyncStorage.getItem('token');
        const employeeID = yield AsyncStorage.getItem('hc360EmployeeId');
        yield put({ type: ActionsTypes.LOAD_MORE_LEAVE_REQUEST_FOR_APPROVAL_PENDING })
        const response = yield axios.get(configs.LIST_LEAVE_REQUEST_FOR_APPROVAL,
            {
                headers: {
                    'Authorization': token,
                    'approvalEmployeeId': employeeID,
                    'page': action.page,
                    'Pagesize': Contants.PAGE_SIZE
                }
            });
        console.log(response.data);
        const DataList = response.data.Data.DataList;
        yield put({
            type: ActionsTypes.LOAD_MORE_LEAVE_REQUEST_FOR_APPROVAL_SUCCESS,
            DataList: DataList,
        })
    }
    catch (exception) {
        console.log('SAGA ERROR (leaveSagas):', exception);
        yield put({
            type: ActionsTypes.LOAD_MORE_LEAVE_REQUEST_FOR_APPROVAL_ERROR,
            error: exception
        })
    }
}

function* APPROVE_LEAVE_REQUEST(action) {
    try {
        const token = yield AsyncStorage.getItem('token');
        yield put({ type: ActionsTypes.APPROVE_LEAVE_REQUEST_PENDING });
        const response = yield axios.post(configs.LEAVE_REQUEST_APPROVE, {},
            {
                headers: {
                    'Authorization': token,
                    'leaveRequestId': action.ID
                }
            });
        console.log(response.data);
        // const ID = response.data.Data.Id;
        console.log()
        yield put({
            type: ActionsTypes.APPROVE_LEAVE_REQUEST_SUCCESS,
            ID: action.ID
        });
    }
    catch (exception) {
        console.log('SAGA ERROR (leaveSagas):', exception);
        yield put({
            type: ActionsTypes.APPROVE_LEAVE_REQUEST_ERROR,
            error: exception
        })
    }
}

function* REJECT_LEAVE_REQUEST(action) {
    try {

        const token = yield AsyncStorage.getItem('token');
        yield put({ type: ActionsTypes.REJECT_LEAVE_REQUEST_PENDING });
        const response = yield axios.post(configs.LEAVE_REQUEST_REJECT, {},
            {
                headers: {
                    'Authorization': token,
                    'leaveRequestId': action.ID
                }
            });
        console.log(response.data);
        yield put({
            type: ActionsTypes.REJECT_LEAVE_REQUEST_SUCCESS,
            ID: action.ID
        });
    }
    catch (exception) {
        console.log('SAGA ERROR (leaveSagas):', exception);
        yield put({
            type: ActionsTypes.REJECT_LEAVE_REQUEST_ERROR,
            error: exception
        })
    }
}




export default function* sagas() {
    yield takeLatest(ActionsTypes.GET_LIST_LEAVE_REQUEST, GET_LIST_LEAVE_REQUEST);
    yield takeLatest(ActionsTypes.LOAD_MORE_LIST_LEAVE_REQUEST, LOAD_MORE_LIST_LEAVE_REQUEST);
    yield takeLatest(ActionsTypes.GET_LEAVE_REQUEST_TYPE, GET_LEAVE_REQUEST_TYPE);
    yield takeLatest(ActionsTypes.CREATE_NEW_LEAVE_REQUEST, CREATE_NEW_LEAVE_REQUEST);
    yield takeLatest(ActionsTypes.GET_LEAVE_REQUEST_FOR_APPROVAL, GET_LEAVE_REQUEST_FOR_APPROVAL);
    yield takeLatest(ActionsTypes.LOAD_MORE_LEAVE_REQUEST_FOR_APPROVAL, LOAD_MORE_LEAVE_REQUEST_FOR_APPROVAL);
    yield takeLatest(ActionsTypes.APPROVE_LEAVE_REQUEST, APPROVE_LEAVE_REQUEST);
    yield takeLatest(ActionsTypes.REJECT_LEAVE_REQUEST, REJECT_LEAVE_REQUEST);
}
