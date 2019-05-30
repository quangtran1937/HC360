import React, { Component } from 'react';
import { Text, View } from 'react-native';
import EmployeesDetail from '../../modules/employeesModule/components/EmployeesDetail';

export default class EmployeesDetailScreen extends Component {

    static navigationOptions = {
        title: 'Profile'

    }

    render() {
        return (
            <EmployeesDetail />
        )
    }
}
