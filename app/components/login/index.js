'use strict';

import React, { Component } from 'react';
import styles from './styles';
import { View, Text, TextInput } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    };

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
                        placeholder="Username"
                        onChangeText= {(text) => this.setState({text})}
                    />
                </View>
            );
        }
    }
};
