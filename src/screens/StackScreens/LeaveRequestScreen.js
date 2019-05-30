import React, { Component } from 'react';
import { Text, View } from 'react-native';
import LeaveRequest from '../../modules/leaveModule/components/LeaveRequest';
import Styles from '../../Styles';
import Icon from 'react-native-vector-icons/FontAwesome';



export default class LeaveRequestScreen extends Component {

    static navigationOptions = {
        title: 'Leave Request'

    }

    render() {
        return (
            <LeaveRequest />
        )
    }
}