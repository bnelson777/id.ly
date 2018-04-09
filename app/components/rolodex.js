import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator, TouchableHighlight, ActionSheetIOS
} from 'react-native';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as ReduxActions from '../actions'; //Import your actions

import {Actions} from 'react-native-router-flux'

//Buttons for Action Sheet
const BUTTONS = [
    "Edit",
    "Delete",
    'Cancel',
];

const CANCEL_INDEX = 2;

class Rolodex extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.renderItem = this.renderItem.bind(this);
        this.showOptions = this.showOptions.bind(this);
    }

    componentDidMount() {
        this.props.getContact(); //call our action
    }

    showOptions(name) {
        ActionSheetIOS.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: 1,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) Actions.new_name({name: name, edit: true, title:"Edit name"})
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    ref='listRef'
                    data={this.props.contact}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}/>


                <TouchableHighlight style={styles.addButton}
                                    underlayColor='#ff7043' onPress={() => Actions.new_name()}>
                    <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                </TouchableHighlight>
            </View>
        );
    }
    

    renderItem({item, index}) {
        return (
            <TouchableHighlight onPress={() => this.showOptions(item)} underlayColor='rgba(0,0,0,.2)'>
                <View style={styles.row}>
                    <Text style={styles.name}>
                        {item.name}
                    </Text>
                    <Text style={styles.info}>
                        {item.info}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
};



// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
            contact: state.dataReducer.contact
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Rolodex);

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },

    name: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8 * 2
    },

    info: {
        marginTop: 5,
        fontSize: 14,
    },
});
