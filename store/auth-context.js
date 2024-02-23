import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: () => {}
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken !== null) {
                    setAuthToken(storedToken);
                }
            } catch (error) {
                console.error("Error retrieving token from AsyncStorage:", error);
            }
        };

        fetchToken();
    }, []);

    const authenticate = async (token) => {
        try {
            await AsyncStorage.setItem('token', token);
            setAuthToken(token);
        } catch (error) {
            console.error("Error saving token to AsyncStorage:", error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            setAuthToken('');
        } catch (error) {
            console.error("Error removing token from AsyncStorage:", error);
        }
    };

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
