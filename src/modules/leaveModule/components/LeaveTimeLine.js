import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Timeline from 'react-native-timeline-feed';
import Styles from '../../../Styles';


export default class LeaveTimeLine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { time: '09:00', title: 'Event 1', description: 'Event 1 Description' },
                { time: '10:45', title: 'Event 2', description: 'Event 2 Description' },
                { time: '12:00', title: 'Event 3', description: 'Event 3 Description' },
                { time: '14:00', title: 'Event 4', description: 'Event 4 Description' },
                { time: '16:30', title: 'Event 5', description: 'Event 5 Description' }
            ]
        }
    }

    renderDetail = ({ item, index }) => {
        return (
            <View style={{ flex: 1, backgroundColor: '#74b9ff', borderRadius: 8 }}>
                <Text style={{ fontWeight: '800' }}>{item.title}</Text>
                <View style={{ height: 75 }}>
                    <Text>{item.description}</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#dcdde1' }}>
                <ScrollView>
                    <Timeline
                        data={this.state.data}
                        renderDetail={this.renderDetail}
                        separator={true}
                        keyExtractor={(item, index) => index.toString()}
                        columnFormat='two-column'
                        flatListProps={{ padding: 5 }}
                        innerCircleType='dot'
                        timeContainerStyle={{ backgroundColor: '#55efc4', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}
                        timeStyle={{ color: 'white', fontWeight: 'bold' }}
                    />
                </ScrollView>
                <View style={{ height: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{
                        height: 50,
                        width: 150,
                        backgroundColor: '#44bd32',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8
                    }}>
                        <Text style={[Styles.textButton]}>Approval</Text>
                    </TouchableOpacity>
                    <View style={{ width: 10 }}></View>
                    <TouchableOpacity style={{
                        height: 50,
                        width: 150,
                        backgroundColor: '#d63031',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8
                    }}>
                        <Text style={[Styles.textButton]}>Reject</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
