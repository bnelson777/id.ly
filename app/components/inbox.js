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

import * as ReduxActions from '../actions';

import {Actions} from 'react-native-router-flux'

import InboxItem from './inboxItem.js'

class Inbox extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.getMessages();
    }

    render() {
        return (
            <View style={styles.inboxContainer}>
                <FlatList
                data={this.props.messages}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return (<InboxItem message={item.message} date={item.date} cardId={item.from} onPress={() => {alert('')}} />);
                }}
                />
            </View>
        );
    }

};

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        messages: state.dataReducer.messages
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Inbox);

const styles = StyleSheet.create({
    inboxContainer: {
        flex: 1,
    }
});

