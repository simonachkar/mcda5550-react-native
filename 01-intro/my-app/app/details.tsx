import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function Details() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FFE4E1" },
          headerTitle: "Details screen",
        }}
      />
      <Text>Details screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
