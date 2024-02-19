import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import {} from '../utils/http'

function CategoryDetailsScreen({ route }) {
  const { category } = route.params;
  


  return (
    <View style={styles.container}>
      <Text style={styles.text}>{category}</Text>
     
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        //value={expenseAmount}
        //onChangeText={(text) => setExpenseAmount(text)}
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