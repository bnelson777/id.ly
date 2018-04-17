'use strict';

import React, { Component } from 'react';
import styles from './styles';
import { View, Text, TextInput, Button } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            passwordVerify: "",
        };
    };

    _checkPassword() {
        alert("Currently in development!");
    }

    render() {
        // If loading, display the loading animation.
        if(this.props.loading) {
            return (
                <View>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        }
        // Otherwise, render the view.
        else {
            return (
                // Container
                <View style={styles.container}>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Enter Password"
                        onChangeText= {(text) => {this.setState({password:text})}}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Verify Password"
                        onChangeText= {(text) => {this.setState({passwordVerify:text})}}
                        secureTextEntry={true}
                    />
                    <Button
                        style={styles.button}
                        disabled={(this.state.password != 0 && this.state.passwordVerify != 0) ? false : true}
                        onPress={this._checkPassword}
                        title="Register"
                        color="black"
                    />
                    <KeyboardSpacer />
                </View>
            );
        }
    }
};
