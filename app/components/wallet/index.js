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
import styles from './styles';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ReduxActions from '../../actions';

import {Actions} from 'react-native-router-flux';

// Get screen width for button width/height
const {width} = Dimensions.get('window');
const screenWidth = width;
const buttonHeight = screenWidth * 0.10;

// Set alternating colors for ID buttons
const COLORS = ['#FF0000', '#00FF00', '#0000FF']

class Wallet extends Component {
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
                        <TouchableOpacity onPress={() => {this.pressButton("Return home")}}>
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
        var icon = item.image === "" ? require('../../assets/person.png') : {uri: item.image};
        return (
            // Display person icon, ID button, and arrow icon
            // ID buttons are displayed in alternating color based on index
            <View style={[styles.buttonContainer, styles.bodyContainer]}>
                <View style={[styles.button, styles.imageButton]}>
                    <TouchableOpacity onPress={() => {this.pressButton("Go to card")}}>
                        <Image
                            style={{width: buttonHeight, height: buttonHeight}}
                            source={icon}
                            resizeMode = 'contain'
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={[styles.button, styles.cardButton]}
                    backgroundColor={COLORS[index % COLORS.length]}
                >
                    <TouchableOpacity onPress={() => {this.pressButton(item.label)}}>
                        <Text>{item.label}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.button, styles.gotoButton]}>
                    <TouchableOpacity onPress={() => Actions.share({card: item})}>
                        <Image
                            style={{width: buttonHeight, height: buttonHeight}}
                            source={require('../../assets/share.png')}
                            resizeMode = 'contain'
                        />
                    </TouchableOpacity>
                </View>
            </View>
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
