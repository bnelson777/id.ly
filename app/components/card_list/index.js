/**
 * Create Card List Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { Alert, StyleSheet, FlatList,
        View, Text, TouchableHighlight,
        TouchableOpacity, Image, Dimensions,
        ActionSheetIOS } from 'react-native';
import styles, { COLORS } from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';

//Buttons for Action Sheet
const BUTTONS = [
    "Delete",
    "Clear All",
    'Cancel',
];

const CANCEL_INDEX = 2;

class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderItem = this.renderItem.bind(this);
        this.showOptions = this.showOptions.bind(this);
    }

    componentDidMount() {
        this.props.getCards();
    }

    showOptions(card) {
        ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: 2,
        },(buttonIndex) => {
            if (buttonIndex === 0) this.props.deleteCard(card.id)
            else if (buttonIndex === 1) this.props.clearAll()
        });
    }

    // Dummy function for button presses
    pressButton(label) {
        Alert.alert(label);
    }

    render() {
        return (
            // Display ID buttons as a list
            <View style={styles.container}>
                <FlatList
                    ref='listRef'
                    data={this.props.cards}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }

    renderItem({item, index}) {
        if (this.props.isWallet === item.owner) {
            let icon = item.image === "" ? require('../../assets/person.png') : {uri: item.image};
            if (this.props.isWallet === true) {
                return (
                    // Display image, ID button, and share icon
                    // ID buttons are displayed in alternating color based on index
                    <View style={[styles.buttonContainer, styles.bodyContainer]}>
                        <TouchableOpacity
                            onPress={() => Actions.card_view({card: item})}
                            style={[styles.button, styles.imageButton, styles.imageButtonWallet]}
                        >
                            <Image
                                style={[styles.imageContainer, styles.portrait]}
                                source={icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Actions.card_view({card: item})}
                            onLongPress={() => this.showOptions(item)}
                        >
                            <View
                                style={[styles.button, styles.cardButton, styles.cardButtonWallet]}
                                backgroundColor={COLORS[index % COLORS.length]}
                            >
                                <Text>{item.label}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Actions.share({card: item})}
                            onLongPress={() => this.showOptions(item)}
                            style={[styles.button, styles.gotoButton, styles.gotoButtonWallet]}
                        >
                            <Image
                                style={styles.imageContainer}
                                source={require('../../assets/share.png')}
                            />
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return (
                    // Display image, ID button, message icon, and share icon
                    // ID buttons are displayed in alternating color based on index
                    <View style={[styles.buttonContainer, styles.bodyContainer]}>
                        <TouchableOpacity
                            onPress={() => Actions.card_view({card: item})}
                            onLongPress={() => this.showOptions(item)}
                            style={[styles.button, styles.imageButton, styles.imageButtonRolodex]}
                        >
                            <Image
                                style={[styles.imageContainer, styles.portrait]}
                                source={icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Actions.card_view({card: item})}
                            onLongPress={() => this.showOptions(item)}
                        >
                            <View
                                style={[styles.button, styles.cardButton, styles.cardButtonRolodex]}
                                backgroundColor={COLORS[index % COLORS.length]}
                            >
                                <Text>{item.label}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Actions.message_thread({card: item})}
                            style={[styles.button, styles.gotoButton, styles.gotoButtonRolodex]}
                        >
                            <Image
                                style={styles.imageContainer}
                                source={require('../../assets/mail.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Actions.share({card: item})}
                            style={[styles.button, styles.gotoButton, styles.gotoButtonRolodex]}
                        >
                            <Image
                                style={styles.imageContainer}
                                source={require('../../assets/share.png')}
                            />
                        </TouchableOpacity>
                    </View>
                );
            }
        }
    }
}

function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
