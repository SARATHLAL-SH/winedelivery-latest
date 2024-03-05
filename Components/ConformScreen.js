import { View, Text, ImageBackground, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import backgroundImg from "../assets/backgrondImage.jpg";
import { useNavigation, useRoute } from "@react-navigation/native";

const ConformScreen = () => {
     const {params} =useRoute();
     const Shop =params
     console.log("ConformScreen: ",Shop)
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
      } else if (seconds === 0) {
        setMinutes((prevMinutes) => prevMinutes - 1);
        setSeconds(59);
      } else {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);
    setTimeout(() => {
      navigation.navigate("delivery",Shop);
    }, 10000);
    return () => clearInterval(timer);
  }, [minutes, seconds]);

  // Format minutes and seconds to display with leading zeros
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return (
    <ImageBackground
      source={backgroundImg}
      style={{ flex: 1, resizeMode: "contain" }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "700",
            marginTop: 80,
            color: "#910253",
          }}
        >
          Your Order is Wating for Shop's Conformation
        </Text>
      </View>
      <View style={{ marginTop: "10%" }}>
        <ActivityIndicator size="420" color="white" />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "700",
            marginTop: 80,
            color: "white",
          }}
        >
          Your Order will Conform within:{" "}
          {`${formattedMinutes}:${formattedSeconds}`} Minutes
        </Text>
      </View>
    </ImageBackground>
  );
};

export default ConformScreen;
