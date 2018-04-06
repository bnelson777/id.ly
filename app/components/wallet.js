import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ReduxActions from '../actions';

import {Actions} from 'react-native-router-flux';

class Wallet extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount(){
        this.props.getCards();
    }

    render(){
        return (
            <View style={styles.container}>
                <FlatList
                    ref='listRef'
                    data={this.props.cards}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}/>

                <TouchableHighlight style={styles.addButton}
                                    underlayColor='#ff7043' onPress={() => Actions.new_card()}>
                    <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                </TouchableHighlight>
            </View>
        );
    }

    renderItem({item, index}) {
        return (
            <TouchableHighlight onPress={() => Alert.alert({item.label})} underlayColor='rgba(0,0,0,.2)'>
                <View style={styles.row}>
                    <Text style={styles.label}>
                        {item.label}
                    </Text>
                </View>
            </TouchableHighlight>
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8 * 2
    }
});