import { createStackNavigator } from 'react-navigation';
import SettingScreen from '../screens/StackScreens/SettingScreen';
import LoginScreen from '../screens/StackScreens/LoginScreen';
import LeaveRequestScreen from './StackScreens/LeaveRequestScreen';
import ListLeaveRequestScreen from './StackScreens/ListLeaveRequestScreen';
import LeaveRequestForApprovalScreen from '../screens/StackScreens/LeaveRequestForApprovalScreen';
import LeaveTLScreen from '../screens/StackScreens/LeaveTLScreen';
import HomeScreen from '../screens/StackScreens/HomeScreen';
import EmployeesDetailScreen from './StackScreens/EmployeesDetailScreen';
import colors from '../constants/colors';

const routerConfigs = {
    SettingScreen: {
        screen: SettingScreen
    },
    LoginScreen: {
        screen: LoginScreen
    },
    HomeScreen: {
        screen: HomeScreen
    },
    EmployeesDetailScreen: {
        screen: EmployeesDetailScreen
    },
    ListLeaveRequestScreen: {
        screen: ListLeaveRequestScreen
    },
    LeaveRequestScreen: {
        screen: LeaveRequestScreen
    },
    LeaveRequestForApprovalScreen: {
        screen: LeaveRequestForApprovalScreen
    },
    LeaveTLScreen: {
        screen: LeaveTLScreen
    },

};

const stackNavigatorConfig = {
    defaultNavigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: colors.HEADER,
        },
    },
};

const StackNavigator = createStackNavigator(routerConfigs, stackNavigatorConfig);

export default StackNavigator;