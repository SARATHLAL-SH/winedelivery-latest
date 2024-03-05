import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, flatlist } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { subCategory } from "../Client/Constants";

const PaymentScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [shoplocation, setShopLocation] = useState();
  const [shopName, setShopName] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const { params } = useRoute();
  const Shop = params;
  const shopId = Shop[Shop.length - 1];
  console.log("PaymentScreen: ", Shop);
  const navigation = useNavigation();
  const filteredImage = subCategory.find((image) => image.subId === shopId);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      // Reverse geocoding to get location name
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Find the first result with a meaningful name
      let nearestPlace = reverseGeocode.find((result) => result.name);
      if (nearestPlace) {
        setLocationName(nearestPlace.name);
      } else {
        // If no meaningful name is found, set to the first result
        setLocationName(reverseGeocode[0].name);
      }
    })();
    if (Shop && Shop.length > 0) {
      const shopDetails = Shop[0]; // Access the first shop detail
      setShopLocation(shopDetails.ShopName);
      setLongitude(shopDetails.longitude);
      setLatitude(shopDetails.latitude);
    }
  }, []);
  const paymentHandler = () => {
    navigation.navigate("conform", Shop);
  };
  return (
    <>
      <View>
        <View>
          {filteredImage && (
            <Image
              style={{ objectFit: "contain" }}
              className="w-full h-72"
              source={filteredImage.image}
            />
          )}
        </View>
        <View
          style={{
            backgroundColor: "#BADCCA",
            padding: 30,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        >
          {Shop?.map((shopDetails, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 22, fontWeight: "500" }}>
              
                Shop Name:
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "500",flexWrap:'wrap', color:"#BA016A" }}>
                {shopDetails.ShopName}
              </Text>
            </View>
          ))}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 22, fontWeight: "500" }}>Price: </Text>
            <Text style={{ fontSize: 22, fontWeight: "500" }}>
              {filteredImage && filteredImage.price}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              Delivery Charge:{" "}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "500", color: "red" }}>
              ₹ 50
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "500", color: "green" }}>
              Total Amout:{" "}
            </Text>
            <Text style={{ fontSize: 22, fontWeight: "700", color: "green" }}>
              {filteredImage && filteredImage.price + 50}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={paymentHandler}
          className="w-50 h-50"
          style={{ alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "green",
              width: 150,
              height: 50,
              borderRadius: 50,
              margin: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "white", fontWeight: "700" }}>
              Pay Now
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <MapView
        initialRegion={{
          latitude: 22.5726,
          longitude: 88.3639,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        className="flex-1"
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={shoplocation}
          description="online Delivery"
          pinColor="blue"
        ></Marker>
      </MapView>
      <View style={styles.locationTextContainer}>
        <Text style={styles.locationText}>
          {locationName ? locationName : "Fetching location..."}
        </Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("screen").height * 0.25,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationTextContainer: {
    position: "absolute",
    bottom: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 10,
  },
  locationText: {
    fontSize: 16,
  },
});
export default PaymentScreen;
