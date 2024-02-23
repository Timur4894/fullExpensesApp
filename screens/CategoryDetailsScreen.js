import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Platform, Modal } from "react-native";
import { AuthContext } from '../store/auth-context';
import IconButton from '../components/UI/IconButton';
import { storeExpense } from '../utils/http';
import Button from '../components/UI/Button';

function CategoryDetailsScreen({ route }) {
  const { category } = route.params;        
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Initially set to current date
  const [description, setDescription] = useState('');
  const [successMessageVisible, setSuccessMessageVisible] = useState(false); // State for success message visibility
  const authContext = useContext(AuthContext);

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

      await storeExpense(token, expenseData);
      setSuccessMessageVisible(true); // Show success message
      setTimeout(() => {
        setSuccessMessageVisible(false); // Hide success message after 2 seconds
      }, 1000);
    } catch (error) {
      console.error("Error storing expense:", error);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // автоматическое смещение вверх при открытии клавиатуры
    >
      <Text style={[styles.text, { borderColor: getCategoryColor(category), backgroundColor: getLighterColor(getCategoryColor(category)), overflow: 'hidden' }]}>
        {category}
      </Text> 

      <TextInput
        style={styles.input}
        placeholder="Enter amount..."
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
        maxLength={6}
      /> 
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Title..."
        value={description}
        onChangeText={(text) => setDescription(text)}
        maxLength={12}
      />

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button style={styles.button} onPress={submitExpense}>
            Submit
          </Button>  
        </View>
      </View>

      {/* Modal for success message */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={successMessageVisible}
        onRequestClose={() => {
          setSuccessMessageVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Expense added successfully!</Text>
          </View>
        </View>
      </Modal>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: '#333'
  },
  text: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    borderRadius: 5,
    color: 'black',
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
    backgroundColor: "#ccc",
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "#FF4900",
  },
  modalContainer: {
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default CategoryDetailsScreen;
