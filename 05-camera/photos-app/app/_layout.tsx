import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Camera',
          title: 'Camera',
          drawerIcon: () => <Ionicons name="camera" size={24} />,
        }}
      />
      <Drawer.Screen
        name="photos"
        options={{
          drawerLabel: 'Gallery',
          title: 'Gallery',
          drawerIcon: () => <Ionicons name="images" size={24} />,
        }}
      />
    </Drawer>
  );
}
