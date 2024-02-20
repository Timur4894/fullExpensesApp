import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { fetchExpenses } from '../utils/http';
import Total from './Total';
import { useNavigation } from '@react-navigation/native';
import CategoryDetailsScreen from '../screens/CategoryDetailsScreen';

function Expenses() {
  const navigation = useNavigation();

  const [fetchedExpenses, setFetchedExpenses] = useState([]);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const loadExpenses = async () => {
    const expenses = await fetchExpenses(token);
    setFetchedExpenses(expenses.reverse());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadExpenses();
    });

    return unsubscribe;
  }, [navigation, token]);

  const getLighterColor = (color) => {
    return `${color}99`; 
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Функция для определения цвета кнопки в зависимости от категории
  const getCategoryColor = (category) => {
    switch (category) {
      case "Food":
        return "#7CFC00"; 
      case "Housing":
        return "#CD853F"; // пастельно-коричневый
      case "Transport":
        return "#6495ED"; // пастельно-синий
      case "Health":
        return "#F0FFFF"; // пастельно-белый
      case "Enjoyment":
        return "#DA70D6"; // пастельно-фиолетовый
      case "Other":
        return "#A9A9A9"; // пастельно-серый
      default:
        return "#ccc"; // по умолчанию серый
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.expensesText}>Expenses</Text>
      <View style={styles.expenseScroll} contentContainerStyle={styles.scrollContent}>
        {fetchedExpenses.map(expense => (
          <Pressable key={expense.id} onPress={() => navigation.navigate('ChangeExpense')}>
            <View style={[styles.expenseInfo, {borderColor: getCategoryColor(expense.category), backgroundColor: getLighterColor(getCategoryColor(expense.category))}]}> 
              <Text style={styles.title}>{expense.description}</Text>
              <Text style={styles.category}>{formatDate(expense.date)}</Text>
              <Text style={styles.amount}>Amount: ${expense.amount}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  expensesText: {
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  expenseInfo: {
    height: 80,
    width: '100%',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 3, // Добавляем обводку
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: '5%',
  },
  amount: {
    fontSize: 18,
    position: 'absolute',
    right: 20,
    top: '37%',
    fontWeight: '600',
  },
  expenseScroll: {
    paddingBottom: 50,
  }
});

export default Expenses;
