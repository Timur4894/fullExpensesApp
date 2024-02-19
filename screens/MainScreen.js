import { StyleSheet, View, Text } from "react-native"
import Total from "../components/Total";
import Categories from "../components/Categories";
import Expenses from "../components/Expenses";


function MainScreen(){
    return(
        <View>
            <Total/>
            <Categories/>
            <Expenses/>
        </View>
    )

} 

const styles = StyleSheet.create({
    
});


export default MainScreen