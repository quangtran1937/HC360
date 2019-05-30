import { NavigationActions } from 'react-navigation';

let _navigator;

setTopLevelNavigator = (navigatorRef) => {
    _navigator = navigatorRef;
}

navigate = (routeName, params) => {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

dispatch = (navigateAction) => {
    _navigator.dispatch(navigateAction);
}


// add other navigation functions that you need and export them

export default {
    navigate,
    dispatch,
    setTopLevelNavigator,
}