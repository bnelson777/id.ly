import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableHighlight
} from 'react-native';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as ReduxActions from '../actions';

import {Actions} from 'react-native-router-flux'

/** Portrait
 *  Props:
 *  [number] cardId
 */
class Portrait extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.getCards();
    }

    getPortrait = () => {
        let portrait = null;
        for (card of this.props.cards) {
            if (card.id === this.props.cardId) {
                portrait = card.portrait;
                break;
            }
        }
        return portrait;
    }

    render() {
        let portrait = this.getPortrait();
        return (
            <View style={styles.container}>
                <Image style={styles.imageStyle} source={{uri: portrait}} />
            </View>
        );
    }
}


// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Portrait);

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'grey'
    },
    imageStyle: {
        width: 80, 
        height: 80, 
        resizeMode: Image.resizeMode.contain
    }
});
  