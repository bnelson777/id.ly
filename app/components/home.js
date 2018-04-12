import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator, TouchableHighlight, ActionSheetIOS
} from 'react-native';

import {Actions} from 'react-native-router-flux'


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    // Dummy function for button presses
    pressButton(label){
        Alert.alert(label);
    }

    // Displays animation if loading, otherwise displays a popup indicating the
    // TouchableHighlight pressed

    render() {

        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <TouchableHighlight onPress={() => Actions.inbox()}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                Inbox
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => Actions.wallet()}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                Wallet
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => Actions.rolodex()}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                Rolodex
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => {this.pressButton("Share")}}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                Share
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => Actions.scan()}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                Scan
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => {this.pressButton("About")}}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                About
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => Actions.message_thread()}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                Message Thread
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>

            );
        }
    }
}


const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },

    title: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8 * 2
    }
});


export default Home;
