// import React from 'react';
// import { render } from 'react-dom';
// import axios from 'axios';
// import * as Location from 'expo-location';

// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import Map from './Map';

// export default function WelcomeScreen() {
//   let [closestPin, setClosestPin] = React.useState(false);

//   let [allNearby, setAllNearby] = React.useState(false);

//   let [accessible, setAccessible] = React.useState(false);

//   const [myLocation, setMyLocation] = React.useState({
//     latitude: 41.881832,
//     longitude: -87.623177,
//   });

//   const [closestBathroom, setClosestBathroom] = React.useState({});

//   React.useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});

//       setTimeout(() => {
//         setMyLocation({
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//         });
//       }, 10);
//     })();
//   }, []);

//   const touchHandlerClosest = async () => {
//     const bathroomObj = await axios.get(
//       `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada=false&unisex=false&lat=${myLocation.latitude}&lng=${myLocation.longitude}`
//     );
//     setClosestBathroom(bathroomObj);

//     setClosestPin(!closestPin);
//     setAllNearby(false);
//   };

//   const touchHandlerNearby = async () => {
//     const bathroomObj = await axios.get(
//       `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada=false&unisex=false&lat=${myLocation.latitude}&lng=${myLocation.longitude}`
//     );
//     setClosestBathroom(bathroomObj);

//     setAllNearby(!allNearby);
//     setClosestPin(false);
//   };

//   const touchHandlerAccessible = () => {
//     setAccessible(!accessible);
//   };

//   return (
//     <ImageBackground
//       style={styles.background}
//       source={require('../assets/ToiletBackground.png')}
//     >
//       <Image style={styles.logo} source={require('../assets/Logo.png')} />
//       <View style={styles.map}>
//         <Map
//           allClosest={allNearby}
//           singleClosest={closestPin}
//           isAccessible={accessible}
//           location={myLocation}
//           bathroom={closestBathroom}
//         />
//       </View>
//       <View style={styles.welcomeButtons}>
//         <TouchableOpacity onPress={touchHandlerClosest}>
//           <View style={styles.closestRestroomButton}>
//             <Text style={styles.closestButtonText}>Closest Restroom</Text>
//           </View>
//         </TouchableOpacity>

//         {accessible ? (
//           <TouchableOpacity
//             style={styles.accessibleButtonActiveTouch}
//             onPress={touchHandlerAccessible}
//           >
//             <View style={styles.accessibleButtonActive}>
//               <Text style={styles.accessibleText}>ADA</Text>
//             </View>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity
//             style={styles.accessibleButtonTouch}
//             onPress={touchHandlerAccessible}
//           >
//             <View style={styles.accessibleButton}>
//               <Text style={styles.accessibleText}>ADA</Text>
//             </View>
//           </TouchableOpacity>
//         )}

//         <TouchableOpacity
//           style={styles.allNearbyTouch}
//           onPress={touchHandlerNearby}
//         >
//           <View style={styles.allRestroomsButton}>
//             <Text style={styles.allNearButtonText}>All Nearby</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     padding: 10,
//   },
//   accessibleButtonActiveTouch: {
//     zIndex: 10,
//   },
//   accessibleButtonTouch: {
//     zIndex: 10,
//   },
//   welcomeButtons: {
//     marginBottom: '8%',
//   },
//   closestRestroomButton: {
//     width: '100%',
//     aspectRatio: 10 / 2.8,
//     backgroundColor: '#fc5c65',
//     marginRight: 10,
//     bottom: '10%',
//     borderRadius: '50%',
//     borderWidth: 5,
//     borderColor: 'black',
//   },
//   allRestroomsButton: {
//     width: '70%',
//     left: '29%',
//     aspectRatio: 10 / 2.8,
//     backgroundColor: 'yellow',
//     borderRadius: '50%',
//     borderWidth: 5,
//     borderColor: 'black',
//   },
//   accessibleButton: {
//     width: '25%',
//     marginLeft: '1%',
//     position: 'absolute',
//     marginTop: '.55%',
//     aspectRatio: 10 / 7.3,
//     backgroundColor: 'dodgerblue',
//     borderRadius: '50%',
//     borderWidth: 5,
//     borderColor: 'black',
//   },
//   accessibleButtonActive: {
//     width: '25%',
//     marginLeft: '1%',
//     position: 'absolute',
//     marginTop: '.55%',
//     aspectRatio: 10 / 7.3,
//     backgroundColor: 'lawngreen',
//     borderRadius: '50%',
//     borderWidth: 5,
//     borderColor: 'black',
//   },
//   closestButtonText: {
//     textAlign: 'center',
//     paddingTop: '7.5%',
//     fontSize: 40,
//     fontWeight: 'bold',
//   },
//   allNearButtonText: {
//     textAlign: 'center',
//     paddingTop: '4.2%',
//     fontSize: 40,
//     fontWeight: 'bold',
//   },
//   map: {
//     marginBottom: 220,
//   },

//   logo: {
//     flex: 1,
//     width: '100%',
//     left: '4%',
//     alignSelf: 'center',
//     aspectRatio: 10 / 6,
//     bottom: 95,
//   },

//   accessibleText: {
//     textAlign: 'center',
//     paddingTop: '12%',
//     fontSize: 35,
//     fontWeight: 'bold',
//   },
// });

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
              <Text style={styles.accessibleText}>ADA</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.accessibleButtonTouch}
            onPress={touchHandlerAccessible}
          >
            <View style={styles.accessibleButton}>
              <Text style={styles.accessibleText}>ADA</Text>
            </View>
          </TouchableOpacity>
        )}
        {baby ? (
          <TouchableOpacity
            style={styles.babyButtonActiveTouch}
            onPress={touchHandlerBaby}
          >
            <View style={styles.babyButtonActive}>
              <Text style={styles.babyText}>Baby</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.babyButtonTouch}
            onPress={touchHandlerBaby}
          >
            <View style={styles.babyButton}>
              <Text style={styles.babyText}>Baby</Text>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  babyButtonTouch: {
    backgroundColor: 'white',
  },
  babyButtonActiveTouch: {},
  closestOnTouch: {
    marginTop: '20%',
    height: '0%',
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
  },
  welcomeButtons: {
    marginBottom: '8%',
    height: '25%',
  },
  closestRestroomButton: {
    width: '100%',
    aspectRatio: 10 / 1.8,
    backgroundColor: '#fc5c65',
    marginTop: '2%',
    marginRight: 10,
    bottom: '-100%',
    borderRadius: '50%',
    borderWidth: 5,
    borderColor: 'black',
  },
  allRestroomsButton: {
    width: '100%',
    left: '0%',
    bottom: '-110%',
    marginTop: '2%%',
    aspectRatio: 10 / 1.8,
    backgroundColor: 'yellow',
    borderRadius: '50%',
    borderWidth: 5,
    borderColor: 'black',
  },
  accessibleButton: {
    width: '49%',
    right: '51%',
    position: 'absolute',
    bottom: '5%',
    aspectRatio: 10 / 3.2,
    backgroundColor: 'dodgerblue',
    borderRadius: '50%',
    borderWidth: 5,
    borderColor: 'black',
  },
  accessibleButtonActive: {
    width: '49%',
    right: '51%',
    position: 'absolute',
    bottom: '5%',
    aspectRatio: 10 / 3.2,
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
    aspectRatio: 10 / 3.22,
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
    aspectRatio: 10 / 3.22,
    backgroundColor: 'lawngreen',
    borderRadius: '50%',
    borderWidth: 5,
    borderColor: 'black',
  },
  closestButtonText: {
    textAlign: 'center',
    paddingTop: '2.0%',
    fontSize: 40,
    fontWeight: 'bold',
  },
  allNearButtonText: {
    textAlign: 'center',
    paddingTop: '2%',
    fontSize: 40,
    fontWeight: 'bold',
  },
  map: {
    marginBottom: 210,
  },

  logo: {
    flex: 1,
    width: '100%',
    left: '4%',
    alignSelf: 'center',
    aspectRatio: 10 / 5.5,
    bottom: 95,
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
