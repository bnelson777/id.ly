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
        TouchableHighlight, Dimensions,
        ActionSheetIOS} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions'; //Import your actions
import {Actions} from 'react-native-router-flux';
import deviceInfo from 'react-native-device-info';
let BluetoothCP = require("react-native-bluetooth-cross-platform");
import AesCrypto from 'react-native-aes-kit';

const screenWidth = Dimensions.get('window').width;

// SHARE
// FUNCTION(S): This component is responsible for displaying a qr code necessary
// to transmit a card and symmetric key to another device running the id.ly app in the scan screen. 
//
// EXPECTED PROP(S): this.props.card
// This component will expect a card object to be passed to it when viewed so
// it knows what to card/key to display in QR/or send over bluetooth.
export class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {encrypt: '',iv: '',key: ''};
        this.packageCard = this.packageCard.bind(this);
    }

    componentDidMount() {
        this.props.getCards();
        this.packageCard()
        
        this.messageListener = BluetoothCP.addReceivedMessageListener((peers) => {
            // Code that runs when device recieves a message from the scanner
            if (peers.message === deviceInfo.getDeviceName()) {
                console.log(peers.message);
                BluetoothCP.sendMessage(this.state.encrypt, peers.id);
            }
        });

        console.log('share: mounted');
        console.log('share: advertising');
        BluetoothCP.advertise("WIFI-BT");
    }

    componentWillUnmount() {
        // remove listener to stop listening for messages
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
        
        for(var key = ''; key.length < 16;) {
                key += Math.random().toString(36).substr(2, 1)
            }

        for(var iv = ''; iv.length < 16;) {
                iv += Math.random().toString(36).substr(2, 1)
            }
        
        AesCrypto.encrypt(JSON.stringify(jsonCard2), key, iv)
        .then(cipher => {
            this.setState({encrypt: cipher})
        });
        
        this.setState({iv: iv})
        this.setState({key: key})
    }

    render() {
        let devName = deviceInfo.getDeviceName();
        let qrObject = [devName,this.state.key,this.state.iv]

        return (
            // This is where the actual QR is displayed
            <View style={styles.container}>
                <Text> device name: {devName} </Text>
                <Text style={styles.title}>
                    Have the other user scan with QR Scanner
                </Text>
                <QRCode
                    value={JSON.stringify(qrObject)}
                    size={screenWidth * 0.9}
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

