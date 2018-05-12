/**
 * Create Main Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { View, AsyncStorage, BackHandler } from 'react-native';
import { Router, Scene,
        ActionConst, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
//Component Imports
import Splash from './components/splash/index';
import Home from './components/home/index';
import Scan from './components/scan/index';
import Lockbox from './components/lockbox/index';
import CardList from './components/card_list/index';
import CardView from './components/card_view/index';
import Share from './components/share/index';
import MessageThread from './components/message_thread/index';
import CreateMessage from './components/create_message/index';
import Inbox from './components/inbox/index';
import Login from './components/login/index';
import CreateCard from './components/create_card/index';
import Register from './components/register/index'
import About from './components/about/index';
//Dumby Data for Initial App Load
import CardData from './cards.json';
import MessageData from './messages.json';
import { getCards } from './actions';
import { getMessages } from './actions';
//Needed for Actions.home() back button on inbox see line 59:121
import * as ReduxActions from './actions'; //Import your actions
//Style Import
import styles from './styles';

class Main extends Component {
    componentDidMount() {
        var _this = this;
        //Check if any card data exists
        AsyncStorage.getItem('carddata', (err, carddata) => {
            //if it doesn't exist, extract from json file
            //save the initial data in Async
            if (carddata === null){
                AsyncStorage.setItem('carddata', JSON.stringify(CardData.card));
                _this.props.getCards();
            }
        });

        // check if any message data exists
        AsyncStorage.getItem('messagedata', (err, messagedata) => {
            //if it doesn't exist, extract from json file
            //save the initial data in Async
            if (messagedata === null){
                AsyncStorage.setItem('messagedata', JSON.stringify(MessageData.message));
                _this.props.getMessages();
            }
        });
    }
    
    _backAndroidHandler = () => {
        const scene = Actions.currentScene;
        // alert(scene)
        if (scene === 'index' || scene === 'home' || scene === 'main') {
            BackHandler.exitApp();
            return true;
        }
        Actions.pop();
        return true;
    };

    render() {
        return (
            <Router backAndroidHandler={this._backAndroidHandler} 
                navigationBarStyle={styles.idlyColor}
                tintColor='white' titleStyle={styles.textColor}
                leftButtonTextStyle={styles.subtitle}
                rightButtonTextStyle={styles.subtitle}>
                <Scene key="root">
                    <Scene key="splash" component={Splash} initial={true}/>
                    <Scene key="home" component={Home} title="Home"
                        panHandlers={null} hideNavBar type={ActionConst.RESET}
                    />
                    <Scene key="scan" component={Scan} title="Scan" />
                    <Scene key="lockbox" component={Lockbox} title="Lockbox" />
                    <Scene key="rolodex" component={CardList}title="Rolodex"
                        onRight={() => Actions.scan()}
                        rightButtonImage={require('./assets/add_person.png')}
                        rightButtonStyle={styles.rightButton} rightButtonIconStyle={styles.rightButtonIcon} />
                    <Scene key="wallet" component={CardList} title="Wallet"
                        onRight={() => Actions.create_card()}
                        rightButtonImage={require('./assets/add.png')}
                        rightButtonStyle={styles.rightButton} rightButtonIconStyle={styles.rightButtonIcon} />
                    <Scene key="card_view" component={CardView} title="CardView" />
                    <Scene key="share" component={Share} title="Share" />
                    <Scene key="message_thread" component={MessageThread} title="MessageThread" />
                    <Scene key="create_message" component={CreateMessage} title="New Message" />
                    <Scene key="inbox" component={Inbox} title="Inbox"
                        onRight={() => Actions.create_message({sender: null, recipient: null})}
                        rightButtonImage={require('./assets/msg.png')}
                        rightButtonStyle={styles.rightButton} rightButtonIconStyle={styles.rightButtonIcon} />
                    <Scene key="create_card" component={CreateCard} title="Add Information" />
                    <Scene key="login" component={Login} title="Login" />
                    <Scene key="register" component={Register} title="Register" />
                    <Scene key="about" component={About} title="About" />
                  </Scene>
            </Router>
        );
    }
};

export default connect(null, {getCards, getMessages})(Main);
