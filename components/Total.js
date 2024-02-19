import { StyleSheet, View, Text } from "react-native"



function Total({ fetchedExpenses }){

    //const totalAmount = fetchedExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2);

    return(
        <View style={styles.container}>
            <Text style={styles.monthText}>Summary</Text>
            <Text style={styles.total}>$2882</Text>
        </View>
    )

} 

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        marginHorizontal: 20
    },
    monthText: {
        marginBottom: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },
    total: {
        fontSize: 50,
        //color: 'black',
        fontWeight: 'bold'
    },
});


export default Total