import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import delivery from "../assets/delvery.png";

const CartScreen = () => {
  const [deliveryTime, setDeliveryTime] = useState(
    "30: 00"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveryTime((prevTime) => {
        const [minutes, seconds] = prevTime.split(":").map(Number);
       
        if (minutes === 0 && seconds === 0) {
          clearInterval(interval);
          return "Order Redirecting to next Shop";
        } else if (seconds === 0) {
          const newMinutes = minutes - 1;
          console.log(newMinutes)
          const formattedMinutes =
            newMinutes < 10 ? `0${newMinutes}` : newMinutes;
          return `Order will Conform by Shop within ${formattedMinutes}:59`;
        } else {
          const formattedSeconds =
            seconds - 1 < 10 ? `0${seconds - 1}` : seconds - 1;
          return `Order will Conform by Shop within ${minutes}:${formattedSeconds}`;
        }
      });
    }, 1000); // 1000 milliseconds = 1 second

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, []);

  const navigation = useNavigation();

  return (
    <View className="bg-white, flex-1">
      <View className="relative py-4 shadow-sm">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: "#F3D48A" }}
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2"
        >
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold r=text-xl">Your Cart</Text>
          <Text className="text-center text-grey-500">Order Details</Text>
        </View>
      </View>

      <View
        style={{ backgroundColor: "#FAE0A4" }}
        className="flex-row px-4 items-center"
      >
        <Image
          source={delivery}
          className="w-20 h-20 "
          style={{ objectFit: "contain" }}
        />
        <Text className="flex-row px-4 items-center">{deliveryTime}</Text>
        <TouchableOpacity>
          <Text className="font-bold" style={{ color: "#BF8705" }}>
            Change
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
