import { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { BookItem } from "../components/BookItem";
import { CATEGORIES } from "../data/categories";
import { BOOKS } from "../data/books";

export default function BooksList() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

  // Get displayedBooks data, filtering books by the specified category id
  const displayedBooks = BOOKS.filter((bookItem) => {
    if (!categoryId) return true;
    return bookItem.category.includes(categoryId);
  });

  // Get category title for the header
  const category = CATEGORIES.find((category) => category.id === categoryId);
  const categoryTitle = category?.title ?? 'All Books';

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: categoryTitle,
          headerTitleStyle: {
            fontSize: 20,
          },
        }} 
      />
      <FlatList
        data={displayedBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookItem book={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingVertical: 8,
  },
});
