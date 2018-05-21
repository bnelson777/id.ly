/**
 * Create Register Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../../auth";

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = { password1: '', password2: '' };
    }

    confirmPasswordsMatch() {
        if (this.state.password1 == this.state.password2)
            alert("Passwords Match!");
        else
            alert("Passwords do not match!");
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
                        onPress={() => this.confirmPasswordsMatch()} />
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