import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, TextInput, ActivityIndicator, AsyncStorage, StyleSheet } from 'react-native';
import bkgSetting from '../../../../Images/bkgSetting.jpg';
import Styles from '../../../Styles';
import { connect } from 'react-redux';
import * as ActionTypes from '../actions/types';
import { withNavigation } from 'react-navigation';
import colors from '../../../constants/colors';




class Setting extends Component {


    constructor(props) {
        super(props);
        this.state = {
            path: '',
            workspace: ''
        }
    }

    componentDidMount() {
        this.getURL();
    }

    getURL = async () => {
        try {
            const value = await AsyncStorage.getItem('url');
            if (value == null) {
                this.props.navigation.navigate('SettingScreen');
            } else {
                this.props.navigation.navigate('LoginScreen');
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[Styles.height_30]}>
                    <Text style={styles.text}>Server URL</Text>
                </View>
                <View style={[Styles.inputContainerST]}>
                    <TextInput
                        autoFocus={false}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={'http://training.hc360.vn:8088'}
                        underlineColorAndroid={'transparent'}
                        placeholderTextColor={'#8395a7'}
                        style={[Styles.textInput]}
                        onChangeText={(text) => { this.setState({ path: text }) }}
                    />
                </View>
                <View style={[Styles.height_5]}></View>
                <View style={[Styles.height_30, Styles.marg_top_20]}>
                    <Text style={styles.text}>Workspace</Text>
                </View>
                <View style={[Styles.inputContainerST]}>
                    <TextInput
                        autoFocus={false}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={'cmsws'}
                        underlineColorAndroid={'transparent'}
                        placeholderTextColor={'#8395a7'}
                        style={[Styles.textInput]}
                        onChangeText={(text) => { this.setState({ workspace: text }) }}
                    />
                </View>
                <View style={styles.containerTextError}><Text style={styles.textError}>{this.props.error}</Text></View>
                <TouchableOpacity style={[Styles.btnContainerST]} onPress={() => {
                    this.props.setting(this.state.path, this.state.workspace);
                }}>
                    <Text style={[Styles.textButton]}>Save</Text>
                </TouchableOpacity>
                

            </View>
        )
    }
}

// ----- Nối các state vào props của View Component -----//
const mapStateToProps = (state) => ({
    loading: state.authReducer.settingReducer.loading,
    error: state.authReducer.settingReducer.error
});

// ----- Nối các function vào props của View Component -----//
const mapDispatchToProps = (dispatch) => {
    return {
        setting: (path, workspace) => dispatch({
            type: ActionTypes.SETTING,
            path: path,
            workspace: workspace
        })
    }
};

// ----- Định dạng CSS -----//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dfe4ea',
        padding: 5
    },
    text: {
        fontSize: 16,
        color: '#8395a7'
    },

    containerTextError: {
        height: 15,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    textError: {
        color: 'red'
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Setting));
