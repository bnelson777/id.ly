import { BleManager } from 'react-native-ble-plx';
import React, { Component } from 'react';
import * as ReduxActions from '../../actions';
import { connect } from 'react-redux';
import styles from './styles';

import {
    Text,
    View,
    Button,
    Alert
  } from 'react-native';

var deviceInfo = [];


class Bluetooth extends Component {

    constructor(props) {
        super(props);
        this.manager = new BleManager();
        this.state = {};
    }

    componentDidMount() {
        const subscription = this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                this.scanAndConnect();
                subscription.remove();
            }
        }, true);
    }

  
    scanAndConnect() {
        console.log("In scanAndConnect");
        this.manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log("Error");
                // Handle error (scanning will be stopped automatically)
                return
            }
            console.log("scanning for devices");
            // Check if it is a device you are looking for based on advertisement data
            // or other criteria.
            console.log(device.id);
            console.log(device.name);
            if (deviceInfo.indexOf(device.name) === -1) 
            {
              deviceInfo.push(device.name);
              Alert.alert(deviceInfo.toString())
            }            

            //connect to the device
            if (device.name === "Device_to_Connect_to") {
                console.log("found device")
                // Stop scanning as it's not necessary if you are scanning for one device.
                this.manager.stopDeviceScan();

                device.connect()
                .then((device) => {
                    return device.discoverAllServicesAndCharacteristics()
                })
                .then((device) => {
                  console.log("connected to device");
                    // Do work on device with services and characteristics
                })
                .catch((error) => {
                  // Handle errors
                });
    
            }
        });
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.header_button_container}>
            {
              <Button 
                title="Scan" 
                color="#1491ee" 
                onPress={this.scanAndConnect()} />
            }
            </View>
          </View>
            
        );
    }
}

export default connect()(Bluetooth);
