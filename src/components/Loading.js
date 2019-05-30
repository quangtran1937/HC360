import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

export default class Loading extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}>
                <ActivityIndicator color='#29AAE3' size="large" />
            </View>
        )
    }
}
