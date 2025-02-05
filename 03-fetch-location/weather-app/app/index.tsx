import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { Weather } from "../components/Weather";
import { fetchWeatherData } from "../utils/api";
import type { WeatherData, WeatherAPIResponse } from "../types/weather";

export default function App() {
  // isLoading: tracks if we're fetching data
  const [isLoading, setIsLoading] = useState(false);
  // error: stores error messages if something goes wrong
  const [error, setError] = useState<string | null>(null);
  // weatherData: stores the current weather information
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 0,
    locationName: "",
    weatherCondition: "",
    conditionIcon: "",
  });

  // useEffect hook runs when the component mounts
  useEffect(() => {
    // Async function to fetch weather data
    const getWeatherData = async () => {
      try {
        // Start loading state
        setIsLoading(true);
        setError(null);

        // Request permission to access device location
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }

        // Get current device location
        const location = await Location.getCurrentPositionAsync({});
        
        // Fetch weather data using device coordinates
        const weatherResponse: WeatherAPIResponse = await fetchWeatherData(
          location.coords.latitude,
          location.coords.longitude
        );

        // Update state with weather data
        setWeatherData({
          temperature: weatherResponse.main.temp,
          locationName: weatherResponse.name,
          weatherCondition: weatherResponse.weather[0].main,
          conditionIcon: weatherResponse.weather[0].icon,
        });
      } catch (err) {
        // Handle any errors that occur
        setError("Failed to fetch weather data");
        console.error(err);
      } finally {
        // Stop loading state regardless of success/failure
        setIsLoading(false);
      }
    };

    // Call the function when component mounts
    getWeatherData();
  }, []); // Empty dependency array means this runs once when component mounts

  // Render UI based on current state
  return (
    <View style={styles.container}>
      {/* Conditional rendering based on app state */}
      {isLoading ? (
        // Show loading message while fetching data
        <Text style={styles.loadingText}>Fetching the weather data...</Text>
      ) : error ? (
        // Show error message if something went wrong
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        // Show weather component if data was fetched successfully
        <Weather weatherData={weatherData} />
      )}
    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up all available space
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    backgroundColor: "#FFFFE0",
    width: "100%",
  },
  loadingText: {
    color: "black",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
