import React, { Component } from 'react';
import styles from './styles';
import {
    Alert,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator, TouchableHighlight, ActionSheetIOS
} from 'react-native';

import {Actions} from 'react-native-router-flux'

import { connect } from 'react-redux';

import {bindActionCreators} from 'redux';


class Rolodex extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.renderItem = this.renderItem.bind(this);
    }

    // Dummy function for button presses
    pressButton(label){
        Alert.alert(label);
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                        ref='listRef'
                        data={this.props.contact}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}/>
            </View>
        );
    }

    //displays a list of the contacts with their information
    renderItem({item, index}) {
        return (
            //displays the name of the contact when touched
            <TouchableHighlight onPress={() => {this.pressButton(item.name)}}>
                <View style={styles.row}>
                    <Text style={styles.name}>
                        {item.name}
                    </Text>
                    <Text style={styles.info}>
                        {item.info}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
};


function mapStateToProps(state, props) {
    return {
        contact: state.dataReducer.contact
    }
}

export default connect(mapStateToProps)(Rolodex);
