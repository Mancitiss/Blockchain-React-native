import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Peer } from "peerjs";

export default function App() {
  const connectPeer = process.env.TRUSTED_ID || "thao-iuu";
  console.log("connectPeer ", connectPeer);
  const peer = new Peer("mancitiss");
  peer.on("connection", (conn) => {
    conn.on("data", (data) => {
      // Will print 'hi!'
      console.log(data);
    });
    conn.on("open", () => {
      conn.send("hello!");
    });
  });

  if (peer.id != connectPeer.id){
    const conn = peer.connect(connectPeer);
    conn.on("open", () => {
      conn.send("hi!");
    });
  }

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
