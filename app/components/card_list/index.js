/**
 * Create Card List Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { StyleSheet, FlatList, View,
        AppState, Text, TouchableHighlight,
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
        this.state = {};
        this.state.appState = AppState.currentState;
    }

    componentDidMount() {
        this.props.getCards();
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this.props.navigation.navigate('login');
        }
        this.setState({appState: nextAppState});
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

function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
