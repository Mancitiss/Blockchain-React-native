import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Peer from "react-native-peerjs";
import React, { useEffect, useState } from 'react';

export default function App() {
  useEffect(() => {
    // create local peer
    const localPeer = new Peer({
      config: {
        iceServers: [
          {
            urls: 'turn:openrelay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject'
          }
        ]
      }
    });

    localPeer.on('error', (err) => {
      console.error(err);
    });

    localPeer.on('open', localPeerId => {
      console.log('Local peer open with ID', localPeerId);

      const remotePeer = new Peer({
        config: {
          iceServers: [
            {
              urls: 'turn:openrelay.metered.ca:80',
              username: 'openrelayproject',
              credential: 'openrelayproject'
            }
          ]
        }
      });
      remotePeer.on('error', err => console.log(err));
      remotePeer.on('open', remotePeerId => {
        console.log('Remote peer open with ID', remotePeerId);

        try{
          const conn = remotePeer.connect(localPeerId);
          conn.on('error', err => console.log(err));
          conn.on('open', () => {
            console.log('Remote peer has opened connection.');
            console.log('conn', conn);
            conn.on('data', data => console.log('Received from local peer', data));
            console.log('Remote peer sending data.');
            conn.send('Hello, this is the REMOTE peer!');
          });
        } catch (err) {
          console.error(err);
        }
      });
    });

    localPeer.on('connection', (conn) => {
      console.log(`Connection established`);
      conn.on('error', (err) => {
        console.error(err);
      });
      conn.on('open', () => {
        console.log('Local peer has opened connection.');
        console.log('conn', conn);
        conn.on('data', data => console.log('Received from remote peer', data));
        console.log('Local peer sending data.');
        conn.send('Hello, this is the LOCAL peer!');
      });
    });

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
