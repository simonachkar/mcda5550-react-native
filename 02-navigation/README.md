# Navigation in React Native

> 📱 Books App

React Native provides a way to navigate between different screens or views within an app using the "React Navigation" library. 

One of the most commonly used navigators in React Navigation is the Stack Navigator.

## Stack Navigator

A Stack Navigator represents a stack of screens, where the top of the stack is the current screen. 

When a new screen is pushed onto the stack, it is displayed on top of the previous screen, which remains visible in the background. 

The user can navigate back to the previous screen by popping the top screen from the stack.

```js
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

All the screens inside the `NavigationContainer` now have access to special props: `navigation` and `route` that could be used to navigate within these screens.

```js
  const pressHandler = (itemData) => {
    navigation.navigate("ScreenName", { optionalParam: paramToPass });
  }
```

In the other screen, to receive the optional paramters, we use the `route` prop.

```js
const param_id = route.params.param_id;
```