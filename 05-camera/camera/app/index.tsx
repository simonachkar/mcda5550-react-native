import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
} from 'react-native';
import { CameraView, CameraType, type CameraCapturedPicture, useCameraPermissions } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as SQLite from 'expo-sqlite';
import { getDatabaseInstance } from '../utils/database';

const handleError = (error: any, message: string) => {
  console.error(message, error);
};

export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false);
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>('back');

  // Request media library permission on mount
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
        <Text style={styles.textCenter}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
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

  const flipCamera = () => {
    setCameraType(current => current === 'back' ? 'front' : 'back');
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
          source={{ uri: `data:image/jpg;base64,${photo.base64}` }}
        />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission && (
          <Button title="Save" onPress={savePhoto} />
        )}
        <Button title="Retake" onPress={() => setPhoto(null)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView 
        style={styles.camera} 
        ref={cameraRef}
        onMountError={(error) => handleError(error, 'Camera mount error:')}
      >
        <View style={styles.buttonsContainer}>
          <Button title="Flip Camera" onPress={flipCamera} />
          <Button title="Take Picture" onPress={takePic} />
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  preview: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});
