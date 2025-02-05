import { useEffect, useState } from 'react';
import { FlatList, Image, View, StyleSheet, Dimensions } from 'react-native';
import { getDatabaseInstance, ImageRecord } from '../utils/database';

export default function PhotosList() {
  const [photos, setPhotos] = useState<ImageRecord[]>([]);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const db = await getDatabaseInstance();
        const result = await db.execAsync('SELECT * FROM images');
        if (result?.rows) {
          setPhotos(Array.from(result.rows));
        }
      } catch (error) {
        console.error('Error loading photos:', error);
      }
    };

    loadPhotos();
  }, []);

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = (screenWidth - 8) / 3; // 3 columns with 2px padding on each side

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: item.imageSrc }} 
              style={[styles.image, { width: imageWidth, height: imageWidth }]} 
            />
          </View>
        )}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 2,
  },
  imageContainer: {
    padding: 2,
  },
  image: {
    borderRadius: 5,
  },
}); 