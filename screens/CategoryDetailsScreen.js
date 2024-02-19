import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { AuthContext } from '../store/auth-context'; // Импортируем контекст авторизации
import { storeExpense } from '../utils/http'; // Импортируем функцию storeExpense

function CategoryDetailsScreen({ route }) {
  const { category } = route.params;
  const [amount, setAmount] = useState(''); // Состояние для суммы расхода
  const [date, setDate] = useState(''); // Состояние для даты расхода
  const [description, setDescription] = useState(''); // Состояние для описания расхода
  const authContext = useContext(AuthContext); // Используем контекст авторизации

  // Функция для отправки данных на сервер
  const submitExpense = async () => {
    const token = authContext.token; // Получаем токен из контекста авторизации
    
    const expenseData = { // Создаем объект с данными для расхода
      //category: category,
      amount: amount,
      date: date,
      description: description
    };

    try {
      // Проверяем, авторизован ли пользователь
      if (!authContext.isAuthenticated) {
        console.log("User is not logged in"); // Обработка случая, когда пользователь не авторизован
        return;
      }

      const id = await storeExpense(token, expenseData); // Передаем токен и данные расхода в функцию storeExpense
      console.log("Expense stored with id:", id);
      // Добавьте здесь обработку успешного сохранения, например, переход на другой экран или отображение уведомления
    } catch (error) {
      console.error("Error storing expense:", error);
      // Добавьте здесь обработку ошибки, например, отображение сообщения об ошибке пользователю
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{category}</Text> 

      <TextInput
        style={styles.input}
        placeholder="Enter amount..."
        value={amount}
        onChangeText={(text) => setAmount(text)} // Обновляем состояние amount при изменении текста в поле ввода
        keyboardType="numeric"
      /> 
      <TextInput
        style={styles.rowInput}
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={(text) => setDate(text)} // Обновляем состояние date при изменении текста в поле ввода
      />
      <TextInput
        style={styles.rowInput}
        placeholder="Title..."
        value={description}
        onChangeText={(text) => setDescription(text)} // Обновляем состояние description при изменении текста в поле ввода
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
