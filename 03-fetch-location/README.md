# Data Fetching + Location Service 📍

## Weather App 🌤️

A React Native application that displays weather information based on your current location. It showcases how to integrate the `expo-location` library for geolocation services and the fetch API for retrieving weather information from the OpenWeatherMap API.

- [Using Fetch API in React Native](https://reactnative.dev/docs/network#using-fetch)
- [Expo Location Docs](https://docs.expo.dev/versions/latest/sdk/location/)

## Running the app

To run Weather App, follow these steps:

1. Navigate to the project directory.
1. Run `npm install` to install the necessary dependencies.
1. Start the app with `npm start`

## Permissions

This app requires permission to access the device's location services. Users will be prompted to grant permission when the app is first launched. The app handles scenarios where permission is not granted by displaying an appropriate message.

## API Key

To fetch weather data, you'll need an API key from OpenWeatherMap. Replace the placeholder `API_KEY` in `./utils/api.ts` with your actual API key.
