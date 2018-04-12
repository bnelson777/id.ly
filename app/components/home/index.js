import React, { Component } from 'react';
import styles from './styles';
import {
    Alert,
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
                    <TouchableHighlight onPress={() => {this.pressButton("Inbox")}}>
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

export default Home;
