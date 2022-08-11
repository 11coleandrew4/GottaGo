import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import * as Location from 'expo-location';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import Map from './Map';

export default function WelcomeScreen() {
  let [closestPin, setClosestPin] = React.useState(false);

  let [allNearby, setAllNearby] = React.useState(false);

  const [myLocation, setMyLocation] = React.useState({
    latitude: 41.881832,
    longitude: -87.623177,
  });

  const [closestBathroom, setClosestBathroom] = React.useState({});

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setTimeout(() => {
        setMyLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }, 10);
    })();
  }, []);

  const touchHandlerClosest = async () => {
    const bathroomObj = await axios.get(
      `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada=false&unisex=false&lat=${myLocation.latitude}&lng=${myLocation.longitude}`
    );
    setClosestBathroom(bathroomObj);

    setClosestPin(!closestPin);
    setAllNearby(false);
  };

  const touchHandlerNearby = async () => {
    const bathroomObj = await axios.get(
      `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada=false&unisex=false&lat=${myLocation.latitude}&lng=${myLocation.longitude}`
    );
    setClosestBathroom(bathroomObj);

    setAllNearby(!allNearby);
    setClosestPin(false);
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/ToiletBackground.png')}
    >
      <Image style={styles.logo} source={require('../assets/Logo.png')} />
      <View style={styles.map}>
        <Map
          allClosest={allNearby}
          singleClosest={closestPin}
          location={myLocation}
          bathroom={closestBathroom}
        />
      </View>
      <View style={styles.welcomeButtons}>
        <TouchableOpacity onPress={touchHandlerClosest}>
          <View style={styles.closestRestroomButton}>
            <Text style={styles.buttonText}>Closest Restroom</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={touchHandlerNearby}>
          <View style={styles.allRestroomsButton}>
            <Text style={styles.buttonText}>All Nearby Restrooms</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  welcomeButtons: {
    marginBottom: 40,
  },
  closestRestroomButton: {
    width: '100%',
    height: 100,
    backgroundColor: '#fc5c65',
    marginRight: 10,
    marginBottom: 30,
    borderRadius: '50%',
    borderWidth: 5,
    borderColor: 'black',
  },
  allRestroomsButton: {
    width: '100%',
    height: 100,
    backgroundColor: 'yellow',
    marginRight: 10,
    borderRadius: '50%',
    borderWidth: 5,
    borderColor: 'black',
  },
  buttonText: {
    textAlign: 'center',
    paddingTop: 25,
    fontSize: 35,
    fontWeight: 'bold',
  },
  map: {
    marginBottom: 220,
  },
  logo: {
    flex: 1,
    width: 700,
    right: '30%',
    height: 700,
    marginBottom: 160,
  },
});