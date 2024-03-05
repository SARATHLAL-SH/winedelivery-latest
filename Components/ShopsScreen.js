import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WineShops } from "../Client/Constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { subCategory } from "../Client/Constants";
import CartIcons from "./CartIcons";

const ShopsScreen = () => {
  const [availableShop, setAvailableShop] = useState([]);
  const [status, setsetStatus] = useState();
  const navigation = useNavigation();
  const { params } = useRoute();
  const flattenSelectedShop = availableShop.flat();
  const flattenedAvailableItems = flattenSelectedShop.flatMap(
    (shop) => shop.availableItems
  );

  const requiredItemId = params;
  const filteredImage = subCategory.find(
    (image) => image.subId === requiredItemId
  );

  useEffect(() => {
    const foundShop = WineShops.filter((shop) =>
      shop.availableItems.some((item) => item.subId === requiredItemId)
    );
    foundShop && setAvailableShop((prevShops) => [...prevShops, foundShop]);
  }, []);

  console.log("flatten: ShopsScreen: ", filteredImage);
  const selectShopHandler = (selectedShopId, shop) => {
    const selectedShop = flattenSelectedShop.find(
      (shop) => shop.shopId === selectedShopId
    );
    if (selectedShop) {
      navigation.navigate("payment", [shop, filteredImage.subId]);
    } else {
      setsetStatus("Selected Item  not available this  shop");
      setTimeout(() => {
        setsetStatus("");
      }, 1000);
    }
  };
  return (
    <SafeAreaView className="bg-white" style={styles.safeArea}>
      {/* <CartIcons /> */}
      <StatusBar barStyle="dark-content" />
      <View
        style={{ flexDirection: "row" }}
        className="flex-row  items-center  space-x-2 px-4 pb-2"
      >
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput placeholder="Search Wine Shops" className="ml-2 flex-1" />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300" />
          <Icon.MapPin height="20" width="20" stroke="gray" />
          <Text className="text-gray-600">Kolkata IND</Text>
        </View>
        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-3 pb-gray-300 rounded-full"
        >
          <Icon.Sliders
            height="20"
            width="20"
            strokeWidth={2.5}
            stroke="white"
          />
        </View>
      </View>
      <ScrollView
        style={{
          flexDirection: "column",
          marginBottom: 40,
        }}
      >
        <View className="relative">
          {filteredImage && (
            <Image
              style={{ objectFit: "contain" }}
              className="w-full h-72"
              source={filteredImage.image}
            />
          )}
        </View>
        <Text
          style={{
            fontSize: 35,
            fontWeight: "500",
            marginHorizontal: 20,
            color: "#970192",
            marginVertical: 0,
          }}
        >
          Select Shop
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {WineShops?.map((shop, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => selectShopHandler(shop.shopId, shop)}
            >
              <View
                style={{
                  width: 155,
                  flexDirection: "row",
                  margin: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20,
                  borderRadius: 10,
                  backgroundColor: shop.availableItems.some(
                    (item) => item.subId === requiredItemId
                  )
                    ? "green"
                    : "#DBD3D5",
                }}
              >
                <FontAwesome5 name="building" size={34} color="gray" />
                <Text
                  key={shop.shopId}
                  style={{
                    color: shop.availableItems.some(
                      (item) => item.subId === requiredItemId
                    )
                      ? "white"
                      : "#CAB9BE",
                    fontSize: 13,
                    fontWeight: "700",
                  }}
                >
                  {shop.ShopName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "red", fontWeight: "700" }}>{status}</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#0A25A8", fontSize: 24, fontWeight: "700" }}>
            Available Products
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {flattenedAvailableItems?.map((itemsInShop, index) => (
            <View key={index} style={{ margin: 3 }}>
              <Image
                className="w-20 h-20 "
                source={itemsInShop.image}
                style={{ objectFit: "contain" }}
              />
              <Text className="mb-8" style={{ color: "red" }}>
                {itemsInShop.name}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopsScreen;
const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
