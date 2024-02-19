import axios from 'axios';

const BACKEND_URL = 'https://react-native-course-45a99-default-rtdb.firebaseio.com';


export async function storeExpense(token,expenseData) {
  const response = await axios.post(BACKEND_URL + `/expenses.json?auth=${token}`, expenseData);
  const id = response.data.name;
  return id;
}


export async function fetchExpenses(token) {
  const response = await axios.get(`${BACKEND_URL}/expenses.json?auth=${token}`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date, //new Date(response.data[key].date),
      description: response.data[key].description
    };
    console.log('Date string:', response.data[key].date);
    expenses.push(expenseObj);
  }

  return expenses;
}
