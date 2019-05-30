import React, { Component } from 'react';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as ActionTypes from '../actions/type';
import Loading from '../../../components/Loading';
import colors from '../../../constants/colors';
import imgEmployee from '../../../../Images/user.png';
import Styles from '../../../Styles';

class EmployeesDetail extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getEmployeesDetail(this.props.hc360EmployeeId);
    }

    render() {
        if (this.props.loading) {
            return (
                <Loading />
            );
        }
        return (
            <View style={[Styles.flex_1]}>
                <View style={styles.containerImage}>
                    <Image resizeMode='contain' style={styles.image} source={imgEmployee} />
                </View>
                <ScrollView style={[Styles.padding_20]}>
                    <View style={[Styles.titleContainer]}>
                        <Text style={styles.textTitle}>GENERAL INFO</Text>
                    </View>
                    <View style={[Styles.height_140, Styles.profileContainer]}>
                        <View style={styles.containerTextL}>
                            <Text style={[Styles.profileTextTitle]}> Staff ID</Text>
                            <Text style={[Styles.profileTextTitle]}> Full name</Text>
                            <Text style={[Styles.profileTextTitle]}> Email</Text>
                            <Text style={[Styles.profileTextTitle]}> Cell phone</Text>
                            <Text style={[Styles.profileTextTitle]}> Ext</Text>
                        </View>
                        <View style={styles.containerTextR}>
                            <Text style={[Styles.fontSize_15]}>{this.props.Id}</Text>
                            <Text style={[Styles.fontSize_15]}>{this.props.FirstName} {this.props.LastName}</Text>
                            <Text style={[Styles.fontSize_15]}>{this.props.Email}</Text>
                            <Text style={[Styles.fontSize_15]}>{this.props.CellPhoneNo}</Text>
                        </View>
                    </View>
                    <View style={[Styles.titleContainer]}>
                        <Text style={styles.textTitle}>PERSONAL INFO</Text>
                    </View>
                    <View style={[Styles.height_120, Styles.profileContainer]}>
                        <View style={styles.containerTextL}>
                            <Text style={[Styles.profileTextTitle]}> Birthday</Text>
                            <Text style={[Styles.profileTextTitle]}> Sex</Text>
                            <Text style={[Styles.profileTextTitle]}> Relationship</Text>
                            <Text style={[Styles.profileTextTitle]}> Hobbies</Text>
                        </View>
                        <View style={styles.containerTextR}>
                            <Text style={{ fontSize: 15 }}>{this.props.DayOfBirth}/{this.props.MonthOfBirth}/{this.props.YearOfBirth}</Text>
                        </View>
                    </View>
                    <View style={[Styles.titleContainer]}>
                        <Text style={styles.textTitle}>WORK AND EDUCATION</Text>
                    </View>
                    <View style={[Styles.height_80, Styles.profileContainer]}>
                        <View style={styles.containerTextL}>
                            <Text style={[Styles.profileTextTitle]}> Job Title</Text>
                            <Text style={[Styles.profileTextTitle]}> Company</Text>
                        </View>
                        <View style={styles.containerTextR}>
                            <Text style={[Styles.fontSize_15]}>{this.props.JobTitleName}</Text>
                            <Text style={[Styles.fontSize_15]}>{this.props.CompanyName}</Text>
                        </View>
                    </View>
                    <View style={[Styles.titleContainer]}>
                        <Text style={styles.textTitle}>FAMALY BOOK / SỔ HỘ KHẨU</Text>
                    </View>
                    <View style={[Styles.height_100, Styles.profileContainer]}>
                        <View style={styles.containerTextL}>
                            <Text style={[Styles.profileTextTitle]}> Name</Text>
                            <Text style={[Styles.profileTextTitle]}> Relationship</Text>
                            <Text style={[Styles.profileTextTitle]}> Cellphone</Text>
                        </View>
                        <View style={styles.containerTextR}>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

// ----- Nối các state vào props của View Component -----//
const mapStateToProps = (state) => ({
    loading: state.employeesReducer.employeesDetailReducer.loading,
    error: state.employeesReducer.employeesDetailReducer.error,
    hc360EmployeeId: state.authReducer.loginReducer.hc360EmployeeId,
    Id: state.employeesReducer.employeesDetailReducer.Id,
    FirstName: state.employeesReducer.employeesDetailReducer.FirstName,
    LastName: state.employeesReducer.employeesDetailReducer.LastName,
    Email: state.employeesReducer.employeesDetailReducer.Email,
    CellPhoneNo: state.employeesReducer.employeesDetailReducer.CellPhoneNo,
    WorkPhoneExt: state.employeesReducer.employeesDetailReducer.WorkPhoneExt,
    DayOfBirth: state.employeesReducer.employeesDetailReducer.DayOfBirth,
    MonthOfBirth: state.employeesReducer.employeesDetailReducer.MonthOfBirth,
    YearOfBirth: state.employeesReducer.employeesDetailReducer.YearOfBirth,
    JobTitleName: state.employeesReducer.employeesDetailReducer.JobTitleName,
    CompanyName: state.employeesReducer.employeesDetailReducer.CompanyName
});

// ----- Nối các function vào props của View Component -----//
const mapDispatchToProps = (dispatch) => ({
    getEmployeesDetail: (hc360EmployeeId) => dispatch({
        type: ActionTypes.EMPLOYEES_DETAIL,
        hc360EmployeeId: hc360EmployeeId
    })
});

// ----- Định dạng CSS -----//
const styles = StyleSheet.create({
    containerImage: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 130,
        height: 130
    },
    textTitle: {
        fontSize: 16,
        color: colors.ICON,
        fontWeight: 'bold'
    },
    containerTextL: {
        flex: 1,
        paddingTop: 15
    },
    containerTextR: {
        flex: 2,
        paddingTop: 15
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesDetail);
