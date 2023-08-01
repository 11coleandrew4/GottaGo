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
  Dimensions,
} from 'react-native';

import Map from './Map';

export default function WelcomeScreen() {
  let [closestPin, setClosestPin] = React.useState(false);

  let [allNearby, setAllNearby] = React.useState(false);

  let [accessible, setAccessible] = React.useState(false);

  let [baby, setBaby] = React.useState(false);

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

  const touchHandlerAccessible = () => {
    setAccessible(!accessible);
  };

  const touchHandlerBaby = () => {
    setBaby(!baby);
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/ToiletBackground.png')}
    >
      <View style={styles.test}>
        <Image style={styles.logo} source={require('../assets/Logo.png')} />

        <View style={styles.map}>
          <Map
            allClosest={allNearby}
            singleClosest={closestPin}
            isAccessible={accessible}
            location={myLocation}
            bathroom={closestBathroom}
            changingTable={baby}
          />
        </View>
        <View style={styles.welcomeButtons}>
          <TouchableOpacity
            style={styles.closestOnTouch}
            onPress={touchHandlerClosest}
          >
            <View style={styles.closestRestroomButton}>
              <Text style={styles.closestButtonText}>Closest Restroom</Text>
            </View>
          </TouchableOpacity>

          {accessible ? (
            <TouchableOpacity
              style={styles.accessibleButtonActiveTouch}
              onPress={touchHandlerAccessible}
            >
              <View style={styles.accessibleButtonActive}>
                <View>
                  <Image
                    source={require('../assets/accessible.png')}
                    style={styles.accessibleLogoActive}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.accessibleButtonTouch}
              onPress={touchHandlerAccessible}
            >
              <View style={styles.accessibleButton}>
                <View>
                  <Image
                    source={require('../assets/accessible.png')}
                    style={styles.accessibleLogo}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          {baby ? (
            <TouchableOpacity
              style={styles.babyButtonActiveTouch}
              onPress={touchHandlerBaby}
            >
              <View style={styles.babyButtonActive}>
                <View>
                  <Image
                    source={require('../assets/changing-logo.png')}
                    style={styles.changingLogoActive}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.babyButtonTouch}
              onPress={touchHandlerBaby}
            >
              <View style={styles.babyButton}>
                <View>
                  <Image
                    source={require('../assets/changing-logo.png')}
                    style={styles.changingLogo}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.allNearbyTouch}
            onPress={touchHandlerNearby}
          >
            <View style={styles.allRestroomsButton}>
              <Text style={styles.allNearButtonText}>All Nearby</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const isTablet = windowWidth >= 600;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  test: {
    flex: 1,
  },
  accessibleLogo: {
    height: '100%',
    aspectRatio: 10 / 10,
    left: isTablet ? '42%' : '38%',
  },
  accessibleLogoActive: {
    height: '100%',
    aspectRatio: 10 / 10,
    left: isTablet ? '42%' : '38%',
  },
  changingLogo: {
    height: '110%',
    bottom: '9%',
    aspectRatio: 10 / 10,
    left: isTablet ? '39.5%' : '35%',
  },
  changingLogoActive: {
    height: '110%',
    bottom: '9%',
    aspectRatio: 10 / 10,
    left: isTablet ? '39.5%' : '35%',
  },
  babyButtonTouch: {
    backgroundColor: 'white',
    height: 0,
  },
  babyButtonActiveTouch: {
    backgroundColor: 'white',
    height: 0,
  },
  closestOnTouch: {
    marginTop: windowHeight * 0.1,
    // top: windowHeight * 0.0,
    height: 0,
    backgroundColor: 'tomato',
  },
  allNearbyTouch: {
    marginTop: '20%',

    height: '0%',
    backgroundColor: 'yellow',
  },
  accessibleButtonActiveTouch: {
    zIndex: 10,
    backgroundColor: 'lawngreen',
  },
  accessibleButtonTouch: {
    zIndex: 10,
    backgroundColor: 'dodgerblue',
    height: 0,
  },
  welcomeButtons: {
    flex: 1,
    flexShrink: 2,
    marginBottom: windowHeight * 0.06,
    marginTop: windowHeight * -0.03,
    // top: windowHeight * -0.1,
    // height: '25%',
  },

  closestRestroomButton: {
    width: '100%',
    aspectRatio: 10 / (isTablet ? 1.25 : 1.8),

    backgroundColor: '#fc5c65',
    marginTop: '2%',
    marginRight: 10,
    bottom: '-100%',
    borderRadius: '50%',
    borderWidth: 5,
    borderColor: 'black',
    justifyContent: 'center',
  },
  allRestroomsButton: {
    width: '100%',
    left: '0%',
    bottom: '-110%',
    aspectRatio: 10 / 1.8,
    backgroundColor: 'yellow',
    borderRadius: '50%',
    borderWidth: 5,
    borderColor: 'black',
    justifyContent: 'center',
    marginTop: isTablet ? windowHeight * -0.025 : '2%',
    aspectRatio: 10 / (isTablet ? 1.25 : 1.8),
  },
  accessibleButton: {
    width: '49%',
    right: '51%',
    position: 'absolute',
    bottom: '5%',

    backgroundColor: 'dodgerblue',
    borderRadius: '50%',
    borderWidth: 5,
    borderColor: 'black',
    // marginTop: isTablet ? windowHeight * -0.025 : '2%',
    aspectRatio: 10 / (isTablet ? 2.25 : 3.22),
  },
  accessibleButtonActive: {
    width: '49%',
    right: '51%',
    position: 'absolute',
    bottom: '5%',
    aspectRatio: 10 / (isTablet ? 2.25 : 3.22),
    backgroundColor: 'lawngreen',
    borderRadius: '50%',
    borderWidth: 5,
    borderColor: 'black',
  },
  babyButton: {
    width: '49%',
    left: '51%',
    position: 'absolute',
    bottom: '5%',
    aspectRatio: 10 / (isTablet ? 2.25 : 3.22),
    backgroundColor: 'dodgerblue',
    borderRadius: '50%',
    borderWidth: 5,
    borderColor: 'black',
  },
  babyButtonActive: {
    width: '49%',
    left: '51%',
    position: 'absolute',
    bottom: '5%',
    aspectRatio: 10 / (isTablet ? 2.25 : 3.22),
    backgroundColor: 'lawngreen',
    borderRadius: '50%',
    borderWidth: 5,
    borderColor: 'black',
  },
  closestButtonText: {
    textAlign: 'center',

    // paddingTop: '2.0%',
    fontSize: 40,
    fontWeight: 'bold',
  },
  allNearButtonText: {
    textAlign: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingTop: '2%',
    fontSize: 40,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
    marginBottom: windowHeight * 0.15,
    // marginBottom: 210,
  },

  logo: {
    flex: 1,
    width: '100%',
    left: windowWidth * 0.04,
    alignSelf: 'center',

    aspectRatio: 10 / 5.5,
    paddingTop: windowHeight * 0.03,
    bottom: windowHeight * 0.0525,
  },

  accessibleText: {
    textAlign: 'center',
    paddingTop: '4%',
    fontSize: 35,
    fontWeight: 'bold',
  },
  babyText: {
    textAlign: 'center',
    paddingTop: '4%',
    fontSize: 35,
    fontWeight: 'bold',
  },
});
