import React, { Component } from 'react';
import { Text, View, FlatList, ToastAndroid, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as ActionsTypes from '../actions/type';
import * as Contants from '../constants/index';
import Loading from '../../../components/Loading';
import { Content,List} from 'native-base';
import moment from 'moment';
import Swipeout from 'react-native-swipeout';
import Styles from '../../../Styles';
class ListLeaveRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // page: 1,
            // rowIndex: null,
            // flatListReady: false,
        }

    }

    loadMore = () => {
        if(this.props.flatListReady){
            if(!(this.props.page === 2 && this.props.DataList.length < Contants.PAGE_SIZE * 2)){
                // if(this.props.DataList.length%Contants.PAGE_SIZE == 0){
                    // this.setState(
                    //     (prevState, nextProps) => ({
                    //         page: prevState.page + 1,
                    //     }),
                    //     () => {
                    //         console.log('ádsads')
                    //         this.props.loadMore(this.state.page);
                    //     },
                    // );
                    // console.log(this.props.page + 1)
                     this.props.loadMore(this.props.page + 1);
                // }
            }
        }

    }

    _scrolled = () => {
        if(!this.props.flatListReady){
            // this.setState({
            //     flatListReady: true
            // },()=>{
            //     // console.log(this.state)
            // })
            this.props.updateFlatListReady(true);
        }

    }


    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }}
            />
        );
    }


    onSwipeOpen(rowIndex) {
        // this.setState({
        //     rowIndex: rowIndex
        // })
        this.props.updateRowIndex(rowIndex)
    }
    onSwipeClose(rowIndex) {
        if (rowIndex === this.props.rowIndex) {
            // this.setState({ rowIndex: null });
            this.props.updateRowIndex(null)
        }
    }



    renderItem = ({ item, index }) => {


        let swipeoutBtns = [
            {
                text: 'Approve',
                onPress: () => {
                    this.props.appRove(item.ID)
                    console.log(item.ID)
                },
                backgroundColor: '#6ab04c'
            },
            {
                text: 'Reject',
                onPress: () => {
                    this.props.reject(item.ID)
                    console.log(item.ID)
                },
                backgroundColor: '#eb4d4b'
            }
        ]

        let status;
        if (item.Request_Status === 'P') {
            status = (
                <Text style={styles.text}> Waiting for approval</Text>
            )
        }
        else if (item.Request_Status === 'N') {
            status = (
                <Text style={styles.text}> Reject </Text>
            )
        }
        else if (item.Request_Status === 'Y') {
            status = (
                <Text style={styles.text}> Approved </Text>
            )
        }
        else if (item.Request_Status === 'W') {
            status = (
                <Text style={styles.text}> Waiting for cancel </Text>
            )
        }
        else if (item.Request_Status === 'C') {
            status = (
                <Text style={styles.text}> Canceled </Text>
            )
        }
        else {
            status = (
                <Text style={styles.text}> Create New </Text>
            )
        }
        return (
            <Swipeout
                onOpen={() => (this.onSwipeOpen(index))}
                close={this.props.rowIndex !== index}
                onClose={() => (this.onSwipeClose(index))}
                rowIndex={index}
                sectionId={0}
                autoClose={true}
                sensitivity={80}
            >
                <View style={styles.container}>
                    <View style={styles.containerMid}>
                        <View style={styles.listItem}>
                            <View style={{flex : 1/3}}><Text>Staff:</Text></View>
                            <View style={{flex : 2/3}}><Text style={styles.text}>{item.EmployeeName}</Text></View>
                        </View>
                        <View style={styles.listItem}>
                            <View style={{flex : 1/3}}><Text>Days off:</Text></View>
                            <View style={{flex : 2/3}}><Text style={styles.text}>{item.DaysOff}</Text></View>
                        </View>
                        <View style={styles.listItem}>
                            <View style={{flex : 1/3}}><Text>From:</Text></View>
                            <View style={{flex : 2/3}}><Text style={styles.text}>{moment(item.StartDate).format('DD/MM/YYYY')}</Text></View>
                        </View>
                        <View style={styles.listItem}>
                            <View style={{flex : 1/3}}><Text>To:</Text></View>
                            <View style={{flex : 2/3}}><Text style={styles.text}>{moment(item.EndDate).format('DD/MM/YYYY')}</Text></View>
                        </View>
                        <View style={styles.listItem}>
                            <View style={{flex : 1/3}}><Text>Reason:</Text></View>
                            <View style={{flex : 2/3}}><Text style={styles.text}>{item.Note}</Text></View>
                        </View>
                        <View style={styles.listItem}>
                            <View style={{flex : 1/3}}><Text>Status:</Text></View>
                            <View style={{flex : 2/3}}><Text style={styles.text}>{status}</Text></View>
                        </View>
                    </View>
                </View>
            </Swipeout>
        )
    }


    render() {

        if (this.props.loading1) {
            return (
                <Loading />
            );
        }

        // if(this.props.DataList.length <=10 && this.state.flatListReady == true){
        //     this.setState({
        //             page: 1,
        //             rowIndex: null,
        //             flatListReady: false,
        //             reload: true
        //     })
        // }

        console.log(this.props);
        return (

            <View style={styles.containerList}>
                <FlatList
                    onScroll={()=>this._scrolled()}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.props.DataList}
                    renderItem={this.renderItem}
                    ExtraData={this.props.rowIndex}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.02}
                    ListFooterComponent={this.props.loading2 ? <Loading /> : null}
                />
            </View>

        )
    }

    componentDidMount() {
        this.props.getListLeaveRequest(this.props.page);
    }

}

// ----- Nối các state vào props của View Component -----//
const mapStateToProps = (state) => ({
    page: state.leaveReducer.getListLeaveRequestReducer.page,
    rowIndex: state.leaveReducer.getListLeaveRequestReducer.rowIndex,
    flatListReady: state.leaveReducer.getListLeaveRequestReducer.flatListReady,
    loading1: state.leaveReducer.getListLeaveRequestReducer.loading1,
    loading2: state.leaveReducer.getListLeaveRequestReducer.loading2,
    DataList: state.leaveReducer.getListLeaveRequestReducer.DataList
});


// ----- Nối các function vào props của View Component -----//
const mapDispatchToProps = (dispatch) => ({
    getListLeaveRequest: (page) => dispatch({
        type: ActionsTypes.GET_LIST_LEAVE_REQUEST,
        page: page
    }),

    loadMore: (page) => dispatch({
        type: ActionsTypes.LOAD_MORE_LIST_LEAVE_REQUEST,
        page: page
    }),

    updateRowIndex: (rowIndex) => dispatch({
        type: ActionsTypes.UPDATE_ROW_INDEX_LIST_LEAVE_REQUEST,
        rowIndex: rowIndex
    }),

    updateFlatListReady: (val) => dispatch({
        type: ActionsTypes.UPDATE_FLATLIST_READY_LIST_LEAVE_REQUEST,
        val: val
    })
});

// ----- Định dạng CSS -----//
const styles = StyleSheet.create({
    containerList: {
        flex: 1,
        backgroundColor: '#dcdde1'
    },
    container: {
        padding: 3
    },
    containerMid: {
        backgroundColor: '#fff',
        padding: 10,
    },
    listItem : {
        flex: 1, 
        flexDirection: 'row', 
        marginTop : 5
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left'

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListLeaveRequest);
