import { useLayoutEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import BookItem from "../components/BookItem";

import { CATEGORIES, BOOKS } from "../data";

function BooksListScreen({ route, navigation }) {
  const catId = route.params.categoryId;

  // Get displayedBooks data, by filtering the book by the specified category id
  const displayedBooks = BOOKS.filter((bookItem) => {
    if (!catId) return true;
    return bookItem.category.indexOf(catId) >= 0;
  });

  // To change the title to the category name
  useLayoutEffect(() => {
    const category = CATEGORIES.find((category) => category.id === catId);
    const categoryTitle = category.title;
    navigation.setOptions({ title: categoryTitle });
  }, [catId, navigation]);

  // UI function to render the list of <BookItem>
  function renderBookItem(itemData) {
    const item = itemData.item;

    const bookItemProps = {
      id: item.id,
      name: item.name,
      author: item.author,
      image: item.image,
      category: item.category,
    };

    return <BookItem book={bookItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
      />
    </View>
  );
}

export default BooksListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
  },
});
