# Data Fetching + Location Service 📍

React Native facilitates fetching data from servers and utilizing device features like geo-location.

- [Using Fetch API in React Native](https://reactnative.dev/docs/network#using-fetch)
- [Expo Location Docs](https://docs.expo.dev/versions/latest/sdk/location/)

## About This App (Weather App)

The Weather App is a React Native application that dynamically fetches and displays weather data based on the device's current location. It showcases how to integrate the `expo-location` library for geolocation services and the fetch API for retrieving weather information from the OpenWeatherMap API.

## Running the app

To run Weather App, follow these steps:

1. Navigate to the project directory.
1. Run `npm install` to install the necessary dependencies.
1. Start the app with `npx expo start` or `npm start`

## Permissions

This app requires permission to access the device's location services. Users will be prompted to grant permission when the app is first launched. The app handles scenarios where permission is not granted by displaying an appropriate message.

## API Key

To fetch weather data, you'll need an API key from OpenWeatherMap. Replace the placeholder `API_KEY` in `./utils/WeatherAPIKey.js` with your actual API key.
