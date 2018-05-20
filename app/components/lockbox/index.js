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
        console.log('In encrypt Mode didmount')
            console.log(this.props.returnTo)
            console.log(this.props.mode)
            console.log(this.props.message)
            // update state variable so we know where to return
            this.state.returnTo = this.props.returnTo;

            var url = this.encryptMessage();
        } else if (this.props.mode === 'decrypt') {
            console.log('In decrypt Mode didmount')
        } else {
            console.log('haha sickkkkk')
        }
        
    }

    decryptMessage() {
                var RSAKey = require('react-native-rsa');
        var rsa = new RSAKey();
        
        
            //decrypt the object we just made
            var TextTodecrypt = this.state.jsonString;
            console.log('TextTodecrypt:', TextTodecrypt)
            var strippedBrackets = TextTodecrypt.replace(/[{}]/g, "");
            console.log('stripped brakcets decrypt text:', strippedBrackets)
            var arr = strippedBrackets.split(/\s*\-\s*/g);
            console.log('arr RSA:', arr[0])
            console.log('arr BASE64 AES:', arr[1])
            var base64AESDecode = Buffer.from(arr[1], 'base64').toString('ascii');
            console.log('arr BASE64 AES decoded:', base64AESDecode)
        
            console.log('how many cards on device?', this.props.cards.length)
            for (var i = 0, len = this.props.cards.length; i < len; i++) {
                console.log('iterating through cards', i)
                if (this.props.cards[i].owner === true) {
                    console.log('user owns this card', i)
                    var decrypted = null;
                    try {
                        var privatekey = JSON.stringify(this.props.cards[i].keys)
                        console.log('user owned card key', JSON.stringify(this.props.cards[i].keys))
                        rsa.setPrivateString(privatekey);
                        console.log('user owned card rsa crypt', arr[0])
                        decrypted = rsa.decrypt(arr[0]); // decrypted == originText
                        console.log('decrypt attempt: ', decrypted)
                    }
                    catch(err) {
                        console.log('err attempting to decrypt with this key', i)
                        // keep trying
                    }
                    if (decrypted !== null) {
                        console.log('decrypt worked so we quit')
                        break;
                    }
                }
            }
            //console.log('the cyperedtext string is:',arr[0])
            //console.log('the private key is:',jsond)
            //var decrypted = rsa.decrypt(arr[0]); // decrypted == originText
            //console.log('SHOULD BE AES KEYS:',decrypted)
            var aesKEYIV = decrypted.split(',');
            console.log('decrypt key:',aesKEYIV[0])
            console.log('decrypt iv:',aesKEYIV[1])
            
            AesCrypto.decrypt(base64AESDecode,aesKEYIV[0],aesKEYIV[1]).then(plaintxt=>{
                    console.log('finally.. the message object: ', JSON.parse(plaintxt));// return a string type plaintxt
                            this.props.addMessage(JSON.parse(plaintxt));
                            // send user to inbox view
                            Actions.pop();
                            Actions.inbox();
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
          console.log("zzzz");
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
            // generate aes iv and key for message, RSA will encrypt these two keys.
            for(var key = ''; key.length < 16;) {
                key += Math.random().toString(36).substr(2, 1)       
            }
            console.log(key)
            
            for(var iv = ''; iv.length < 16;) {
                iv += Math.random().toString(36).substr(2, 1)
            }
            console.log(iv)
            
            // this is what object we will RSA encrypt for delivery
            var decryptkeys = [key, iv];
            console.log('decrypt keys array', decryptkeys)
            
            // use those keys to encrypt the message object which we will send to user
            var aesMessageObject = 'undefined';
            
            console.log('message obj we are bout to aes encrypt:', JSON.stringify(this.props.message))
            AesCrypto.encrypt(JSON.stringify(this.props.message), key, iv)
                .then(cipher => {
                    aesMessageObject = cipher;
                    console.log('cipher: ' + cipher)
                    console.log('aes object saved', aesMessageObject)
                    
                
                    // move this stuff eventually out of here
                    
            keyObj.n = toKey;
            keyObj.e = "10001";
            var publickeyToo= JSON.stringify(keyObj);
            console.log('what we will be set:', publickeyToo)
            rsa.setPublicString(publickeyToo);
                console.log('aes keys in string form:', decryptkeys.toString())
            // encrypt the AES keys
            var encrypted = rsa.encrypt(decryptkeys.toString());
                
            //var combination = aesMessageObject;
                
            combinationBase64 = Buffer.from(aesMessageObject).toString('base64')
            
            console.log(Buffer.from(combinationBase64, 'base64').toString('ascii'));
            // get it ready for sending combine keys with aes message object
            var jsonM = "http://joewetton.com/?m=" + '{' + encrypted + '-' + combinationBase64 + '}';
            this.setState({jsonM: jsonM})
                
                
                
            
                
                
            
            // set state variable for use in render (copy to clipboard)
            this.state.jsonM = jsonM;
            console.log('messageobjJsond:', jsonM)
            //uri: mailto:mailto@deniseleeyohn.com?subject=abcdefg&body=body'
            var uri = "mailto:" + email + "?" + "subject=" + subject + "&body=" + jsonM;
            //encode for email linking
            var res = encodeURI(uri);
            //return it
                console.log(res)
                this.setState({email: res})
            return res.toString();
                
                    
                    
                });
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