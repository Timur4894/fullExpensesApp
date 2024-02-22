import { ScrollView } from "react-native"
import Total from "../components/Total";
import Categories from "../components/Categories";
import Expenses from "../components/Expenses";


function MainScreen(){
    return(
        <ScrollView style={{
            backgroundColor: '#333',
        }}>
            <Total/>
            <Categories/>
            <Expenses/>
        </ScrollView>
    )

} 



export default MainScreen