import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Camera',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'camera' : 'camera-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="photos"
        options={{
          title: 'Photos',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'images' : 'images-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
