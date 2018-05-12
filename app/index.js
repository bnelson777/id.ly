/**
 * Create Main Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
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

const fileDir = RNFetchBlob.fs.dirs.DocumentDir + '/idly/';

class Main extends Component {
    constructor() {
        super();
        this.init();
    }

    init(){
        RNFetchBlob.fs.mkdir(fileDir)
            .catch((err) => {});
        RNFetchBlob.fs.createFile(
            fileDir + 'cards.dat',
            '',
            'utf8'
        )
            .catch((err) => {});
        RNFetchBlob.fs.createFile(
            fileDir + 'messages.dat',
            '',
            'utf8'
        )
            .catch((err) => {});
    }

    componentDidMount() {
        var _this = this;
        //Check if any card data exists
        RNFetchBlob.fs.readFile(fileDir + 'cards.dat', 'utf8')
            .then((carddata) => {
                if (carddata === ''){
                    RNFetchBlob.fs.writeFile(fileDir + 'cards.dat', JSON.stringify(CardData.card),'utf8');
                    _this.props.getCards();
                }
            });

        // check if any message data exists
        RNFetchBlob.fs.readFile(fileDir + 'messages.dat', 'utf8')
            .then((data) => {
                if (data === ''){
                    RNFetchBlob.fs.writeFile(fileDir + 'messages.dat', JSON.stringify(MessageData.message),'utf8');
                    _this.props.getMessages();
                }
            });
    }

    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="splash" component={Splash}/>
                    <Scene key="home" component={Home} title="Home"/>
                    <Scene key="scan" component={Scan} title="Scan" />
                    <Scene key="lockbox" component={Lockbox} title="Lockbox" />
                    <Scene key="rolodex" component={CardList}title="Rolodex"
                        titleStyle={styles.title} onRight={() => Actions.scan()}
                        rightButtonImage={require('./assets/add.png')}
                        rightButtonStyle={styles.rightButton} rightButtonIconStyle={styles.rightButtonIcon} />
                    <Scene key="wallet" component={CardList} title="Wallet"
                        titleStyle={styles.title} onRight={() => Actions.create_card()}
                        rightButtonImage={require('./assets/add.png')}
                        rightButtonStyle={styles.rightButton} rightButtonIconStyle={styles.rightButtonIcon} />
                    <Scene key="card_view" component={CardView} title="CardView" />
                    <Scene key="share" component={Share} title="Share" />
                    <Scene key="message_thread" component={MessageThread} title="MessageThread" />
                    <Scene key="create_message" component={CreateMessage} title="New Message" />
                    <Scene key="inbox" component={Inbox} title="Inbox"
                        titleStyle={styles.title} onRight={() => Actions.create_message({sender: null, recipient: null})}
                        rightTitle='Message' />
                    <Scene key="create_card" component={CreateCard} title="Add Information" 
                        />
                    <Scene key="login" component={Login} title="Login" />
                    <Scene key="register" component={Register} title="Register" />
                    <Scene key="about" component={About} title="About"/>
                  </Scene>
            </Router>
        );
    }
};

export default connect(null, {getCards, getMessages})(Main);
