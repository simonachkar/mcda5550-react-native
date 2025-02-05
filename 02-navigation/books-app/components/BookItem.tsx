import { StyleSheet, View, Text, Image } from "react-native";
import { BookItemProps } from "../types";

export function BookItem({ book }: BookItemProps) {
  return (
    <View style={styles.container}>
      <Image 
        style={styles.image} 
        source={{ uri: book.image }}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {book.name}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  image: {
    width: 90,
    height: 140,
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
}); 