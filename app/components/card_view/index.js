/**
 * Create Card View Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { StyleSheet, View, 
        Text, Image, Alert } from 'react-native';
import styles from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import { Avatar, Button } from 'react-native-elements';

//CARDVIEW
//FUNCTION(S): This component displays the selected card
//with the photo and all information. Contains buttons to share, 
//create message, and if the card belongs to the user, set as default.
//
//EXPECTED PROP(S): this.props.card
//                  this.props.isWallet
//This component expects the card to be displayed, as well as a 
//flag on if the card belongs to the user. 
export class CardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonPressed: false
        };
    }

    componentDidMount() {
        this.props.getCards();
    }
    
    handleSetDefault(){
        if (!this.state.buttonPressed){
            this.setState({buttonPressed: true});
            this.setDefault();
        }
    }

    setDefault(){
        if(this.props.card.id === this.props.cards[0].id)
        {
            Alert.alert("This card is already the default!");
            return;
        }
        this.props.setDefault(this.props.card);

        setTimeout(function(){
            Actions.pop();
        }, 100);
    }

    //displays card type on top, followed by image and the rest of the card information
    render() {
        var cardFields = [];
        for (var key in this.props.card.fields)
        {
            cardFields.push (key + ": " + this.props.card.fields[key] + "\n\n");
        }

        var icon = this.props.card.image === "" ? require('../../assets/default_avatar.png') : {uri: this.props.card.image};
        var args = this.props.card.owner === true ?
            {sender: this.props.card, recipient: null} :
            {sender: null, recipient: this.props.card};
        //If the card does not belong to the user: displays card with no option to set default card
        if(!this.props.isWallet){        
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
                    <View style={styles.buttonContainer}>
                        <Button 
                            title="Share"
                            onPress={() => Actions.share({card: this.props.card})}
                            buttonStyle={styles.button}
                        />
                        <Button 
                            title="Message"
                            onPress={() => Actions.create_message(args)}
                            buttonStyle={styles.button}
                        />
                    </View>
                </View>
            );
        }
        else{
            //If the card belongs to the user: displays card with option to set the default card
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
                    <View style={styles.buttonContainer}>
                        <Button 
                            title="Share"
                            onPress={() => Actions.share({card: this.props.card})}
                            buttonStyle={styles.walletButton}
                        />
                        <Button 
                            title="Message"
                            onPress={() => Actions.create_message(args)}
                            buttonStyle={styles.walletButton}
                        />
                        <Button 
                            title="Default"
                            onPress={() => this.handleSetDefault()}
                            buttonStyle={styles.walletButton}
                        />
                    </View>
                </View>
            );
        }
    }
};

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state.
function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/about.js).
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

// Export component to be called elsewhere.
export default connect(mapStateToProps, mapDispatchToProps)(CardView);