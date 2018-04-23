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
import KeyboardSpacer from 'react-native-keyboard-spacer';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ReduxActions from '../../actions';

import {Actions} from 'react-native-router-flux';

class CreateCard extends Component {
    constructor(props) {
        super(props);

        this.state = {form: [{title: "Label", field: ""}, {title: "Name", field: ""}, {title: "Email", field: ""}], addAttribute: ""};
        this.removeAttributeFromForm.bind(this);
    }

    componentDidMount(){
        this.props.getCards();
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