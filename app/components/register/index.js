/**
 * Register Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import styles from './styles';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { Actions } from 'react-native-router-flux';
import bcrypt from "react-native-bcrypt";
import SInfo from 'react-native-sensitive-info';



// This component is intended to register a secure password 
// within the sensitive storage of the app. It uses bcrypt to
// hash out a salted password and stores within Sinfo.
// Note that this currently has a bug that
// only allows iOS devices to use thsi functionality.

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = { password1: '', password2: '' };
    }

    registerUser() {
        if (this.state.password1 != this.state.password2)
            alert("Passwords do not match, please re-enter.");
        else {
            var bcrypt = require('react-native-bcrypt');

            // Sets new User and loggedInStatus flags in AsyncStorage
            AsyncStorage.setItem('newUser', 'false');
            AsyncStorage.setItem('loggedInStatus', 'true');

            // Generates a salted password and adds to SInfo
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(this.state.password1, salt);
            SInfo.setItem('password', hash, {});
            SInfo.getItem('password', {}).then(value => {
                this.setState({password2: value});
            });
            this.props.navigation.navigate('home');
        }

    }


    render() {
        return(
            <View style={{ paddingVertical: 20 }}>
                <Card title="Register Your Device">
                    <FormLabel>Password</FormLabel>
                    <FormInput secureTextEntry placeholder="Password..." 
                        onChangeText={ (password1) => this.setState({password1})} />
                    <FormLabel>Confirm Password</FormLabel>
                    <FormInput secureTextEntry placeholder="Confirm Password..." 
                        onChangeText={ (password2) => this.setState({password2})} />

                    <Button buttonStyle={styles.button}
                        backgroundColor="#03A9F4"
                        title="REGISTER"
                        onPress={() => this.registerUser()} />
                </Card>
            </View>
        );
    }
};
