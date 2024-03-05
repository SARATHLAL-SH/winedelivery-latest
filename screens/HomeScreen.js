import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import categories from "../Client/Constants/index.js";
import { subCategory } from "../Client/Constants/index.js";
import themeColors from "../themes";
import Categories from "../Components/Categories";
import FeaturedRow from "../Components/FeaturedRow";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    if (searchQuery) {
      // const filteritems=subCategory ?.filter(items=>items.name.toLowerCase().includes(searchQuery.toLowerCase()));
      const filteritems = subCategory.filter((item) =>
        item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setFilteredItems(filteritems);
    } else {
      setFilteredItems([]);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = categories?.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  const onSelectHandler = (selectedItem) => {
    console.log(selectedItem);
    navigation.navigate('wineshop',selectedItem)
  };
  return (
    <SafeAreaView className="bg-white" style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* search bar */}
      <View
        style={{ flexDirection: "row" }}
        className="flex-row  items-center  space-x-2 px-4 pb-2"
      >
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput
            placeholder="Search Wine here"
            className="ml-2 flex-1"
            value={searchQuery}
            onChangeText={handleSearch}
          />
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
      <View
        style={{
          position: "absolute",
          top: Dimensions.get("screen").height * 0.11,
          left: Dimensions.get("screen").height * 0.065,
          zIndex: 1,
        }}
      >
        {filteredItems?.map((item,index) => (
          <TouchableOpacity key={index}
            style={{ backgroundColor: "#F32E76" }}
            activeOpacity={0.8}
            onPress={() => onSelectHandler(item)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: 5,
                backgroundColor: "white",
                width: 170,
                elevation: 5,
              }}
            >
              <Text style={{ color: "red" }}>{item.name}</Text>
              <Image
                className="w-10 h-10"
                source={item.image}
                style={{ objectFit: "contain" }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {/* main */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* category */}
        <Categories />
        {/* featured */}

        <View className="mt-5">
          {categories?.map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                name={item.name}
                description={item.description}
                id={item.id}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
