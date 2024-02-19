import axios from 'axios';

const BACKEND_URL = 'https://react-native-course-45a99-default-rtdb.firebaseio.com';

export async function fetchExpenses(token) {
  const response = await axios.get(`${BACKEND_URL}/expenses.json?auth=${token}`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    };
    expenses.push(expenseObj);
  }

  return expenses;
}
