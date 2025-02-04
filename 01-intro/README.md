# Introduction to React Native ⚛️

## React Native

React Native is a framework enabling developers to build mobile apps using JavaScript and React. It provides a native-like experience on both Android and iOS with a single codebase.

## Expo

Expo is a development platform that simplifies building, testing, and deploying mobile apps.

## Create a React Native Project

You can use either Expo CLI or React Native CLI to create a project. For this project, we will use Expo CLI:

```bash
npx create-expo-app@latest

cd project-name

npm run start
npm run android   # runs on Android
npm run ios       # runs on iOS
npm run web       # runs on Browser
```

### More info

- To run the app on a physical device, you need to have the Expo Go app installed on your phone.
- For Android, you can use the Android Studio or the command line to run the app.
- For iOS, you can use the Xcode to run the app.
- For more info on setting up the development environment, refer to [React Native's environment setup doc](https://reactnative.dev/docs/environment-setup).

### Reset the project 

You can remove the boilerplate code and start fresh with a new project. Run the following command to reset your project:

```bash
npm run reset-project
```
This command will move the existing files in app to app-example, then create a new app directory with a new index.tsx file.

## About This App

This React Native `my-app` demonstrates basic concepts with a simple user interface.Users can input and display information, exploring components and state management inReact Native.

