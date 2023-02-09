# Data Fetching in React Native + Location API

> 📱 Weather App

## Fetching data with `fetch()`

In React Native, you can fetch data from a server using the `fetch` API, which is a built-in JavaScript function for making HTTP requests.

The fetch API returns a **promise** that resolves to the response of the request, and you can use the `.json()` method on the response to parse the JSON data returned by the server.

### Example

```js
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

function FetchExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      {data.map(item => (
        <View key={item.id}>
          <Text>{item.title}</Text>
          <Text>{item.body}</Text>
        </View>
      ))}
    </View>
  );
}

export default FetchExample;
```

In this example, we use the `useEffect` hook to make a `fetch` request when the component is mounted. 

The `useEffect` hook takes a dependency array as its second argument, which is an array of values that the hook depends on. In this case, we pass an empty array to indicate that the hook should only be run once, when the component is first mounted.

The `fetch` request is made to the `https://jsonplaceholder.typicode.com/posts` endpoint, which returns a list of posts. The response from the server is parsed into JSON using the `.json()` method, and the data is stored in the `data` state using the `setData` function.

When the component is first rendered, the `loading` state is set to `true`, so a [`ActivityIndicator`](https://reactnative.dev/docs/activityindicator) component is displayed to indicate that data is being loaded. 

Once the data has been loaded, the `loading` state is set to `false`, and the component displays the data by mapping over the `data` array and displaying the `title` and `body` of each post.


## Location API

There are many libraries used in React Native to get the Geolocation of the device. In this lecture we are using `expo-location`.

[Expo Location Docs](https://docs.expo.dev/versions/latest/sdk/location/)

This library provides a more user-friendly API for getting the current position, watching the position changes, and getting details about the location provider (such as GPS or network-based location).

Import everything from Location as `location` and start accessing the Location API.

```js
import * as Location from 'expo-location';

// Get location 
const location = await Location.getCurrentPositionAsync({});

```

### Example

```js
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

function LocationExample() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await Location.getCurrentPositionAsync({});
        setLocation(result);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, []);

  if (!location) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {error ? (
          <Text>Error: {error}</Text>
        ) : (
          <Text>Waiting for location...</Text>
        )}
      </View>
    );
  }

  return (
    <View>
      <Text>Latitude: {location.coords.latitude}</Text>
      <Text>Longitude: {location.coords.longitude}</Text>
    </View>
  );
}

export default LocationExample;
```

In this example, we use the `useEffect` hook to make a call to the `Location.getCurrentPositionAsync` method when the component is mounted. 

The `Location.getCurrentPositionAsync` method returns a promise that resolves to the current location information. If the location information is successfully retrieved, it is stored in the `location` state using the `setLocation` function. If an error occurs, the error message is stored in the `error` state using the `setError` function.

When the component is first rendered, the `location` state is null, so a message is displayed to indicate that the location is being retrieved. Once the location information has been retrieved, the component displays the latitude and longitude of the location.