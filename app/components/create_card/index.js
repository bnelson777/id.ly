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
import ActionSheet from 'react-native-actionsheet';

// CreateCard
// FUNCTION(S): This component presents a form of attributes that allow a user to define their identity.
// Attributes can be added/removed from the form. An image for the card may be specified.
// FUTURE FUNCTION(S): Send its state to have its card created and stored in the application.
// EXPECTED PROP(S): N/A
class CreateCard extends Component {
    constructor(props) {
        super(props);
        this.state = {form: [{title: "Label", field: ""}, {title: "Name", field: ""}, {title: "Email", field: ""}], addAttribute: ""};
        this.generateKeys = this.generateKeys.bind(this);
        this.removeAttributeFromForm.bind(this);
        this.choosePhotoAction = this.choosePhotoAction.bind(this);
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

    choosePhotoAction(num){
        if (num === 1)
            this.takePicture();
        else if (num === 2)
            this.pickImage();
    }

    showActionSheet = () => {
        this.ActionSheet.show();
    }

    render() {
        let photo = this.state.image === "" ? require('../../assets/add_image.png') : {uri: this.state.image};
        return (
            <View style={styles.bodyContainer}>
                <View style={styles.topButtonContainer}>
                    <TouchableOpacity onPress={() => {alert('')}}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {alert(JSON.stringify(this.state))}}>
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
                    <TouchableOpacity onPress={this.showActionSheet} style={[styles.addImageContainer, styles.imageStyle]}>
                            <Image
                                style={styles.imageStyle}
                                source={photo}
                            />
                    </TouchableOpacity>
                        <ActionSheet
                            ref={o => {this.ActionSheet = o}}
                            title={'Add photo from where?'}
                            options={["Cancel", "Take a photo from camera", "Select a photo from camera roll"]}
                            cancelButtonIndex={0}
                            onPress={(index) => this.choosePhotoAction(index)}
                        />
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