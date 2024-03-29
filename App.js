import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import { StatusBar } from 'expo-status-bar';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext } from 'react';
import CategoryDetailsScreen from './screens/CategoryDetailsScreen'; // Новый экран для деталей категории
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { Colors } from './constants/styles';



const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  //const authCtx = useContext(AuthContext)

  return (
      <Stack.Navigator>
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false, title: 'Back' }} />
          <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen} options={{ title: 'Add Expense', headerStyle: {backgroundColor: '#333'}, headerTintColor: '#FF4900' }} />
      </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext)
  return (
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack />}
      </NavigationContainer>
  );
}


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}



// export default function App() {
//   return (
//     <>
//       <StatusBar style="Dark" />
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false, title: 'Back' }} />
//           <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen} options={{ title: 'Add Expense' }} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
// }

