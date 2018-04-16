'use strict';

import React, { Component } from 'react';
import styles from './styles';
import { View, Text, TextInput, Button } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
                        placeholder="Enter Password"
                        onChangeText= {(text) => {this.setState({text})}}
                        secureTextEntry={true}
                    />
                    <Button
                        onPress={this.checkPassword}
                        title="Login"
                        color="black"
                    />
                </View>
            );
        }
    }
};
