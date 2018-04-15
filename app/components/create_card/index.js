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

        // could be an issue if title is already defined
        // but that could be handled when you add a field to the form
        this.state = {form: [{title: "Label", field: ""}, {title: "Name", field: ""}, {title: "Email", field: ""}]};
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
                        ListFooterComponent={this.renderAddButton}
                        />
                    </View>
                    <View style={styles.addImageContainer}>
                        <TouchableOpacity onPress={() => {alert('')}}>
                            <Image source={require('../../assets/person.png')} />
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
                    onChangeText={(text) => this.handleTextChange(index, text)}
                />
            </View>
        );
    }

    renderAddButton = () => {
        return(
            <View style={styles.addFieldButton}>
                <TouchableOpacity onPress={() => {alert('adding field to list!')}}>
                    <Image source={require('../../assets/share.png')} resizeMode='center'/>
                </TouchableOpacity>
            </View>
        );
    }

    handleTextChange = (index, text) => {
        this.setState({
            form: this.state.form.map((val, _index) => {
              if (_index !== index) return val;
              return { ...val, field: text };
            }),
        });
    }
};

export default CreateCard;