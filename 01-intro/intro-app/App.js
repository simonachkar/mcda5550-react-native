import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import universityLogo from "./assets/smu_logo.png";

export default function WelcomeApp() {
  const [inputName, setInputName] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSubmit = () => {
    setDisplayName(inputName);
    setInputName("");
  };

  const resetDisplayName = () => {
    setDisplayName("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.logoContainer}>
        <Image source={universityLogo} style={styles.logo} />
      </View>

      <ScrollView style={styles.contentContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Enter your name"
          value={inputName}
          onChangeText={setInputName}
        />
        <Button title="Submit" onPress={handleSubmit} color="#9D2235" />
        {displayName ? (
          <Text style={styles.welcomeText} onPress={resetDisplayName}>
            Welcome, {displayName}! 😊 🎉 ✨ ⚛️ Click here to reset.
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#999",
    borderBottomWidth: 1,
    paddingTop: 40,
    paddingBottom: 0,
  },
  logo: {
    width: 250,
    height: 105,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
  inputField: {
    fontSize: 20,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
});
