import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


function CategoryScreen () {
  //const { category } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>Тут все категории будут</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 22,
    fontWeight: 'bold',
  }
});

export default CategoryScreen;
