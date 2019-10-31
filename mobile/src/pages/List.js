import React, { useState, useEffect } from "react";
import {
  Alert,
  SafeAreaView,
  AsyncStorage,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";

import logo from "../assets/logo.png";
import SpotList from "../components/SpotList";
import socketio from "socket.io-client";

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://192.168.1.7:3333", {
        query: { user_id }
      });

      socket.on("booking_response", booking => {
        Alert.alert(`Your reservation at company ${booking.spot.company} at 
        ${booking.date} was ${booking.approved ? "APPROVED" : "REJECTED"}.`);
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storagedTechs => {
      const techsArray = storagedTechs.split(",").map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  async function deleteTechs() {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("techs");

    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.deleteButton} onPress={deleteTechs}>
        <Text style={styles.deleteButtonText}>Clear All Data</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  },

  deleteButton: {
    marginTop: 20,
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },

  deleteButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  }
});
