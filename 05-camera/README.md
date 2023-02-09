# Using the device's camera in React Native

> 📱 Camera App + Database

## Camera API

The `expo-camera` library provides a React Native component that wraps the camera on your device, allowing you to take photos and videos, as well as perform operations such as zoom and focus. Here's a simple example of how to use the expo-camera component in a React Native app with the Expo SDK:

[Expo Camera Docs](https://docs.expo.dev/versions/latest/sdk/camera/)

Keep in mind that `expo-camera` does not work in emulators.

### Example

```js
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      // Request camera permission when the component is mounted
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; // If the camera permission hasn't been resolved yet, don't render anything
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>; // If camera permission was denied, show a message
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              // Change camera type when the user presses the Flip button
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              Flip
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
```
This code uses the `Camera` component from the `expo-camera` library to display the camera feed on the device. 

The `Camera.requestPermissionsAsync()` method is used to **request access to the camera**, and the `useEffect` hook is used to call this method when the component is first mounted. 

The camera permission request returns a `status` property which is either `"granted"` or `"denied"`. The `setHasPermission` function is used to store the permission status in the `hasPermission` state.

If the camera permission hasn't been resolved yet (i.e., `hasPermission` is null), the component returns an empty `View` element.

If the camera permission was denied, a "No access to camera" message is displayed. 

If the camera permission was granted, the Camera component is displayed, and the user can switch between the front and back cameras by clicking a "Flip" button. The type of camera to use (front or back) is stored in the `type` state, and the `setType `function is used to change the type when the user presses the "Flip" button.

Note that this code is a basic example and doesn't include features such as taking photos or recording videos.

## MediaLibrary API

The `expo-media-library` library provides access to the media library on the device. With this library, you can access the photos and videos saved on the device and perform actions such as saving new photos and videos or deleting existing ones.

[Expo MediaLibrary Docs](https://docs.expo.dev/versions/latest/sdk/media-library/)

Keep in mind that `expo-media-library` does not work on web.

### Example

```js
import { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { MediaLibrary, Permissions } from 'expo-media-library';

export default function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      // Request the permission to access the media library
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === 'granted') {
        // Get all photos from the media library
        const assets = await MediaLibrary.getAssetsAsync({
          first: 20,
          mediaType: 'photo',
        });
        setPhotos(assets.assets);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
      {photos.map((photo) => (
        <Image
          key={photo.id}
          source={{ uri: photo.uri }}
          style={{ width: 100, height: 100 }}
        />
      ))}
    </View>
  );
}
```
In this code, the `MediaLibrary.getAssetsAsync` method is used to fetch the first 20 photos from the media library and store the results in the `photos` state. 

The `Permissions.askAsync` method is used to request the `CAMERA_ROLL` permission, which is required to access the media library. 

If the permission is granted, the photos are displayed in a grid using the `Image` component.

Note: The `key` prop is set to the `id` of each photo to ensure that each image has a unique key.


## Tab Navigation API

In React Native, the `Tab Navigation` API is used to manage screens and their navigation within an app. 

It provides a way to switch between different screens and maintain navigation history. 

The `Tab Navigation` API can be implemented using the `react-navigation` library, which provides a lot of built-in components and APIs for navigation.

Here's an example of how you could use the Tab Navigation API to navigate between two screens, Home and Settings, using the react-navigation library:

### Example
```js
import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
```

In this code, the `createBottomTabNavigator` function from the `@react-navigation/bottom-tabs` library is used to create a Tab Navigator. 

The `Tab.Navigator` component is then used to wrap the individual tab screens, which are defined using the `Tab.Screen` component. 

The `name` prop is used to specify the name of each screen, and the component prop is used to specify the `component` that should be rendered for each screen.