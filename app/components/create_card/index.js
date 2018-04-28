/**
 * Create Create Card Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { Text, View, TouchableOpacity,
        Image, FlatList, TextInput,
        Picker, Platform } from 'react-native';
import styles from './styles';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { RSAKeychain, RSA } from 'react-native-rsa';
import { ImagePicker, Permissions } from 'expo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';

// CreateCard
// FUNCTION(S): This component presents a form of attributes that allow a user to define their identity.
// Attributes can be added/removed from the form. An image for the card may be specified.
// FUTURE FUNCTION(S): Send its state to have its card created and stored in the application.
// EXPECTED PROP(S): N/A
class CreateCard extends Component {
    constructor(props) {
        super(props);
        this.state = {form: [{title: "Label", field: ""}, {title: "Name", field: ""}, {title: "Email", field: ""}], addAttribute: ""};
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
        var RSAKey = require('react-native-rsa');
        const bits = 1024;
        const exponent = '10001'; // must be a string. This is hex string. decimal = 65537
        var rsa = new RSAKey();
        rsa.generate(bits, exponent);
        var publicKey = rsa.getPublicString(); // return json encoded string
        var privateKey = rsa.getPrivateString(); // return json encoded string
        console.log(publicKey)
        console.log(privateKey)

        rsa.setPublicString(publicKey);
        var originText = 'sample String Value';
        console.log(originText)
        var encrypted = rsa.encrypt(originText);
        console.log(encrypted)
        var decrypted = rsa.decrypt(encrypted); // decrypted == originText
        console.log(decrypted)
        return privateKey;
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
              console.log(this.state.form[i]['field'])
              user_attributes[c] = {[this.state.form[i]['title']] : this.state.form[i]['field']}
          }
        }

        //convert to proper syntax
        var result = {};
        console.log('conversion size',user_attributes[0].length);
        for (var i=0; i<user_attributes.length; i++) {
          console.log('conversioniteration',Object.values(user_attributes[i])[0]);
          result[Object.keys(user_attributes[i])] = Object.values(user_attributes[i])[0];
        }

        // card object to pass into actions redux props.addCard()
        let card = {"id": id, "keys": keys_json, "fields": result, "label": this.state.form[0]['field'],"name": this.state.form[1]['field'], "email": this.state.form[2]['field'], "owner": true, "time": time, "image": this.state.image};
        console.log(card)
        this.props.addCard(card);

        //return us to previus component (wallet)
        Actions.pop();
      }

    render() {
        return (
            <View style={styles.bodyContainer}>
                <View style={styles.topButtonContainer}>
                    <TouchableOpacity onPress={() => {alert('')}}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.addCard()}>
                        <Text style={styles.buttonText}>Add Card</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.screenContainer}>
                    <View style={styles.formContainer}>
                        <FlatList
                            data={this.state.form}
                            keyExtractor={item => item.title}
                            renderItem={this.renderItem}
                        />
                    </View>
                    <View style={styles.addImageContainer}>
                        <Image style={styles.imageStyle} source={{uri: this.state.image}} />
                        <Picker
                            style={styles.imageDropdown}
                            mode={"dropdown"}
                            onValueChange={(itemValue) => {
                                if (itemValue === "take_picture") this.takePicture();
                                else if (itemValue === "select_picture") this.pickImage();
                        }}>
                        <Picker.Item label="Add image" value="default" />
                        <Picker.Item label="Take a photo from camera" value="take_picture" />
                        <Picker.Item label="Select a photo from camera roll" value="select_picture" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.addAttributeContainer}>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Attribute"
                        underlineColorAndroid="transparent"
                        value={this.state.addAttribute}
                        onChangeText={(text) => this.handleAttributeTextChange(text)}
                    />
                    <View style={styles.addFieldButton}>
                        <TouchableOpacity onPress={() => this.addAttributeToForm()} disabled={(this.state.addAttribute != 0) ? false : true}>
                            <Text style={[styles.buttonText,
                                {color: (this.state.addAttribute != 0) ? "blue" : "#CCC"
                            }]}>
                                Add Attribute
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <KeyboardSpacer />
            </View>
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

    obtainPermissionIOS = async (permission) => {
        if (Platform.OS !== 'ios') {
            return;
        }

        const { checkStatus } = await Permissions.getAsync(permission);
        if (checkStatus !== 'granted') {
            const { askStatus } = await Permissions.askAsync(permission);
            if (askStatus !== 'granted') {
                console.log("error: Camera or camera roll permissions not granted.")
            }
        }
    }

    pickImage = async () => {
        this.obtainPermissionIOS(Permissions.CAMERA_ROLL);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.2,
            base64: true,
            exif: false
        });

        if (!result.cancelled) {
            const b64image = "data:image/jpeg;base64," + result.base64;
            this.setState({ image: b64image });
        }
    };

    takePicture = async () => {
        this.obtainPermissionIOS(Permissions.CAMERA);
        this.obtainPermissionIOS(Permissions.CAMERA_ROLL);
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.2,
          base64: true,
          exif: false
        });

        if (!result.cancelled) {
            const b64image = "data:image/jpeg;base64," + result.base64;
            this.setState({ image: b64image });
        }
    };

    removeAttributeFromForm(item){
        let temp = this.state.form;
        let index = temp.indexOf(item);
        if (index > -1) {
            temp.splice(index, 1);
        }
        this.setState({form: temp});
    }
};

function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCard);
