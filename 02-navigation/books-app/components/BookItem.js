import { StyleSheet, View, Text, Image } from "react-native";

const BookItem = ({ book }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: book.image }} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{book.name}</Text>

        <Text style={styles.author}>{book.author}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    width: "100%",
  },
  image: {
    width: 90,
    height: 140,
  },
  textContainer: {
    marginLeft: 10,
    width: "90%",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    width: "90%",
  },
  author: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default BookItem;
