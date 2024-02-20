import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import {} from '../utils/http'

function CategoryDetailsScreen({ route }) {
  //const { expense } = route.params;
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Тут трата будет</Text>
     
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
      />
     
      <Button title="Submit" onPress={()=>{}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: '#373970'
  },
  text: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    borderRadius: 5,
    borderBottomColor: "#333",
    borderWidth: 2,
    width: 300,
    padding: 5,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
});

export default CategoryDetailsScreen;
