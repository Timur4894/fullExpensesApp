import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { fetchExpenses } from '../utils/http';
//import { getFormattedDate } from '../utils/date';
import Total from './Total';
import { useNavigation } from '@react-navigation/native';


function Expenses() {
  const navigation = useNavigation();

  const [fetchedExpenses, setFetchedExpenses] = useState([]);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    fetchExpenses(token).then(expenses => {
      setFetchedExpenses(expenses);
    });
  }, []);



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };



  return (
    <View style={styles.container}>
      <Text style={styles.expensesText}>Expenses</Text>
      <View style={styles.expenseScroll} contentContainerStyle={styles.scrollContent}>
        {fetchedExpenses.map(expense => (
          <Pressable onPress={()=>{navigation.navigate('ChangeExpense',)}} style={({ pressed }) => pressed && styles.pressed}>
            <View key={expense.id} style={styles.expenseInfo}>
              <Text style={styles.title}>{expense.description}</Text>
              {/* <Text style={styles.category}>Category: {expense.category}</Text> */}
              <Text style={styles.category}>{formatDate(expense.date)}</Text>
              <Text style={styles.amount}>Amount: ${expense.amount}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      {/* <Total fetchedExpenses={fetchedExpenses} />  */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  pressed: {
    opacity: 0.75,
  },
  expensesText: {
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  expenseInfo: {
    height: 80,
    width: '100%',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
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
