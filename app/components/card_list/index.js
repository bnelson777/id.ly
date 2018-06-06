/**
 * Create Card List Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { StyleSheet, FlatList,
        View, Text, TouchableOpacity,
        Image, Dimensions } from 'react-native';
import styles, { COLORS } from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import { Avatar } from 'react-native-elements';

// CARDLIST
// FUNCTION(S): This component displays a list of ID cards. The isWallet prop
// determines whether the cards displayed are the user's cards (Wallet mode)
// or cards collected from others (Rolodex mode).
//
// EXPECTED PROP(S): this.props.isWallet
// This component will expect a boolean value to be passed in that determines
// the mode of the component (Wallet or Rolodex).
export class CardList extends Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    // Get the cards when the component mounts.
    componentDidMount() {
        this.props.getCards();
    }

    render() {
        // Filter the cards to work with user's cards (Wallet mode) or other cards (Rolodex mode).
        const cards = this.props.isWallet === true ?
            this.props.cards.filter(function(obj) {return obj.owner === true}).map(card => card) :
            this.props.cards.filter(function(obj) {return obj.owner === false}).map(card => card);

        // Display a message instead of cards if there are no cards available.
        if (cards.length === 0) {
            if (this.props.isWallet){
                return (
                    <View style={[styles.container, styles.emptyTextContainer]}>
                        <Text style={styles.emptyText}>
                            No cards available{"\n\n"}
                        </Text>
                        <TouchableOpacity onPress={() => Actions.create_card()}>
                            <Text style={[styles.emptyText, styles.tipText]}>
                                💡 Add a new card
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            }
            else {
                return (
                    <View style={[styles.container, styles.emptyTextContainer]}>
                        <Text style={styles.emptyText}>
                            No contacts available{"\n\n"}
                        </Text>
                        <TouchableOpacity onPress={() => Actions.scan()}>
                            <Text style={[styles.emptyText, styles.tipText]}>
                                💡 Add a new contact
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            }
        }
        // If cards are available, display the cards.
        else {
            return (
                <View style={styles.container}>
                    <FlatList
                        ref='listRef'
                        data={cards}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            );
        }
    }

    renderItem({item, index}) {
        // If the card has an image, display it. Otherwise, display a placeholder.
        let icon = item.image === "" ? require('../../assets/default_avatar.png') : {uri: item.image};

        // In Wallet mode, display the card's label field as the identifier.
        // In Rolodex mode, display the card's name and label instead.
        let label = this.props.isWallet === true ? item.label : item.name + ' (' + item.label + ')';

        // Display a button to send a message to an ID in Rolodex mode.
        let messageButton = this.props.isWallet === true ?
            null :
            (
                 <TouchableOpacity onPress={() => Actions.create_message({sender: null, recipient: item})}>
                     <Image
                         style={styles.imageContainer}
                         source={require('../../assets/mail.png')}
                     />
                 </TouchableOpacity>
            );

        return (
            // Display image, ID button, message button (Rolodex mode), and share button.
            // ID button colors cycle based on COLORS array in card_list/styles.js.
            <View>
                {index > 0 ? <View style={styles.sepLine}/>:<View/>}
                <View style={styles.buttonContainer}>
                    <View>
                        <TouchableOpacity onPress={() => Actions.card_view({title: item.name, card: item, isWallet: item.owner})}>
                            <Avatar
                                small
                                rounded
                                source={icon}
                                containerStyle = {styles.toLeft}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => Actions.card_view({title: item.name, card: item, isWallet: item.owner})}>
                        <View
                            style={[styles.button, styles.cardButton, styles.cardButtonRolodex]}
                            backgroundColor={COLORS[index % COLORS.length]}
                        >
                            <Text>{label}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.button, styles.gotoButton, styles.gotoButtonRolodex]}>
                        {messageButton}
                    </View>
                    <View style={[styles.button, styles.gotoButton, styles.gotoButtonRolodex]}>
                        <TouchableOpacity onPress={() => Actions.share({card: item})}>
                            <Image
                                style={styles.imageContainer}
                                source={require('../../assets/share.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state.
function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/about.js).
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

// Export component to be called elsewhere.
export default connect(mapStateToProps, mapDispatchToProps)(CardList);
