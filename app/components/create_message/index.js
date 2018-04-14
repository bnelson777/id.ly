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
import styles from './styles';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ReduxActions from '../../actions';

import {Actions} from 'react-native-router-flux';

class CreateMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount(){
        this.props.getCards();
    }

    // Dummy function for button presses
    pressButton(label){
        Alert.alert(label);
    }

    render(){
        return (
            // Display Home and Add buttons
            // Display ID buttons as a list
            <View style={styles.container}>
                <View style={[styles.buttonContainer, styles.headContainer]}>
                    <View style={[styles.button, styles.topButton, styles.homeButton]}>
                        <TouchableOpacity onPress={() => Actions.home()}>
                            <Text style={styles.topButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.button, styles.topButton, styles.addButton]}>
                        <TouchableOpacity onPress={() => {this.pressButton("Add card")}}>
                            <Text style={styles.topButtonText}>Inbox</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage);