import React, { Component } from 'react';

import { StyleSheet, 
        View, 
        Text, 
        Image } from 'react-native';
import styles from './styles';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ReduxActions from '../../actions';

import {Actions} from 'react-native-router-flux';

class CardView extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    
    //displays card type on top, followed by image and the rest of the card information
    render() {
        var cardFields = [];
        for (var key in this.props.card.fields)
        {
            cardFields.push (key + ": " + this.props.card.fields[key] + "\n\n");
        }

        var icon = this.props.card.image === "" ? require('../../assets/person.png') : {uri: this.props.card.image};
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    {this.props.card.label}
                </Text>
                <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                    <Image style={styles.imageStyle}
                        source = {icon}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.name}>
                        Name: {this.props.card.name}
                    </Text>
                    <Text style={styles.name}>
                        Email: {this.props.card.email}
                    </Text>
                    <Text style={styles.name}>
                        {cardFields}
                    </Text>
                </View>
            </View>
        );
    }
};

function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

export default connect(mapStateToProps)(CardView);