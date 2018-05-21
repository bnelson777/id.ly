/**
 * Create Login Page
 * by id.ly Team
 */
'use strict';

//Import Libraries

import React, { Component } from 'react';
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../../auth";

export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <View style={{ paddingVertical: 20 }}>
                <Card title="SIGN IN">
                <FormLabel>Password</FormLabel>
                <FormInput secureTextEntry placeholder="Password..." />

                <Button
                    buttonStyle={{ marginTop: 20 }}
                    backgroundColor="#03A9F4"
                    title="SIGN IN"
                    onPress={() => onSignIn()}
                />
                </Card>
            </View>
        );
    }
};
