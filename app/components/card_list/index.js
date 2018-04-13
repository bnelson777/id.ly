import React, {Component} from 'react';
import {
    Alert,
    StyleSheet,
    FlatList,
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import styles, { COLORS } from './styles';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ReduxActions from '../../actions';

import {Actions} from 'react-native-router-flux';

class CardList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount(){
        this.props.getCards();
    }

    // Dummy function for button presses
    pressButton(label){
        Alert.alert(label);
    }

    render(){
        return (
            // Display Home and Add buttons
            // Display ID buttons as a list
            <View style={styles.container}>
                <View style={[styles.buttonContainer, styles.headContainer]}>
                    <View style={[styles.button, styles.homeButton]}>
                        <TouchableOpacity onPress={() => Actions.home()}>
                            <Text style={styles.topButtonText}>Home</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.button, styles.addButton]}>
                        <TouchableOpacity onPress={() => {this.pressButton("Add card")}}>
                            <Text style={styles.topButtonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    ref='listRef'
                    data={this.props.cards}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }

    renderItem({item, index}) {
        if (this.props.isWallet === item.owner){
            let icon = item.image === "" ? require('../../assets/person.png') : {uri: item.image};
            if (this.props.isWallet === true) {
                return (
                    // Display person icon, ID button, and arrow icon
                    // ID buttons are displayed in alternating color based on index
                    <View style={[styles.buttonContainer, styles.bodyContainer]}>
                        <View style={[styles.button, styles.imageButtonWallet]}>
                            <TouchableOpacity onPress={() => {this.pressButton("Go to card")}}>
                                <Image
                                    style={styles.imageContainer}
                                    source={icon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[styles.button, styles.cardButtonWallet]}
                            backgroundColor={COLORS[index % COLORS.length]}
                        >
                            <TouchableOpacity onPress={() => {this.pressButton(item.label)}}>
                                <Text>{item.label}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.button, styles.gotoButtonWallet]}>
                            <TouchableOpacity onPress={() => Actions.share({card: item})}>
                                <Image
                                    style={styles.imageContainer}
                                    source={require('../../assets/share.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            } else {
                return (
                    // Display person icon, ID button, and arrow icon
                    // ID buttons are displayed in alternating color based on index
                    <View style={[styles.buttonContainer, styles.bodyContainer]}>
                        <View style={[styles.button, styles.imageButtonRolodex]}>
                            <TouchableOpacity onPress={() => {this.pressButton("Go to card")}}>
                                <Image
                                    style={styles.imageContainer}
                                    source={icon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[styles.button, styles.cardButtonRolodex]}
                            backgroundColor={COLORS[index % COLORS.length]}
                        >
                            <TouchableOpacity onPress={() => {this.pressButton(item.label)}}>
                                <Text>{item.label}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.button, styles.gotoButtonRolodex]}>
                            <TouchableOpacity onPress={() => Actions.message_thread({card: item})}>
                                <Image
                                    style={styles.imageContainer}
                                    source={require('../../assets/mail.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.button, styles.gotoButtonRolodex]}>
                            <TouchableOpacity onPress={() => Actions.share({card: item})}>
                                <Image
                                    style={styles.imageContainer}
                                    source={require('../../assets/share.png')}
                                />
                            </TouchableOpacity>
                        </View>
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