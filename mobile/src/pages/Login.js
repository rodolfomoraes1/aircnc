import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import api from "../services/api";
import logo from "../assets/logo.png";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("user").then(user => {
      if (user) {
        navigation.navigate("List");
      }
    });
  }, []);

  async function handleSubmit() {
    const response = await api.post("/sessions", {
      email
    });

    const { _id } = response.data;

    await AsyncStorage.setItem("user", _id);
    await AsyncStorage.setItem("techs", techs);

    navigation.navigate("List");
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View>
        <Image source={logo} style={styles.image} />

        <View style={styles.form}>
          <Text style={styles.label}>YOUR EMAIL *</Text>
          <TextInput
            style={styles.input}
            placeholder="Your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>TECHNOLOGIES *</Text>
          <TextInput
            style={styles.input}
            placeholder="Technologies"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={techs}
            onChangeText={setTechs}
          />

          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Find Spots</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  image: { alignSelf: "center" },

  form: {
    width: 320,
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },

  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 10
  },

  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  }
});
