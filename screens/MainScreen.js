import { StyleSheet, View, Text, ScrollView } from "react-native"
import Total from "../components/Total";
import Categories from "../components/Categories";
import Expenses from "../components/Expenses";


function MainScreen(){
    return(
        <ScrollView>
            <Total/>
            <Categories/>
            <Expenses/>
        </ScrollView>
    )

} 

const styles = StyleSheet.create({
    
});


export default MainScreen