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

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="REGISTER"
        onPress={() => onSignIn()}
      />
      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="transparent"
        textStyle={{ color: "#bcbec1" }}
        title="Sign In"
        onPress={() => alert(this.state.password1)}
      />
    </Card>
  </View>
    );
}
};