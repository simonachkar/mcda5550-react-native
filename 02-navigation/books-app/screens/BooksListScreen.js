import { useLayoutEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import BookItem from "../components/BookItem";

import { CATEGORIES, BOOKS } from "../data";

function BooksListScreen({ route, navigation }) {
  const catId = route.params.categoryId;

  const displayedBooks = BOOKS.filter((bookItem) => {
    return bookItem.category.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

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
