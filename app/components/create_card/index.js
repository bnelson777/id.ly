/**
 * Create Create Card Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity,
        Image, FlatList, TextInput,
        Picker, Platform, Alert} from 'react-native';
import styles from './styles';
import { RSAKeychain, RSA } from 'react-native-rsa';
//import { ImagePicker, Permissions } from 'expo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import { Avatar } from 'react-native-elements'; 
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SInfo from 'react-native-sensitive-info';

// CreateCard
// FUNCTION(S): This component presents a form of attributes that allow a user to define their identity.
// Attributes can be added/removed from the form. An image for the card may be specified.
// FUTURE FUNCTION(S): Send its state to have its card created and stored in the application.
// EXPECTED PROP(S): N/A
export class CreateCard extends Component {
    constructor(props) {
        super(props);
        this.state = {form: [{title: "Label", field: ""}, {title: "Name", field: ""}, {title: "Email", field: ""}], addAttribute: "", buttonPressed: false};
        this.state.image = "";
        this.generateKeys = this.generateKeys.bind(this);
        this.generateID = this.generateID.bind(this);
        this.removeAttributeFromForm.bind(this);
        this.generateTimestamp = this.generateTimestamp.bind(this);
    }

    componentDidMount(){
        this.props.getCards();
    }
    generateKeys() {
        console.log('RSA public private keys!')
        var num = this.props.cards.filter(function(obj) {return obj.owner == true}).map(card => card).length;
        var pubStore = 'pubkey' + num;
        var privStore = 'privkey' + num;
        var RSAKey = require('react-native-rsa');
        const bits = 1024;
        const exponent = '10001'; // must be a string. This is hex string. decimal = 65537
        var rsa = new RSAKey();
        rsa.generate(bits, exponent);
        var publicKey = rsa.getPublicString(); // return json encoded string
        var privateKey = rsa.getPrivateString(); // return json encoded string
        console.log(publicKey);
        console.log(privateKey);
        SInfo.setItem(pubStore, publicKey, {});
        SInfo.setItem(privStore, privateKey, {});

        rsa.setPublicString(publicKey);
        var originText = 'sample String Value';
        console.log(originText)
        var encrypted = rsa.encrypt(originText);
        console.log(encrypted)
        var decrypted = rsa.decrypt(encrypted); // decrypted == originText
        console.log(decrypted)
        return publicKey;
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

      generateTimestamp() {
          var time = new Date().getTime()/1000
          var time_round = parseInt(time)
          return time_round
      }

      addCard() {
        let id = this.generateID();
        let keys = this.generateKeys();
        let keys_json = JSON.parse(keys);
        let time = this.generateTimestamp();
        let user_attributes = []

        // create json of user attributes (if any)
        // check if user added any unique attributes in the first place
        if (this.state.form.length > 3) {
          var i, c;
          // iterate through user defined attributes and add them
          for (i = 3, c = 0; i < this.state.form.length; i++, c++) {
              user_attributes[c] = {[capitalizeFirstLetter(this.state.form[i]['title'])] : this.state.form[i]['field']}
          }
        }

        //convert to proper syntax
        var attributes = {};
        for (var i=0; i<user_attributes.length; i++) {
          attributes[Object.keys(user_attributes[i])] = Object.values(user_attributes[i])[0];
        }

        // card object to pass into actions redux props.addCard()
        let card = {"id": id, "keys": keys_json, "fields": attributes, "label": this.state.form[0]['field'],"name": this.state.form[1]['field'], "email": this.state.form[2]['field'], "owner": true, "time": time, "image": this.state.image};

        //add card and return us to previous component (wallet)
        this.props.addCardToEnd(card);

        setTimeout(function(){
            Actions.pop();
        }, 100);
      }

    render() {
        
        var icon = this.state.image === "" ? require('../../assets/default_avatar.png') : {uri: this.state.image};
        return (
            <KeyboardAwareScrollView style={styles.bodyContainer} innerRef={ref => {this.scroll = ref}}>
                <View>
                    <View style={styles.addImageContainer}/> 
                        <TouchableOpacity activeOpacity = { .5 } 
                            onPress={ () => this.chooseImage() }>
                            <View style={styles.cardPosition}>
                                <Avatar
                                    xlarge
                                    rounded
                                    source = {icon} 
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.screenContainer}>
                            <View style={styles.formContainer}>
                                <FlatList
                                data={this.state.form}
                                keyExtractor={item => item.title} 
                                renderItem={this.renderItem}/>
                                <View style={styles.addAttributeContainer}>
                                <TextInput
                                    style={styles.formInput}
                                    placeholder="Attribute"
                                    underlineColorAndroid="transparent"
                                    value={this.state.addAttribute}
                                    onChangeText={(text) => this.handleAttributeTextChange(text)}
                                />
                                <View style={styles.addFieldButton}>
                                    <TouchableOpacity onPress={() => this.addAttributeToForm()} 
                                        disabled={(this.state.addAttribute != 0) ? false : true}>
                                        <Text style={[styles.buttonText,
                                            {color: (this.state.addAttribute != 0) ? "blue" : "#CCC"
                                        }]}>
                                            Add Attribute
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.addFieldButton}>
                                <Button
                                    buttonStyle ={styles.ButtonContainer}
                                    title="Add Card"
                                    onPress={() => this.handleAddCard()}
                                />
                            </View> 
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }

    renderItem = ({item, index}) => {
        return (
            index > 2 ?
            <View style={styles.formItemContainer}>
                <Text style={styles.formTitle}> {item.title} </Text>
                <View style={styles.addAttributeContainer}>
                    <TextInput
                        style={styles.formInput}
                        placeholder={"Enter " + item.title}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.handleFormTextChange(index, text)}
                    />
                    <View style={styles.addFieldButton}>
                        <TouchableOpacity onPress={() => this.removeAttributeFromForm(item)}>
                            <Text style={styles.buttonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            :
            <View style={styles.formItemContainer}>
                <Text style={styles.formTitle}> {item.title} </Text>
                <TextInput
                    style={styles.formInput}
                    placeholder={" Enter " + item.title}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => this.handleFormTextChange(index, text)}
                />
            </View>
        );
    }

    handleFormTextChange = (index, text) => {
        this.setState({
            form: this.state.form.map((val, _index) => {
              if (_index !== index) return val;
              return { ...val, field: text };
            }),
        });
    }

    handleAttributeTextChange = (text) => {
        this.setState({addAttribute: text});
    }

    handleAddCard = () => {
        var emptyFields = 0;
        var i = 0;
        while (this.state.form.length > i) {
            // iterate through each field to verify if any are empty
            if (this.state.form[i]['field'] == '' )
                emptyFields++;
            i++;
        }

        //Pops up alert if there are any empty fields
        if (emptyFields > 0 )
            Alert.alert('Alert', 'Please fill in all fields.', [{text: 'OK'},])

        //Adds card if button has not been pressed and there are no empty fields
        if (!this.state.buttonPressed && emptyFields == 0 ){
            this.setState({buttonPressed: true});
            this.addCard();
        }
    }

    addAttributeToForm = () => {
        const { addAttribute } = this.state;

        if (addAttribute === "") return;
        for (form of this.state.form) {
            if (form.title === addAttribute) {
                alert("Error: Attribute already in form.")
                this.setState({ addAttribute: "" });
                return;
            }
        }

        this.setState({
            form: this.state.form.concat([{ title: addAttribute , field: ""}]),
            addAttribute: ""
          });
    }

    chooseImage = () => {
        var ImagePicker = require('react-native-image-picker');

        var options = {
        title: 'Add Image',
        mediaType: 'photo',
        quality: 1.0,
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let source = 'data:image/jpeg;base64,' + response.data;
            this.setState({ image: source });
        }
        });
    }

    removeAttributeFromForm(item){
        let temp = this.state.form;
        let index = temp.indexOf(item);
        if (index > -1) {
            temp.splice(index, 1);
        }
        this.setState({form: temp});
    }
};

function capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCard);