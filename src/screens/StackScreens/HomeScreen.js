import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Home from '../../modules/Home';

export default class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home'

    }

    render() {
        return (
            <Home />
        )
    }
}
