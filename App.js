import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import SwitchNavigator from './src/screens/SwitchNavigator';
import { Provider } from 'react-redux';
import { sagaMiddleware } from './src/modules/middlewares';
import rootSagas from './src/modules/rootSagas';
import store from './src/modules/store';
import NavigationService from './src/helpers/NavigationService';
console.disableYellowBox = true;
sagaMiddleware.run(rootSagas);

const AppNavigator = createAppContainer(SwitchNavigator);


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </Provider>
    );
  }
}


