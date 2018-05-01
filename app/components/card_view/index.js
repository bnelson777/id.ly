/**
 * Create Card View Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { StyleSheet, View, 
        Text, Image } from 'react-native';
import styles from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import { Avatar } from 'react-native-elements';

class CardView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getCards();
    }
    
    //displays card type on top, followed by image and the rest of the card information
    render() {
        var cardFields = [];
        for (var key in this.props.card.fields)
        {
            cardFields.push (key + ": " + this.props.card.fields[key] + "\n\n");
        }

        var icon = this.props.card.image === "" ? require('../../assets/default_avatar.png') : {uri: this.props.card.image};
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    {this.props.card.label}
                </Text>
                <View style={styles.cardPosition}>
                    <Avatar
                        xlarge
                        rounded
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardView);