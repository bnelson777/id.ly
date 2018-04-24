/**
 * Create Login Page
 * by id.ly Team
 */
'use strict';

//Import Libraries
import React, { Component } from 'react';
import styles from './styles';
import { View, Text, TextInput, 
        Button } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };
    };

    checkPassword() {
        alert("Wrong password!");
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
                        onChangeText= {(text) => {this.setState({input:text})}}
                        secureTextEntry={true}
                    />
                    <Button
                        onPress={this.checkPassword}
                        disabled={(this.state.input != 0) ? false : true}
                        title="Login"
                        color="black"
                    />
                    <KeyboardSpacer />
                </View>
            );
        }
    }
};
