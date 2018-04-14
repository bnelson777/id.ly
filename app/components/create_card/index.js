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
        this.state = {form: [{title:"Label"}, {title:"Name"}, {title:"Email"}]};
    }

    render() {
        return (
            <View style={styles.bodyContainer}>
                <View style={styles.topButtonContainer}>
                    <TouchableOpacity onPress={() => {alert('')}}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {alert('')}}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.screenContainer}>
                    <View style={styles.formContainer}>
                        <FlatList
                        data={this.state.form}
                        keyExtractor={item => item.title}
                        renderItem={this.renderItem}
                        />
                        <View style={styles.addFieldButton}>
                            <TouchableOpacity onPress={() => {alert('adding field to list!')}}>
                                <Text style={styles.buttonText}> Add field </Text>
                            </TouchableOpacity>
                        </View>
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
                />
            </View>
        );
    }
};

export default CreateCard;