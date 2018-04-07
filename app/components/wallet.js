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

const {width} = Dimensions.get('window');

const screenWidth = width;
const buttonSide = width * 0.10;

class Wallet extends Component {
    constructor(props) {
        super(props);

        this.state = {color: 0};
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount(){
        this.props.getCards();
    }

    pressButton(label){
        Alert.alert(label);
    }

    render(){
        return (
            <View style={styles.container}>
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
        return (
            <View style={styles.buttonContainer}>
                <View style={styles.leftButton}>
                    <TouchableOpacity onPress={() => {this.pressButton("Go to card")}}>
                        <Image
                            style={{width: buttonSide, height: buttonSide}}
                            source={require('../assets/person.png')}
                            resizeMode = 'contain'
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.midButton}>
                    <TouchableOpacity onPress={() => {this.pressButton(item.label)}}>
                        <Text>{item.label}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rightButton}>
                    <TouchableOpacity onPress={() => {this.pressButton("Go to card")}}>
                        <Image
                            style={{width: buttonSide, height: buttonSide}}
                            source={require('../assets/arrow.png')}
                            resizeMode = 'contain'
                        />
                    </TouchableOpacity>
                </View>
            </View>
      )
    }
};

function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    buttonContainer: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
    },

    leftButton: {
        width: buttonSide,
        height: buttonSide,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 6,
        marginLeft: screenWidth * 0.05,
        backgroundColor: '#F5F5F5'
    },

    midButton: {
        width: screenWidth * 0.6,
        height: buttonSide,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 6,
        marginLeft: screenWidth * 0.05,
        marginRight: screenWidth * 0.05,
        backgroundColor: '#FF0000'
    },

    rightButton: {
        width: buttonSide,
        height: buttonSide,
        alignItems: 'flex-start',
        borderRadius: 5,
        marginTop: 6,
        marginRight: screenWidth * 0.05,
        backgroundColor: '#F5F5F5'
    }
});