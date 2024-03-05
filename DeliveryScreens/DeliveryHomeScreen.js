import { View, Text, TextInput, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const DeliveryHomeScreen = () => {
  const [fromText, setFromText] = useState();
  const [toText, setToText] = useState();
  const [orginPlace, setOrginPlace] = useState("");
  const [designationPlace, setDesignationPlace] = useState("");
  console.log("toplace: ",designationPlace);
  return (
    <SafeAreaView>
      
      <View style={styles.container}>
      <GooglePlacesAutocomplete
          placeholder="From"
          onPress={(data, details = true) => {
            setOrginPlace({ data:data, details:details });
            console.log(data, details);
          }}
          query={{
            key: "AIzaSyBOAYO3CdgaTU4-aep70s2cV9TSHD92jt0",
            language: "en",
          }}
        />
        
        <GooglePlacesAutocomplete
          placeholder="Where to"
          onPress={(data, details = true) => {
            setDesignationPlace({ data:data, details:details });
            console.log(data, details);
          }}
          query={{
            key: "AIzaSyBOAYO3CdgaTU4-aep70s2cV9TSHD92jt0",
            language: "en",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop:40,
    height: "50%",
  },
  textInput: { height: 50, backgroundColor: "#eee", marginVertical: 5 },
});
export default DeliveryHomeScreen;
