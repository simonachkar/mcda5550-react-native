import { useCallback, useState } from 'react';
import { FlatList, Image, View, StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getImages, ImageRecord } from '@/utils/images';

export default function PhotosList() {
  const [photos, setPhotos] = useState<ImageRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadPhotos = async () => {
        try {
          const images = await getImages();
          setPhotos(images);
        } catch (error) {
          console.error('Error loading photos:', error);
        }
      };

      loadPhotos();
    }, [])
  );

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