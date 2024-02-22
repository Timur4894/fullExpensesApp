import React from "react";
import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native";

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");

function Categories (){
  const navigation = useNavigation();

  const categories = ["Food🍔", "Housing🏡", "Transport🚕", "Health💊", "Entmt🎭", "Other💡"];

  // Функция для определения цвета кнопки в зависимости от категории
  const getCategoryColor = (category) => {
    switch (category) {
      case "Food🍔":
        return "#7CFC00"; 
      case "Housing🏡":
        return "#CD853F"; // пастельно-коричневый
      case "Transport🚕":
        return "#6495ED"; // пастельно-синий
      case "Health💊":
        return "#F0FFFF"; // пастельно-белый
      case "Entmt🎭":
        return "#DA70D6"; // пастельно-фиолетовый
      case "Other💡":
        return "#A9A9A9"; // пастельно-серый
      default:
        return "#ccc"; // по умолчанию серый
    }
  };

  const getLighterColor = (color) => {
    return `${color}99`; 
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>Categories</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.column}>
          {categories.slice(0, 3).map((category, index) => (
            <TouchableOpacity key={index} style={[styles.button, {borderColor: getCategoryColor(category), backgroundColor: getLighterColor(getCategoryColor(category))}]} onPress={() => navigation.navigate('CategoryDetails', { category: category })}>
              <Text style={styles.buttonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.column}>
          {categories.slice(3).map((category, index) => (
            <TouchableOpacity key={index} style={[styles.button, {borderColor: getCategoryColor(category), backgroundColor: getLighterColor(getCategoryColor(category))}]} onPress={() => navigation.navigate('CategoryDetails', { category: category })}>
              <Text style={styles.buttonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    color: '#FF4900',
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
    paddingVertical: 13,
    width: 160,
    maxHeight: 70,
    paddingHorizontal: 30,
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: "center",
    borderWidth: 3, // Добавляем обводку
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10
  },
});

export default Categories;
