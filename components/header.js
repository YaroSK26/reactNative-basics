import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";



export default function Header(){
    return(
        <View>
            <Text style= {styles.boldText}>Section 3 - My todos <MaterialIcons name="archive"/></Text>
        </View>
    )
}

const styles = StyleSheet.create({
  boldText: {
    fontWeight: "bold",
  },
});