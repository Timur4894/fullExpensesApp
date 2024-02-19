import { StyleSheet, View, Text } from "react-native"



function Total({total}){
    return(
        <View style={styles.container}>
            <Text style={styles.monthText}>This month</Text>
            <Text style={styles.total}>1000$</Text>
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
        fontWeight: 'bold'
    },
});


export default Total