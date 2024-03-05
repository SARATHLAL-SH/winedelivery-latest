import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { WineShops, subCategory } from "../Client/Constants/index.js";
import WineShopCard from "./WineShopCard";

const FeaturedRow = ({ name, description, id }) => {
  console.log(id);
  return (
    <SafeAreaView>
      <View className="  flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg">{name}</Text>
          <Text className="font-gray-500 text-x5">{description}</Text>
        </View>
        <TouchableOpacity>
          <Text style={{ color: "#FFA228" }} className="font-semibold">
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="overflow-visible py-5"
      >
        {subCategory
          ?.filter((fshop) => fshop.id === id)
          .map((shop, index) => {
            return <WineShopCard item={shop} name={shop.name} key={index} />;
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeaturedRow;
