import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { subCategory } from "../Client/Constants";
import * as Location from "expo-location";

const WineShopScreens = () => {
  const [selectedItem, setSeletctedItem] = useState();
  const [selectedName, setSeletctedName] = useState();
  const [selectedPrice, setSeletctedPrice] = useState();
  const [selectedId, setSeletctedId] = useState();

  const navigation = useNavigation();
  const { params } = useRoute();
  let item = params;
  console.log("selected param wineshopScreen: ",item)
  const filteredImage = { selectedItem };
  useEffect(() => {
    const filteredImage = subCategory?.find(
      (image) => image.subId === item.subId
    );
    setSeletctedItem(filteredImage.image);
    setSeletctedName(filteredImage.name);
    setSeletctedPrice(filteredImage.price);
    setSeletctedId(filteredImage.subId);
  }, []);

  const itemSelectorHandler = (item) => {
    setSeletctedItem(item.image);
    setSeletctedName(item.name);
    setSeletctedPrice(item.price);
    setSeletctedId(item.subId);
  };
  console.log(selectedId);
  return (
    <View>
      <ScrollView>
        <View className="relative" style={{ flex: 1, backgroundColor:'black' }}>
          <View style={{ height: "50%" }}>
            {filteredImage && (
              <Image
                style={{ objectFit: "contain" }}
                className="w-full h-72"
                source={selectedItem}
              />
            )}
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top:34 left-4 bg-gray-50 p-2 rounded-full shadow"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke="#0ACE03" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            elevation: 10,
          }}
          className="bg-white -mt-12 mb-5 pt-6 bg-gray-50"
        >
          <View className="px-5" style={{ alignItems: "center" }}>
            <Text className="text-3xl font-bold">{selectedName}</Text>
            <Text className="text-3xl font-bold">₹ {selectedPrice}</Text>
            <View className="flex-row space-x-2 my-l"></View>
          </View>
        </View>
       
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "green" }]}
          onPress={() => navigation.navigate("shops", selectedId )}
        >
          <Text style={styles.buttonText}>Order Now</Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 25, fontWeight: "700", marginVertical: 20 }}>
            Similar Items
          </Text>
        </View>
      </ScrollView>

      <FlatList
        style={{ alignContent: "center", flexWrap: "wrap" }}
        data={subCategory.filter((filteritem) => filteritem.id === item.id)}
        keyExtractor={(item) => item.subId.toString()}
        numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => itemSelectorHandler(item)}>
            <View style={{ margin: 5, alignItems: "center" }}>
              <Image
                source={item.image}
                style={{ width: 90, height: 90, resizeMode: "contain" }}
              />
              <Text>{item.name}</Text>
              <Text style={{ color: "red" }}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    // Add more styles as needed
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    // Add more styles as needed
  },
});
export default WineShopScreens;
