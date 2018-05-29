/**
 * Create Login Page
 * by id.ly Team
 */
'use strict';

//Import Libraries

import React, { Component } from 'react';
import { View, AsyncStorage } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import styles from './styles';
import { Actions } from 'react-native-router-flux';
import bcrypt from "react-native-bcrypt";
import isaac from "isaac";
import SInfo from 'react-native-sensitive-info';

export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = { attempt: '', password: '' };
    }

    componentDidMount() {
        SInfo.getItem('password', {}).then(value => {
            this.setState({password: value});
        });
    }


    checkPassword() {
        if (bcrypt.compareSync(this.state.attempt, this.state.password)) {
            AsyncStorage.setItem('loggedInStatus', 'true');
            this.props.navigation.navigate('home');
    }
        else
            alert("Fail!");
    }

    render() {

        return (
            <View style={{ paddingVertical: 20 }}>
                <Card title="SIGN IN">
                <FormLabel>Password</FormLabel>
                <FormInput secureTextEntry placeholder="Password..."
                    onChangeText={ (attempt) => this.setState({attempt})} />

                <Button
                    buttonStyle={ styles.button }
                    backgroundColor="#03A9F4"
                    title="SIGN IN"
                    onPress={() => this.checkPassword()}
                />
                </Card>
            </View>
        );
    }
};
