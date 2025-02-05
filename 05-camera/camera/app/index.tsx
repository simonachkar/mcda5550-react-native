import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { CameraView, CameraType, type CameraCapturedPicture, useCameraPermissions } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { getDatabaseInstance } from '../utils/database';
import { FontAwesome6 } from '@expo/vector-icons';

const handleError = (error: any, message: string) => {
  console.error(message, error);
};

export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false);
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const [facing, setFacing] = useState<CameraType>('back');

  useEffect(() => {
    const requestPermissions = async () => {
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    };
    requestPermissions();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePic = async () => {
    if (!cameraRef.current) return;

    try {
      const newPhoto = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
        exif: false,
      });
      setPhoto(newPhoto as CameraCapturedPicture);
    } catch (error) {
      handleError(error, 'Error taking picture:');
    }
  };

  const toggleFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  // Share picture after taking it
  const sharePic = async () => {
    if (!photo?.uri) return;

    await shareAsync(photo.uri);
    setPhoto(null);
  };

  // Save picture to media library and SQLite database
  const savePhoto = async () => {
    if (!photo?.uri) return;

    try {
      if (hasMediaLibraryPermission) {
        await MediaLibrary.saveToLibraryAsync(photo.uri);
      }

      const db = await getDatabaseInstance();
      await db.execAsync(
        'INSERT INTO images (imageSrc) VALUES (?)',
        [photo.uri]
      );
      setPhoto(null);
    } catch (error) {
      handleError(error, 'Error saving photo:');
    }
  };

  // Render photo preview or camera UI
  if (photo) {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: photo.uri }}
        />
        <View style={styles.buttonContainer}>
          <Button title="Share" onPress={sharePic} />
          {hasMediaLibraryPermission && (
            <Button title="Save" onPress={savePhoto} />
          )}
          <Button title="Retake" onPress={() => setPhoto(null)} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        ref={cameraRef}
        facing={facing}
      >
        <View style={styles.shutterContainer}>
          <TouchableOpacity onPress={toggleFacing}>
            <FontAwesome6 name="rotate-left" size={32} color="white" />
          </TouchableOpacity>
          <Pressable onPress={takePic}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  { opacity: pressed ? 0.5 : 1 }
                ]}
              >
                <View style={styles.shutterBtnInner} />
              </View>
            )}
          </Pressable>
          <View style={{ width: 32 }} /> {/* Spacer for layout balance */}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  shutterContainer: {
    position: 'absolute',
    bottom: 44,
    left: 0,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderColor: 'white',
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  preview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
});
