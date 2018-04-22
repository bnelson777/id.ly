import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    Picker,
    Platform
} from 'react-native';
import styles from './styles';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {ImagePicker, Permissions} from 'expo'

// CreateCard
// FUNCTION(S): This component presents a form of attributes that allow a user to define their identity.
// Attributes can be added/removed from the form. An image for the card may be specified.
// FUTURE FUNCTION(S): Send its state to have its card created and stored in the application.
// EXPECTED PROP(S): N/A
class CreateCard extends Component {
    constructor(props) {
        super(props);

        this.state = {form: [{title: "Label", field: ""}, {title: "Name", field: ""}, {title: "Email", field: ""}], addAttribute: ""};
        this.removeAttributeFromForm.bind(this);
    }

    render() {
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
                          {
                              color: (this.state.addAttribute != 0) ? "blue" : "#CCC"
                          }]}> Add Attribute </Text>
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

export default CreateCard;
