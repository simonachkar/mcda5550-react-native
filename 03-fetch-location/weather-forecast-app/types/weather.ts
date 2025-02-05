export interface WeatherData {
  temperature: number;
  locationName: string;
  weatherCondition: string;
  conditionIcon: string;
}

export interface WeatherProps {
  weatherData: WeatherData;
}

export interface WeatherAPIResponse {
  main: {
    temp: number;
  };
  name: string;
  weather: Array<{
    main: string;
    icon: string;
  }>;
} 