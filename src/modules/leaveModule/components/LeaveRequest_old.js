import React, { Component } from 'react';
import { Text, View, Picker, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as ActionsTypes from '../actions/type';
import Loading from '../../../components/Loading';
import colors from '../../../constants/colors';
import Styles from '../../../Styles';
import { Content, DatePicker } from 'native-base';
import moment from 'moment';
import WorkingDay, { StatusWorkSatDay } from '../WorkingDay';




const AM_PM_START = ['AM', 'PM'];
const AM_PM_END = ['AM', 'PM'];

class LeaveRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            LeaveTypeId: '',
            Description: '',
            startDate: new Date(),
            endDate: new Date(),
            startTime: '',
            endTime: '',
            daysOff: '',
            reliefEmployeeId: '',
            Note: ''
        }



    }


    componentDidMount() {
        this.props.getLeaveRequestType();
    }

    getNumberDayOff = () => {
        var workingDayCalculator = new WorkingDay(StatusWorkSatDay.None, []);
        var dayOff = workingDayCalculator.getNumberDay(this.state.startDate, this.state.startTime,
            this.state.endDate, this.state.endTime)
        this.setState({
            daysOff: dayOff
        })
    }

    //------------------ GET DESCRIPTION ------------------//
    getDescription = (Id) => {
        this.props.data.map((item, key) => {
            if (item.LeaveTypeId === Id) {
                notes = item.Description
            }
        })
        this.setState({
            Description: notes
        })
    }

    render() {
        if (this.props.loading) {
            return (
                <Loading />
            );
        }
        return (
            <View style={styles.container}>
                <ScrollView>
                    {/* LEAVE REQUEST TYPE */}
                    <View style={[Styles.height_20]}>
                        <Text style={styles.textTitle}>1.Choose Leave Type:</Text>
                    </View>
                    <View style={[Styles.height_10]}></View>
                    <View style={[Styles.inputContainerST]}>
                        <Picker
                            mode='dropdown'
                            selectedValue={this.state.LeaveTypeId}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({ LeaveTypeId: itemValue, pickerIndex: itemIndex });
                                this.getDescription(itemValue);
                            }
                            }
                        >
                            {
                                this.props.data.map((item, key) => {
                                    return (
                                        <Picker.Item label={item.LeaveTypeName} value={item.LeaveTypeId} key={key} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View style={[Styles.height_5]}></View>
                    <View style={styles.containerDescription}><Text>{this.state.Description}</Text></View>
                    <View style={[Styles.height_10]}></View>
                    <View style={[Styles.height_20]}>
                        <Text style={styles.textTitle}>2.Choose Leave Time:</Text>
                    </View>
                    <View style={[Styles.height_5]}></View>
                    <View>
                        {/* START DATE */}
                        <View style={[Styles.flex_row]}>
                            <View style={[Styles.flex_1]}>
                                <Text>Start Date</Text>
                            </View>
                            <View style={[Styles.flex_1]}>
                                <Text>Period</Text>
                            </View>
                        </View>
                        <View style={[Styles.flex_row]}>
                            <View style={[Styles.inputContainerST, Styles.flex_1]}>
                                <Content>
                                    <DatePicker
                                        style={{ justifyContent: 'center' }}
                                        placeHolderText="Select Date"
                                        textStyle={{ color: "black", fontSize: 18 }}
                                        placeHolderTextStyle={{ color: "#7f8fa6" }}
                                        onDateChange={(date) => {
                                            // this.setState({ startDate: moment(date).format('DD/MM/YYYY') });
                                            this.setState({ startDate: date });
                                            this.getNumberDayOff();
                                        }}
                                    />
                                </Content>
                            </View>
                            <View style={[Styles.width_2]}></View>
                            <View style={[Styles.inputContainerST, Styles.flex_1]}>
                                <Picker
                                    mode='dropdown'
                                    selectedValue={this.state.startTime}
                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({ startTime: itemValue });
                                        this.getNumberDayOff();
                                    }}
                                    style={{ flex: 1 }}
                                    children={AM_PM_START.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                >
                                </Picker>
                            </View>
                        </View>
                        {/* END DATE */}
                        <View style={[Styles.flex_row]}>
                            <View style={[Styles.flex_1]}>
                                <Text>End Date</Text>
                            </View>
                            <View style={[Styles.flex_1]}>
                                <Text>Period</Text>
                            </View>
                        </View>
                        <View style={[Styles.flex_row]}>
                            <View style={[Styles.inputContainerST, Styles.flex_1]}>
                                <Content>
                                    <DatePicker
                                        style={{ justifyContent: 'center' }}
                                        placeHolderText="Select Date"
                                        textStyle={{ color: "black", fontSize: 18 }}
                                        placeHolderTextStyle={{ color: "#7f8fa6" }}
                                        onDateChange={(date) => {
                                            // this.setState({ endDate: moment(date).format('DD/MM/YYYY') });
                                            this.setState({ endDate: date });
                                            this.getNumberDayOff();
                                        }}
                                    />
                                </Content>
                            </View>
                            <View style={[Styles.width_2]}></View>
                            <View style={[Styles.inputContainerST, Styles.flex_1]}>
                                <Picker
                                    mode='dropdown'
                                    selectedValue={this.state.endTime}
                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({ endTime: itemValue });
                                        this.getNumberDayOff();
                                    }}
                                    style={{ flex: 1 }}
                                    children={AM_PM_END.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                >
                                </Picker>
                            </View>
                        </View>
                        <View style={[Styles.height_10]}></View>
                        {/* DAYS OFF */}
                        <View style={styles.containerDayOff}>
                            <Text style={styles.textTitle}>3.Days off</Text>
                            <Text style={styles.textTitle_star}> *</Text>
                            <Text style={styles.textTitle}> :</Text>
                        </View>
                        <View style={[Styles.height_5]}></View>
                        <View style={[Styles.inputContainerLS, styles.containerInputDayOff]}>
                            <Text>{this.state.daysOff}</Text>
                        </View>
                        <View style={[Styles.height_10]}></View>
                        {/* RELIEF STAFF */}
                        <View style={[Styles.height_20]}>
                            <Text style={styles.textTitle}>4.Relief Staff:</Text>
                        </View>
                        <View style={[Styles.height_5]}></View>
                        <View style={[Styles.inputContainerLS]}>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#8395a7'}
                                placeholder={'Relief Staff'}
                                onChangeText={(text) => { this.setState({ reliefEmployeeId: text }) }}
                            />
                        </View>
                        <View style={[Styles.height_10]}></View>
                        {/* LEAVE REASON */}
                        <View style={[Styles.height_20]}>
                            <Text style={styles.textTitle}>5.Leave Reason:</Text>
                        </View>
                        <View style={[Styles.height_5]}></View>
                        <View style={[Styles.inputContainerLS, { height: 80 }]}>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#8395a7'}
                                placeholder={'Reason'}
                                onChangeText={(text) => { this.setState({ Note: text }) }}
                            />
                        </View>
                        <View style={[Styles.height_20]}></View>
                        {/* BUTTON */}
                        <TouchableOpacity style={[Styles.btnContainerST]} onPress={() => {
                            this.props.createNewLeaveRequestReducer(
                                this.props.EmployeeID,
                                this.state.LeaveTypeId,
                                moment(this.state.startDate).format('DD/MM/YYYY'),
                                moment(this.state.endDate).format('DD/MM/YYYY'),
                                this.state.startTime,
                                this.state.endTime,
                                this.state.reliefEmployeeId,
                                this.state.daysOff,
                                this.state.Note
                            )
                        }}>
                            <Text style={[Styles.textButton]}>CREATE REQUEST</Text>
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center' }}><Text style={styles.textError}>{this.props.error1}</Text></View>
                        <View style={[Styles.height_10]}></View>
                        {
                            this.props.loading1 &&
                            <View>
                                <Loading />
                            </View>
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

// ----- Nối các state vào props của View Component -----//
const mapStateToProps = (state) => ({
    loading: state.leaveReducer.getLeaveRequestTypeReducer.loading,
    error: state.leaveReducer.getLeaveRequestTypeReducer.error,
    data: state.leaveReducer.getLeaveRequestTypeReducer.data,
    loading1: state.leaveReducer.createNewLeaveRequestReducer.loading,
    error1: state.leaveReducer.createNewLeaveRequestReducer.error,
    EmployeeID: state.authReducer.loginReducer.hc360EmployeeId
});

// ----- Nối các function vào props của View Component -----//
const mapDispatchToProps = (dispatch) => ({
    getLeaveRequestType: () => dispatch({
        type: ActionsTypes.GET_LEAVE_REQUEST_TYPE,
    }),
    createNewLeaveRequestReducer: (
        EmployeeID,
        LeaveTypeId,
        startDate,
        endDate,
        startTime,
        endTime,
        reliefEmployeeId,
        daysOff,
        Note
    ) => dispatch({
        type: ActionsTypes.CREATE_NEW_LEAVE_REQUEST,
        EmployeeID: EmployeeID,
        LeaveTypeId: LeaveTypeId,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        reliefEmployeeId: reliefEmployeeId,
        daysOff: daysOff,
        Note: Note
    })
});

// ----- Định dạng CSS -----//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
        padding: 10
    },
    textTitle: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    containerDescription: {
        backgroundColor: '#FFF',
        borderRadius: 6
    },
    containerDayOff: {
        height: 20,
        flexDirection: 'row'
    },
    textTitle_star: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold'
    },
    containerInputDayOff: {
        height: 50,
        justifyContent: 'center'
    },
    textError: {
        color: 'red'
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaveRequest);
