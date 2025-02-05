export const API_KEY = "ba54be19d96707cf43191d3e9adbd4f9";

export const fetchWeatherData = async (latitude: number, longitude: number) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Weather data fetch failed');
  }
  return response.json();
}; 