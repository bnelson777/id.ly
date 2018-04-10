import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
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

    renderItem({item, index}) {
        return (
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


const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },

    name: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8 * 2
    },

    info: {
        marginTop: 5,
        fontSize: 14,
    },
});