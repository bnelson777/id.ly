import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableHighlight
} from 'react-native';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as ReduxActions from '../actions';

import {Actions} from 'react-native-router-flux'

import Portrait from '../components/portrait'

/** InboxItem
 *  Props:
 *  [string] message
 *  [number] cardId
 *  [number] date
 *  [function] onPress
 */
class InboxItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.getCards();
    }

    findAuthor = () => {
        let author = null;
        for (card of this.props.cards) {
            if (card.id === this.props.cardId) {
                author = card.first + ' ' + card.last;
                break;
            }
        };
        return author;
    }

    render() {
        // from cards - we need to get the base64 encoded image of the person in the from
        // todo: we need to print out the message - who its from - and also the time
        // include some way to distinguis read/unread ~~
        let author = this.findAuthor();
        return (
            <TouchableHighlight  onPress={this.props.onPress} >
                <View style={styles.container}>
                    <Portrait cardId={this.props.cardId} />
                    <View style={styles.textContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.authorText}> {author} </Text>
                            <Text> {new Date(this.props.date).toDateString()} </Text>
                        </View>
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}> {this.props.message} </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}


// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InboxItem);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 10
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
    }
});
  