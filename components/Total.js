import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { fetchExpenses } from '../utils/http';
import { AuthContext } from '../store/auth-context';


function Total() {
    const [total, setTotal] = useState(0);

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    useEffect(() => {
        const fetchTotalExpenses = async () => {
            try {
                const expenses = await fetchExpenses(token);
                let sum = 0;
                
                expenses.forEach(expense => {
                    sum += parseFloat(expense.amount);
                });
                setTotal(sum);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchTotalExpenses();
    }, [total])

    return (
        <View style={styles.container}>
            <Text style={styles.monthText}>Summary</Text>
            <Text style={styles.total}>${total}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        marginHorizontal: 20
    },
    monthText: {
        marginBottom: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FF4900',
    },
    total: {
        fontSize: 50,
        color: '#FF4900',
        fontWeight: 'bold'
    },
});

export default Total;
