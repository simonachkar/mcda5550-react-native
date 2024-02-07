import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoriesScreen from "./screens/CategoriesScreen";
import BooksListScreen from "./screens/BooksListScreen";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerTintColor: "#282120",
  headerStyle: { backgroundColor: "#FAD02C" },
  headerTitleStyle: { color: "#282120" },
};

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            name="Home"
            component={CategoriesScreen}
            options={{ title: "📚 Books App" }}
          />
          <Stack.Screen
            name="BooksList"
            component={BooksListScreen}
            options={{ title: "Category" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
