import * as ActionTypes from '../actions/type';

const defaultState = {
    loading: false,
    error: null,
    Id: '',
    FirstName: '',
    LastName: '',
    Email: '',
    CellPhoneNo: '',
    WorkPhoneExt: '',
    DayOfBirth: '',
    MonthOfBirth: '',
    YearOfBirth: '',
    JobTitleName: '',
    CompanyName: ''
}

const employeesDetailReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.EMPLOYEES_DETAIL_PENDING:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.EMPLOYEES_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                Id: action.Id,
                FirstName: action.FirstName,
                LastName: action.LastName,
                Email: action.Email,
                CellPhoneNo: action.CellPhoneNo,
                WorkPhoneExt: action.WorkPhoneExt,
                DayOfBirth: action.DayOfBirth,
                MonthOfBirth: action.MonthOfBirth,
                YearOfBirth: action.YearOfBirth,
                JobTitleName: action.JobTitleName,
                CompanyName: action.CompanyName
            };
        case ActionTypes.EMPLOYEES_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.Error,
            };
        default:
            break;
    }
    return state;
};

export default employeesDetailReducer;
