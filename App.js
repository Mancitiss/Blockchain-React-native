import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Crypto from 'expo-crypto';
global.crypto = Crypto;
import WebRTC from 'react-native-webrtc';
import Peer from 'simple-peer';
//import { mediaDevices, RTCPeerConnection, RTCIceCandidate, RTCSessionDescription, } from "react-native-webrtc";

export default function App() {
  useEffect(() => {
    var peer1 = new Peer({ initiator: true, wrtc: WebRTC })
    var peer2 = new Peer({wrtc: WebRTC })

    peer1.on('signal', data => {
      // when peer1 has signaling data, give it to peer2 somehow
      peer2.signal(data)
    })

    peer2.on('signal', data => {
      // when peer2 has signaling data, give it to peer1 somehow
      peer1.signal(data)
    })

    peer1.on('connect', () => {
      // wait for 'connect' event before using the data channel
      peer1.send('hey peer2, how is it going?')
    })

    peer2.on('data', data => {
      // got a data channel message
      console.log('got a message from peer1: ' + data)
    })

  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
