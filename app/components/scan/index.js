/**
 * Create QR Code Scanning Function
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import styles from './styles';
//import { Permissions, BarCodeScanner} from 'expo';
import { Text, View, StyleSheet,
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
            isAuthorizationChecked: false
        };
        this.title = 'QRScan';
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

    // Try to read the QRCode
    _handleBarCodeRead(e) {
        if(!this.state.scanning) {
            Vibration.vibrate();
            this._setScanning(true);
            this.props.ScanResult(e);
            var card = JSON.parse(e['data']);
            this.props.addCardToEnd(card);
            console.log(card);
            setTimeout(function(){
                Actions.pop();
            }, 100);
            if(this.props.reactivate) {
                setTimeout(() => (this._setScanning(false)), this.props)
            }
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
