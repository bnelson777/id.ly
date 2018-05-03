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
        LayoutAnimation, Image,
        Vibration } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';

class Scan extends Component {
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    constructor(props) {
        super(props);
        this.state = {
            scanning: false,
            moveAnim: new Animated.Value(0)
        };
        this.title = 'QRScan';
    }

    componentDidMount() {
        this.startAnimation();
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
            this.props.addCard(card);
            console.log(card)
            Actions.pop();
            if(this.props.reactivate) {
                setTimeout(() => (this._setScanning(false)), this.props)
            }
        }
    }

    static propTypes = {
        ScanResult: PropTypes.func.isRequired,
        reactivate: PropTypes.bool,
        reactivateTimeout: PropTypes.number,
    };

    static defaultProps = {
        ScanResult: () => (console.log('QR code scanned!')),
        reactivate: false,
        reactivateTimeout: 0,
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        }
        else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        else {
            return (
                <View style={styles.container}>
                    <BarCodeScanner
                        style={styles.preview}
                        onBarCodeRead={this._handleBarCodeRead.bind(this)}>
                        <View style={styles.rectangleContainer}>
                            <View style={styles.rectangle}/>
                            <Animated.View style={[
                                styles.border,
                                {transform: [{translateY: this.state.moveAnim}]}]}/>
                            <Text style={styles.rectangleText}>Scan the QRCode</Text>
                        </View>
                    </BarCodeScanner>
                </View>
            );
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
