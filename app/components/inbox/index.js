/**
 * Create Inbox Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { FlatList, View, Image, Text,
        TouchableOpacity } from 'react-native';
import styles from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';

// Inbox
// FUNCTION(S): This component serves to display author picture, date, and body
// of messages which were imported then stored in the application.
// EXPECTED PROP(S):
export class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getMessages();
        this.props.getCards();
    }

    SeparatedLine = () => {
        return (
          <View style = {styles.sepLine}/>
        );
    };

    render() {
        if (this.props.messages.length === 0) {
            return (
                <View style={[styles.container, styles.emptyTextContainer]}>
                    <Text style={styles.emptyText}>
                        No messages available{"\n\n"}
                    </Text>
                    <TouchableOpacity onPress={() => Actions.create_message({sender: null, recipient: null})}>
                        <Text style={[styles.emptyText, styles.tipText]}>
                            💡 Try sending a new message
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            // array to be filled with valid pairs of sender and receivers
            var arr = [];

            // sort array of messages by time
            this.props.messages.sort(function (a,b) { return b.time - a.time; });

            // loop through all messages
            for (var i = 0, len = this.props.messages.length; i < len; i++) {
                // check array for to and from pair
                var present = false;
                // check existing pairs we've collected for duplicates
                for (var j = 0, len2 = arr.length; j < len2; j++ ) {
                    // if to / from match an existing entry, set present to true
                    if (arr[j].to === this.props.messages[i].to && arr[j].from === this.props.messages[i].from) {
                        present = true;
                    }
                    if (arr[j].to === this.props.messages[i].from && arr[j].from === this.props.messages[i].to) {
                        present = true;
                    }
                }
                // now add message to array if combination not present
                if (present == false) {
                    arr.push(this.props.messages[i])
                }
                else {
                    // don't do anything because pair was already in array
                }
            }

            return (
                <View style = {styles.container}>
                    <List containerStyle={styles.listContainer}>
                        <FlatList
                            data={arr}
                            keyExtractor={item => item.id}
                            renderItem={this.renderItem}
                            ItemSeparatorComponent={this.SeparatedLine}
                        />
                    </List>
                </View>
            );
        }
    }

    renderItem = ({item, index}) => {
        /* get author name and portrait for each message */
        let author = item.from; //display public key if card not found
        let sender = item.from; // default if card not in rolodex
        let receiver = item.to; // default if card not in rolodex
        let senderCard = null; // passed into message thread for card data
        let receiverCard = null; //passed into message thread for card data
        let label = "";
        let portrait = require('../../assets/default_avatar.png');
        let readflag = item.read;
        let uriflag = false;
        for (card of this.props.cards) {
            // to find display name of receiver of message (owner == false)
            if (card.keys.n === item.to && card.owner === false) {
                author = card.name;
                // set for inbox to know who is who
                receiver = item.to;
                receiverCard = card;
                sender = item.from;
                label = card.label;

                if(card.image !== ""){
                    portrait = card.image;
                }
                break;
            }
            // to find display the contact of message (owner == false)
            if (card.keys.n === item.from && card.owner === false) {
                author = card.name;
                // set for inbox to know who is who
                receiver = item.from;
                sender = item.to;
                receiverCard = card;
                label = card.label;

                if(card.image !== ""){
                    portrait = card.image;
                    uriflag = true;
                }
                break;
            }
        };


        for (card of this.props.cards) {
          //look up the senders card info to pass to message_thread
          // (card.owner=== True)
          if (card.keys.n === sender && card.owner === true) {
              senderCard = card;
              break;
          }
        };
        // object prop that is passed to message_thread
        let pair = {
          sender: sender,
          receiver: receiver,
          senderCard: senderCard,
          receiverCard: receiverCard
        }

        //label included as part of authorText
        var titleLabel = author + " (" + label + ")";

        //converts the seconds time in messages.json to milliseconds.
        //if message was received on current date the time will be displayed.
        //if the message was received before the current date, the date will be displayed.
        var millisecondTime = item.time*1000;
        var messageDate = new Date(millisecondTime).toDateString();
        var today = new Date().toDateString();
        var timeStamp;

        if (messageDate === today){
            var period = "AM";
            var date = new Date(millisecondTime);
            var hours = date.getHours();
            if (hours > 12){
                hours = hours-12;
                period = "PM";
            }
            var minutes = "0" + date.getMinutes();
            timeStamp = hours + ":" + minutes.substr(-2) + " " + period;
        }
        else{
            timeStamp = messageDate;
        }


        return (
            <TouchableOpacity
                onPress={() => Actions.message_thread({
                title: titleLabel, pair: pair})} >
                <ListItem
                    roundAvatar
                    title = {titleLabel}
                    rightTitle = {timeStamp}
                    subtitle = {item.body}
                    avatar = {uriflag === true ? {uri: portrait} : portrait}
                    containerStyle = {readflag === false ? styles.unreadMessage : styles.noBotBorder}
                />
            </TouchableOpacity>
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
