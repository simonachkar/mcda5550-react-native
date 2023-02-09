import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Weather from './components/Weather';

import { API_KEY } from './utils/WeatherAPIKey';
import * as Location from 'expo-location';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    locationName: '',
    weatherCondition: '',
    conditionIcon: ''
  })
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchWeather = (latitude = 25, longitude = 25) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setWeatherData({
          temperature: json.main.temp,
          locationName: json.name,
          weatherCondition: json.weather[0].main,
          conditionIcon: json.weather[0].icon,  
        })
        setIsLoading(false)
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      fetchWeather(location.coords.latitude, location.coords.longitude)
    })();

  }, []);

  return (
    <View style={styles.container}>
      {isLoading ?
        <Text style={styles.loadingText}>Fetching the weather data...</Text> :
        <Weather weatherData={weatherData} weather={temperature} temperature={weatherCondition} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  loadingText: {
    color: 'black',
  }
});
