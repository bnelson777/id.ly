/**
 * Create QR Code Scanning Function
 * by id.ly Team on 4/5/2018
 */

//Import Libraries
import React, {Component} from 'react';
import { Permissions, BarCodeScanner} from 'expo';
import { Text, View, StyleSheet,
        Animated, Easing,
    } from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ReduxActions from '../actions';

import {Actions} from 'react-native-router-flux';

class Scan extends Component {
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    constructor(props) {
        super(props);
        this.state = {
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

    // Try to read the QRCode
    onBarCodeRead = (result) => {
        const {qrCodeRead} = this.props.route;
        const {data} = result;
        qrCodeRead && qrCodeRead(data);
        this.back();
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
            <View style={styles.container}>
                <BarCodeScanner
                    style={styles.preview}
                    onBarCodeRead={this.onBarCodeRead}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#C70038',
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#C70038',
    }
});
