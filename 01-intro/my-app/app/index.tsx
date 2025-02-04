import { useState } from "react";
import { Stack, Link } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";

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
      <Stack.Screen options={{ headerStyle: { backgroundColor: '#FFE4E1' }, headerTitle: "SMU welcome app" }} />

      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/smu_logo.png")}
          style={styles.logo}
        />
        <Link href={{ pathname: '/details' }} style={{ color: '#9D2235', textDecorationLine: 'underline', margin: 10 }}>Go to Details Screen</Link>
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
          <View style={styles.welcomeText}>
            <Text>Welcome, {displayName}! 😊 🎉 ✨ ⚛️</Text>
            <Text
              style={{ color: "blue", textDecorationLine: "underline" }}
              onPress={resetDisplayName}
            >
              Click here to reset.
            </Text>
          </View>
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
    flexDirection: "column",
    alignItems: "center",
  },
  inputField: {
    fontSize: 20,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  }
});
