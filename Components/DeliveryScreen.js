import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { WineShops } from "../Client/Constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker, MapboxDirections } from "react-native-maps";
import * as Location from "expo-location";
import logo from "../assets/delvery.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Icon from "react-native-feather";
import { Linking } from "react-native";
const DeliveryScreen = () => {
  const [locationName, setLocationName] = useState(null);
  const [latitude, setLatitude] = useState(22.5726);
  const [longitude, setLongitude] = useState(88.3639);
  const { params } = useRoute();
  const Shop = params;
  console.log("DeliveryScreen: ", Shop);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const phoneNumber = "8891332500";
  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  useEffect(() => {
    if (Shop && Shop.length > 0) {
      const shopDetails = Shop[0]; // Access the first shop detail
      setLocationName(shopDetails.ShopName);
      setLongitude(shopDetails.longitude);
      setLatitude(shopDetails.latitude);
    }
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      getCurrentLocation();
    })();
  }, [Shop]);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("Current location:", location.coords);
      // Do something with the current location
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  const navigation = useNavigation();
  //   const wineshop = WineShops.shopName[0];

  return (
    <View className="flex-1">
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
          title={locationName}
          description="online Delivery"
          pinColor="blue"
        ></Marker>
      </MapView>
      <View className="rounded-t-3xl -mt-12 bg-white relative">
        <View className="flex-row justify-between px-5 pt-10">
          <View>
            <Text className="text-lg text-gray-700 font-semibold">
              Estimated Arriaval
            </Text>
            <Text className="text-3xl font-extrabold text-gray-700">
              20 minutes
            </Text>
            <Text className="mt-2 text-gray-700 font-semibold">
              Your order is Own its Way !
            </Text>
          </View>
          <Image className="w-24 h-24" source={logo} />
        </View>
        <View
          style={{ backgroundColor: "#DB9A01" }}
          className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2"
        >
          <View
            className="p-1 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
          >
            {/* <Image className='h-16 w-16 rounded-full' source={}/> */}
            <MaterialCommunityIcons name="face-man" size={54} color="black" />
          </View>
          <View className="flex-1 ml-3">
            <Text className="text-lg font-bold text-white">
              {" "}
              Delivery Boy Name
            </Text>
            <Text className="font-semibold text-white">Your Rider</Text>
          </View>
          <View className="flex-row items-center space-x-3 mr-3">
            <TouchableOpacity
              onPress={handleCall}
              className="bg-white p-2 rounded-full"
            >
              <Icon.Phone fill="#DB9A01" stroke="white" strokeWidth={1} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              className="bg-white p-2 rounded-full"
            >
              <Icon.X fill="white" stroke="red" strokeWidth={4} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeliveryScreen;
