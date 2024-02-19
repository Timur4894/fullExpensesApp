import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { fetchExpenses } from '../utils/http';

function Expenses() {
  const [fetchedExpenses, setFetchedExpenses] = useState([]);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    fetchExpenses(token).then(expenses => {
      setFetchedExpenses(expenses);
    });
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.expensesText}>Expenses</Text>
      <ScrollView>
        {fetchedExpenses.map(expense => (
          <View key={expense.id} style={styles.expenseInfo}>
            <Text style={styles.title}>{expense.description}</Text>
            <Text style={styles.category}>Category: {expense.category}</Text>
            <Text style={styles.amount}>Amount: ${expense.amount}</Text>
          </View>
        ))}
      </ScrollView>
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
});

export default Expenses;
