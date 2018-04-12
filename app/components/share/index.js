import React, { Component } from 'react'

import QRCode from 'react-native-qrcode';

import styles from './styles';
import {
  StyleSheet,
  FlatList,
  TextInput,
  View,
  Text,
  ActivityIndicator, TouchableHighlight, ActionSheetIOS
} from 'react-native';



import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as ReduxActions from '../../actions'; //Import your actions

import {Actions} from 'react-native-router-flux'

// SHARE
// FUNCTION(S): This componenet at the moment will display a JSON card object in QR
// readable format (ommiting the private key if present).
//
// FUTURE FUNCTION(S): Display public key of card object bluetooth handshake
// would occur here and deliver the card object over that bridge.
//
// EXPECTED PROP(S): this.props.card
// This component will expect a card object to be passed to it when viewed so
// it knows what to card/key to display in QR/or send over bluetooth.
class Share extends Component {
  constructor(props) {
      super(props);
    this.state = {};
    this.packageCard = this.packageCard.bind(this);
  }

  packageCard() {
    var jsonCard = JSON.stringify(this.props.card);

    console.log('object to display in QR',jsonCard)
    var res = JSON.stringify(jsonCard);
    return res;
  }

  render() {
    // call packageCard() function to get card object ready for QR display
    var packageCard = this.packageCard();
    console.log(packageCard)
    return (
      // This is where the actual QR is displayed
      <View style={styles.container}>
        <QRCode
          value={packageCard}
          size={350}
          bgColor='black'
          fgColor='white'/>
      </View>
    );
  };
}

function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        cards: state.dataReducer.cards
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Share);
