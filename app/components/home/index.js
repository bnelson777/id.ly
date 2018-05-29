/**
 * Create Home Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import styles from './styles';
import { Alert, FlatList, View, Image,
        Text, ActivityIndicator, ScrollView,
        TouchableOpacity, ListView,
        ActionSheetIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions'; //Import your actions
import { Actions } from 'react-native-router-flux';
import { Avatar, Card, Button,
        List, ListItem } from 'react-native-elements';
import SideMenu from 'react-native-side-menu';
import Menu from './menu';

const menuImg = require('../../assets/menu.png');

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedItem: 'About',
        };
        this.toggle = this.toggle.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return{
            title: "Home",
            headerLeft: (<TouchableOpacity
                style={styles.row}
                onPress={params.toggle}>
                    <Image
                        source={menuImg}
                    />
                </TouchableOpacity>),
            headerRight: (<View/>),
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#128DC9',
            }
        }
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen,
        });
    }
    
    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }
    
    onMenuItemSelected = item =>
        this.setState({
          isOpen: false,
          selectedItem: item,
    });

    SeparatedLine = () => {
        return (
          <View style = {styles.sepLine}/>
        );
    };

    componentDidMount() {
        this.props.navigation.setParams({
            toggle: this.toggle
        });
        this.props.getMessages();
        this.props.getCards();
    }

    // Dummy function for button presses
    pressButton(label) {
        Alert.alert(label);
    }

    //Display default card
    displayDefault() {
        var myCards = this.props.cards.filter(function(obj) {return obj.owner === true}).map(card => card);
        if(myCards[0]) {
            let img = myCards[0].image === "" ? require('../../assets/default_avatar.png') : {uri: myCards[0].image};
            let name = myCards[0].name;
            let label = myCards[0].label;
            return (
                <View>
                    <View style={styles.CardInner}>
                        <View style={styles.CardInfo}>
                            <Avatar
                                xlarge
                                rounded
                                source = {img}
                            />
                        </View>
                        <View style={styles.CardInfo}>
                            <Text style={styles.cardTitle}> {name} </Text>
                            <Text style={styles.cardSubTitle}> {label} </Text>
                        </View>
                    </View>
                    <View style={styles.sepLine}/>
                    <View style={styles.cardButtonContainer}>
                        <Button 
                            title="Profile"
                            onPress={() => Actions.card_view({title: name, card: myCards[0], isWallet: myCards[0].owner})}
                            buttonStyle={styles.cardButton}
                        />
                        <Button 
                            title="Share"
                            onPress={() => Actions.share({card: myCards[0]})}
                            buttonStyle={styles.cardButton}
                        />
                    </View>
                </View>
            );
        }
        else {
            return ( 
                <View style={styles.nocard}>
                        <Button 
                            title="Add New Card"
                            onPress={() => Actions.create_card()}
                            buttonStyle={styles.button}
                        />
                </View>
            );
        }
    }

    unreadMsg() {
        var unread = this.props.messages.filter(function(obj) {return obj.read === false}).map(message => message);

        if(unread[0]){
            // array to be filled with valid pairs of sender and receivers
            var arr = [];

            // sort array of messages by time
            unread.sort(function (a,b) { return b.time - a.time; });

            // loop through all messages
            for (var i = 0, len = unread.length; i < len; i++) {
                // check array for to and from pair
                var present = false;
                // check existing pairs we've collected for duplicates
                for (var j = 0, len2 = arr.length; j < len2; j++ ) {
                    // if to / from match an existing entry, set present to true
                    if (arr[j].to === unread[i].to && arr[j].from === unread[i].from) {
                        present = true;
                    }
                    if (arr[j].to === unread[i].from && arr[j].from === unread[i].to) {
                        present = true;
                    }
                }
                // now add message to array if combination not present
                if (present == false) {
                    arr.push(unread[i])
                }
                else {
                    // don't do anything because pair was already in array
                }
            }

            return (
                <ScrollView style = {styles.msgContainer}>
                    <List containerStyle={styles.listContainer}>
                        <FlatList
                            data={arr}
                            keyExtractor={item => item.id}
                            renderItem={this.renderItem}
                            ItemSeparatorComponent={this.SeparatedLine}
                        />
                    </List>
                </ScrollView>
            );
        }
        else{
            return(
            <View style={styles.center}>
                <Text style={styles.nonUnread}>
                    No Unread Message
                </Text>
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
            <TouchableOpacity  onPress={() => Actions.message_thread({title: titleLabel, pair: pair})} >
                <ListItem
                    roundAvatar
                    title = {titleLabel}
                    rightTitle = {timeStamp}
                    subtitle = {item.body}
                    avatar = {uriflag === true ? {uri: portrait} : portrait}
                    containerStyle = {styles.unreadMessage}
                />
            </TouchableOpacity>
        );
    }

    // Displays animation if loading, otherwise displays a popup indicating the
    // TouchableOpacity pressed
    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected} 
            data = {this.props} />;

        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        } 
        else {
            return (
                <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={isOpen => this.updateMenuState(isOpen)}
                >
                <View style={styles.container}>
                    <View style = {styles.firstRow}>
                        <Avatar 
                            large
                            source = {require('../../assets/wallet.png')}
                            onPress={() => Actions.wallet({title:"Wallet", isWallet: true})}
                            overlayContainerStyle={{backgroundColor: '#FFFFFF'}}
                            activeOpacity={0.5}
                        />
                        <Avatar 
                            large
                            source = {require('../../assets/inbox.png')}
                            onPress={() => Actions.inbox()}
                            overlayContainerStyle={{backgroundColor: '#FFFFFF'}}
                            activeOpacity={0.5}
                        />
                        <Avatar
                            large
                            source = {require('../../assets/rolodex.png')}
                            onPress={() => Actions.rolodex({title:"Rolodex", isWallet: false})}
                            overlayContainerStyle={{backgroundColor: '#FFFFFF'}}
                            activeOpacity={0.5}
                        />
                        <Avatar
                            large
                            source = {require('../../assets/scan.png')}
                            onPress={() => Actions.scan()}
                            overlayContainerStyle={{backgroundColor: '#FFFFFF'}}
                            activeOpacity={0.5}
                        />                
                    </View>
                    <View style={styles.secondRow}>
                        <View style={styles.center}>
                            <View style={[styles.triangle,styles.upSideDown]}/>
                        </View>
                        <Card containerStyle = {styles.cardContainer}>
                            {this.displayDefault()}
                        </Card>
                        <View style={styles.center}>
                            <View style={styles.triangle}/>
                        </View>
                    </View>
                    <View style={styles.thirdRow}>
                            {this.unreadMsg()}
                    </View>
                </View>
                </SideMenu>
            );
        }
    }
};

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        cards: state.dataReducer.cards,
        messages: state.dataReducer.messages
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
