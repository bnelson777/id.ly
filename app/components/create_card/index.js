import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    Picker
} from 'react-native';
import styles from './styles';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {ImagePicker } from 'expo'

class CreateCard extends Component {
    constructor(props) {
        super(props);

        this.state = {form: [{title: "Label", field: ""}, {title: "Name", field: ""}, {title: "Email", field: ""}], addAttribute: "", image: ""};
    }

    render() {
        return (
            <View style={styles.bodyContainer}>
                <View style={styles.topButtonContainer}>
                    <TouchableOpacity onPress={() => {alert('')}}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {alert('')}}>
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
                        <TouchableOpacity onPress={() => {alert('')}}>
                            <Image source={require('../../assets/person.png')} />
                        </TouchableOpacity>
                        <Picker
                        style={styles.imageDropdown}
                        mode={"dropdown"}
                        onValueChange={(itemValue) => {
                            if (itemValue === "take_picture") this._takePicture();
                            else if (itemValue === "select_picture") this._pickImage();
                        }}>
                        <Picker.Item label="Choose image" value="default" />
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
            <View style={styles.formItemContainer}>
                <Text style={styles.formTitle}> {item.title} </Text>
                <TextInput
                    style={styles.formInput}
                    placeholder={"Enter " + item.title}
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

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1.0,
            base64: true,
            exif: false
        });
    
        if (!result.cancelled) {
          this.setState({ image: result.base64 });
        }
      };

      _takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1.0,
          base64: true,
          exif: false
        });
    
        if (!result.cancelled) {
          this.setState({ image: result.base64 });
        }
      };
};

export default CreateCard;
