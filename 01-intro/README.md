# Introduction to React Native

> 📱 Simple Todo App

## Building Blocks

You build mobile apps with React Native by combining different Core Components, and sometimes build your own components using the Core Components.

Components are a fundamental building block in React Native and are used to create the user interface of an app. 

### Core Components
React Native provides a number of built-in components that can be used to create the UI of an app. 

[Core Components and APIs](https://reactnative.dev/docs/components-and-apis)
- View
- Text
- Image
- TextInput
- ScrollView
- StyleSheet (API)
- Button
- FlatList
- Modal
- and more...

```js
const App = props => {
	return (
		<View>
			<Text>Hello there!</Text>
		</View>
	)
}
```

### Custom Components
Custom components are components that you create yourself to extend or customize the behavior of built-in components. They can also be used to create new components that are unique to your app. 

### APIs
React Native provides a number of APIs that allow you to access native platform functionality, such as camera and location services, from your JavaScript code. These APIs are accessed through the React Native Bridge, which acts as a bridge between the JavaScript runtime environment and the native platform environment.


## Styling

Styling in React Native is used to apply visual styles to the components in your application. 

In React Native, there are different ways to style your components. **You can't use pure-CSS!**

### Inline Styles

Styles can be specified directly in the component using the "style" prop.

```js
import React from 'react';
import { View, Text } from 'react-native';

const MyComponent = () => {
  return (
    <View style={{ backgroundColor: 'lightblue', padding: 20 }}>
      <Text style={{ fontSize: 20, color: 'white' }}>
        Hello World!
      </Text>
    </View>
  );
};

export default MyComponent;
```

### StyleSheet API

StyleSheet lets you define a separate stylesheet for your styles.

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

const MyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
    </View>
  );
};

export default MyComponent;
```


## Create a React Native project

There are two ways: Expo CLI and React Native CLI (CLI = "Command Line Interface")

```bash
npx create-expo-app project-name

cd project-name
npx expo start
```

### Expo
Development platform that makes it easier and faster to build, test, and deploy mobile applications

See: [Setting up the development environment](https://reactnative.dev/docs/environment-setup).
