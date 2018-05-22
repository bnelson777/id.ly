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
            isLoading: true
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

        for (var i = 0, len = this.props.cards.length; i < len; i++) {
            if (this.props.cards[i].owner === true) {
                var decrypted = null;
                var privStore = 'privkey' + this.props.cards[i].id;
                console.log('here is the lookup:',privStore)
                SInfo.getItem(privStore, {})
                .then((privkey) => {
                  try {
                      console.log('here is the private key:',privkey)
                      var privatekey = JSON.stringify(privkey)
                      console.log('here is the private key string:',privatekey)
                      rsa.setPrivateString(privkey);
                      console.log('after setPrivateKeystring')
                      decrypted = rsa.decrypt(arr[0]); // decrypted == originText
                      console.log('decrypt?:',decrypted)
                  }
                  catch(err) {
                      console.log('err attempting to decrypt with this key', i)
                      // keep trying
                  }
                });

                if (decrypted !== null) {
                    break;
                }
            }
        }

        if (decrypted === null) {
            alert('This message could not be decrypted.');
            Actions.pop();
            return;
        }

        var aesKEYIV = decrypted.split(',');

        AesCrypto.decrypt(base64AESDecode,aesKEYIV[0],aesKEYIV[1]).then(plaintxt=>{
            var message = JSON.parse(plaintxt);
            var notDuplicateMessage = true;
            for (var i = 0, len = this.props.messages.length; i < len; i++) {
              console.log('iterating through messages!', i)
                if(this.props.messages[i].id === message.id){
                    notDuplicateMessage = false;
                    break;
                }
            }

            if(notDuplicateMessage){
              this.props.addMessage(message);
              // send user to inbox view
              Actions.pop();
              Actions.inbox();
            }
            else {
              alert('This message has been decrypted already, check your inbox.');
              Actions.pop();
              return;
            }
        }).catch(err=>{
          console.log(err);
        });
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
            this.state.jsonString = decodeURI(this.props.message)
            return (
                <View style={styles.container}>
                    <View style={styles.row}>
                        <TextInput
                            multiline={true}
                            onChangeText={(text) => this.setState({jsonString: text})}
                            placeholder={decodeURI(this.props.message)}
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
