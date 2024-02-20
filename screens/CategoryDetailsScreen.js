import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { AuthContext } from '../store/auth-context';
import { storeExpense } from '../utils/http';

function CategoryDetailsScreen({ route }) {
  const { category } = route.params;
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Изначально устанавливаем текущую дату
  const [description, setDescription] = useState('');
  const authContext = useContext(AuthContext);

  const submitExpense = async () => {
    const token = authContext.token;
    
    const expenseData = {
      category: category,
      amount: amount,
      date: date,
      description: description
    };
    setAmount('');
    setDescription('');
    try {
      if (!authContext.isAuthenticated) {
        console.log("User is not logged in");
        return;
      }

      const id = await storeExpense(token, expenseData);
    } catch (error) {
      console.error("Error storing expense:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{category}</Text> 

      <TextInput
        style={styles.input}
        placeholder="Enter amount..."
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
      /> 
      <TextInput
        style={styles.rowInput}
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      <TextInput
        style={styles.rowInput}
        placeholder="Title..."
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
      />

      <Button title="Submit" onPress={submitExpense} /> 
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
    color: 'white',
    borderBottomColor: "#333",
    borderWidth: 2,
    width: 300,
    padding: 5,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  rowInput: {
    height: 40,
    width: 300,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});

export default CategoryDetailsScreen;
