import { put, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from './actions/type';
import axios from 'axios';
import { AsyncStorage, Alert } from 'react-native';
import configs from '../../constants/configs';


function* EMPLOYEES_DETAIL(action) {
    try {
        const token = yield AsyncStorage.getItem('token');
        const EmployeeId = yield AsyncStorage.getItem('hc360EmployeeId');
        yield put({ type: ActionTypes.EMPLOYEES_DETAIL_PENDING })
        const hc360EmployeeId = action.hc360EmployeeId;
        const response = yield axios.get(configs.EMPLOYEES_DETAIL + hc360EmployeeId,
            {
                headers: {
                    'Authorization': token,
                    'EmployeeId': EmployeeId
                }
            });
        console.log(response);
        if (response.data.ErrorCode === 0) {
            const Id = response.data.Data.Id;
            const FirstName = response.data.Data.FirstName;
            const LastName = response.data.Data.LastName;
            const Email = response.data.Data.Email;
            const CellPhoneNo = response.data.Data.CellPhoneNo;
            const WorkPhoneExt = response.data.Data.WorkPhoneExt;
            const DayOfBirth = response.data.Data.DayOfBirth;
            const MonthOfBirth = response.data.Data.MonthOfBirth;
            const YearOfBirth = response.data.Data.YearOfBirth;
            const JobTitleName = response.data.Data.JobTitleName;
            const CompanyName = response.data.Data.CompanyName;
            yield put({
                type: ActionTypes.EMPLOYEES_DETAIL_SUCCESS,
                Id: Id,
                FirstName: FirstName,
                LastName: LastName,
                Email: Email,
                CellPhoneNo: CellPhoneNo,
                WorkPhoneExt: WorkPhoneExt,
                DayOfBirth: DayOfBirth,
                MonthOfBirth: MonthOfBirth,
                YearOfBirth: YearOfBirth,
                JobTitleName: JobTitleName,
                CompanyName: CompanyName
            })
        }
        else {
            yield put({
                type: ActionTypes.EMPLOYEES_DETAIL_ERROR,
                error: response.data.Error
            })
        }
    }
    catch (exception) {
        console.log('SAGA ERROR (employeesSagas):', exception)
    }
}

export default function* sagas() {
    yield takeLatest(ActionTypes.EMPLOYEES_DETAIL, EMPLOYEES_DETAIL);
}