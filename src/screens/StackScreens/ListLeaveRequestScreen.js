import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import Styles from '../../Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListLeaveRequest from '../../modules/leaveModule/components/ListLeaveRequest';
import NavigationService from '../../helpers/NavigationService'
import { withNavigation } from 'react-navigation';

// var Nav;



class ListLeaveRequestScreen extends Component {
    // constructor(props) {
    //     super(props);
    //     console.log(this.props)
    //     Nav = this.props.navigation;

    // }
    static navigationOptions = ({navigation}) => ({
        title: 'List Leave Request',
    	headerRight: 	(
			  <Icon.Button
			    name="add"
			    size={30}
			    backgroundColor="#29AAE3"
			    iconStyle={[Styles.padd_left_15]}
				onPress={() => {
                    navigation.navigate('LeaveRequestScreen')
                }}
			  >
			    
			  </Icon.Button>
		    	),

    })

    render() {
        return (
            <ListLeaveRequest />
            // <Text> sds</Text>
        )
    }
}

export default withNavigation(ListLeaveRequestScreen);

