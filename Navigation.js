import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Modal } from "react-native";
import React from "react";
import WineShopScreens from "./screens/WineShopScreens";
import HomeScreen from "./screens/HomeScreen";
import ShopsScreen from "./Components/ShopsScreen";
import PaymentScreen from "./Components/PaymentScreen";
import CartScreen from "./Components/CartScreen";
import DeliveryScreen from "./Components/DeliveryScreen";
import DeliveryHomeScreen from "./DeliveryScreens/DeliveryHomeScreen";
import ConformScreen from "./Components/ConformScreen";
import MapResult from "./DeliveryScreens/MapResult";
const Stack = createNativeStackNavigator();


const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="wineshop" component={WineShopScreens} />
        <Stack.Screen name="shops" component={ShopsScreen} />
        <Stack.Screen name="payment" component={PaymentScreen} />
        <Stack.Screen name="conform" component={ConformScreen} />
        <Stack.Screen name="delivery" component={DeliveryScreen} />
        <Stack.Screen
          name="cart"
          options={{ presentation: "modal" }}
          component={CartScreen}
        /> 
        {/* <Stack.Screen name="deliveryHome" component={DeliveryHomeScreen} />
        {/* <Stack.Screen name="mapResult" component={MapResult} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
