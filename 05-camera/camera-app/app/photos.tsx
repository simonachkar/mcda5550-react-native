import { useCallback, useState } from 'react';
import { 
  FlatList, 
  Image, 
  View, 
  StyleSheet, 
  Dimensions, 
  Modal, 
  TouchableOpacity, 
  Text,
  Pressable 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getImages, ImageRecord, deleteImage } from '@/utils/images';

export default function PhotosList() {
  const [photos, setPhotos] = useState<ImageRecord[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<ImageRecord | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const loadPhotos = async () => {
    try {
      const images = await getImages();
      setPhotos(images);
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPhotos();
    }, [])
  );

  const handleDeletePhoto = async () => {
    if (!selectedPhoto) return;

    try {
      await deleteImage(selectedPhoto.id);
      setModalVisible(false);
      setSelectedPhoto(null);
      // Reload the photos after deletion
      loadPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = (screenWidth - 8) / 3;

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.imageContainer}
            onPress={() => {
              setSelectedPhoto(item);
              setModalVisible(true);
            }}
          >
            <Image 
              source={{ uri: item.imageSrc }} 
              style={[styles.image, { width: imageWidth, height: imageWidth }]} 
            />
          </TouchableOpacity>
        )}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedPhoto(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Delete this photo?</Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  setModalVisible(false);
                  setSelectedPhoto(null);
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonDelete]}
                onPress={handleDeletePhoto}
              >
                <Text style={[styles.buttonText, styles.deleteText]}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#e0e0e0',
  },
  buttonDelete: {
    backgroundColor: '#ff4444',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  deleteText: {
    color: 'white',
  },
}); 