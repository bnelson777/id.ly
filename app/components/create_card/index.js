import React, { Component } from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput
} from 'react-native';
import styles from './styles';

class CreateCard extends Component {
    constructor(props) {
        super(props);

        this.state = {form: [{title: "Label", field: ""}, {title: "Name", field: ""}, {title: "Email", field: ""}], addAttribute: ""};
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
                        <TouchableOpacity onPress={() => this.addAttributeToForm()}>
                            <Text style={styles.buttonText}> Add Attribute </Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
};

export default CreateCard;