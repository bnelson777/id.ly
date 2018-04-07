import React, {Component} from 'react';
import {
    Alert,
    StyleSheet,
    FlatList,
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    Image
} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ReduxActions from '../actions';

import {Actions} from 'react-native-router-flux';

class Wallet extends Component {
    constructor(props) {
        super(props);

        this.state = {};
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
                        <Image source={require("./assets/person.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.midButton}>
                    <TouchableOpacity onPress={() => {this.pressButton(item.label)}}>
                        <Text>{item.label}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rightButton}>
                    <TouchableOpacity onPress={() => {this.pressButton("Go to card")}}>
                        <Image source={require("./assets/arrow.png")}/>
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
    },

    leftButton: {
        flex:1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 5,
    },

    midButton: {
        flex:4,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        backgroundColor: '#00FF00',
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 5,
    },

    rightButton: {
        flex:1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 5,
    }
});