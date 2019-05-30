import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

const { width, height } = Dimensions.get('window');

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerMenu}>
                    <TouchableOpacity style={styles.containerButton}
                        onPress={() => {
                            this.props.navigation.navigate('EmployeesDetailScreen')
                        }}>
                        <Icon name='id-card' color={colors.ICON} size={35} />
                        <Text>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerButton}
                        onPress={() => {
                            this.props.navigation.navigate('ListLeaveRequestScreen')
                        }} >
                        <Icon name='clipboard' color={colors.ICON} size={35} />
                        <Text>Leave request</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerButton}
                        onPress={() => {
                            this.props.navigation.navigate('LeaveRequestForApprovalScreen')
                        }} >
                        <Icon name='tasks' color={colors.ICON} size={35} />
                        <Text> Manager </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

// ----- Định dạng CSS -----//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
        padding: 5
    },
    containerMenu: {
        height: 80,
        flexDirection: 'row'
    },
    containerButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default withNavigation(Home);
