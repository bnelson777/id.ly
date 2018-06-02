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
        else {
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
    }

    renderItem({item, index}) {
        let icon = item.image === "" ? require('../../assets/default_avatar.png') : {uri: item.image};
        let label = this.props.isWallet === true ? item.label : item.name + ' (' + item.label + ')';
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
            // Display image, ID button, message icon, and share icon
            // ID buttons are displayed in alternating color based on index
            <View>
                {index > 0 ? <View style={styles.sepLine}/>:<View/>}
                <View style={styles.buttonContainer}>
                    <View>
                        <TouchableOpacity
                            style={[styles.toLeft, styles.roundedImg]}
                            onPress={() => Actions.card_view({title: item.name, card: item, isWallet: item.owner})}>
                            <Image
                                style={styles.roundedImg}
                                source = {icon}
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

function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
