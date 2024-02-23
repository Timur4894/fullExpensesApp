import React, { useContext, useEffect, useState,  } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { fetchExpenses, deleteExpense } from '../utils/http'; // предположим, что у вас есть функция deleteExpense для удаления траты
import Total from './Total';
import { useNavigation } from '@react-navigation/native';
import CategoryDetailsScreen from '../screens/CategoryDetailsScreen';
import { Ionicons } from '@expo/vector-icons'

function Expenses() {
  const navigation = useNavigation();

  const [fetchedExpenses, setFetchedExpenses] = useState([]);
  const [sortByOldestFirst, setSortByOldestFirst] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

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

  const handleDeleteExpense = async () => {
    await deleteExpense(selectedExpenseId, token);
    setModalVisible(false);
    loadExpenses();
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.expensesText}>Expenses</Text>
        <Ionicons name='filter' size={25} color='#FF4900' style={styles.filter} onPress={async () => {
    const expenses = await fetchExpenses(token);
    setSortByOldestFirst(!sortByOldestFirst)
    if (sortByOldestFirst){
      setFetchedExpenses(expenses);
    } else {
      setFetchedExpenses(expenses.reverse());
    }
  }}/>
      </View>
      <ScrollView style={styles.expenseScroll} contentContainerStyle={styles.scrollContent}>
        {fetchedExpenses.map(expense => (
          <Pressable key={expense.id} onPress={() => {
            setSelectedExpenseId(expense.id);
            setModalVisible(true);
          }}>
            <View style={[styles.expenseInfo, {borderColor: getCategoryColor(expense.category), backgroundColor: getLighterColor(getCategoryColor(expense.category))}]}> 
              <Text style={styles.title}>{expense.description}</Text>
              <Text style={styles.category}>{formatDate(expense.date)}</Text>
              <Text style={styles.amount}>Amount: {expense.amount} zl</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want to delete this expense?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={handleDeleteExpense}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filter: {
    marginLeft: 'auto'
  },
  expensesText: {
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF4900',
  },
  expenseInfo: {
    height: 70,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 3, 
  },
  title: {
    fontSize: 18,
    marginTop: '2%',
    fontWeight: 'bold',
  },
  category: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: '1%',
  },
  amount: {
    fontSize: 18,
    position: 'absolute',
    right: 20,
    marginTop: '2%',
    fontWeight: '600',
  },
  expenseScroll: {
    paddingBottom: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#333",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 25,
    textAlign: "center",
    fontWeight: '700',
    color: '#FF4900',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: '10%',
    width: '100%',
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#ccc",
  },
  buttonDelete: {
    backgroundColor: "#FF0000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default Expenses;
