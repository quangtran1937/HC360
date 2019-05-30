import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Setting from '../../modules/authModule/components/Setting';
import Styles from '../../Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class SettingScreen extends Component {

    static navigationOptions = {
        title: 'Setting URL'

    }

    render() {
        return (
            <Setting />
        )
    }
}

// ----- Nối các state vào props của View Component -----//
const mapStateToProps = (state) => ({

});

// ----- Nối các function vào props của View Component -----//
const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SettingScreen));
