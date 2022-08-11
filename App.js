import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Button,
  SafeAreaView,
  Image,
} from 'react-native';
import Map from './components/Map';
import WelcomeScreen from './components/WelcomeScreen';

export default function App() {
  return <WelcomeScreen />;
}

{
  /* // <SafeAreaView style={styles.container}>
    //   <View style={{ backgroundColor: 'dodgerblue', flex: 1 }} />
    //   <View style={{ backgroundColor: 'tomato', flex: 1 }} />
    //   <View style={{ backgroundColor: 'gold', flex: 1 }} />
    // </SafeAreaView> */
}
//const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E8EAED',
//   },
// });