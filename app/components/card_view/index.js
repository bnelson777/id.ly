/**
 * Create Card View Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { StyleSheet, View, 
        Text, Image, Alert, ScrollView } from 'react-native';
import styles from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import { Avatar, Button } from 'react-native-elements';

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
        if(!this.props.isWallet){        
            //displays card with no option to set default card
            return (
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.header}>
                            {this.props.card.label}
                        </Text>
                        <View style={styles.cardPosition}>
                            <Image
                                style={styles.roundedImg}
                                source = {icon}
                            />
                        </View>
                        <View>
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
                    </ScrollView>
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
            //displays card with option to set the default card
            return (
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.header}>
                            {this.props.card.label}
                        </Text>
                        <View style={styles.cardPosition}>
                            <Image
                                style={styles.roundedImg}
                                source = {icon}
                            />
                        </View>
                        <View>
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
                    </ScrollView>
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

function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardView);