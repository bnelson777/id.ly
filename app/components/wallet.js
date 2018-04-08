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
const buttonHeight = screenWidth * 0.10;
const COLORS = ['#FF0000', '#00FF00', '#0000FF']

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
                <View
                    style={styles.buttonContainer}
                    flex={0.1}
                >
                    <View
                        style={styles.button}
                        width={screenWidth * 0.3}
                        marginLeft={screenWidth * 0.05}
                        marginRight={screenWidth * 0.15}
                    >
                        <TouchableOpacity onPress={() => {this.pressButton("Return home")}}>
                            <Text style={styles.topButtonText}>Home</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.button}
                        width={screenWidth * 0.3}
                        marginLeft={screenWidth * 0.15}
                        marginRight={screenWidth * 0.05}
                    >
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
        return (
            <View
                style={styles.buttonContainer}
                flex={0.9}>
                <View
                    style={styles.button}
                    width={buttonHeight}
                    marginLeft={screenWidth * 0.05}
                    backgroundColor={'#F5F5F5'}
                >
                    <TouchableOpacity onPress={() => {this.pressButton("Go to card")}}>
                        <Image
                            style={{width: buttonHeight, height: buttonHeight}}
                            source={require('../assets/person.png')}
                            resizeMode = 'contain'
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.button}
                    width={screenWidth * 0.6}
                    marginLeft={screenWidth * 0.05}
                    marginRight={screenWidth * 0.05}
                    backgroundColor={COLORS[index % 3]}
                >
                    <TouchableOpacity onPress={() => {this.pressButton(item.label)}}>
                        <Text>{item.label}</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.button}
                    width={buttonHeight}
                    marginRight={screenWidth * 0.05}
                    backgroundColor={'#F5F5F5'}
                >
                    <TouchableOpacity onPress={() => {this.pressButton("Go to card")}}>
                        <Image
                            style={{width: buttonHeight, height: buttonHeight}}
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth,
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
    }
});