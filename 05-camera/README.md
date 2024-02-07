# Using the device's Camera and Media Library 📸

This app is a practical example of how to use the device's camera and media library in React Native. It allows users to take pictures, save them to their device, and view their saved photos in a gallery. The app utilizes `expo-camera` for camera access, `expo-media-library` for saving and retrieving images, and `expo-sqlite` for local data persistence.

## Features

- **Take Photos**: Use your device's camera to capture pictures.
- **Save Photos**: Keep your photos by saving them directly to your device's gallery.
- **Photo Gallery**: Browse through your saved photos within the app.
- **SQLite Database**: Manages saved photos metadata for easy access and organization.

## Getting Started

To run the Camera App, follow these steps:

1. Navigate to the project directory.
1. Run `npm install` to install the necessary dependencies.
1. Start the app with `npx expo start` or `npm start`

## Technologies Used

### Expo Camera

The `expo-camera` library provides a React Native component that wraps the camera on your device, allowing you to take photos and videos, as well as perform operations such as zoom, focus, flip camera, etc.

- [Expo Camera Docs](https://docs.expo.dev/versions/latest/sdk/camera/)

> Note: The `expo-camera` does not work in emulators.

### Expo MediaLibrary

The `expo-media-library` library provides access to the media library on the device. With this library, you can access the photos and videos saved on the device and perform actions such as saving new photos and videos or deleting existing ones.

- [Expo MediaLibrary Docs](https://docs.expo.dev/versions/latest/sdk/media-library/)

> Note: `expo-media-library` does not work on web.

### Expo Sharing

A library that provides implementing sharing files, as it allows to share files directly with other compatible applications.

- [Expo Sharing Docs](https://docs.expo.dev/versions/latest/sdk/sharing/)

### Tab Navigation

In React Navigation, `Tab Navigation` is used to manage screens and their navigation within an app. It provides a way to switch between different screens and maintain navigation history.

- [Tab Navigation Docs](https://reactnavigation.org/docs/tab-based-navigation/)
