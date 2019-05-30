import { all, fork } from 'redux-saga/effects';
import authSagas from '../modules/authModule/authSagas';
import leaveSagas from '../modules/leaveModule/leaveSagas';
import employeesSagas from '../modules/employeesModule/employeesSagas';

export default function* rootSagas() {
    yield all([
        fork(authSagas),
        fork(leaveSagas),
        fork(employeesSagas)
    ]);
}