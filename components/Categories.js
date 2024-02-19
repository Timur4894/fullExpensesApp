import React from "react";
import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native";

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get("window");

function Categories (){
  const navigation = useNavigation();

  const categories = ["Food", "Home", "Sport", "College", "Party", "Games"];

  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>Categories</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.column}>
          {categories.slice(0, 3).map((category, index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => navigation.navigate('CategoryDetails', { category: category })}>
              <Text style={styles.buttonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.column}>
          {categories.slice(3).map((category, index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => navigation.navigate('CategoryDetails', { category: category })}>
              <Text style={styles.buttonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Pressable style={{
        alignItems: 'center',
      }} onPress={() => navigation.navigate('AllCategory')}>
            <Text>
              + Add categories
            </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  categoryText: {
    marginBottom: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -17
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ccc",
    paddingVertical: 13,
    width: 160,
    paddingHorizontal: 30,
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    alignItems: "center",
  },
});

export default Categories;
