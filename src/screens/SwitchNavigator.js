import { createSwitchNavigator } from 'react-navigation';
import StackNavigator from '../screens/StackNavigator';

const routerConfig = {
    StackNavigator: StackNavigator
};

const switchNavigatorConfig = {};

const SwitchNavigator = createSwitchNavigator(routerConfig, switchNavigatorConfig);

export default SwitchNavigator;

