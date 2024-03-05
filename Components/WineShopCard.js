import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";

const WineShopCard = ({ item, index, name }) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("wineshop", { ...item })}
    >
      <View style={{ shadowRadius: 7 }} className="mr-6 bg-white, rounded-3x-l">
        <Image
          style={{ objectFit: "contain" }}
          className="h-16 w-24 "
          source={item.image}
        />
        <View className="px-3 pb-4 space-y-2">
          <Text className="text-lg font-bold pt-2">{name}</Text>
          <View className="flex-row space-x-2 my-l"></View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WineShopCard;
