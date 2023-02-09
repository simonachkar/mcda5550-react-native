import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CameraScreen from "./screens/CameraScreen";
import PhotosList from "./screens/PhotosList";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import db from "./utils/db";

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
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
