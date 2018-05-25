/**
 * Create Share Function
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import styles from './styles';
import { StyleSheet, FlatList, TextInput,
        View, Text, ActivityIndicator,
        TouchableHighlight,
        ActionSheetIOS} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions'; //Import your actions
import {Actions} from 'react-native-router-flux';
import deviceInfo from 'react-native-device-info';
let BluetoothCP = require("react-native-bluetooth-cross-platform");


// SHARE
// FUNCTION(S): This componenet at the moment will display a JSON card object in QR
// readable format (ommiting the private key if present).
//
// FUTURE FUNCTION(S): Display public key of card object bluetooth handshake
// would occur here and deliver the card object over that bridge.
//
// EXPECTED PROP(S): this.props.card
// This component will expect a card object to be passed to it when viewed so
// it knows what to card/key to display in QR/or send over bluetooth.
export class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.packageCard = this.packageCard.bind(this);
    }

    componentDidMount() {
        this.props.getCards();
        
        this.messageListener = BluetoothCP.addReceivedMessageListener((peers) => {
            if (peers.message === deviceInfo.getDeviceName()) {
                console.log(peers.message);
                BluetoothCP.sendMessage(this.packageCard(), peers.id);
            }
        });

        console.log('share: mounted');
        console.log('share: advertising');
        BluetoothCP.advertise("WIFI-BT");
    }

    componentWillUnmount() {
        this.messageListener.remove();
        console.log('unmounting');
    }

    packageCard() {
        var jsonCard = JSON.stringify(this.props.card);
        var jsonCard2 = JSON.parse(jsonCard);
        console.log(jsonCard2)
        var jsonKey = jsonCard2.keys.n;
        console.log(jsonKey);
        jsonCard2.keys = {};
        // omit private keys from share object
        jsonCard2.keys = {"n": jsonKey};
        // ensure card owner is set to false
        jsonCard2.owner = false;
        console.log('object to display in QR',jsonCard2)
        var res = JSON.stringify(jsonCard2);
        return res;
    }

    render() {
        let devName = deviceInfo.getDeviceName();

        return (
            // This is where the actual QR is displayed
            <View style={styles.container}>
                <Text> device name: {devName} </Text>
                <Text style={styles.title}>
                    Have the other user scan with QR Scanner
                </Text>
                <QRCode
                    value={devName}
                    size={350}
                    bgColor='black'
                    fgColor='white'
                />
            </View>
        );
    };
}

function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        cards: state.dataReducer.cards
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Share);

