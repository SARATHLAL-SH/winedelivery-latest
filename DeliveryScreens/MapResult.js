import { View, Text, StyleSheet } from "react-native";
import React,{useState,useEffect} from "react";
import MapView,{Marker} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from 'expo-location'
const MapResult = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

    const apikey ='AIzaSyDLknVcNYuE54bQDan3U1j0J5jbHN8B26w'
  return (
    <View style={styles.container}>
       <MapView
        style={styles.map}
        initialRegion={{
          latitude:  location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Starting Marker */}
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="Starting Point"
        />

        {/* Ending Marker */}
        <Marker
          coordinate={{ latitude: 22.5726, longitude: 88.3669 }}
          title="Ending Point"
        />

        {/* MapViewDirections for route */}
        <MapViewDirections
          origin={{ latitude: location.latitude, longitude: location.longitude}}
          destination={{ latitude: 22.5726, longitude: 88.3669 }}
          apikey={apikey}
          strokeWidth={3}
          strokeColor="hotpink"
        />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
export default MapResult;
