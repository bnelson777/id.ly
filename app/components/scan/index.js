/**
 * Create QR Code Scanning Function
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import styles from './styles';
//import { Permissions, BarCodeScanner} from 'expo';
import { Text, View, StyleSheet, Button,
        ActivityIndicator, Animated, Easing,
        LayoutAnimation, Image, Platform,
        Vibration, PermissionsAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import RNCamera from 'react-native-camera';
import Permissions from 'react-native-permissions';
import deviceInfo from 'react-native-device-info';
import BluetoothCP from 'react-native-bluetooth-cross-platform';

const PERMISSION_AUTHORIZED = 'authorized';
const CAMERA_PERMISSION = 'camera';

class Scan extends Component {
    /* expo permission
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    */
    static propTypes = {
        ScanResult: PropTypes.func.isRequired,
        reactivate: PropTypes.bool,
        reactivateTimeout: PropTypes.number,
        notAuthorizedView: PropTypes.element,
        permissionDialogTitle: PropTypes.string,
        permissionDialogMessage: PropTypes.string,
        checkAndroid6Permissions: PropTypes.bool,
    }

    static defaultProps = {
        notAuthorizedView: (
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              textAlign: 'center',
              fontSize: 20,
            }}>
              Camera Unauthorized!
            </Text>
          </View>
        ),
        pendingAuthorizationView: (
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              textAlign: 'center',
              fontSize: 20,
            }}>
              Require Camera Permission!
            </Text>
          </View>
        ),
        permissionDialogTitle: "Request",
        permissionDialogMessage: "Camera Permission",
        checkAndroid6Permissions: false,
        ScanResult: () => (console.log('QR code scanned!')),
        reactivate: false,
        reactivateTimeout: 0,
    }

    constructor(props) {
        super(props);
        this.state = {
            scanning: false,
            moveAnim: new Animated.Value(0),
            isAuthorized: false,
            isAuthorizationChecked: false,
            peerId: '',
            peerFound: false
        };
        this.title = 'QRScan';

        this.handleCommunication = this.handleCommunication.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        this.startAnimation();
        if (Platform.OS === 'ios') {
            Permissions.request(CAMERA_PERMISSION).then(response => {
                this.setState({
                    isAuthorized: response === PERMISSION_AUTHORIZED,
                    isAuthorizationChecked: true
                });
            });
        }
        else if (Platform.OS === 'android' && this.props.checkAndroid6Permissions) {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
                'title': this.props.permissionDialogTitle,
                'message':  this.props.permissionDialogMessage,
            }).then((granted) => {
                const isAuthorized = Platform.Version >= 23 ?
                granted === PermissionsAndroid.RESULTS.GRANTED :
                granted === true;
                this.setState({ isAuthorized, isAuthorizationChecked: true })
            })
        }
        else {
            this.setState({ isAuthorized: true, isAuthorizationChecked: true })
        }
        
        // [bluetooth]: assign listeners for so they can be unsubscribed on unmount
        this.detectedListener = BluetoothCP.addPeerDetectedListener((peers) => {
            /* code that runs when other device runs advertise and becomes detected */
            if (peers.id == this.state.peerId) {
                console.log('peer detected', peers)
                console.log(peers);

                this.setState({peerFound: true})
            }
        });
        
        this.messageListener = BluetoothCP.addReceivedMessageListener((peers) => {
            /* code that runs when you recieve a message */
            console.log('addReceivedMessageListener', peers.message)
            
            var card = JSON.parse(peers.message);
            this.props.addCardToEnd(card);
            console.log(card);

            setTimeout(function(){
                Actions.pop();
            }, 100);
            if(this.props.reactivate) {
                setTimeout(() => (this._setScanning(false)), this.props)
            }
        });
        
        console.log('scan: mounted');
    }
    
    componentWillUnmount() {
        this.detectedListener.remove();
        this.messageListener.remove();
        console.log('unmounting');
    }

    sendMessage() {
        let message = this.state.peerId;
        let peer = this.state.peerId;
        BluetoothCP.sendMessage(message, peer);
    }

    advertise() {
        BluetoothCP.advertise("BT");
    }

    // Make the animated scan bar
    startAnimation = () => {
        this.state.moveAnim.setValue(0);
        Animated.timing(
            this.state.moveAnim,
            {
                toValue: -200,
                duration: 3000,
                easing: Easing.linear
            }
        ).start(() => this.startAnimation());
    };

    // Set the value of scanning
    _setScanning(value) {
        this.setState({ scanning: value });
    }

    // Turn off the scanning status
    reactivate() {
        this._setScanning(false);
    }

    handleCommunication(id) {
        this.advertise();
        BluetoothCP.getNearbyPeers((peers) => {
            console.log(peers)
            if (Array.isArray(peers) && peers.length) {
                console.log(id);
                // if one of the nearby devices is the one scanned
                let found = peers.find(dev => (dev.id === id));
                if (typeof found === "undefined") {
                    console.log('nearby device found was not scanned');
                }
                else {
                    console.log('found scanned device nearby');
                    this.setState({peerFound: true});
                }
            }
            else {
                console.log('no nearby peers')
            }
        });
    }

    // Try to read the QRCode
    _handleBarCodeRead(e) {
        if(!this.state.scanning) {
            //Vibration.vibrate(); <- issues with permissions on android
            this._setScanning(true);
            this.props.ScanResult(e);
            console.log('scan: peer id ' + e.data);
            this.setState({peerId: e.data});
            this.handleCommunication(e.data);
        }
    }

    render() {
        const { notAuthorizedView, pendingAuthorizationView } = this.props
        const { isAuthorized, isAuthorizationChecked } = this.state
        if(isAuthorized) {
            return (
                <View style={styles.container}>
                    <RNCamera
                        style={styles.preview}
                        onBarCodeRead={this._handleBarCodeRead.bind(this)}>
                        <View style={styles.rectangleContainer}>
                            <View style={styles.rectangle}/>
                            <Animated.View style={[
                            styles.border,
                            {transform: [{translateY: this.state.moveAnim}]}]}/>
                            <Text style={styles.rectangleText}>Scan the QRCode</Text>
                            <Text style={styles.rectangleText}>Scanned ID: {this.state.peerId}</Text>
                            {this.state.peerFound ? <Button title="Acquire" onPress={this.sendMessage}/> : null}
                        </View>
                    </RNCamera>
                </View>
            );
        }
        else if (!isAuthorizationChecked) {
            return pendingAuthorizationView
        }
        else {
            return notAuthorizedView
        }
    }
}

function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Scan);
