import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Image,
    ActivityIndicator, TouchableHighlight, ActionSheetIOS
} from 'react-native';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as ReduxActions from '../actions';

import {Actions} from 'react-native-router-flux'

class Inbox extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.getMessages();
        this.props.getCards();
    }

    render() {
        return (
            <View style={styles.inboxContainer}>
                <FlatList
                data={this.props.messages}
                keyExtractor={item => item.id}
                renderItem={this.renderItem}
                />
            </View>
        );
    }

    renderItem = ({item, index}) => {
        /* get author name for each message */
        let author = '';
        let portrait = '';
        for (card of this.props.cards) {
            if (card.id === item.id) {
                author = card.first + ' ' + card.last;
                portrait = card.portrait;
                break;
            }
        };

        return (
            <TouchableHighlight  onPress={() => alert()} >
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.imageStyle} source={{uri: portrait}} />
                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.authorText}> {author} </Text>
                            <Text> {new Date(item.date).toDateString()} </Text>
                        </View>
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}> {item.message} </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

};

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        messages: state.dataReducer.messages,
        cards: state.dataReducer.cards
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
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 10
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: 'grey'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    authorText: {
        fontWeight: 'bold'
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    imageStyle: {
        width: 80, 
        height: 80, 
        resizeMode: Image.resizeMode.contain
    }
});

