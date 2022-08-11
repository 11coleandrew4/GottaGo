import * as React from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const Map = (props) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: props.location.latitude,
          longitude: props.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.0005,
        }}
        showsUserLocation={true}
      >
        {props.bathroom.data && props.singleClosest ? (
          props.bathroom.data.map((room, idx) => {
            const distance = room.distance.toFixed(2);
            const firstElemOfName = room.name.slice(0, 1);
            const isNum = parseInt(firstElemOfName);
            if (idx < 1) {
              if (isNaN(isNum)) {
                return (
                  <Marker
                    key={room.id}
                    image={require('../assets/real-toilet-pin.png')}
                    coordinate={{
                      latitude: room.latitude,
                      longitude: room.longitude,
                    }}
                  >
                    <Callout style={styles.infoContainer}>
                      <Text>{`${room.name}`}</Text>
                      <Text>{`${room.street}`}</Text>
                      <Text
                        style={styles.info}
                      >{`Closest restroom is ${distance} miles away`}</Text>
                    </Callout>
                  </Marker>
                );
              } else if (isNaN(isNum) === false) {
                return (
                  <Marker
                    key={room.id}
                    image={require('../assets/real-toilet-pin.png')}
                    coordinate={{
                      latitude: room.latitude,
                      longitude: room.longitude,
                    }}
                  >
                    <Callout style={styles.infoContainerNoName}>
                      <Text>{`${room.street}`}</Text>
                      <Text
                        style={styles.info}
                      >{`Closest restroom is ${distance} miles away`}</Text>
                    </Callout>
                  </Marker>
                );
              }
            }
          })
        ) : (
          <View />
        )}
        {props.bathroom.data && props.allClosest ? (
          props.bathroom.data.map((room) => {
            const distance = room.distance.toFixed(2);
            const firstElemOfName = room.name.slice(0, 1);
            const isNum = parseInt(firstElemOfName);
            if (isNaN(isNum)) {
              return (
                <Marker
                  key={room.id}
                  image={require('../assets/real-toilet-pin.png')}
                  coordinate={{
                    latitude: room.latitude,
                    longitude: room.longitude,
                  }}
                >
                  <Callout style={styles.infoContainer}>
                    <Text>{`${room.name}`}</Text>
                    <Text>{`${room.street}`}</Text>
                    <Text
                      style={styles.info}
                    >{`This restroom is ${distance} miles away`}</Text>
                  </Callout>
                </Marker>
              );
            } else if (isNaN(isNum) === false) {
              return (
                <Marker
                  key={room.id}
                  image={require('../assets/real-toilet-pin.png')}
                  coordinate={{
                    latitude: room.latitude,
                    longitude: room.longitude,
                  }}
                >
                  <Callout style={styles.infoContainerNoName}>
                    <Text>{`${room.street}`}</Text>
                    <Text
                      style={styles.info}
                    >{`This restroom is ${distance} miles away`}</Text>
                  </Callout>
                </Marker>
              );
            }
          })
        ) : (
          <View />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: 400,
    borderWidth: 5,
    borderColor: 'black',
  },
  infoContainer: {
    height: 50,
  },
  infoContainerNoName: {
    height: 40,
  },
  info: {
    fontWeight: 'bold',
    marginTop: 3,
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 50,
    backgroundColor: 'red',
  },
  // stroke: {
  //   width: 26,
  //   height: 26,
  //   borderRadius: 50,
  //   backgroundColor: '#fff',
  //   zIndex: 1,
  // },
  core: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    backgroundColor: 'red',
  },
});

export default Map;