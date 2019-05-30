import { put, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../authModule/actions/types';
import axios from 'axios';
import { Alert, AsyncStorage } from 'react-native';
import NavigationService from '../../helpers/NavigationService';
import configs from '../../constants/configs';




function* SETTING(action) {
    try {
        yield put({ type: ActionTypes.SETTING_PENDING });
        const path = action.path;
        const workspace = action.workspace;
        if (path === '') {
            pathURL = 'http://training.hc360.vn:8088'
        } else {
            pathURL = path
        }
        if (workspace === '') {
            workspaceURL = 'cmsws'
        } else {
            workspaceURL = workspace
        }
        const url = pathURL + "/ords/" + workspaceURL + "/square" + "/CheckServer";
        // console.log(url)
        const response = yield axios.get(url)
        // console.log(response.data);
        if (response.data.result === 'success') {
            yield AsyncStorage.setItem('url', url);
            yield put({
                type: ActionTypes.SETTING_SUCCESS,
            });

            yield put({
                type: ActionTypes.LOGIN_RELOAD,
            });

            NavigationService.navigate('LoginScreen');
        } else {
            yield put({
                type: ActionTypes.SETTING_ERROR,
                error: action.error
            });
        }
    } catch (exception) {

        console.log('SAGA ERROR (authSagas):', exception);
        yield put({
            type: ActionTypes.SETTING_ERROR,
            error: 'HC360 Server URL is invalid. Please try again!'
        });
    }
}

function* LOGIN(action) {
    try {
        yield put({ type: ActionTypes.LOGIN_PENDING });
        const userBook = 'anh.phan@squaregroup.com.vn';
        const passwordBook = 'nguyetanh123';

        const userApprove = 'khanh.nguyen@squaregroup.com.vn';
        const passwordApprove = '123456789';

        const val_user = action.user == '' ?  userBook :  action.user;
        const val_password = action.password == '' ? passwordBook : action.password;
        const response = yield axios.post(configs.LOGIN, {
            user: val_user,
            password: val_password 
        });
        console.log(response.data);
        if (response.data.result === 'success') {
            const token = response.data.token;
            const hc360EmployeeId = response.data.user.hc360EmployeeId;
            yield AsyncStorage.setItem('token', token);
            yield AsyncStorage.setItem('hc360EmployeeId', JSON.stringify(hc360EmployeeId));
            yield put({
                type: ActionTypes.LOGIN_SUCCESS,
                token: token,
                hc360EmployeeId: hc360EmployeeId
            });
            NavigationService.navigate('HomeScreen');
        } else {
            yield put({
                type: ActionTypes.LOGIN_ERROR,
                error: response.data.errorMessage
            });
        }
    } catch (exception) {
        console.log('SAGA ERROR (authSagas):', exception);
    }
}

export default function* sagas() {
    yield takeLatest(ActionTypes.SETTING, SETTING);
    yield takeLatest(ActionTypes.LOGIN, LOGIN);
}
