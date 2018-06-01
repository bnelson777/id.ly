/**
 * Create Lockbox Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import styles from './styles';
import {StyleSheet, View, Dimensions,
        Text, TextInput, TouchableOpacity,
        Linking, Clipboard} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions'; //Import your actions
import {Actions} from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AesCrypto from 'react-native-aes-kit';
import { Buffer } from 'buffer'
import SInfo from 'react-native-sensitive-info';

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


export class Lockbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonString: "",
            jsonM: "",
            returnTo: "",
            key: '',
            iv: '',
            email: '',
            isLoading: true,
            added: false,
            duplicate: false
        };
        this.decryptMessage= this.decryptMessage.bind(this);
        this.encryptMessageDone= this.encryptMessageDone.bind(this);
    }

    componentDidMount(){
        this.props.getCards();
        if (this.props.mode === 'encrypt') {
        console.log('Encrypt Mode DidMount()')
            // update state variable so we know where to return
            this.state.returnTo = this.props.returnTo;
            this.encryptMessage();
        } else if (this.props.mode === 'decrypt') {
            console.log('Decrypt Mode DidMount()')
        } else {
            console.log('No props mode passed into Lockbox. This should not happen')
        }

    }

    decryptMessage() {
        var RSAKey = require('react-native-rsa');
        var rsa = new RSAKey();


        //decrypt the object we just made
        var TextTodecrypt = this.state.jsonString;
        var strippedBrackets = TextTodecrypt.replace(/[{}]/g, "");
        var arr = strippedBrackets.split(/\s*\-\s*/g);
        var base64AESDecode = Buffer.from(arr[1], 'base64').toString('ascii');
        console.log('the cards to loop', this.props.cards[2])
        for (var i = 0, len = this.props.cards.length; i < len; i++) {
            if (this.props.cards[i].owner === true) {
                var decrypted = null;
                var privStore = 'privkey' + this.props.cards[i].id;
                SInfo.getItem(privStore, {})
                .then((privkey, i, len) => {
                  try {
                      rsa.setPrivateString(privkey);
                      decrypted = rsa.decrypt(arr[0]); // decrypted == originText
                      if (decrypted !== null) {
                        var aesKEYIV = decrypted.split(',');
                        AesCrypto.decrypt(base64AESDecode,aesKEYIV[0],aesKEYIV[1]).then(plaintxt=>{
                            var message = JSON.parse(plaintxt);
                            var notDuplicateMessage = true;
                            for (var i = 0, len = this.props.messages.length; i < len; i++) {
                                if(this.props.messages[i].id === message.id){
                                    notDuplicateMessage = false;
                                    break;
                                }
                            }

                            if(notDuplicateMessage === true){
                              this.props.addMessage(message);
                              this.setState({added: true})
                              // send user to inbox view
                              Actions.pop();
                              Actions.inbox();
                              return;
                            }
                            else {
                              this.setState({duplicate: true})
                              return;
                            }
                        }).catch(err=>{
                          console.log(err);
                        });
                      }
                    }
                    catch(err) {
                        console.log('err attempting to decrypt with this key', i)
                        // keep trying
                    }
                });

            }
        }

        setTimeout(() => {
          if (this.state.added === false && this.state.duplicate === false) {
            alert('Could not decrypt message.');
            Actions.pop();
          }
          if (this.state.duplicate === true) {
            alert('Message already added to inbox.');
            Actions.pop();
          }
        }, 1000);
    }

    encryptMessageDone() {
        // exit lockbox after user hits done button
        // depends where we came from

        if (this.state.returnTo === 'thread') {
          // back to thread
          Actions.pop();
          setTimeout(() => {
          Actions.refresh({name:'zzzzar'});
          }, 10);
        }
        else if (this.state.returnTo === 'inbox') {
          // back to inbox view
          Actions.pop();
          Actions.pop();
        }
        else {
          // all else fails just go home
          Actions.home();
        }
    }

    encryptMessage() {
        var cardMatch = null;
        //look up card of the person you are sending to (we need their email later)
        for (var i = 0, len = this.props.cards.length; i < len; i++) {
            if (this.props.cards[i].keys.n === this.props.message.to) {
                cardMatch = this.props.cards[i];
                break;
            }
        }
        // if we found who it goes to in rolodex (we always should)
        if (cardMatch) {
            // get email so we know who to send it to
            var email = cardMatch.email
            // key for encrypt
            var toKey = cardMatch.keys.n
            // for email link
            var subject = "Id.ly - New Message"
            // getting ready to encrypt message body
            var RSAKey = require('react-native-rsa');
            var rsa = new RSAKey();
            //make obj for RSA react native package function
            var keyObj = new Object();
            // generate aes iv and key for message, RSA will encrypt these two keys.
            for(var key = ''; key.length < 16;) {
                key += Math.random().toString(36).substr(2, 1)
            }

            for(var iv = ''; iv.length < 16;) {
                iv += Math.random().toString(36).substr(2, 1)
            }

            // this is what object we will RSA encrypt for delivery
            var decryptkeys = [key, iv];

            // use those keys to encrypt the message object which we will send to user
            var aesMessageObject = 'undefined';

            AesCrypto.encrypt(JSON.stringify(this.props.message), key, iv)
                .then(cipher => {
                    aesMessageObject = cipher;
                    keyObj.n = toKey;
                    keyObj.e = "10001";
                    var publickeyToo= JSON.stringify(keyObj);
                    rsa.setPublicString(publickeyToo);
                    // RSA encrypted AES keys
                    var encrypted = rsa.encrypt(decryptkeys.toString());
                    // convert AES message object to base64 (url safe characters)
                    combinationBase64 = Buffer.from(aesMessageObject).toString('base64')
                    // get it ready for sending combine keys with aes message object
                    var jsonM = "http://joewetton.com/?m=" + '{' + encrypted + '-' + combinationBase64 + '}';
                    // setState of jsonM
                    this.setState({jsonM: jsonM})
                    //uri: mailto:mailto@deniseleeyohn.com?subject=abcdefg&body=body'
                    var uri = "mailto:" + email + "?" + "subject=" + subject + "&body=" + jsonM;
                    //encode for email linking
                    var res = encodeURI(uri);
                    // setState updates the render and the email link
                    this.setState({email: res})
                });
        }
        else {
            alert('Error: Could not find a matching public key in your rolodex.');
            Actions.pop();
        }
    }

    writeToClipboard = async () => {
        await Clipboard.setString(this.state.jsonM);
        alert('Copied to Clipboard!');
    };

    render() {

        if (this.props.mode === 'encrypt') {
            console.log('In encrypt Mode')

            return (
                <View style={styles.container}>
                    <View style={styles.row}>
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
                        onPress={() => Linking.openURL(this.state.email)}>
                        <Text style={[styles.buttonText,
                            {color: "#FFF"
                        }]}>
                            Email
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.saveBtn]}
                        onPress={this.writeToClipboard}>
                        <Text style={[styles.buttonText,
                            {color: "#FFF"
                        }]}>
                            Copy to Clipboard
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.saveBtn]}
                        onPress={this.encryptMessageDone}>
                        <Text style={[styles.buttonText,
                            {color: "#FFF"
                        }]}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else if (this.props.mode === 'decrypt') {
            console.log('In decrypt Mode')
            var placeholder = 'Enter message cipher ex. {54053da33f90c4fa48b658a3c6d9f2569155b3e977b1eab67c4ec940960af40fecc608794bd759c2df8148455168c4e2ab550308357d113b-vSDM4blBzT2NjQlRuNA0KVDlGSUxBNkNCNWR4NldFQUhMRFc4ZTkyeWxzeHM5YlBETEZBZGgzdCtSUlZMaTI1dDV1Rk9KVkJGSTdhWHV0Vg0KT2c0Y3pORlhoOWRxYUZjZjIvNm5EcmcyRHB5RktnV2dDZFNlcnRBRUVkZW91MkxwWU43STRocDkzRXhMN3lXZQ0KMU1Od21wZEFJR2xTN25nV0JxZWkrQi9kL0M1MFQweEpTWHNpSWFWVkJPbXQxYlVSWlY2blRVYnJ4ZkxQM0VLdw0KakNjcG94a0JodWdVMUNVVytWQXdhZkxLOTFZZUhuN2wrNDVkMjZ4WjBYNEx2bzVUbXBSbi9haWxqMW5zaWVtVQ0KbEpBTjdtUWhidHhqczNPOVRlcDhIaE5lYkhETGczS1NpdzVHeDhIeGtwdlJ5Y2JVTnEzZnNmc1QwdFVKMEM2dw0KbUc4QkM4K2RITTl6VnFlZnhITlBweFMybitTd1hoVm56RW5mT280RUxLdTNXWjBWaVlWNmpHaFljVE1BcFNmeQ0KNDZsOStUcjJkaUE5SFRPWUxOemxEZEdxS0drWldHUTNHQ0dKWWhrRWhaR0NveThiZm96U29KMFp5UjhtN29SZg0KMkVlK29pSlE5dGVGZE92dGR4MEhXWEVhdWVPSk5rdWJmUFJianY3Ykl5ST0=}';
            if (this.props.message) {
                this.state.jsonString = decodeURI(this.props.message);
                var placeholder = decodeURI(this.props.message);
            }
            
            return (
                <View style={styles.container}>
                    <View style={styles.row}>
                        <TextInput
                            multiline={true}
                            onChangeText={(text) => this.setState({jsonString: text})}
                            placeholder={placeholder}
                            style={[styles.quote]}
                        />
                    </View>
                    <TouchableOpacity style={[styles.saveBtn]}
                        disabled={(this.state.jsonString.length > 0) ? false : true}
                        onPress={this.decryptMessage}>
                        <Text style={[styles.buttonText,
                            {color: (this.state.jsonString.length > 0) ? "#FFF" : "#FFF"
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
                <View style={styles.container}>
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
