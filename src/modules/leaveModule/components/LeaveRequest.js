import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as ActionsTypes from '../actions/type';
import Loading from '../../../components/Loading';
import colors from '../../../constants/colors';
import Styles from '../../../Styles';
import { Content, DatePicker, Picker } from 'native-base';
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
            startTime: 'AM',
            endTime: 'PM',
            daysOff: 1,
            reliefEmployeeId: '',
            Note: '',
        }



    }


    componentDidMount() {
        this.props.getLeaveRequestType();
    }

    getNumberDayOff = () => {
        var workingDayCalculator = new WorkingDay(StatusWorkSatDay.None, []);
        var d1 = new Date(this.state.startDate);
        var d2 = new Date(this.state.endDate);
        var startTime = this.state.startTime === 'AM' ? false : true;
        var endTime = this.state.endTime === 'AM' ? false : true;

        // console.log(d1)
        // console.log(d2)
        var dayOff = workingDayCalculator.getNumberDay(d1, startTime, d2, endTime);
        // console.log(dayOff)
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
                    <Content>
                        <Picker
                            placeholder='Select Type'
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
                        </Content>
                    </View>
                    <View style={[Styles.height_5]}></View>
                    <View style={styles.containerDescription}><Text>{this.state.Description}</Text></View>
                    <View style={[Styles.height_10]}></View>
                    <View style={[Styles.height_20, Styles.marg_top_10]}>
                        <Text style={styles.textTitle}>2.Choose Leave Time:</Text>
                    </View>
                    <View style={[Styles.height_5]}></View>
                    <View>
                        {/* START DATE */}
                        <View style={[Styles.flex_row]}>
                            <View style={[Styles.flex_1]}>
                                <Text>Start Date</Text>
                            </View>
                            <View style={[Styles.flex_1, Styles.marg_left_15]}>
                                <Text>Period</Text>
                            </View>
                        </View>
                        <View style={[Styles.flex_row, Styles.marg_top_5]}>
                            <View style={[Styles.inputContainerST, Styles.flex_1]}>
                                <Content>
                                    <DatePicker
                                        // defaultDate={this.state.startDate}
                                        // locale={"en"}
                                        // timeZoneOffsetInMinutes={undefined}
                                        // modalTransparent={false}
                                        // animationType={"fade"}
                                        // androidMode={"default"}
                                        // textStyle={{ color: "green" }}
                                        // onDateChange={(date) => {
                                        //     // this.setState({ startDate: moment(date).format('DD/MM/YYYY') });
                                        //     this.setState({ startDate: date, endDate: date },()=>{this.getNumberDayOff()});
                                        // }}
                                        // disabled={false}

                                        defaultDate={this.state.startDate}
                                        style={{ justifyContent: 'center' }}
                                        // placeHolderText="Select Date"
                                        textStyle={{ color: "black", fontSize: 18 }}
                                        // placeHolderTextStyle={{ color: "#7f8fa6" }}
                                        value={this.state.startDate}
                                        onDateChange={(date) => {
                                            // this.setState({ startDate: moment(date).format('DD/MM/YYYY') });
                                            this.setState({ startDate: date, endDate: date },()=>{this.getNumberDayOff()});
                                        }}
                                    />
                                </Content>
                            </View>
                            <View style={[Styles.width_15]}></View>
                            <View style={[Styles.inputContainerST, Styles.flex_1]}>
                                <Content>
                                    <Picker
                                        mode='dropdown'
                                        selectedValue={this.state.startTime}
                                        onValueChange={(itemValue, itemIndex) => {
                                            this.setState({ startTime: itemValue },()=>{this.getNumberDayOff()});
                                        }}
                                        style={{ flex: 1 }}
                                        children={AM_PM_START.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                    >
                                    </Picker>
                                </Content>
                            </View>
                        </View>
                        {/* END DATE */}
                        <View style={[Styles.flex_row, Styles.marg_top_10]}>
                            <View style={[Styles.flex_1]}>
                                <Text>End Date</Text>
                            </View>
                            <View style={[Styles.flex_1, Styles.marg_left_15]}>
                                <Text>Period</Text>
                            </View>
                        </View>
                        <View style={[Styles.flex_row, Styles.marg_top_5]}>
                            <View style={[Styles.inputContainerST, Styles.flex_1]}>
                                <Content>
                                    <DatePicker
                                        // defaultDate={this.state.endDate}
                                        // locale={"en"}
                                        // timeZoneOffsetInMinutes={undefined}
                                        // modalTransparent={false}
                                        // animationType={"fade"}
                                        // androidMode={"default"}
                                        // textStyle={{ color: "green" }}
                                        // onDateChange={(date) => {
                                        //     // this.setState({ startDate: moment(date).format('DD/MM/YYYY') });
                                        //     this.setState({endDate: date },()=>{this.getNumberDayOff()});
                                        // }}
                                        // disabled={false}

                                        defaultDate={this.state.startDate}

                                        style={{ justifyContent: 'center' }}
                                        // placeHolderText="Select Date"
                                        textStyle={{ color: "black", fontSize: 18 }}
                                        // placeHolderTextStyle={{ color: "#7f8fa6" }}
                                        onDateChange={(date) => {
                                            // this.setState({ endDate: moment(date).format('DD/MM/YYYY') });
                                            this.setState({ endDate: date },()=>{this.getNumberDayOff()});
                                        }}
                                    />
                                </Content>
                            </View>
                            <View style={[Styles.width_15]}></View>
                            <View style={[Styles.inputContainerST, Styles.flex_1]}>
                            <Content>
                                <Picker
                                    mode='dropdown'
                                    selectedValue={this.state.endTime}
                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({ endTime: itemValue },()=>{this.getNumberDayOff()});
                                    }}
                                    style={{ flex: 1 }}
                                    children={AM_PM_END.map((item, key) => <Picker.Item key={key} label={item} value={item} />)}
                                >
                                </Picker>
                                </Content>
                            </View>
                        </View>
                        <View style={[Styles.height_10]}></View>
                        {/* DAYS OFF */}
                        <View style={[styles.containerDayOff, Styles.marg_top_10]}>
                            <Text style={styles.textTitle}>3.Days off</Text>
                            <Text style={styles.textTitle_star}> *</Text>
                            <Text style={styles.textTitle}> :</Text>
                        </View>
                        <View style={[Styles.height_5]}></View>
                        <View style={[Styles.inputContainerLS, styles.containerInputDayOff]}>
                            <Text style={[Styles.padd_left_10]}>{this.state.daysOff}</Text>
                        </View>
                        <View style={[Styles.height_10]}></View>
                        {/* RELIEF STAFF */}
                        <View style={[Styles.height_20, Styles.marg_top_10]}>
                            <Text style={styles.textTitle}>4.Relief Staff:</Text>
                        </View>
                        <View style={[Styles.height_5]}></View>
                        <View style={[Styles.inputContainerLS, Styles.height_30]}>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#8395a7'}
                                placeholder={'Relief Staff'}
                                onChangeText={(text) => { this.setState({ reliefEmployeeId: text }) }}
                                style={[Styles.padd_left_10, Styles.padd_top_5]}
                            />
                        </View>
                        <View style={[Styles.height_10]}></View>
                        {/* LEAVE REASON */}
                        <View style={[Styles.height_20, Styles.marg_top_10]}>
                            <Text style={styles.textTitle}>5.Leave Reason:</Text>
                        </View>
                        <View style={[Styles.height_5]}></View>
                        <View style={[Styles.inputContainerLS, Styles.height_80]}>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#8395a7'}
                                placeholder={'Reason'}
                                onChangeText={(text) => { this.setState({ Note: text }) }}
                                style={[Styles.padd_left_10, Styles.padd_top_5]}
                            />
                        </View>
                        <View style={[Styles.height_20]}></View>
                        {/* BUTTON */}
                        <TouchableOpacity style={[Styles.btnContainerST]} onPress={() => {
                            // console.log(this.props.EmployeeID);
                            // console.log(this.state.LeaveTypeId);
                            // console.log(moment(this.state.startDate).format('DD/MM/YYYY'));
                            // console.log(moment(this.state.endDate).format('DD/MM/YYYY'));
                            // console.log(this.state.startTime);
                            // console.log(this.state.endTime);
                            // console.log(this.state.reliefEmployeeId);
                            // console.log(this.state.daysOff);
                            // console.log(this.state.Not);
                            this.props.createNewLeaveRequestReducer(
                                this.props.EmployeeID,
                                (this.state.LeaveTypeId != '' ? this.state.LeaveTypeId : this.props. firstData),
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
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        loading: state.leaveReducer.getLeaveRequestTypeReducer.loading,
        error: state.leaveReducer.getLeaveRequestTypeReducer.error,
        data: state.leaveReducer.getLeaveRequestTypeReducer.data,
        firstData: state.leaveReducer.getLeaveRequestTypeReducer.firstData,
        loading1: state.leaveReducer.createNewLeaveRequestReducer.loading,
        error1: state.leaveReducer.createNewLeaveRequestReducer.error,
        EmployeeID: state.authReducer.loginReducer.hc360EmployeeId
    }

};

// ----- Nối các function vào props của View Component -----//
const mapDispatchToProps = (dispatch) => ({

    getLeaveRequestType: () => dispatch({
        type: ActionsTypes.GET_LEAVE_REQUEST_TYPE,
    }),

    createNewLeaveRequestReducer: (EmployeeID,LeaveTypeId,startDate,endDate,startTime,endTime,reliefEmployeeId,daysOff,Note) => dispatch({
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
