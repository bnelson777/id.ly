import React, { Component } from 'react';
import styles from './styles';
import {StyleSheet, View, Dimensions, Text, TextInput, TouchableOpacity, Linking, Clipboard} from 'react-native';



import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as ReduxActions from '../../actions'; //Import your actions

import {Actions} from 'react-native-router-flux'

import KeyboardSpacer from 'react-native-keyboard-spacer';

// LOCKBOX
// FUNCTION(S): This component will handle the encryption and decryption of
// messages (and maybe cards objects in the future).
//
// FUTURE FUNCTION(S): Encrypt the entire json structure itself into chunks that
// fit RSA size limititions. Also will take those chunks of encrypted json and
// make a zip file for email attachment.
// decyption will also be expected to take a zip file upon app entry decrypt
// each chunk and put the chunks back togeather for reading.
//
// EXPECTED PROP(S): this.props.mode, this.props.message
// mode: is always expected so the component knows if it should perform encryption or
// decryption
// message is only expected when mode = encryption this is because the LOCKBOX
// needs a object to encrypt.


class Lockbox extends Component {
  constructor(props) {
      super(props);

      this.state = {
        jsonString: "",
        jsonM: ""
      };
    this.decryptMessage= this.decryptMessage.bind(this);
    this.generateID = this.generateID.bind(this);
  }

  generateID() {
    let d = new Date().getTime();
    let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
    });
    return id;
}

    decryptMessage() {
      jsonStringP = JSON.parse(this.state.jsonString);
      console.log(jsonStringP.to)
      console.log(jsonStringP.body)
      var RSAKey = require('react-native-rsa');
      var rsa = new RSAKey();

      var cardMatch = null;
      for (var i = 0, len = this.props.cards.length; i < len; i++) {
        console.log('iterating through card public keys!', i)
        if (this.props.cards[i].keys.n === jsonStringP.to) {
          cardMatch = this.props.cards[i];
          break;
        }
      }
      if (cardMatch) {
        console.log('card match key output:', cardMatch.keys)
        var jsond = JSON.stringify(cardMatch.keys)
        rsa.setPrivateString(jsond);
        console.log('the cyperedtext string is:',jsonStringP.body)
        console.log('the private key is:',jsond)
        var decrypted = rsa.decrypt(jsonStringP.body); // decrypted == originText
        console.log('the cyper says:',decrypted)

        //replace json encrypted text with decrypted text
        jsonStringP.message = decrypted

        console.log('message object:', jsonStringP)

        // add it to messages!
        this.props.addMessage(jsonStringP);

        // send user to home screen
        Actions.pop();
        Actions.home();
      }
      else {
        // TODO: add error handling alert user can't decrypt message
        console.log("couldnt find a matching public key in users cards")
        Actions.pop();
      }
    }

    encryptMessageDone() {
      // exit lockbox after user hits done button
      // double pop gets us back home
      Actions.pop();
      setTimeout(() => {Actions.pop()}, 100)
    }

    encryptMessage() {
      var cardMatch = null;

      //look up card of the person you are sending to (we need their email later)
      for (var i = 0, len = this.props.cards.length; i < len; i++) {
        console.log('iterating!', i)
        if (this.props.cards[i].keys.n === this.props.message.to) {
          cardMatch = this.props.cards[i];
          break;
        }
      }

      // if we found who it goes to in rolodex (we always should)
      if (cardMatch) {
        console.log('card match key output:', cardMatch.keys)
        // so we know who to send it to
        var email = cardMatch.email
        // for encrypt
        var toKey = cardMatch.keys.n
        // for email
        var subject = "Id.ly - New Message"

        // getting ready to encrypt message body
        var RSAKey = require('react-native-rsa');
        var rsa = new RSAKey();

        //make obj for RSA react native package function
        var keyObj = new Object();
        keyObj.n = toKey;
        keyObj.e = "10001";
        var publickeyToo= JSON.stringify(keyObj);
        console.log('what we will be set:', publickeyToo)
        rsa.setPublicString(publickeyToo);

        // encrypt the actual message for the reciever
        var encrypted = rsa.encrypt(this.props.message.body);

        // perform a deep copy of the message prop object
        var jsonN= JSON.stringify(this.props.message);
        var jsonP = JSON.parse(jsonN)

        // replace copy's body with encrypted message from above
        jsonP.body = encrypted;

        // get it ready for sending
        var jsonM = JSON.stringify(jsonP);

        // set state variable for use in render (copy to clipboard)
        this.state.jsonM = jsonM;

        console.log('messageobjJsond:', jsonM)

        //uri: mailto:mailto@deniseleeyohn.com?subject=abcdefg&body=body'
          var uri = "mailto:" + email + "?" + "subject=" + subject + "&body=" + jsonM
          //encode for email linking
            var res = encodeURI(uri);

            //return it
        return res.toString();
      }
      else {
        console.log("couldnt find a matching public key in users card rolodex")
      }
    }

    writeToClipboard = async () => {
      await Clipboard.setString(this.state.jsonM);
      console.log("clipboard data",this.state.jsonM)
      alert('Copied to Clipboard!');
    };

    render() {
      if (this.props.mode === 'encrypt') {
              console.log('In encrypt Mode')
              console.log(this.props.message)
              var url = this.encryptMessage();
        return (

            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={{flex:1, paddingLeft:10, paddingRight:10}}>
                  <TextInput
                      multiline={true}
                      onChangeText={(text) => this.setState({email: text})}
                      placeholder={this.state.jsonM}
                      style={[styles.quote]}
                      editable={false}
                      value={this.state.jsonM}
                  />

                </View>
                <TouchableOpacity style={[styles.saveBtn]}
                                  onPress={() => Linking.openURL(url)}>
                    <Text style={[styles.buttonText,
                        {
                            color: "#FFF"
                        }]}>
                        Email
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.saveBtn]}
                                  onPress={this.writeToClipboard}>
                    <Text style={[styles.buttonText,
                        {
                            color: "#FFF"
                        }]}>
                        Copy to Clipboard
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.saveBtn]}
                                  onPress={this.encryptMessageDone}>
                    <Text style={[styles.buttonText,
                        {
                            color: "#FFF"
                        }]}>
                        Done
                    </Text>
                </TouchableOpacity>
            </View>
        );
      }
      else if (this.props.mode === 'decrypt') {
                      console.log('In decrypt Mode')

                      console.log(this.generateID())

                      return (
                          <View style={{flex: 1, backgroundColor: '#fff'}}>
                              <View style={{flex:1, paddingLeft:10, paddingRight:10}}>
                                  <TextInput
                                      multiline={true}
                                      onChangeText={(text) => this.setState({jsonString: text})}
                                      placeholder={"Enter the Json from email"}
                                      style={[styles.quote]}
                                      value={this.state.jsonString}
                                  />
                              </View>
                              <TouchableOpacity style={[styles.saveBtn]}
                                                disabled={(this.state.jsonString.length > 0) ? false : true}
                                                onPress={this.decryptMessage}>
                                  <Text style={[styles.buttonText,
                                      {
                                          color: (this.state.jsonString.length > 0) ? "#FFF" : "rgba(255,255,255,.5)"
                                      }]}>
                                      Decrypt
                                  </Text>
                              </TouchableOpacity>
                              <KeyboardSpacer />
                          </View>
                      );


      }
      else {
        console.log('In no mode.. strange')
                return (
<View style={{flex: 1, backgroundColor: '#fff'}}>
<Text>Weird...</Text>
</View>
                );
      }
    }

}


// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        cards: state.dataReducer.cards,
        messages: state.dataReducer.messages
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Lockbox);
