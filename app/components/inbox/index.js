import React, { Component } from 'react';
import { FlatList, View, Image,
        TouchableOpacity } from 'react-native';
import styles from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';

class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getMessages();
        this.props.getCards();
    }

    SeparatedLine = () => {
        return (
          <View style = {styles.sepLine}/>
        );
    };
    
    render() {
        return (
            <View style = {styles.container}>
                <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                    <FlatList
                        data={this.props.messages}
                        keyExtractor={item => item.id}
                        renderItem={this.renderItem}
                        ItemSeparatorComponent={this.SeparatedLine}             
                    />
                </List>
            </View>
        );
    }

    renderItem = ({item, index}) => {
        /* get author name and portrait for each message */
        let author = null;
        let portrait = 'https://raw.githubusercontent.com/bnelson777/id.ly/IL-39/app/assets/default_avatar.png';
        for (card of this.props.cards) {
            if (card.keys.n === item.from) {
                author = card.name;
                if(card.image !== ""){
                    portrait = card.image; 
                }
                break;
            }
        };

        return (
            <TouchableOpacity  onPress={() => Actions.message_thread()} >
                <ListItem
                    roundAvatar
                    title = {author}
                    rightTitle = {new Date(item.time*1000).toDateString()}
                    subtitle = {item.body}
                    avatar = {{uri: portrait}}
                    containerStyle = {{borderBottomWidth: 0}}
                />
            </TouchableOpacity>
        );
    }

};

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        messages: state.dataReducer.messages,
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
export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
