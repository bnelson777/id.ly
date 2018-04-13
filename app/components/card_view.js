import React, { Component } from 'react'

import { StyleSheet, 
        View, 
        Text, 
        FlatList,
        TextInput, 
        Button } from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ReduxActions from '../actions';

import {Actions} from 'react-native-router-flux'

class CardView extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
          
    render() {
        var cardFields = [];
        var temp = [];
        for (var key in this.props.card.fields)
        {
            temp.push (key + ": " + this.props.card.fields[key] + "\n");
            cardFields.push(temp);
        }
        return (
            <View style={styles.row}>
                <Text style={styles.name}>
                    {this.props.card.label}
                </Text>
                <Text style={styles.name}>
                    {this.props.card.name}
                </Text>
                <Text style={styles.name}>
                    {this.props.card.email}
                </Text>
                <Text style={styles.name}>
                    {temp}
                </Text>
            </View>
        );
    }

    //  //displays a list of the contacts with their information
    //  renderItem({item, index}) {
    //     return (
    //         <View style={styles.row}>
    //             <Text style={styles.name}>
    //                 {this.props.card.name}
    //             </Text>
    //         </View>
    //     )
    // }
};

function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

export default connect(mapStateToProps)(CardView);


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

