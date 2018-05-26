import React from 'react';
import styles from './styles';
import PropTypes from 'prop-types';
import { ScrollView, View, Text,
        TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions'; //Import your actions
import { Actions } from 'react-native-router-flux';

export default function Menu({ onItemSelected, data }) {
    return (
        <ScrollView scrollsToTop={false} style={styles.menu}>
            <View>
                <TouchableOpacity onPress={() => onItemSelected(data.clearAll())}>
                    <View style={styles.row}>
                        <Text style={styles.title}>
                            [Dev] Clear All Data
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onItemSelected(Actions.lockbox({title:"Decrypt Message", mode: "decrypt"}))} underlayColor='rgba(0,0,0,.2)'>
                    <View style={styles.row}>
                        <Text style={styles.title}>
                            [Dev] Decrypt Message
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
        </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};