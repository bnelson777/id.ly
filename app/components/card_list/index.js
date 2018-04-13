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

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ReduxActions from '../actions';

import {Actions} from 'react-native-router-flux';

// Get screen width for button width/height
const {width} = Dimensions.get('window');
const screenWidth = width;
const buttonHeight = screenWidth * 0.10;

// Set alternating colors for ID buttons
const COLORS = ['#FF0000', '#00FF00', '#0000FF'];

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
            let icon = item.image === "" ? require('../assets/person.png') : {uri: item.image};
            if (this.props.isWallet === true) {
                return (
                    // Display person icon, ID button, and arrow icon
                    // ID buttons are displayed in alternating color based on index
                    <View style={[styles.buttonContainer, styles.bodyContainer]}>
                        <View style={[styles.button, styles.imageButtonWallet]}>
                            <TouchableOpacity onPress={() => {this.pressButton("Go to card")}}>
                                <Image
                                    style={{width: buttonHeight, height: buttonHeight}}
                                    source={icon}
                                    resizeMode = 'contain'
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
                                    style={{width: buttonHeight, height: buttonHeight}}
                                    source={require('../assets/share.png')}
                                    resizeMode = 'contain'
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
                                    style={{width: buttonHeight, height: buttonHeight}}
                                    source={icon}
                                    resizeMode = 'contain'
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
                                    style={{width: buttonHeight, height: buttonHeight}}
                                    source={require('../assets/mail.png')}
                                    resizeMode = 'contain'
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.button, styles.gotoButtonRolodex]}>
                            <TouchableOpacity onPress={() => Actions.share({card: item})}>
                                <Image
                                    style={{width: buttonHeight, height: buttonHeight}}
                                    source={require('../assets/share.png')}
                                    resizeMode = 'contain'
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

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth,
    },

    headContainer: {
        flex: 0.1
    },

    bodyContainer: {
        flex: 0.9
    },

    button: {
        height: buttonHeight,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 6,
    },

    topButtonText: {
        color: '#6666EE'
    },

    homeButton: {
        width: screenWidth * 0.3,
        marginLeft: screenWidth * 0.05,
        marginRight: screenWidth * 0.15
    },

    addButton: {
        width: screenWidth * 0.3,
        marginLeft: screenWidth * 0.15,
        marginRight: screenWidth * 0.05
    },

    imageButtonWallet: {
        width: buttonHeight,
        marginLeft: screenWidth * 0.05,
        backgroundColor: '#F5F5F5'
    },

    imageButtonRolodex: {
        width: buttonHeight,
        marginLeft: screenWidth * 0.01,
        backgroundColor: '#F5F5F5'
    },

    gotoButtonWallet: {
        width: buttonHeight,
        marginRight: screenWidth * 0.05,
        backgroundColor: '#F5F5F5'
    },

    gotoButtonRolodex: {
        width: buttonHeight,
        marginLeft: screenWidth * 0.01,
        marginRight: screenWidth * 0.01,
        backgroundColor: '#F5F5F5'
    },

    cardButtonWallet: {
        width: screenWidth * 0.6,
        marginLeft: screenWidth * 0.05,
        marginRight: screenWidth * 0.05
    },

    cardButtonRolodex: {
        width: screenWidth * 0.6,
        marginLeft: screenWidth * 0.03,
        marginRight: screenWidth * 0.01
    }
});
