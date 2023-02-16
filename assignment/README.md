# React Native Assignment

In this assignment, you are required to code a React Native app consisting of three screens that are navigated to and from using Stack Navigation from the React Navigation library.

The screens:

- Home Screen
- Weather Screen
- Feedback Screen

The main screen, "Home Screen" contains some basic text describing the app, and two buttons, "Weather" and "Feedback" each leading the other two screens.

The weather screen displays forecast data using `fetch` from [Open Weather API](https://openweathermap.org/). Displaying the name of a city of your choice, with its weather as Celcius and a description of the weather (you get the description from the API response).

The feedback screen should display some text consisting of your feedback and comments about this React Native session. Please give your comments (and complaints) about the material and the assignment.

Here is a prototype of the app you should code:
![](./misc/React Native Asssignment.jpg)

## Rubric

The assignment is 10 points in total.

- Creating app successfully -> 1 pt
- Creating the screens -> 3 pts
- Adding navigation between screens -> 3 pts
- Fetching weather data -> 3 pts

## Hints

Don't forget to install the React Native library and the Stack navigator:

```
npm install @react-navigation/native @react-navigation/stack
```

### Sample code for fetching data

The data fetching would be done in the Weather Screen.

```js
// Call the fuction on a useEffect
useEffect(() => {
  // don't forget to have a state for loading to show a loading message until the data is fetched
  setIsLoading(true);

  // Fetching data
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      setWeatherData({
        temperature: json.main.temp,
        locationName: json.name,
        weatherCondition: json.weather[0].main,
        // ...whatever data you want from the open weather api
      });

      // when the weather data is set, isLoading should be changed back
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
```

Don't forget to add the values in the URL for `latitude`, `longitude` and `API_KEY` (you get an "API key" by [creating an account](https://openweathermap.org/appid) on the Open Weather website).
