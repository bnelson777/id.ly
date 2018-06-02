import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList
} from 'react-native';

let rnbt = require("react-native-bluetooth-cross-platform");
let deviceInfo = require("react-native-device-info");

type Props = {};
export default class Bluetooth extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {peerId: '', message: ''};
    this.advertise = this.advertise.bind(this);
    this.inviteUser = this.inviteUser.bind(this);
    this.acceptInvitation = this.acceptInvitation.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  storePeerId(id) {
    console.log('storing peer id' + id)
    this.setState({peerId: id});
    /* use this.listeners like in example */
  }

  storeMessage(msg) {
    console.log('storing message' + msg)
    this.setState({message: msg});
    /* use this.listeners like in example */
  }

  componentDidMount() {
     rnbt.addPeerDetectedListener((peers) => {
      /* code that runs when other device runs advertise and becomes detected */
      console.log('peer detected', peers)
      console.log(peers);
      this.storePeerId(peers.id);
    });

     rnbt.addPeerLostListener((peers) => {
       /* code that runs when a perr is lost */
        console.log('addPeerLostListener', peers)
    });
     rnbt.addReceivedMessageListener((peers) => {
       /* code that runs when you recieve a message */
        console.log('addReceivedMessageListener', peers.message)
        this.storeMessage(peers.message);
    });
     rnbt.addInviteListener((peers) => {
       /* code that runs when you are invited */
        console.log('addInviteListener', peers)
    });

     rnbt.addConnectedListener((peers) => {
       /* code that runs when you are connected */
        console.log('addConnectedListener', peers)
    });



    console.log('mounted')
  }

  advertise() {
    rnbt.advertise("WIFI-BT");
    console.log('advertising')
  }

  inviteUser() {
    let id = this.state.peerId;
    rnbt.inviteUser(id);
    console.log('inviting user')
  }

  acceptInvitation() {
    rnbt.acceptInvitation(this.state.peerId);
    console.log('accepting invitation')
  }

  sendMessage() {
    let id = this.state.peerId;
    console.log('sending message to ' + id);
    rnbt.sendMessage('hello ' + id + 'this is ' + deviceInfo.getUniqueID(), id)
  }

  browse() {
      rnbt.browse("WIFI-BT");
  }

  disconnect() {
      rnbt.disconnectFromPeer(this.state.peerId);
  }

  stopAdvertising() {
    rnbt.stopAdvertising();
  }

  stopBrowsing() {
    rnbt.stopBrowsing();
  }

  getConnectedPeers() {
    rnbt.getConnectedPeers((peers) => {
        console.log('getConnectedPeers', peers)
    });
  }

  getNearbyPeers() {
    rnbt.getNearbyPeers((peers) => {
        console.log('getNearbyPeers', peers)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> unique id: {deviceInfo.getUniqueID()} </Text>
        <Text> peer id: {this.state.peerId} </Text>
        <Text> message: {this.state.message} </Text>
        <Button title='advertise' onPress={this.advertise} />
        <Button title='send message' onPress={this.sendMessage} />
        <Button title='accept invitation' onPress={this.acceptInvitation} />
        <Button title='invite peer' onPress={this.inviteUser} />
        <Button title='browse' onPress={this.browse} />
        <Button title='disconnect' onPress={this.disconnect} />
        <Button title='stop advertising' onPress={this.stopAdvertising} />
        <Button title='stop browsing' onPress={this.stopBrowsing} />
        <Button title='getNearbyPeers' onPress={this.getNearbyPeers} />
        <Button title='getConnectedPeers' onPress={this.getConnectedPeers} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
