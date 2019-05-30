import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Login from '../../modules/authModule/components/Login';

export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <Login />
        )
    }
}
