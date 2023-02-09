import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from './screens/CategoriesScreen';
import BooksListScreen from './screens/BooksListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: '#282120',
            headerStyle: {
              backgroundColor: '#FAD02C',
            },
            headerTitleStyle: {
              color: '#282120',
            },
          }}>
          <Stack.Screen
            name="AllCategories"
            options={{ title: 'All Categories' }}
            component={CategoriesScreen}
          />
          <Stack.Screen
            name="BooksList"
            options={{ title: 'Books List' }}
            component={BooksListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});