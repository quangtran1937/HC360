import React, { Component } from 'react';
import {
    Text, View, ImageBackground,
    TouchableOpacity, ScrollView, Image,
    TextInput, ActivityIndicator, Picker,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import Styles from '../../../Styles';
import bkgLogin from '../../../../Images/bkgLogin.jpg';
import logoApp from '../../../../Images/hc360.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as ActionTypes from '../actions/types';
import { withNavigation } from 'react-navigation';
import colors from '../../../constants/colors';


const userBook = 'anh.phan@squaregroup.com.vn';
const passwordBook = 'nguyetanh123';

const userApprove = 'khanh.nguyen@squaregroup.com.vn';
const passwordApprove = '123456789';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPass: true,
            user: '',
            password: ''
        };
        //console.log(this.props);
    }

    // componentDidMount() {
    //     this.getToken();
    // }

    // getToken = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('token');
    //         if (token !== null) {
    //             this.props.navigation.navigate('ListLeaveRequestScreen');
    //         } 
    //     } catch (error) {
    //         console.log(error)
    //         // Error retrieving data
    //     }
    // }

    // componentDidUpdate() {
    //     console.log(this.state)
    // }

    // componentWillNextProps() {
    //     console.log
    // }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={[Styles.height_180]}>
                        <View style={styles.containerImage}>
                            <Image resizeMode='contain' style={styles.image} source={logoApp} />
                        </View>
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.text}>Human Capital Management System</Text>
                    </View>
                    <View style={styles.containerMid}>
                        <View style={styles.containerMidText}>
                            <Text style={styles.textMid}>Login</Text>
                        </View>
                        <View style={[Styles.inputContainerLG]}>
                            <View style={styles.containerIcon}>
                                <Icon name='user' color={colors.ICON} size={25} />
                            </View>
                            <View style={[Styles.flex_3]}>
                                <TextInput
                                    autoFocus={false}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                    placeholder={'Username'}
                                    underlineColorAndroid={'transparent'}
                                    placeholderTextColor={'#8395a7'}
                                    keyboardType={'email-address'}
                                    style={styles.textInput}
                                    onChangeText={(text) => { this.setState({ user: text }) }}
                                />
                            </View>
                            <View style={[Styles.flex_1]}></View>
                        </View>
                        <View style={[Styles.height_2]}></View>
                        <View style={[Styles.inputContainerLG]}>
                            <View style={styles.containerIcon}>
                                <Icon name='lock' color={colors.ICON} size={25} />
                            </View>
                            <View style={[Styles.flex_3]}>
                                <TextInput
                                    secureTextEntry={this.state.showPass}
                                    autoFocus={false}
                                    autoCorrect={false}
                                    autoCapitalize={'none'}
                                    placeholder={'Password'}
                                    underlineColorAndroid={'transparent'}
                                    placeholderTextColor={'#8395a7'}
                                    keyboardType="default"
                                    style={styles.textInput}
                                    onChangeText={(text) => { this.setState({ password: text }) }}
                                />
                            </View>
                            <View style={styles.containerIcon}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        showPass: !this.state.showPass
                                    })
                                }}>
                                    {this.state.showPass ? <Icon name='eye' size={25} color={colors.ICON} /> : <Icon name='eye-slash' size={25} color={colors.ICON} />}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.containerTextError}><Text style={styles.textError}>{this.props.error}</Text></View>

                        <TouchableOpacity style={[Styles.btnContainerLG]} onPress={() => {
                            this.props.login(this.state.user, this.state.password);
                        }}>
                            <Text style={[Styles.textButton]}>Login</Text>
                        </TouchableOpacity>
                    
                    </View>
                    <View style={styles.containerFooter}>
                        <TouchableOpacity style={styles.containerButtonL}
                        >
                            <Text style={styles.textButton}>Forgot password ?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.containerButtonR}
                            onPress={() => {
                                this.props.navigation.navigate('SettingScreen');
                            }}>
                            <Text style={styles.textButton}>Setting URL</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

// ----- Nối các state vào props của View Component -----//
const mapStateToProps = (state) => ({
    loading: state.authReducer.loginReducer.loading,
    error: state.authReducer.loginReducer.error,
    token: state.authReducer.loginReducer.token

})

// ----- Nối các function vào props của View Component -----//
const mapDispatchToProps = (dispatch) => ({
    login: (user, password) => dispatch({
        type: ActionTypes.LOGIN,
        user: user,
        password: password
    })
});

// ----- Định dạng CSS -----//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
    },
    containerImage: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 250,
        height: 250
    },
    containerText: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#096FB7',
        fontSize: 16
    },
    textInput: {
        width: '100%',
        height: '100%',
        fontSize: 16,
    },
    containerMid: {
        flex: 1,
        justifyContent: 'center',
        padding: 12,
        marginTop: 20
    },
    containerMidText: {
        height: 30,
        alignItems: 'flex-start',
        marginLeft: 15
    },
    textMid: {
        fontSize: 18,
        color: '#8395a7'
    },
    containerIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerTextError: {
        height: 15,
        alignItems: 'center',
        marginTop : 15,
        marginBottom : 15,
    },
    textError: {
        color: 'red'
    },
    containerFooter: {
        flex: 1,
        flexDirection: 'row',
        padding: 8
    },
    containerButtonL: {
        flex: 1,
        alignItems: 'flex-start'
    },
    textButton: {
        fontSize: 16,
        color: colors.ICON
    },
    containerButtonR: {
        flex: 1,
        alignItems: 'flex-end'
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Login));