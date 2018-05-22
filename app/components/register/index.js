/**
 * Create Register Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import bcrypt from "react-native-bcrypt";
import { onSignIn } from "../../auth";
import isaac from "isaac";
import SInfo from 'react-native-sensitive-info';



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

            bcrypt.setRandomFallback((len) => {
                const buf = new Uint8Array(len);
                return buf.map(() => Math.floor(isaac.random() * 256));
            });

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(this.state.password1, salt);
            SInfo.setItem('password', hash, {});
//            alert(hash);
            SInfo.getItem('password', {}).then(value => {
                this.setState({password2: value});
                alert(this.state.password2);
            });
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

                    <Button buttonStyle={{ marginTop: 20 }}
                        backgroundColor="#03A9F4"
                        title="REGISTER"
                        onPress={() => this.registerUser()} />
                    <Button buttonStyle={{ marginTop: 20 }}
                        backgroundColor="transparent"
                        textStyle={{ color: "#bcbec1" }}
                       title="Sign In"
                        onPress={() => alert("Hello")} />
                </Card>
            </View>
        );
    }
};