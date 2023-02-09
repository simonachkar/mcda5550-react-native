import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import CameraScreen from "./screens/CameraScreen";
import PhotosList from "./screens/PhotosList";

import db from "./utils/db";

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    // Create table `images` if it does not exist
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists images (id integer primary key not null, imageSrc text);",
        (message) => console.log(message)
      );
    });
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name={focused ? "camera" : "camera-outline"}
                  size={size}
                  color={color}
                />
              );
            },
          }}
          name="Camera"
          component={CameraScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name={focused ? "images" : "images-outline"}
                  size={size}
                  color={color}
                />
              );
            },
          }}
          name="Photos"
          component={PhotosList}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
