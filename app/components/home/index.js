/**
 * Create Home Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import styles from './styles';
import { Alert, FlatList, View, Image,
        Text, ActivityIndicator, 
        TouchableOpacity, ListView,
        ActionSheetIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions'; //Import your actions
import { Actions } from 'react-native-router-flux';
import { Avatar, Card, Button,
        List, ListItem } from 'react-native-elements';
import SideMenu from 'react-native-side-menu';
import Menu from './menu';

const menuImg = require('../../assets/menu.png');

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedItem: 'About',
        };
        this.toggle = this.toggle.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return{
            title: "Home",
            headerLeft: (<TouchableOpacity
                style={styles.row}
                onPress={params.toggle}>
                    <Image
                        source={menuImg}
                    />
                </TouchableOpacity>),
            headerRight: (<View/>),
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#128DC9',
            }
        }
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen,
        });
    }
    
    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }
    
    onMenuItemSelected = item =>
        this.setState({
          isOpen: false,
          selectedItem: item,
    });

    componentDidMount() {
        this.props.navigation.setParams({
            toggle: this.toggle
        });
        this.props.getMessages();
        this.props.getCards();
    }

    // Dummy function for button presses
    pressButton(label) {
        Alert.alert(label);
    }

    //Display default card
    displayDefault() {
        var myCards = this.props.cards.filter(function(obj) {return obj.owner === true}).map(card => card);
        if(myCards[0]) {
            let img = myCards[0].image === "" ? require('../../assets/default_avatar.png') : {uri: myCards[0].image};
            let name = myCards[0].name;
            let label = myCards[0].label;
            return (
                <View>
                    <View style={styles.CardInner}>
                        <View style={styles.CardInfo}>
                            <Avatar
                                xlarge
                                rounded
                                source = {img}
                            />
                        </View>
                        <View style={styles.CardInfo}>
                            <Text style={styles.cardTitle}> {name} </Text>
                            <Text style={styles.cardSubTitle}> {label} </Text>
                        </View>
                    </View>
                    <View style={styles.sepLine}/>
                    <View style={styles.cardButtonContainer}>
                        <Button 
                            title="Profile"
                            onPress={() => Actions.card_view({title: name, card: myCards[0], isWallet: myCards[0].owner})}
                            buttonStyle={styles.cardButton}
                        />
                        <Button 
                            title="Share"
                            onPress={() => Actions.share({card: myCards[0]})}
                            buttonStyle={styles.cardButton}
                        />
                    </View>
                </View>
            );
        }
        else {
            return ( 
                <View style={styles.nocard}>
                        <Button 
                            title="Add New Card"
                            onPress={() => Actions.create_card()}
                            buttonStyle={styles.button}
                        />
                </View>
            );
        }
    }

    unreadMsg() {
        var unread = this.props.messages.filter(function(obj) {return obj.read === false}).map(message => message);
        console.log(unread);
        <List containerStyle={{marginBottom: 20}}>
        {
            unread.map((item, i) => (
            <ListItem
                key={i}
                subtitle={l.body}
            />
            ))
        }
        </List>
    }

    // Displays animation if loading, otherwise displays a popup indicating the
    // TouchableOpacity pressed
    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected} 
            data = {this.props} />;

        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        } 
        else {
            return (
                <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={isOpen => this.updateMenuState(isOpen)}
                >
                <View style={styles.container}>
                    <View style = {styles.firstRow}>
                        <Avatar 
                            large
                            source = {require('../../assets/wallet.png')}
                            onPress={() => Actions.wallet({title:"Wallet", isWallet: true})}
                            overlayContainerStyle={{backgroundColor: '#FFFFFF'}}
                            activeOpacity={0.5}
                        />
                        <Avatar 
                            large
                            source = {require('../../assets/inbox.png')}
                            onPress={() => Actions.inbox()}
                            overlayContainerStyle={{backgroundColor: '#FFFFFF'}}
                            activeOpacity={0.5}
                        />
                        <Avatar
                            large
                            source = {require('../../assets/rolodex.png')}
                            onPress={() => Actions.rolodex({title:"Rolodex", isWallet: false})}
                            overlayContainerStyle={{backgroundColor: '#FFFFFF'}}
                            activeOpacity={0.5}
                        />
                        <Avatar
                            large
                            source = {require('../../assets/scan.png')}
                            onPress={() => Actions.scan()}
                            overlayContainerStyle={{backgroundColor: '#FFFFFF'}}
                            activeOpacity={0.5}
                        />                
                    </View>
                    <View style={styles.secondRow}>
                        <View style={styles.center}>
                            <View style={[styles.triangle,styles.upSideDown]}/>
                        </View>
                        <Card containerStyle = {styles.cardContainer}>
                            {this.displayDefault()}
                        </Card>
                        <View style={styles.center}>
                            <View style={styles.triangle}/>
                        </View>
                    </View>
                    <View style={styles.thirdRow}>


                    </View>
                </View>
                </SideMenu>
            );
        }
    }
};

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        cards: state.dataReducer.cards,
        messages: state.dataReducer.messages
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
