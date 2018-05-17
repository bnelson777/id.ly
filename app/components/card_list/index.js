/**
 * Create Card List Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { StyleSheet, FlatList,
        View, Text, TouchableHighlight,
        TouchableOpacity, Image, Dimensions } from 'react-native';
import styles, { COLORS } from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import { Avatar } from 'react-native-elements';

export class CardList extends Component {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.props.getCards();
    }

    render() {
        const cards = this.props.isWallet === true ?
            this.props.cards.filter(function(obj) {return obj.owner === true}).map(card => card) :
            this.props.cards.filter(function(obj) {return obj.owner === false}).map(card => card);
        return (
            // Display ID buttons as a list
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

    renderItem({item, index}) {
        let icon = item.image === "" ? require('../../assets/default_avatar.png') : {uri: item.image};
        if (this.props.isWallet === true) {
            return (
                // Display image, ID button, and share icon
                // ID buttons are displayed in alternating color based on index
                <View>
                    {index > 0 ? <View style={styles.sepLine}/>:<View/>}
                    <View style={styles.buttonContainer}>
                        <View>
                            <TouchableOpacity onPress={() => Actions.card_view({title: item.name, card: item, isWallet: true})}>
                                <Avatar
                                    small
                                    rounded
                                    source={icon}
                                    containerStyle = {styles.toLeft}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => Actions.card_view({title: item.name, card: item, isWallet: true})}>
                            <View
                                style={[styles.button, styles.cardButton, styles.cardButtonRolodex]}
                                backgroundColor={COLORS[index % COLORS.length]}
                            >
                                <Text>{item.label}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[styles.button, styles.gotoButton, styles.gotoButtonRolodex]}/>
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
        } else {
            return (
                // Display image, ID button, message icon, and share icon
                // ID buttons are displayed in alternating color based on index
                <View>
                    {index > 0 ? <View style={styles.sepLine}/>:<View/>}
                    <View style={styles.buttonContainer}>
                        <View>
                            <TouchableOpacity onPress={() => Actions.card_view({title: item.name, card: item, isWallet: false})}>
                                <Avatar
                                    small
                                    rounded
                                    source={icon}
                                    containerStyle = {styles.toLeft}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => Actions.card_view({title: item.name, card: item})}>
                            <View
                                style={[styles.button, styles.cardButton, styles.cardButtonRolodex]}
                                backgroundColor={COLORS[index % COLORS.length]}
                            >
                                <Text>{item.name} ({item.label})</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[styles.button, styles.gotoButton, styles.gotoButtonRolodex]}>
                            <TouchableOpacity onPress={() => Actions.create_message({sender: null, recipient: item})}>
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
                </View>
            );
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
