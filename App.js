import { Button, StyleSheet, Text, View, TextInput, ScrollView,FlatList, TouchableOpacity , TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { useState } from "react";
import Header from "./components/header";
import {MaterialIcons} from "@expo/vector-icons"
import { globalStyles } from "./styles";
import { Modal } from "react-native-web";

export default function App() {
//section 1 -zaklady state 
    const [name, setName] = useState("jaro");
    const [person, setPerson] = useState({ name: "mario", age: 40 });
    const clickHandler = () => {
      setName("jaro-updated");
      setPerson({ name: "mario", age: 20 });
    };
//section 2  - polia, vypis 
    const [earth,setEarth] = useState([
      {name: "earth", key: 6},
      {name: "mars", key: 2},
      {name: "venus", key: 3},
    ])

    const pressHandler = (key) => {
      console.log(key)
      setEarth((prev) => {
        return prev.filter(p => p.key != key)
      })
    }
//section 3 - todo 

    const [todo, setTodo] = useState([
      { name: "eat", key: "1" },
      { name: "sleep", key: "2" },
      { name: "repeat", key: "3" },
    ]);

    const todoHandler = (key) => {
      setTodo((prev) => {
          return prev.filter(p => p.key != key)
      })
    }

    const [text,setText] = useState("")
    const changeHandler = (val) => {
      setText(val)
    }

    const submitHandler = (text) => {
      if (text.length > 3) {
          setTodo((prev) => {
          return [
            {name: text, key: Math.random().toString()},
            ...prev
          ]
      })
      setText("");
      } else {
        alert("debil , daj viac nez 3 chars")
      }
    }
//section 4 reviews
    const [modalOpen, setModalOpen] = useState(false);


    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            {/* section 1 - zaklady , state */}
            <Text style={styles.boldText}>Section 1 </Text>
            <Text>Hello Word! {name}</Text>

            <TextInput
              style={styles.input}
              multiline={true}
              keyboardType="default"
              onChangeText={(val) => setName(val)}
              placeholder="placeholder"
            />

            <Text>
              {person.name} {person.age}
            </Text>
            <Button title="update name" onPress={() => clickHandler()} />
          </View>
          {/* section 2  - polia, vypis   */}
          <ScrollView>
            <Text style={styles.boldText}>Section 2 </Text>

            {/* {earth.map((i) => {
            return (
              <View>
                <Text key={i.key}>
                  {i.name} {i.key}
                </Text>
              </View>
            );
          })} */
            /*2 moznost vypisu  () => { return ()} je to iste ako () => ()  , flat list je lepsi pri velkych datach, nacita sa az ked sa skrolne k tomu itemu
              {/*keyExtractor={(i) => i.id } ak nemame key v datach ale nieco ine  , numColumns={2} - da to do 2  columns 
        */}
            <FlatList
              data={earth}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => pressHandler(item.key)}>
                  <Text>
                    {item.name} {item.key}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
          {/* section 3 - todo */}
          <View>
            <Header />
            <View>
              <TextInput
                placeholder="new todo"
                onChangeText={(val) => changeHandler(val)}
              />
              <Button onPress={() => submitHandler(text)} title="add todo" />

              <FlatList
                data={todo}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => todoHandler(item.key)}>
                    <Text>
                      {item.name} <MaterialIcons name="delete" />
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          {/* section 4 - review */}
          <View>
            <Text style={styles.boldText}>Section 4 - nic nefunguje </Text>
            <Image source={require("./assets/react-native.png")} />

            <Modal visible={modalOpen} animationType="slide">
              <View style={styles.modalContent}>
                <MaterialIcons
                  name="close"
                  size={24}
                  style={{ ...styles.modalToggle, ...styles.modalClose }}
                  onPress={() => setModalOpen(false)}
                />
                <Text>Hello from the modal :)</Text>
              </View>
            </Modal>

            <MaterialIcons
              name="add"
              size={24}
              style={styles.modalToggle}
              onPress={() => setModalOpen(true)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

const styles = StyleSheet.create({
  // section 1
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "pink",
    padding: 20,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "red",
  },
  // section 4

  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
});
