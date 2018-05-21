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

    render() {
    return(
  <View style={{ paddingVertical: 20 }}>
    <Card title="Register Your Device">
      <FormLabel>Name</FormLabel>
      <FormInput placeholder="Name..." />
      <FormLabel>Password</FormLabel>
      <FormInput secureTextEntry placeholder="Password..." />
      <FormLabel>Confirm Password</FormLabel>
      <FormInput secureTextEntry placeholder="Confirm Password..." />

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
        onPress={() => alert("go to sign in screen")}
      />
    </Card>
  </View>
    );
}
};