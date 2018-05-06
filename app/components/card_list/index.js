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
import { Avatar } from 'react-native-elements';

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
            let icon = item.image === "" ? require('../../assets/default_avatar.png') : {uri: item.image};
            if (this.props.isWallet === true) {
                return (
                    // Display image, ID button, and share icon
                    // ID buttons are displayed in alternating color based on index
                    <View>
                        <View style={styles.buttonContainer}>
                            <View>
                                <TouchableOpacity onPress={() => Actions.card_view({title: item.name, card: item})}>
                                    <Avatar
                                        small
                                        rounded
                                        source={icon}
                                        containerStyle = {styles.toLeft}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => Actions.card_view({title: item.name, card: item})}
                                onLongPress={() => this.showOptions(item)}
                            >
                                <View
                                    style={[styles.button, styles.cardButton, styles.cardButtonRolodex]}
                                    backgroundColor={COLORS[index % COLORS.length]}
                                >
                                    <Text>{item.label}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={[styles.button, styles.gotoButton, styles.gotoButtonRolodex]}/>
                            <View style={[styles.button, styles.gotoButton, styles.gotoButtonRolodex]}>
                                <TouchableOpacity onPress={() => Actions.share({card: item})} onLongPress={() => this.showOptions(item)}>
                                    <Image
                                        style={styles.imageContainer}
                                        source={require('../../assets/share.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.sepLine}/>
                    </View>
                );
            } else {
                return (
                    // Display image, ID button, message icon, and share icon
                    // ID buttons are displayed in alternating color based on index
                    <View>
                        <View style={styles.buttonContainer}>
                            <View>
                                <TouchableOpacity onPress={() => Actions.card_view({title: item.name, card: item})} onLongPress={() => this.showOptions(item)}>
                                    <Avatar
                                        small
                                        rounded
                                        source={icon}
                                        containerStyle = {styles.toLeft}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => Actions.card_view({title: item.name, card: item})}
                                onLongPress={() => this.showOptions(item)}
                            >
                                <View
                                    style={[styles.button, styles.cardButton, styles.cardButtonRolodex]}
                                    backgroundColor={COLORS[index % COLORS.length]}
                                >
                                    <Text>{item.label}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={[styles.button, styles.gotoButton, styles.gotoButtonRolodex]}>
                                <TouchableOpacity onPress={() => Actions.create_message({recipient: item})}>
                                    <Image
                                        style={styles.imageContainer}
                                        source={require('../../assets/mail.png')}
                                    />
                                </TouchableOpacity>
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
                        <View style={styles.sepLine}/>
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
