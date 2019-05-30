import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Styles from '../../Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import LeaveTimeLine from '../../modules/leaveModule/components/LeaveTimeLine';

class HeaderTitle extends Component {
    render() {
        return (
            <View style={[Styles.headerContainer]}>
                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Icon name='cogs' color='#FFF' size={23} />
                </View>
                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#FFF', fontWeight: '700' }}> Cài đặt hệ thống</Text>
                </View>
                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}></View>
            </View>
        )
    }
}

export default class SettingScreen extends Component {

    static navigationOptions = {
        // headerTitle: <HeaderTitle />,
        headerStyle: {
            backgroundColor: '#29AAE3',
        },
    }

    render() {
        return (
            <LeaveTimeLine />
        )
    }
}