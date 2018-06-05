/**
 * Create Menu funtion
 * by id.ly Team
 */

//Import Libraries
import React from 'react';
import styles from './styles';
import PropTypes from 'prop-types';
import { ScrollView, View, Text,
        TouchableOpacity, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions'; //Import your actions
import { Actions } from 'react-native-router-flux';
import { Avatar } from 'react-native-elements';

/**
 * Menu functionn is going to build up 
 * a side bar for the dev link. There
 * are two arguments, onItemSelected is
 * a option which will display on the
 * side bar.
 * Line 32-38: clear all info option
 * Line 39-45: decrypt message option
 * Line 46-52: login option
 * Line 53-59: register option
 * Line 62-68: about button on the left corner 
 */
export default function Menu({ onItemSelected, data }) {
    return (
        <ScrollView scrollsToTop={false} style={styles.menu}>
            <View style={styles.devContainer}>
                <TouchableOpacity onPress={() => Alert.alert(
          'Are you sure?',
          'All messages/cards/data will be erased permanently and you will no longer be able to decrypt new messages sent to these identities.',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {text: 'OK', onPress: () => onItemSelected(data.clearAll())},
          ],
          { cancelable: false }
        )}>
                    <View style={styles.row}>
                        <Text style={styles.title}>
                            Clear All Data
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onItemSelected(Actions.lockbox({title:"Decrypt Message", mode: "decrypt"}))} underlayColor='rgba(0,0,0,.2)'>
                    <View style={styles.row}>
                        <Text style={styles.title}>
                            Decrypt Message
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onItemSelected(Actions.login())}>
                    <View style={styles.row}>
                        <Text style={styles.title}>
                            [Dev] Login
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onItemSelected(Actions.register())}>
                    <View style={styles.row}>
                        <Text style={styles.title}>
                            [Dev] Register
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <Avatar 
                    small
                    onPress={() => onItemSelected(Actions.about())}
                    source = {require('../../assets/bw_info.png')}
                    overlayContainerStyle={{backgroundColor: '#F2F2F2'}}
                    activeOpacity={0.5}                       
                />
            </View>
        </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};