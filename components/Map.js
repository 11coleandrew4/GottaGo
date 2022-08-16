import * as React from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import createOpenLink from 'react-native-open-maps';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const Map = (props) => {
  let accessibleRooms = [];
  if (props.bathroom.data) {
    for (let i = 0; i < props.bathroom.data.length; i++) {
      let currentRoom = props.bathroom.data[i];
      if (currentRoom.accessible === true) {
        accessibleRooms.push(currentRoom);
      }
    }
  }
  let furthestRestroom = 0;
  if (props.bathroom.data) {
    furthestRestroom = props.bathroom.data[9].distance / 29.28;
  }

  let babyRooms = [];
  if (props.bathroom.data) {
    for (let i = 0; i < props.bathroom.data.length; i++) {
      let currentRoom = props.bathroom.data[i];
      if (currentRoom.changing_table === true) {
        babyRooms.push(currentRoom);
      }
    }
  }

  let getDirections = function () {};
  if (props.bathroom.data) {
    getDirections = (room) => {
      createOpenLink({
        provider: 'apple',
        query: `http://maps.apple.com/?ll=${room.latitude},${room.longitude}`,
      });
    };
  }

  console.log(babyRooms);

  return (
    <View style={styles.container}>
      {furthestRestroom > 0.01 ? (
        <MapView
          style={styles.map}
          region={{
            latitude: props.location.latitude,
            longitude: props.location.longitude,
            latitudeDelta: furthestRestroom,
            longitudeDelta: 0.0005,
          }}
          showsUserLocation={true}
        >
          {props.bathroom.data &&
          props.singleClosest &&
          props.isAccessible === false ? (
            props.bathroom.data.map((room, idx) => {
              const distance = room.distance.toFixed(2);

              if (idx < 1) {
                if (room.name !== null) {
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
                        <Callout
                          style={styles.infoContainer}
                          onPress={() => getDirections(room)}
                        >
                          <TouchableOpacity>
                            <View>
                              <Text>{room.name}</Text>
                              <Text>{room.street}</Text>
                              <Text
                                style={styles.info}
                              >{`Closest restroom is ${distance} miles away`}</Text>
                            </View>
                          </TouchableOpacity>
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
                        <Callout
                          style={styles.infoContainerNoName}
                          onPress={() => getDirections(room)}
                        >
                          <TouchableOpacity>
                            <View>
                              <Text>{room.street}</Text>
                              <Text
                                style={styles.info}
                              >{`Closest restroom is ${distance} miles away`}</Text>
                            </View>
                          </TouchableOpacity>
                        </Callout>
                      </Marker>
                    );
                  }
                }
              }
            })
          ) : (
            <View />
          )}
          {props.bathroom.data &&
          props.allClosest &&
          props.isAccessible === false ? (
            props.bathroom.data.map((room, idx) => {
              const distance = room.distance.toFixed(2);
              if (room.name !== null) {
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
                      <Callout
                        style={styles.infoContainer}
                        onPress={() => getDirections(room)}
                      >
                        <TouchableOpacity>
                          <View>
                            <Text>{room.name}</Text>
                            <Text>{room.street}</Text>
                            <Text
                              style={styles.info}
                            >{`This restroom is ${distance} miles away`}</Text>
                          </View>
                        </TouchableOpacity>
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
                      <Callout
                        style={styles.infoContainerNoName}
                        onPress={() => getDirections(room)}
                      >
                        <TouchableOpacity>
                          <View>
                            <Text>{room.street}</Text>
                            <Text
                              style={styles.info}
                            >{`This restroom is ${distance} miles away`}</Text>
                          </View>
                        </TouchableOpacity>
                      </Callout>
                    </Marker>
                  );
                }
              }
            })
          ) : (
            <View />
          )}
          {props.bathroom.data && props.singleClosest && props.isAccessible ? (
            accessibleRooms.map((room, idx) => {
              const distance = room.distance.toFixed(2);

              if (idx < 1) {
                if (room.name !== null) {
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
                        <Callout
                          style={styles.infoContainer}
                          onPress={() => getDirections(room)}
                        >
                          <TouchableOpacity>
                            <View>
                              <Text>{`${room.name}`}</Text>
                              <Text>{room.street}</Text>
                              <Text
                                style={styles.info}
                              >{`Closest ADA accessable restroom is ${distance} miles away`}</Text>
                            </View>
                          </TouchableOpacity>
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
                        <Callout
                          style={styles.infoContainerNoName}
                          onPress={() => getDirections(room)}
                        >
                          <TouchableOpacity>
                            <View>
                              <Text>{room.street}</Text>
                              <Text
                                style={styles.info}
                              >{`Closest ADA accessable restroom is ${distance} miles away`}</Text>
                            </View>
                          </TouchableOpacity>
                        </Callout>
                      </Marker>
                    );
                  }
                }
              }
            })
          ) : (
            <View />
          )}
          {props.bathroom.data && props.allClosest && props.isAccessible ? (
            accessibleRooms.map((room) => {
              const distance = room.distance.toFixed(2);
              if (room.name !== null) {
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
                      <Callout
                        style={styles.infoContainer}
                        onPress={() => getDirections(room)}
                      >
                        <TouchableOpacity>
                          <View>
                            <Text>{`${room.name}`}</Text>
                            <Text>{room.street}</Text>
                            <Text
                              style={styles.info}
                            >{`This ADA accessable restroom is ${distance} miles away`}</Text>
                          </View>
                        </TouchableOpacity>
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
                      <Callout
                        style={styles.infoContainerNoName}
                        onPress={() => getDirections(room)}
                      >
                        <TouchableOpacity>
                          <View>
                            <Text>{room.street}</Text>
                            <Text
                              style={styles.info}
                            >{`Closest ADA accessable restroom is ${distance} miles away`}</Text>
                          </View>
                        </TouchableOpacity>
                      </Callout>
                    </Marker>
                  );
                }
              }
            })
          ) : (
            <View />
          )}
        </MapView>
      ) : (
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
          {props.bathroom.data &&
          props.singleClosest &&
          props.isAccessible === false ? (
            props.bathroom.data.map((room, idx) => {
              const distance = room.distance.toFixed(2);

              if (idx < 1) {
                if (room.name !== null) {
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
                        <Callout
                          style={styles.infoContainer}
                          onPress={() => getDirections(room)}
                        >
                          <TouchableOpacity>
                            <View>
                              <Text>{room.name}</Text>
                              <Text>{room.street}</Text>
                              <Text
                                style={styles.info}
                              >{`Closest restroom is ${distance} miles away`}</Text>
                            </View>
                          </TouchableOpacity>
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
                        <Callout
                          style={styles.infoContainerNoName}
                          onPress={() => getDirections(room)}
                        >
                          <TouchableOpacity>
                            <View>
                              <Text>{room.street}</Text>
                              <Text
                                style={styles.info}
                              >{`Closest restroom is ${distance} miles away`}</Text>
                            </View>
                          </TouchableOpacity>
                        </Callout>
                      </Marker>
                    );
                  }
                }
              }
            })
          ) : (
            <View />
          )}
          {props.bathroom.data &&
          props.allClosest &&
          props.isAccessible === false ? (
            props.bathroom.data.map((room, idx) => {
              const distance = room.distance.toFixed(2);
              if (room.name !== null) {
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
                      <Callout
                        style={styles.infoContainer}
                        onPress={() => getDirections(room)}
                      >
                        <TouchableOpacity>
                          <View>
                            <Text>{room.name}</Text>
                            <Text>{room.street}</Text>
                            <Text
                              style={styles.info}
                            >{`This restroom is ${distance} miles away`}</Text>
                          </View>
                        </TouchableOpacity>
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
                      <Callout
                        style={styles.infoContainerNoName}
                        onPress={() => getDirections(room)}
                      >
                        <TouchableOpacity>
                          <View>
                            <Text>{room.street}</Text>
                            <Text
                              style={styles.info}
                            >{`This restroom is ${distance} miles away`}</Text>
                          </View>
                        </TouchableOpacity>
                      </Callout>
                    </Marker>
                  );
                }
              }
            })
          ) : (
            <View />
          )}
          {props.bathroom.data && props.singleClosest && props.isAccessible ? (
            accessibleRooms.map((room, idx) => {
              const distance = room.distance.toFixed(2);

              if (idx < 1) {
                if (room.name !== null) {
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
                        <Callout
                          style={styles.infoContainer}
                          onPress={() => getDirections(room)}
                        >
                          <TouchableOpacity>
                            <View>
                              <Text>{`${room.name}`}</Text>
                              <Text>{room.street}</Text>
                              <Text
                                style={styles.info}
                              >{`Closest ADA accessable restroom is ${distance} miles away`}</Text>
                            </View>
                          </TouchableOpacity>
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
                        <Callout
                          style={styles.infoContainerNoName}
                          onPress={() => getDirections(room)}
                        >
                          <TouchableOpacity>
                            <View>
                              <Text>{room.street}</Text>
                              <Text
                                style={styles.info}
                              >{`Closest ADA accessable restroom is ${distance} miles away`}</Text>
                            </View>
                          </TouchableOpacity>
                        </Callout>
                      </Marker>
                    );
                  }
                }
              }
            })
          ) : (
            <View />
          )}
          {props.bathroom.data && props.allClosest && props.isAccessible ? (
            accessibleRooms.map((room) => {
              const distance = room.distance.toFixed(2);
              if (room.name !== null) {
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
                      <Callout
                        style={styles.infoContainer}
                        onPress={() => getDirections(room)}
                      >
                        <TouchableOpacity>
                          <View>
                            <Text>{`${room.name}`}</Text>
                            <Text>{room.street}</Text>
                            <Text
                              style={styles.info}
                            >{`This ADA accessable restroom is ${distance} miles away`}</Text>
                          </View>
                        </TouchableOpacity>
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
                      <Callout
                        style={styles.infoContainerNoName}
                        onPress={() => getDirections(room)}
                      >
                        <TouchableOpacity>
                          <View>
                            <Text>{room.street}</Text>
                            <Text
                              style={styles.info}
                            >{`Closest ADA accessable restroom is ${distance} miles away`}</Text>
                          </View>
                        </TouchableOpacity>
                      </Callout>
                    </Marker>
                  );
                }
              }
            })
          ) : (
            <View />
          )}
        </MapView>
      )}
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
