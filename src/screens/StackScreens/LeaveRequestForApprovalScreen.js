import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Styles from '../../Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import LeaveRequestForApproval from '../../modules/leaveModule/components/LeaveRequestForApproval';
import NavigationService from '../../helpers/NavigationService'




export default class LeaveRequestForApprovalScreen extends Component {

    static navigationOptions = {
        title: 'Leave Request Manager'

    }

    render() {
        return (
            <LeaveRequestForApproval />
        )
    }
}
