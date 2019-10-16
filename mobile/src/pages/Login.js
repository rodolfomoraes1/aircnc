import React from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";

import logo from "../assets/logo.png";

export default function Login() {
  return (
    <View style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>YOUR EMAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>TECHNOLOGIES *</Text>
        <TextInput
          style={styles.input}
          placeholder="Technologies"
          placeholderTextColor="#999"
          autoCapitalize="words"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  form: {
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
  }
});
