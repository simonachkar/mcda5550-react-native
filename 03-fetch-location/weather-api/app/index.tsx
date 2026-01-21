import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Weather } from "../components/Weather";
import type { WeatherAPIResponse, WeatherData } from "../types/weather";
import { fetchWeatherData } from "../utils/api";

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

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Request permission to access device location
        const { status } =
          await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied.");
          return;
        }

        // Check if location services are enabled
        const servicesEnabled =
          await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
          setError(
            "Location services are disabled. Emulator: Extended Controls → Location → search a city → Set Location."
          );
          return;
        }

        // Try to get current position
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        // Fallback for emulator quirks
        if (!location) {
          location = await Location.getLastKnownPositionAsync({});
        }

        if (!location) {
          setError(
            "Could not retrieve location. Please set a location in the emulator."
          );
          return;
        }

        // Fetch weather data using device coordinates
        const weatherResponse: WeatherAPIResponse =
          await fetchWeatherData(
            location.coords.latitude,
            location.coords.longitude
          );

        console.log(weatherResponse);
          
        // Update state with weather data
        setWeatherData({
          temperature: weatherResponse.main.temp,
          locationName: weatherResponse.name,
          weatherCondition: weatherResponse.weather[0].main,
          conditionIcon: weatherResponse.weather[0].icon,
        });
      } catch (err) {
        console.error("Weather/location error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch weather data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    getWeatherData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>
          Fetching the weather data...
        </Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Weather weatherData={weatherData} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eeedda",
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
